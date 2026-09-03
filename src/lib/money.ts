import type { Lang } from '../i18n/ui';

const locales: Record<Lang, string> = { it: 'it-IT', en: 'en-IE' };

/** Prices are integer cents everywhere; only the view layer formats them. */
export function formatEur(cents: number, lang: Lang, opts: { decimals?: boolean } = {}): string {
  const decimals = opts.decimals ?? cents % 100 !== 0;
  return new Intl.NumberFormat(locales[lang], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals ? 2 : 0,
    maximumFractionDigits: decimals ? 2 : 0,
    // Italian CLDR omits the separator on four-digit numbers; Italian price
    // tags do not, so grouping is forced rather than left to the locale.
    useGrouping: true,
  }).format(cents / 100);
}

/** Plain "1234.56" used by the EPC QR payload, which wants a bare amount. */
export function toDecimalString(cents: number): string {
  return (cents / 100).toFixed(2);
}

export function withVat(netCents: number, vatRate: number): number {
  return Math.round(netCents * (1 + vatRate / 100));
}

export function vatOf(netCents: number, vatRate: number): number {
  return withVat(netCents, vatRate) - netCents;
}

export function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(locales[lang], {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}
