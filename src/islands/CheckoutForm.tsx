import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Input, Select } from 'antd';
import AntProvider from '../components/AntProvider';
import type { Lang } from '../i18n/ui';
import {
  lineKey,
  readCart,
  removeLine,
  setQuantity,
  setRentalMonths,
  subscribe,
  type CartItem,
} from '../lib/cart';
import { formatEur, vatOf, withVat } from '../lib/money';
import {
  isRentalMonths,
  monthlyRentalCents,
  rentalBuyoutCents,
  RENTAL_MARKUP_PERCENT,
  RENTAL_MONTHS,
} from '../lib/rental';

interface OptionView {
  label: string;
  addCents: number;
}

export interface CatalogueEntry {
  name: string;
  url: string;
  basePriceCents: number;
  rentalAvailable: boolean;
  options: Record<'ram' | 'ssd' | 'os', Record<string, OptionView>> &
    Partial<Record<'gpu' | 'psu' | 'bay', Record<string, OptionView>>>;
}

interface Props {
  lang: Lang;
  vatRate: number;
  shippingCents: number;
  catalogue: Record<string, CatalogueEntry>;
  browseUrl: string;
  strings: Record<string, string>;
}

type Fields = {
  name: string;
  company: string;
  vatNumber: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  province: string;
  country: string;
  notes: string;
};

const EMPTY: Fields = {
  name: '',
  company: '',
  vatNumber: '',
  email: '',
  phone: '',
  address: '',
  zip: '',
  city: '',
  province: '',
  country: 'IT',
  notes: '',
};

