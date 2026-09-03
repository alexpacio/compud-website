/**
 * Company and banking details. Everything here is read from the environment so
 * the real IBAN never lands in the repository; the fallbacks are obvious
 * placeholders that must be replaced before going live.
 */
const env = (key: string, fallback: string): string => process.env[key]?.trim() || fallback;

export const company = {
  legalName: env('COMPUD_LEGAL_NAME', 'Compud S.r.l.'),
  vatNumber: env('COMPUD_VAT_NUMBER', '[P.IVA]'),
  rea: env('COMPUD_REA', '[REA]'),
  email: env('COMPUD_EMAIL', '[EMAIL]'),
  phone: env('COMPUD_PHONE', '[TELEFONO]'),
  street: env('COMPUD_STREET', '[INDIRIZZO]'),
  city: env('COMPUD_CITY', '[CITTÀ]'),
  zip: env('COMPUD_ZIP', '[CAP]'),
  country: env('COMPUD_COUNTRY', 'IT'),
};

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
  /** Domestic shipping is free; kept explicit so it can be priced later. */
  shippingCents: Number(env('COMPUD_SHIPPING_CENTS', '0')),
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
