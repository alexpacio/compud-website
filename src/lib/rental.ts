/** All products except rack servers are available exclusively on these rental terms. */
export const RENTAL_MONTHS = [12, 24, 36] as const;
export type RentalMonths = (typeof RENTAL_MONTHS)[number];
export const DEFAULT_RENTAL_MONTHS: RentalMonths = 36;
export const RENTAL_MARKUP_PERCENT: Record<RentalMonths, number> = { 12: 30, 24: 15, 36: 0 };
export const BUYOUT_PERCENT = 30;

export const isRentalProduct = (product: { section?: string }): boolean => product.section !== 'server';

export function isRentalMonths(value: unknown): value is RentalMonths {
  return typeof value === 'number' && RENTAL_MONTHS.some((months) => months === value);
}

/** Original catalogue value plus the term's markup, divided and rounded once to cents. */
export function monthlyRentalCents(valueCents: number, months: RentalMonths): number {
  if (!isRentalMonths(months)) throw new RangeError('Invalid rental term');
  return Math.round(valueCents * (100 + RENTAL_MARKUP_PERCENT[months]) / (100 * months));
}

/** Optional end-of-term buyout: 30% of the original configured value, excluding VAT. */
export function rentalBuyoutCents(valueCents: number): number {
  return Math.round(valueCents * BUYOUT_PERCENT / 100);
}
