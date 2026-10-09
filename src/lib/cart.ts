/**
 * The cart lives in localStorage: no session, no server round-trip until the
 * order is actually created. Prices are deliberately NOT stored — they are
 * recomputed from the catalogue on render and again on the server at checkout,
 * so a stale or edited cart can never rent a machine at the wrong rate.
 */
import { isRentalMonths, type RentalMonths } from './rental.ts';

export interface CartItem {
  slug: string;
  ram: string;
  ssd: string;
  os: string;
  gpu?: string;
  psu?: string;
  bay?: string;
  /** Omitted for rack servers, which remain available for purchase. */
  rentalMonths?: RentalMonths;
  quantity: number;
}

// Keep previous purchase carts separate from rental requests.
const KEY = 'compud.cart.v2';
const EVENT = 'compud:cart';

export const lineKey = (
  item: Pick<CartItem, 'slug' | 'ram' | 'ssd' | 'os' | 'gpu' | 'psu' | 'bay' | 'rentalMonths'>,
): string =>
  [item.slug, item.ram, item.ssd, item.os, item.gpu ?? '', item.psu ?? '', item.bay ?? '', item.rentalMonths ?? 'purchase'].join('|');

export function readCart(): CartItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry): CartItem[] => {
      if (typeof entry !== 'object' || entry === null) return [];
      const item = entry as Partial<CartItem>;
      if (typeof item.slug !== 'string') return [];
      if (item.rentalMonths !== undefined && !isRentalMonths(item.rentalMonths)) return [];
      const quantity = Number(item.quantity);
      return [
        {
          slug: item.slug,
          ram: String(item.ram ?? ''),
          ssd: String(item.ssd ?? ''),
          os: String(item.os ?? ''),
          gpu: item.gpu !== undefined ? String(item.gpu) : undefined,
          psu: item.psu !== undefined ? String(item.psu) : undefined,
          bay: item.bay !== undefined ? String(item.bay) : undefined,
          rentalMonths: item.rentalMonths,
          quantity: Number.isFinite(quantity) ? Math.min(10, Math.max(1, Math.floor(quantity))) : 1,
        },
      ];
    });
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Private browsing or a full quota: the cart simply does not persist.
  }
  window.dispatchEvent(new CustomEvent<CartItem[]>(EVENT, { detail: items }));
}

export function addToCart(item: CartItem): CartItem[] {
  const items = readCart();
  const existing = items.find((line) => lineKey(line) === lineKey(item));
  if (existing) {
    existing.quantity = Math.min(10, existing.quantity + item.quantity);
  } else {
    items.push({ ...item, quantity: Math.min(10, Math.max(1, item.quantity)) });
  }
  writeCart(items);
  return items;
}

export function setQuantity(key: string, quantity: number): CartItem[] {
  const items = readCart()
    .map((line) => (lineKey(line) === key ? { ...line, quantity } : line))
    .filter((line) => line.quantity > 0);
  writeCart(items);
  return items;
}

export function removeLine(key: string): CartItem[] {
  const items = readCart().filter((line) => lineKey(line) !== key);
  writeCart(items);
  return items;
}

export function setRentalMonths(key: string, rentalMonths: RentalMonths): CartItem[] {
  if (!isRentalMonths(rentalMonths)) return readCart();
  const items = readCart().map((line) => (lineKey(line) === key ? { ...line, rentalMonths } : line));
  const merged: CartItem[] = [];
  for (const item of items) {
    const existing = merged.find((line) => lineKey(line) === lineKey(item));
    if (existing) existing.quantity = Math.min(10, existing.quantity + item.quantity);
    else merged.push(item);
  }
  writeCart(merged);
  return merged;
}

export function clearCart(): void {
  writeCart([]);
}

export const cartCount = (items: CartItem[]): number =>
  items.reduce((sum, line) => sum + line.quantity, 0);

/** Fires on our own writes and on changes made in another tab. */
export function subscribe(listener: (items: CartItem[]) => void): () => void {
  const onCustom = (event: Event) => listener((event as CustomEvent<CartItem[]>).detail);
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === KEY) listener(readCart());
  };
  window.addEventListener(EVENT, onCustom);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(EVENT, onCustom);
    window.removeEventListener('storage', onStorage);
  };
}
