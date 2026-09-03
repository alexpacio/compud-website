import { randomBytes } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { Lang } from '../i18n/ui';
import { commerce } from './config';

export type OrderStatus = 'pending' | 'paid' | 'expired' | 'cancelled';

export interface OrderLine {
  slug: string;
  name: string;
  sku: string;
  /** Human-readable configuration, already resolved in the order's language. */
  configuration: string;
  choice: { ram: string; ssd: string; os: string };
  quantity: number;
  unitNetCents: number;
  lineNetCents: number;
}

export interface Customer {
  name: string;
  company?: string;
  vatNumber?: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  province: string;
  country: string;
  notes?: string;
}

export interface Order {
  ref: string;
  lang: Lang;
  status: OrderStatus;
  createdAt: string;
  expiresAt: string;
  paidAt?: string;
  /** Filled in by the reconciliation endpoint when the credit is matched. */
  payment?: { amountCents: number; valueDate?: string; endToEndId?: string };
  lines: OrderLine[];
  totals: { netCents: number; shippingCents: number; vatCents: number; grossCents: number; vatRate: number };
  customer: Customer;
}

/* --------------------------------------------------------------- reference */

const REF_ALPHABET = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // no I or O, easier to read back

function randomRef(): string {
  const bytes = randomBytes(6);
  const chars = Array.from(bytes, (b) => REF_ALPHABET[b % REF_ALPHABET.length]);
  return `CPD-${chars.slice(0, 4).join('')}-${chars.slice(4, 6).join('')}`;
}

/** Payment references are what the bank matches on, so they must be unique. */
async function uniqueRef(existing: Record<string, Order>): Promise<string> {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const ref = randomRef();
    if (!(ref in existing)) return ref;
  }
  throw new Error('could not allocate a unique payment reference');
}

export const isValidRef = (ref: string): boolean => /^CPD-[0-9A-HJ-NP-Z]{4}-[0-9A-HJ-NP-Z]{2}$/.test(ref);

/* ------------------------------------------------------------------- store */

/**
 * Orders live in a JSON file. This is deliberately the smallest thing that
 * really works for a single-node deployment: swap `readAll`/`writeAll` for a
 * database client and the rest of the application is unchanged.
 */
const dataFile = join(process.env.COMPUD_DATA_DIR?.trim() || join(process.cwd(), 'data'), 'orders.json');

type Store = Record<string, Order>;

/** Serialises writers in this process so two orders never clobber each other. */
let queue: Promise<unknown> = Promise.resolve();
function exclusive<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
}

async function readAll(): Promise<Store> {
  try {
    return JSON.parse(await readFile(dataFile, 'utf8')) as Store;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {};
    throw error;
  }
}

async function writeAll(store: Store): Promise<void> {
  await mkdir(dirname(dataFile), { recursive: true });
  const temporary = `${dataFile}.${process.pid}.tmp`;
  await writeFile(temporary, JSON.stringify(store, null, 2), 'utf8');
  await rename(temporary, dataFile);
}

/** Pending orders past their hold window stop reserving stock. */
function expireIfDue(order: Order): Order {
  if (order.status === 'pending' && Date.parse(order.expiresAt) < Date.now()) {
    return { ...order, status: 'expired' };
  }
  return order;
}

export async function createOrder(
  input: Omit<Order, 'ref' | 'status' | 'createdAt' | 'expiresAt'>,
): Promise<Order> {
  return exclusive(async () => {
    const store = await readAll();
    const now = new Date();
    const order: Order = {
      ...input,
      ref: await uniqueRef(store),
      status: 'pending',
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + commerce.holdHours * 3600_000).toISOString(),
    };
    store[order.ref] = order;
    await writeAll(store);
    return order;
  });
}

export async function getOrder(ref: string): Promise<Order | undefined> {
  if (!isValidRef(ref)) return undefined;
  const store = await readAll();
  const order = store[ref];
  return order ? expireIfDue(order) : undefined;
}

/**
 * Called by the bank reconciliation job (or an operator) once the SEPA credit
 * carrying this reference has landed.
 */
export async function markPaid(
  ref: string,
  payment: { amountCents: number; valueDate?: string; endToEndId?: string },
): Promise<Order | undefined> {
  return exclusive(async () => {
    const store = await readAll();
    const order = store[ref];
    if (!order) return undefined;
    if (order.status === 'paid') return order;
    const updated: Order = { ...order, status: 'paid', paidAt: new Date().toISOString(), payment };
    store[ref] = updated;
    await writeAll(store);
    return updated;
  });
}
