import { toDecimalString } from './money';

/**
 * EPC069-12 ("Quick Response Code: Guidelines to Enable the Data Capture for
 * the Initiation of a SEPA Credit Transfer") version 002 payload. European
 * banking apps scan this and pre-fill IBAN, amount and remittance information,
 * which is what makes paying by transfer a two-tap operation on a phone.
 */
export function epcPayload(input: {
  beneficiary: string;
  iban: string;
  bic?: string;
  amountCents: number;
  reference: string;
}): string {
  const bic = input.bic && /^[A-Z0-9]{8}([A-Z0-9]{3})?$/i.test(input.bic) ? input.bic.toUpperCase() : '';
  const lines = [
    'BCD',
    '002',
    '1',
    'SCT',
    bic,
    input.beneficiary.slice(0, 70),
    input.iban.replace(/\s+/g, '').toUpperCase(),
    `EUR${toDecimalString(input.amountCents)}`,
    '',
    '',
    input.reference.slice(0, 140),
    '',
  ];
  // Trailing empty fields are optional; dropping them keeps the QR smaller.
  while (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
  return lines.join('\n');
}

/** The specification caps the payload at 331 bytes. */
export const epcPayloadFits = (payload: string): boolean =>
  Buffer.byteLength(payload, 'utf8') <= 331;
