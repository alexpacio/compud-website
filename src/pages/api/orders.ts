import type { APIRoute } from 'astro';
import {
  configuredPriceCents,
  configuredSku,
  optionById,
  pick,
  productBySlug,
} from '../../data/catalogue';
import { commerce } from '../../lib/config';
import { href } from '../../i18n/utils';
import type { Lang } from '../../i18n/ui';
import { createOrder, type Customer, type OrderLine } from '../../lib/orders';
import { vatOf } from '../../lib/money';

export const prerender = false;

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const text = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface RawItem {
  slug?: unknown;
  ram?: unknown;
  ssd?: unknown;
  os?: unknown;
  quantity?: unknown;
}

/**
 * Creates an order and returns the reference the customer must quote on the
 * transfer. Prices are recomputed here from the catalogue: whatever the client
 * posts about money is ignored.
 */
export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const lang: Lang = body.lang === 'en' ? 'en' : 'it';
  const rawItems = Array.isArray(body.items) ? (body.items as RawItem[]) : [];
  if (rawItems.length === 0) return json({ error: 'empty_cart' }, 400);
  if (rawItems.length > 20) return json({ error: 'too_many_items' }, 400);

  const lines: OrderLine[] = [];
  for (const raw of rawItems) {
    const product = productBySlug(text(raw.slug, 80));
    if (!product) return json({ error: 'unknown_product', slug: raw.slug }, 400);

    const quantity = Math.floor(Number(raw.quantity));
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 10) {
      return json({ error: 'invalid_quantity', slug: product.slug }, 400);
    }

    const choice = {
      ram: optionById(product.options.ram, text(raw.ram, 20)).id,
      ssd: optionById(product.options.ssd, text(raw.ssd, 20)).id,
      os: optionById(product.options.os, text(raw.os, 20)).id,
    };
    const unitNetCents = configuredPriceCents(product, choice);
    const configuration = [
      pick(optionById(product.options.ram, choice.ram).label, lang),
      pick(optionById(product.options.ssd, choice.ssd).label, lang),
      pick(optionById(product.options.os, choice.os).label, lang),
    ].join(' · ');

    lines.push({
      slug: product.slug,
      name: product.name,
      sku: configuredSku(product, choice),
      configuration,
      choice,
      quantity,
      unitNetCents,
      lineNetCents: unitNetCents * quantity,
    });
  }

  const c = (body.customer ?? {}) as Record<string, unknown>;
  const customer: Customer = {
    name: text(c.name, 120),
    company: text(c.company, 120) || undefined,
    vatNumber: text(c.vatNumber, 40) || undefined,
    email: text(c.email, 160),
    phone: text(c.phone, 40),
    address: text(c.address, 200),
    zip: text(c.zip, 16),
    city: text(c.city, 80),
    province: text(c.province, 40),
    country: text(c.country, 40) || 'IT',
    notes: text(c.notes, 500) || undefined,
  };

  const missing = (['name', 'email', 'phone', 'address', 'zip', 'city', 'province'] as const).filter(
    (field) => customer[field].length === 0,
  );
  if (missing.length > 0) return json({ error: 'missing_fields', fields: missing }, 400);
  if (!EMAIL.test(customer.email)) return json({ error: 'invalid_email' }, 400);

  const netCents = lines.reduce((sum, line) => sum + line.lineNetCents, 0);
  const shippingCents = commerce.shippingCents;
  const vatCents = vatOf(netCents + shippingCents, commerce.vatRate);
  const order = await createOrder({
    lang,
    lines,
    customer,
    totals: {
      netCents,
      shippingCents,
      vatCents,
      grossCents: netCents + shippingCents + vatCents,
      vatRate: commerce.vatRate,
    },
  });

  // The confirmation email with the transfer details is sent from here in
  // production; wire your transactional mail provider at this point.

  return json({ ref: order.ref, url: href(lang, 'order', order.ref) }, 201);
};