const REQUIRED: (keyof Fields)[] = [
  'name',
  'email',
  'phone',
  'address',
  'zip',
  'city',
  'province',
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function CheckoutForm({
  lang,
  vatRate,
  shippingCents,
  catalogue,
  browseUrl,
  strings,
}: Props) {
  const [items, setItems] = useState<CartItem[] | null>(null);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<
    Partial<Record<keyof Fields, boolean>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [failure, setFailure] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [mailtoHref, setMailtoHref] = useState('');

  useEffect(() => {
    setItems(readCart());
    return subscribe(setItems);
  }, []);

  /** Cart lines the catalogue still knows about, priced from the catalogue. */
  const lines = useMemo(() => {
    return (items ?? []).flatMap((item) => {
      const product = catalogue[item.slug];
      if (!product) return [];
      if (product.rentalAvailable && !isRentalMonths(item.rentalMonths))
        return [];
      if (!product.rentalAvailable && item.rentalMonths !== undefined)
        return [];
      const groupIds = (
        ['ram', 'ssd', 'bay', 'gpu', 'psu', 'os'] as const
      ).filter((group) => product.options[group] !== undefined);
      const parts = groupIds.map((group) => {
        const id = item[group] ?? '';
        // Saved rack-server carts used the old default OS profile. Resolve it
        // to the server's sole supported OS without changing the stored line key.
        return (
          product.options[group]?.[id] ??
          (group === 'os' && !product.rentalAvailable && id === 'compud'
            ? product.options.os.proxmox
            : undefined)
        );
      });
      if (parts.some((part) => part === undefined)) return [];
      const configurationCents = parts.reduce(
        (sum, part) => sum + part!.addCents,
        product.basePriceCents,
      );
      const unitNetCents = product.rentalAvailable
        ? monthlyRentalCents(configurationCents, item.rentalMonths!)
        : configurationCents;
      return [
        {
          key: lineKey(item),
          item,
          product,
          configuration: parts.map((part) => part!.label).join(' · '),
          unitNetCents,
          lineNetCents: unitNetCents * item.quantity,
          buyoutNetCents: product.rentalAvailable
            ? rentalBuyoutCents(configurationCents) * item.quantity
            : undefined,
        },
      ];
    });
  }, [items, catalogue]);

  const netCents = lines.reduce((sum, line) => sum + line.lineNetCents, 0);
  const hasRentals = lines.some((line) => line.product.rentalAvailable);
  const monthlyNetCents = lines.reduce(
    (sum, line) => sum + (line.product.rentalAvailable ? line.lineNetCents : 0),
    0,
  );
  const monthlyGrossCents = withVat(monthlyNetCents, vatRate);
  const subtotalLabel = hasRentals ? strings.initialSubtotal : strings.subtotal;
  const totalLabel = hasRentals ? strings.firstPayment : strings.total;
  const shippingLabel = hasRentals ? strings.oneOffShipping : strings.shipping;
  const vatCents = vatOf(netCents + shippingCents, vatRate);
  const grossCents = netCents + shippingCents + vatCents;

  const errorFor = (field: keyof Fields): string => {
    const value = fields[field].trim();
    if (REQUIRED.includes(field) && value.length === 0) return strings.required;
    if (field === 'email' && value.length > 0 && !EMAIL.test(value))
      return strings.invalidEmail;
    return '';
  };

  const invalid =
    REQUIRED.some((field) => errorFor(field).length > 0) ||
    errorFor('email').length > 0;

  const update =
    (field: keyof Fields) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFields((current) => ({ ...current, [field]: value }));
    };

  /** The order request as it reaches info@ — plain text, one line per field. */
  const composeBody = (): string => {
    const money = (cents: number) => formatEur(cents, lang, { decimals: true });
    const itemLines = lines.map(
      (line) =>
        `- ${line.product.name} x${line.item.quantity}\n  ${line.configuration}\n  ${
          line.product.rentalAvailable
            ? `${strings.rentalTerm}: ${line.item.rentalMonths} ${strings.months} (+${RENTAL_MARKUP_PERCENT[line.item.rentalMonths!]}%)\n  ${money(line.lineNetCents)}${strings.perMonth} ${strings.mailNet}\n  ${strings.rentalTotal}: ${money(line.lineNetCents * line.item.rentalMonths!)}\n  ${strings.buyout}: ${money(line.buyoutNetCents!)}\n  ${strings.buyoutNote}`
            : `${strings.purchase}: ${money(line.lineNetCents)} ${strings.mailNet}`
        }`,
    );
    const customer = [
      `${strings.fName}: ${fields.name}`,
      fields.company && `${strings.fCompany}: ${fields.company}`,
      fields.vatNumber && `${strings.fVat}: ${fields.vatNumber}`,
      `${strings.fEmail}: ${fields.email}`,
      `${strings.fPhone}: ${fields.phone}`,
      `${strings.fAddress}: ${fields.address}`,
      `${strings.fZip}: ${fields.zip}`,
      `${strings.fCity}: ${fields.city} (${fields.province})`,
      `${strings.fCountry}: ${fields.country}`,
      fields.notes && `${strings.fNotes}: ${fields.notes}`,
    ].filter(Boolean) as string[];

    return [
      strings.mailIntro,
      '',
      strings.mailItems,
      ...itemLines,
      '',
      ...(hasRentals
        ? [
            `${strings.monthlyTotal}: ${money(monthlyGrossCents)}${strings.perMonth}`,
          ]
        : []),
      `${subtotalLabel}: ${money(netCents)}`,
      `${shippingLabel}: ${shippingCents === 0 ? strings.free : money(shippingCents)}`,
      `${strings.vat}: ${money(vatCents)}`,
      `${totalLabel}: ${money(grossCents)}`,
      ...(hasRentals ? [strings.rentalPaymentNote] : []),
      '',
      strings.mailCustomer,
      ...customer,
      '',
      strings.mailOutro,
    ].join('\n');
  };

  /**
   * The order leaves as an email: no address is in the page until the
   * anti-spam challenge in the layout hands one over, so submitting waits on
   * that before opening the customer's mail client.
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(
      Object.fromEntries(REQUIRED.map((f) => [f, true])) as Partial<
        Record<keyof Fields, boolean>
      >,
    );
    if (invalid || lines.length === 0 || submitting) return;

    setSubmitting(true);
    setFailure('');
    try {
      const request = (
        window as unknown as { compudRequestEmail?: () => Promise<string> }
      ).compudRequestEmail;
      const address = request ? await request() : '';
      if (!address) throw new Error('email locked');

      const href = `mailto:${address}?subject=${encodeURIComponent(strings.mailSubject)}&body=${encodeURIComponent(composeBody())}`;
      setMailtoHref(href);
      setSentTo(address);
      setSubmitting(false);
      window.location.href = href;
    } catch {
      setFailure(strings.error);
      setSubmitting(false);
    }
  };

  // Nothing is known about the cart until localStorage has been read.
  if (items === null) {
    return <div className="co__loading" aria-hidden="true" />;
  }

  if (sentTo) {
    return (
      <div className="co__sent">
        <h1 className="h2">{strings.sentTitle}</h1>
        <p className="lead">{strings.sentBody}</p>
        <p className="mono co__sentAddress">{sentTo}</p>
        <a className="btn btn--primary" href={mailtoHref}>
          {strings.sentReopen}
        </a>
        <style>{`
          .co__sent { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; padding: 40px 0 80px; max-width: 620px; }
          .co__sentAddress { color: var(--accent); }
        `}</style>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="co__empty">
        <p className="lead">{strings.empty}</p>
        <a className="btn btn--primary" href={browseUrl}>
          {strings.emptyCta}
        </a>
        <style>{`
          .co__empty { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; padding: 40px 0 80px; }
        `}</style>
      </div>
    );
  }

  const field = (
    name: keyof Fields,
    label: string,
    options: {
      type?: string;
      autoComplete?: string;
      span?: number;
      textarea?: boolean;
    } = {},
  ) => {
    const message = touched[name] ? errorFor(name) : '';
    return (
      <label
        className="co__field"
        style={{ gridColumn: `span ${options.span ?? 6}` }}
        key={name}
      >
        <span className="co__label">{label}</span>
        {options.textarea ? (
          <Input.TextArea
            className="co__input"
            rows={3}
            value={fields[name]}
            onChange={update(name)}
            onBlur={() => setTouched((t) => ({ ...t, [name]: true }))}
            status={message ? 'error' : undefined}
          />
        ) : (
          <Input
            className="co__input"
            type={options.type ?? 'text'}
            autoComplete={options.autoComplete}
            value={fields[name]}
            onChange={update(name)}
            onBlur={() => setTouched((t) => ({ ...t, [name]: true }))}
            aria-invalid={message.length > 0}
            status={message ? 'error' : undefined}
            required={REQUIRED.includes(name)}
          />
        )}
        {message && <span className="co__error">{message}</span>}
      </label>
    );
  };

  return (
    <AntProvider lang={lang}>
      <form className="co" onSubmit={submit} noValidate>
        <div className="co__main">
          <div className="co__intro">
            <h1 className="h2">{strings.title}</h1>
            <p className="lead">{strings.intro}</p>
          </div>

          <div className="co__fields">
            {field('name', strings.fName, { autoComplete: 'name' })}
            {field('company', strings.fCompany, {
              autoComplete: 'organization',
            })}
            {field('email', strings.fEmail, {
              type: 'email',
              autoComplete: 'email',
            })}
            {field('phone', strings.fPhone, {
              type: 'tel',
              autoComplete: 'tel',
            })}
            {field('vatNumber', strings.fVat)}
            {field('country', strings.fCountry, {
              autoComplete: 'country-name',
            })}
            {field('address', strings.fAddress, {
              autoComplete: 'street-address',
              span: 12,
            })}
            {field('zip', strings.fZip, {
              autoComplete: 'postal-code',
              span: 3,
            })}
            {field('city', strings.fCity, {
              autoComplete: 'address-level2',
              span: 6,
            })}
            {field('province', strings.fProvince, {
              autoComplete: 'address-level1',
              span: 3,
            })}
            {field('notes', strings.fNotes, { textarea: true, span: 12 })}
          </div>

          <p className="co__privacy">{strings.privacy}</p>
        </div>

        <aside className="co__aside">
          <Card className="co__summary">
            <h2 className="co__summaryTitle">{strings.summary}</h2>

            <ul className="co__lines">
              {lines.map((line) => (
                <li className="co__line" key={line.key}>
                  <div className="co__lineBody">
                    <a className="co__lineName" href={line.product.url}>
                      {line.product.name}
                    </a>
                    <span className="mono co__lineConfig">
                      {line.configuration}
                    </span>
                    {line.product.rentalAvailable ? (
                      <>
                        <span className="mono co__lineConfig">
                          {strings.rentalTotal}:{' '}
                          {formatEur(
                            line.lineNetCents * line.item.rentalMonths!,
                            lang,
                            { decimals: true },
                          )}
                        </span>
                        <span className="mono co__lineConfig">
                          {strings.buyout}:{' '}
                          {formatEur(line.buyoutNetCents!, lang, {
                            decimals: true,
                          })}
                        </span>
                      </>
                    ) : (
                      <span className="mono co__lineConfig">
                        {strings.purchase}
                      </span>
                    )}
                    <div className="co__qty">
                      {line.product.rentalAvailable && (
                        <label className="co__qtyLabel">
                          {strings.rentalTerm}
                          <Select
                            className="co__select"
                            value={line.item.rentalMonths}
                            aria-label={strings.rentalTerm}
                            onChange={(months) => {
                              if (isRentalMonths(months))
                                setRentalMonths(line.key, months);
                            }}
                            options={RENTAL_MONTHS.map((months) => ({
                              value: months,
                              label: `${months} ${strings.months} (+${RENTAL_MARKUP_PERCENT[months]}%)`,
                            }))}
                          />
                        </label>
                      )}
                      <label className="co__qtyLabel">
                        {strings.qty}
                        <Select
                          className="co__select"
                          value={line.item.quantity}
                          aria-label={strings.qty}
                          onChange={(quantity) =>
                            setQuantity(line.key, quantity)
                          }
                          options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                            (value) => ({ value, label: String(value) }),
                          )}
                        />
                      </label>
                      <Button
                        type="text"
                        danger
                        size="small"
                        className="co__remove"
                        onClick={() => removeLine(line.key)}
                      >
                        {strings.remove}
                      </Button>
                    </div>
                  </div>
                  <span className="mono co__linePrice">
                    {formatEur(line.lineNetCents, lang, { decimals: true })}
                    {line.product.rentalAvailable ? strings.perMonth : ''}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="co__totals">
              {hasRentals && (
                <div className="co__total">
                  <dt>{strings.monthlyTotal}</dt>
                  <dd className="mono">
                    {formatEur(monthlyGrossCents, lang, { decimals: true })}
                    {strings.perMonth}
                  </dd>
                </div>
              )}
              <div className="co__total">
                <dt>{subtotalLabel}</dt>
                <dd className="mono">
                  {formatEur(netCents, lang, { decimals: true })}
                </dd>
              </div>
              <div className="co__total">
                <dt>{shippingLabel}</dt>
                <dd className="mono co__free">
                  {shippingCents === 0
                    ? strings.free
                    : formatEur(shippingCents, lang)}
                </dd>
              </div>
              <div className="co__total">
                <dt>{strings.payFee}</dt>
                <dd className="mono co__free">
                  {formatEur(0, lang, { decimals: true })}
                </dd>
              </div>
              <div className="co__total">
                <dt>{strings.vat}</dt>
                <dd className="mono">
                  {formatEur(vatCents, lang, { decimals: true })}
                </dd>
              </div>
            </dl>

            <div className="co__grand">
              <span className="co__grandLabel">{totalLabel}</span>
              <span className="co__grandValue">
                {formatEur(grossCents, lang, { decimals: true })}
              </span>
            </div>
            {hasRentals && (
              <p className="co__privacy">
                {strings.rentalPaymentNote} {strings.buyoutNote}
              </p>
            )}

            {failure && (
              <p className="co__failure" role="alert">
                {failure}
              </p>
            )}

            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              loading={submitting}
            >
              {submitting ? strings.submitting : strings.submit}
            </Button>
          </Card>
        </aside>

        <style>{`
        .co { display: grid; grid-template-columns: 1.35fr 1fr; gap: 48px; align-items: start; }
        .co__loading { min-height: 320px; }
        .co__main { display: flex; flex-direction: column; gap: 26px; }
        .co__intro { display: flex; flex-direction: column; gap: 10px; }
        .co__intro .lead { max-width: 560px; }
        .co__fields { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 14px; }
        .co__field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
        .co__label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted-2); }
        .co__input { min-height: 44px; width: 100%; }
        .co__error { font-size: 12px; color: var(--danger); }
        .co__privacy { font-size: 12px; line-height: 1.6; color: var(--muted-2); max-width: 560px; }
        .co__summary { position: sticky; top: 96px; }
        .co__summary .ant-card-body { padding: 24px; display: flex; flex-direction: column; gap: 18px; }
        .co__summaryTitle { font-family: var(--font-display); font-size: 18px; font-weight: 500; margin: 0; }
        .co__lines { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 16px; }
        .co__line { display: flex; gap: 14px; justify-content: space-between; border-bottom: 1px solid var(--line-faint); padding-bottom: 16px; }
        .co__lineBody { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
        .co__lineName { font-size: 14px; font-weight: 500; }
        .co__lineConfig { font-size: 11px; color: var(--muted); }
        .co__qty { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 4px; }
        .co__qtyLabel { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: var(--muted-2); font-family: var(--font-mono); }
        .co__select { min-width: 70px; }
        .co__remove { font-size: 11px; color: var(--muted-2); text-decoration: underline; padding: 4px 0; }
        .co__remove:hover { color: var(--danger); }
        .co__linePrice { font-size: 14px; white-space: nowrap; }
        .co__totals { margin: 0; display: flex; flex-direction: column; gap: 9px; }
        .co__total { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; color: var(--muted); }
        .co__total dd { margin: 0; color: var(--text-2); }
        .co__free { color: var(--accent); }
        .co__grand { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; border-top: 1px solid var(--line-strong); padding-top: 16px; }
        .co__grandLabel { font-family: var(--font-display); font-size: 17px; font-weight: 500; }
        .co__grandValue { font-family: var(--font-mono); font-size: 26px; font-weight: 500; }
        .co__failure { font-size: 13px; color: var(--danger); }
        @media (max-width: 1000px) {
          .co { grid-template-columns: minmax(0, 1fr); gap: 32px; }
          .co__summary { position: static; }
        }
        @media (max-width: 600px) {
          .co__fields { grid-template-columns: repeat(6, minmax(0, 1fr)); }
          .co__field { grid-column: span 6 !important; }
        }
      `}</style>
      </form>
    </AntProvider>
  );
}
