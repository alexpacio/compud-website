import { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Radio, Tag } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import AntProvider from '../components/AntProvider';
import type { Lang } from '../i18n/ui';
import { addToCart } from '../lib/cart';
import { formatEur, withVat } from '../lib/money';
import {
  DEFAULT_RENTAL_MONTHS,
  isRentalMonths,
  monthlyRentalCents,
  rentalBuyoutCents,
  RENTAL_MARKUP_PERCENT,
  RENTAL_MONTHS,
  type RentalMonths,
} from '../lib/rental';
import '../styles/configurator.css';

export interface ConfigOption {
  id: string;
  label: string;
  addCents: number;
  spec: string;
}
export interface ConfigGroup {
  id: 'ram' | 'ssd' | 'os' | 'gpu' | 'psu' | 'bay';
  label: string;
  options: ConfigOption[];
  hidden?: boolean;
}
type Choice = {
  ram: string;
  ssd: string;
  os: string;
  gpu?: string;
  psu?: string;
  bay?: string;
};
interface Props {
  lang: Lang;
  slug: string;
  rentalAvailable: boolean;
  basePriceCents: number;
  vatRate: number;
  groups: ConfigGroup[];
  defaults: Choice;
  checkoutUrl: string;
  strings: {
    included: string;
    excl: string;
    incl: string;
    payLine: string;
    buyNow: string;
    addCart: string;
    added: string;
    shipLine: string;
    rentalOnly: string;
    rentalTerm: string;
    months: string;
    perMonth: string;
    rentalTotal: string;
    rentNow: string;
    markup: string;
    noMarkup: string;
    buyout: string;
    buyoutNote: string;
  };
}

