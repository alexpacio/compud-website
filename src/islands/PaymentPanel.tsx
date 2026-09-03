import { useCallback, useEffect, useRef, useState } from 'react';
import type { OrderStatus } from '../lib/orders';

interface Props {
  reference: string;
  initialStatus: OrderStatus;
  beneficiary: string;
  bankName: string;
  iban: string;
  bic: string;
  amount: string;
  /** Bare decimal string copied into the banking app, e.g. "1828.78". */
  amountRaw: string;
  expiresAt: string;
  qrDataUrl: string | null;
  strings: Record<string, string>;
}

/** IBANs are read and typed in groups of four, so show them that way. */
const groupIban = (value: string): string =>
  value.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();

const POLL_MS = 5000;
const STOP_AFTER_MS = 30 * 60 * 1000;

/**
 * The transfer instructions. Everything the customer has to retype is one tap
 * away, and the panel watches for the credit so a paid order stops looking
 * unpaid without a manual reload.
 */
export default function PaymentPanel({
  reference,
  initialStatus,
  beneficiary,
  bankName,
  iban,
  bic,
  amount,
  amountRaw,
  expiresAt,
  qrDataUrl,
  strings,
}: Props) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [copied, setCopied] = useState('');
  const startedAt = useRef(Date.now());

  useEffect(() => {
    if (status !== 'pending') return;
    let cancelled = false;

    const tick = async () => {
      if (cancelled || Date.now() - startedAt.current > STOP_AFTER_MS) return;
      try {
        const response = await fetch(`/api/orders/${reference}`, { headers: { accept: 'application/json' } });
        if (response.ok) {
          const payload = (await response.json()) as { status?: OrderStatus };
          if (!cancelled && payload.status && payload.status !== 'pending') setStatus(payload.status);
        }
      } catch {
        // Offline or a blip: the next tick tries again.
      }
    };

    const id = window.setInterval(tick, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [reference, status]);

  const copy = useCallback(async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      window.setTimeout(() => setCopied((current) => (current === id ? '' : current)), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied): the value stays
      // selectable on screen, which is the fallback that always works.
    }
  }, []);

  const paid = status === 'paid';
  const expired = status === 'expired' || status === 'cancelled';

  const statusLabel = paid
    ? strings.statusPaid
    : expired
      ? status === 'expired'
        ? strings.statusExpired
        : strings.statusCancelled
      : strings.statusPending;

  const statusMeta = paid ? strings.metaPaid : strings.metaPending;

  const copyButton = (id: string, value: string) => (
    <button type="button" className="pp__copy" onClick={() => void copy(id, value)}>
      <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      </svg>
      {copied === id ? strings.copied : strings.copy}
    </button>
  );

  return (
    <div className={paid ? 'pp is-paid' : expired ? 'pp is-expired' : 'pp'}>
      <div className="pp__head">
        <span className="pp__status">
          <span className="pp__dot" aria-hidden="true" />
          {statusLabel}
        </span>
        <span className="mono pp__meta">{statusMeta}</span>
      </div>

      <div className="pp__body">
        <div className="pp__pair">
          <div className="field">
            <span className="field__label">{strings.beneficiary}</span>
            <span className="pp__plain">{beneficiary}</span>
          </div>
          <div className="field">
            <span className="field__label">{strings.bank}</span>
            <span className="pp__plain">{bankName}</span>
          </div>
        </div>

        <div className="field">
          <div className="pp__fieldHead">
            <span className="field__label">{strings.iban}</span>
            {copyButton('iban', iban.replace(/\s+/g, ''))}
          </div>
          <span className="field__value">{groupIban(iban)}</span>
        </div>

        <div className="pp__pair">
          <div className="field field--accent">
            <div className="pp__fieldHead">
              <span className="field__label">{strings.reference}</span>
              {copyButton('ref', reference)}
            </div>
            <span className="field__value">{reference}</span>
          </div>
          <div className="field">
            <div className="pp__fieldHead">
              <span className="field__label">{strings.amount}</span>
              {copyButton('amount', amountRaw)}
            </div>
            <span className="field__value">{amount}</span>
          </div>
        </div>

        {bic && !bic.startsWith('[') && (
          <div className="field">
            <span className="field__label">{strings.bic}</span>
            <span className="field__value">{bic}</span>
          </div>
        )}

        <p className="pp__warning">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#e0a33c" strokeWidth="1.4" aria-hidden="true">
            <circle cx="10" cy="10" r="7.5" />
            <path d="M10 6.2v4.4M10 13.4v.6" strokeLinecap="round" />
          </svg>
          {strings.refWarning}
        </p>

        {qrDataUrl && !paid && (
          <div className="pp__qr">
            <img src={qrDataUrl} width={148} height={148} alt={strings.qrTitle} />
            <div className="pp__qrText">
              <span className="pp__qrTitle">{strings.qrTitle}</span>
              <span className="pp__qrNote">{strings.qrNote}</span>
            </div>
          </div>
        )}

        {paid ? (
          <div className="pp__paid" role="status">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="8" fill="#3ed28a" />
              <path d="M6.2 10.2l2.6 2.6 5-5.2" stroke="#06120c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              <strong className="pp__paidTitle">{strings.paidTitle}</strong>
              <span className="pp__paidBody">{strings.paidBody}</span>
            </span>
          </div>
        ) : expired ? null : (
          <p className="pp__watching" aria-live="polite">
            {strings.watching}
          </p>
        )}
      </div>

      <style>{`
        .pp { border: 1px solid var(--warn-line); background: var(--surface); border-radius: var(--r-card); overflow: hidden; }
        .pp.is-paid { border-color: var(--accent-line); }
        .pp.is-expired { border-color: var(--line-strong); }
        .pp__head {
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 16px 22px; background: #1a1509; border-bottom: 1px solid var(--warn-line);
        }
        .pp.is-paid .pp__head { background: var(--accent-bg); border-bottom-color: var(--accent-line); }
        .pp.is-expired .pp__head { background: var(--surface-2); border-bottom-color: var(--line-strong); }
        .pp__status {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--warn);
        }
        .pp.is-paid .pp__status { color: var(--accent); }
        .pp.is-expired .pp__status { color: var(--muted); }
        .pp__dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
        .pp__meta { font-size: 11px; color: var(--muted-2); text-align: right; }
        .pp__body { padding: 26px 22px; display: flex; flex-direction: column; gap: 20px; }
        .pp__pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        .pp__fieldHead { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .pp__plain { font-size: 15px; }
        .pp__copy {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: var(--font-mono); font-size: 11px; color: var(--accent);
          padding: 4px 2px;
        }
        .pp__copy:hover { color: var(--accent-hover); }
        .pp__warning {
          display: flex; gap: 12px; align-items: flex-start;
          border-top: 1px solid var(--line-faint); padding-top: 18px;
          font-size: 13px; line-height: 1.6; color: var(--text-2);
        }
        .pp__warning svg { flex: none; margin-top: 1px; }
        .pp__qr {
          display: flex; align-items: center; gap: 18px;
          border: 1px solid var(--line); border-radius: var(--r-panel);
          background: var(--surface-2); padding: 16px;
        }
        .pp__qr img { background: #fff; border-radius: 4px; padding: 6px; flex: none; }
        .pp__qrText { display: flex; flex-direction: column; gap: 5px; }
        .pp__qrTitle { font-family: var(--font-display); font-size: 16px; font-weight: 500; }
        .pp__qrNote { font-size: 13px; line-height: 1.55; color: var(--muted); }
        .pp__paid {
          display: flex; align-items: flex-start; gap: 12px;
          background: var(--accent-bg); border: 1px solid var(--accent-line);
          border-radius: var(--r-field); padding: 16px 18px;
        }
        .pp__paid svg { flex: none; }
        .pp__paidTitle { display: block; font-size: 15px; font-weight: 600; color: var(--accent); }
        .pp__paidBody { display: block; font-size: 13px; color: #a8b0b7; margin-top: 3px; }
        .pp__watching { font-size: 12px; color: var(--muted-2); }
        @media (max-width: 620px) {
          .pp__pair { grid-template-columns: minmax(0, 1fr); }
          .pp__qr { flex-direction: column; align-items: flex-start; }
          .field__value { font-size: 17px; }
        }
      `}</style>
    </div>
  );
}
