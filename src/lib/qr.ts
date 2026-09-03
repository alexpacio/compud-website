import QRCode from 'qrcode';
import { bank } from './config';
import { epcPayload, epcPayloadFits } from './epc';

/**
 * Renders the EPC credit-transfer QR for an order as a data URL, or null when
 * it cannot be produced (placeholder IBAN, oversized payload). The page hides
 * the QR block rather than showing a code that would not pay anyone.
 */
export async function orderQrDataUrl(input: {
  reference: string;
  amountCents: number;
}): Promise<string | null> {
  if (!/^[A-Z]{2}[0-9A-Z]{13,32}$/.test(bank.iban.replace(/\s+/g, '').toUpperCase())) return null;
  if (bank.iban.startsWith('IT00A0000')) return null; // the shipped placeholder

  const payload = epcPayload({
    beneficiary: bank.holder,
    iban: bank.iban,
    bic: bank.bic,
    amountCents: input.amountCents,
    reference: input.reference,
  });
  if (!epcPayloadFits(payload)) return null;

  try {
    return await QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 296,
      color: { dark: '#0d0f11', light: '#ffffff' },
    });
  } catch {
    return null;
  }
}