/** Rates are advisory; the server recomputes them from the original configuration. */
export default function Configurator({
  lang,
  slug,
  rentalAvailable,
  basePriceCents,
  vatRate,
  groups,
  defaults,
  checkoutUrl,
  strings,
}: Props) {
  const [choice, setChoice] = useState<Choice>(defaults);
  const [rentalMonths, setRentalMonths] = useState<RentalMonths>(
    DEFAULT_RENTAL_MONTHS,
  );
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!rentalAvailable) return;
    const requested = Number(
      new URLSearchParams(window.location.search).get('months'),
    );
    if (isRentalMonths(requested)) setRentalMonths(requested);
  }, [rentalAvailable]);

  const configurationCents = useMemo(
    () =>
      groups.reduce((sum, group) => {
        return (
          sum +
          (group.options.find((option) => option.id === choice[group.id])
            ?.addCents ?? 0)
        );
      }, basePriceCents),
    [basePriceCents, groups, choice],
  );
  const netCents = rentalAvailable
    ? monthlyRentalCents(configurationCents, rentalMonths)
    : configurationCents;
  const grossCents = withVat(netCents, vatRate);
  const period = rentalAvailable ? strings.perMonth : '';
  const shown = groups.filter((group) => !group.hidden);
  const item = () => ({
    slug,
    ...choice,
    rentalMonths: rentalAvailable ? rentalMonths : undefined,
    quantity: 1,
  });
  const add = () => {
    addToCart(item());
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  };
  const requestOrder = () => {
    addToCart(item());
    window.location.href = checkoutUrl;
  };
  const money = (cents: number) => formatEur(cents, lang, { decimals: true });

  return (
    <AntProvider lang={lang}>
      <div className="cfg">
        {rentalAvailable && (
          <>
            <Alert type="success" showIcon title={strings.rentalOnly} />
            <fieldset className="cfg__group">
              <legend className="cfg__legend">{strings.rentalTerm}</legend>
              <Radio.Group
                className="cfg__options cfg__options--terms"
                name={`${slug}-term`}
                value={rentalMonths}
                aria-label={strings.rentalTerm}
                onChange={(event) => {
                  if (isRentalMonths(event.target.value)) {
                    setRentalMonths(event.target.value);
                    setAdded(false);
                  }
                }}
              >
                {RENTAL_MONTHS.map((months) => (
                  <Radio.Button
                    key={months}
                    value={months}
                    className="cfg__option"
                  >
                    <span className="cfg__optionLabel">
                      {months} {strings.months}
                    </span>
                    <span className="cfg__optionDelta">
                      {money(monthlyRentalCents(configurationCents, months))}
                      {strings.perMonth}
                    </span>
                    <span className="cfg__optionDelta">
                      {RENTAL_MARKUP_PERCENT[months] === 0
                        ? strings.noMarkup
                        : strings.markup.replace(
                            '{percent}',
                            String(RENTAL_MARKUP_PERCENT[months]),
                          )}
                    </span>
                  </Radio.Button>
                ))}
              </Radio.Group>
            </fieldset>
          </>
        )}
        {shown.map((group) => (
          <fieldset className="cfg__group" key={group.id}>
            <legend className="cfg__legend">{group.label}</legend>
            {group.options.length === 1 ? (
              <div className="cfg__locked">
                <span>{group.options[0].label}</span>
                <Tag>{strings.included}</Tag>
              </div>
            ) : (
              <Radio.Group
                className="cfg__options"
                name={`${slug}-${group.id}`}
                value={choice[group.id]}
                aria-label={group.label}
                onChange={(event) => {
                  setChoice((current) => ({
                    ...current,
                    [group.id]: event.target.value,
                  }));
                  setAdded(false);
                }}
              >
                {group.options.map((option) => {
                  const currentCents =
                    group.options.find((o) => o.id === choice[group.id])
                      ?.addCents ?? 0;
                  const deltaCents = rentalAvailable
                    ? monthlyRentalCents(
                        configurationCents - currentCents + option.addCents,
                        rentalMonths,
                      ) -
                      monthlyRentalCents(
                        configurationCents - currentCents,
                        rentalMonths,
                      )
                    : option.addCents;
                  const delta =
                    option.addCents === 0
                      ? strings.included
                      : `${deltaCents >= 0 ? '+' : '−'}${money(Math.abs(deltaCents))}${period}`;
                  return (
                    <Radio.Button
                      value={option.id}
                      className="cfg__option"
                      key={option.id}
                    >
                      <span className="cfg__optionLabel">{option.label}</span>
                      <span className="cfg__optionDelta">{delta}</span>
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            )}
          </fieldset>
        ))}
        <Card className="cfg__buy">
          <div className="cfg__prices">
            <div>
              <p className="cfg__priceLabel">{strings.excl}</p>
              <p className="cfg__priceValue">
                {money(netCents)}
                <small>{period}</small>
              </p>
            </div>
            <div className="cfg__gross">
              <p className="cfg__priceLabel">{strings.incl}</p>
              <p>
                {money(grossCents)}
                {period}
              </p>
            </div>
          </div>
          {rentalAvailable && (
            <>
              <p className="cfg__rentalTotal">
                {rentalMonths} {strings.months} · {strings.rentalTotal}:{' '}
                <strong>{money(netCents * rentalMonths)}</strong>
              </p>
              <div className="cfg__buyout">
                <p>
                  {strings.buyout}:{' '}
                  <strong>
                    {money(rentalBuyoutCents(configurationCents))}
                  </strong>
                </p>
                <p>{strings.buyoutNote}</p>
              </div>
            </>
          )}
          <p className="cfg__pay">{strings.payLine}</p>
          <div className="cfg__actions">
            <Button type="primary" size="large" onClick={requestOrder}>
              {rentalAvailable ? strings.rentNow : strings.buyNow}
            </Button>
            <Button size="large" icon={<ShoppingCartOutlined />} onClick={add}>
              {added ? strings.added : strings.addCart}
            </Button>
          </div>
          <p className="cfg__ship">{strings.shipLine}</p>
        </Card>
      </div>
    </AntProvider>
  );
}
