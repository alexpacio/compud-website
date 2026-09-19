/**
 * Company and banking details. Every value can be overridden from the
 * environment. Banking details have no real fallback — the IBAN must never land
 * in the repository — and are only ever rendered by the server-side order pages,
 * which the static build does not publish.
 */
const env = (key: string, fallback: string): string => process.env[key]?.trim() || fallback;

/**
 * Compud is the brand; Netter S.r.l. is the legal entity that invoices. The
 * defaults are the real registered details, so a build with no environment set
 * (GitHub Pages, for one) still publishes correct company data. Fields left
 * blank are omitted from the markup rather than rendered as placeholders.
 */
export const company = {
  legalName: env('COMPUD_LEGAL_NAME', 'Netter S.r.l.'),
  vatNumber: env('COMPUD_VAT_NUMBER', 'IT03569900545'),
  rea: env('COMPUD_REA', ''),
  email: env('COMPUD_EMAIL', 'info@compud.it'),
  phone: env('COMPUD_PHONE', ''),
  street: env('COMPUD_STREET', 'Via Indipendenza'),
  city: env('COMPUD_CITY', 'Assisi'),
  zip: env('COMPUD_ZIP', '06081'),
  country: env('COMPUD_COUNTRY', 'IT'),
};

/**
 * Where order requests land. The address is never rendered as text: pages ship
 * `encodedContactEmail` instead and the human challenge decodes it in the
 * browser, so crawlers scraping the HTML find nothing to harvest.
 */
export const orderEmail = env('COMPUD_ORDER_EMAIL', company.email);

/** Reversed base64 of `orderEmail` — the only form allowed into the markup. */
export const encodedContactEmail = Buffer.from(orderEmail, 'utf8')
  .toString('base64')
  .split('')
  .reverse()
  .join('');

export const bank = {
  /** Beneficiary name exactly as the bank holds it. */
  holder: env('COMPUD_BANK_HOLDER', company.legalName),
  name: env('COMPUD_BANK_NAME', '[NOME BANCA]'),
  iban: env('COMPUD_IBAN', 'IT00A0000000000000000000000'),
  bic: env('COMPUD_BIC', '[BIC]'),
};

export const commerce = {
  /** Percent, applied on top of the net prices held in the catalogue. */
  vatRate: Number(env('COMPUD_VAT_RATE', '22')),
  /** How long a created order keeps its stock reservation. */
  holdHours: Number(env('COMPUD_HOLD_HOURS', '72')),
  currency: 'EUR' as const,
  /** Shipping cost in cents for server orders (palletized shipment). */
  shippingCents: Number(env('COMPUD_SHIPPING_CENTS', '5000')),
  /** Domestic mini PC/laptop shipping is free; servers ship on pallet. */
  shippingDescription: env('COMPUD_SHIPPING_DESC', 'Spedizione su pallet — €50,00 inclusa IVA'),
};

/**
 * Shared secret required by the reconciliation endpoint that flips an order to
 * paid. Set COMPUD_ADMIN_TOKEN in the environment; without it the endpoint is
 * disabled rather than open.
 */
export const adminToken = process.env.COMPUD_ADMIN_TOKEN?.trim() || '';

/** True when the placeholder banking details are still in place. */
export const bankDetailsArePlaceholders =
  bank.iban === 'IT00A0000000000000000000000' || bank.name === '[NOME BANCA]';
