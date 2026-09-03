import { useMemo, useState } from 'react';
import type { Lang } from '../i18n/ui';
import { addToCart } from '../lib/cart';
import { formatEur, withVat } from '../lib/money';

export interface ConfigOption {
  id: string;
  label: string;
  addCents: number;
  spec: string;
}

export interface ConfigGroup {
  id: 'ram' | 'ssd' | 'os';
  label: string;
  options: ConfigOption[];
}

interface Props {
  lang: Lang;
  slug: string;
  basePriceCents: number;
  vatRate: number;
  groups: ConfigGroup[];
  defaults: { ram: string; ssd: string; os: string };
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
  };
}

type Choice = { ram: string; ssd: string; os: string };

/**
 * Price and configuration for one machine. The price shown here is advisory:
 * the order endpoint recomputes it from the catalogue before anything is owed.
 */
export default function Configurator({
  lang,
  slug,
  basePriceCents,
  vatRate,
  groups,
  defaults,
  checkoutUrl,
  strings,
}: Props) {
  const [choice, setChoice] = useState<Choice>(defaults);
  const [added, setAdded] = useState(false);

  const netCents = useMemo(() => {
    return groups.reduce((sum, group) => {
      const option = group.options.find((o) => o.id === choice[group.id]);
      return sum + (option?.addCents ?? 0);
    }, basePriceCents);
  }, [basePriceCents, groups, choice]);

  const grossCents = withVat(netCents, vatRate);

  const select = (group: ConfigGroup['id'], id: string) => {
    setChoice((current) => ({ ...current, [group]: id }));
    setAdded(false);
  };

  const add = () => {
    addToCart({ slug, ...choice, quantity: 1 });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  };

  const buy = () => {
    addToCart({ slug, ...choice, quantity: 1 });
    window.location.href = checkoutUrl;
  };

  return (
    <div className="cfg">
      {groups.map((group) => (
        <fieldset className="cfg__group" key={group.id}>
          <legend className="kicker cfg__legend">{group.label}</legend>
          <div className="cfg__options" role="radiogroup" aria-label={group.label}>
            {group.options.map((option) => {
              const selected = choice[group.id] === option.id;
              return (
                <button
                  type="button"
                  key={option.id}
                  role="radio"
                  aria-checked={selected}
                  className={selected ? 'cfg__option is-selected' : 'cfg__option'}
                  onClick={() => select(group.id, option.id)}
                >
                  <span className="cfg__optionLabel">{option.label}</span>
                  <span className="cfg__optionDelta">
                    {option.addCents === 0
                      ? strings.included
                      : `${option.addCents > 0 ? '+' : '−'}${formatEur(Math.abs(option.addCents), lang)}`}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="cfg__buy">
        <div className="cfg__prices">
          <div className="cfg__price">
            <span className="cfg__priceLabel">{strings.excl}</span>
            <span className="cfg__priceValue">{formatEur(netCents, lang)}</span>
          </div>
          <div className="cfg__price cfg__price--secondary">
            <span className="cfg__priceLabel">{strings.incl}</span>
            <span className="cfg__priceGross">{formatEur(grossCents, lang, { decimals: true })}</span>
          </div>
        </div>

        <p className="cfg__pay">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#3ed28a" strokeWidth="1.4" aria-hidden="true">
            <path d="M3 7.5l7-4 7 4M4.5 8.5v6M8.2 8.5v6M11.8 8.5v6M15.5 8.5v6M2.5 16.5h15" strokeLinecap="round" />
          </svg>
          {strings.payLine}
        </p>

        <div className="cfg__actions">
          <button type="button" className="btn btn--primary cfg__primary" onClick={buy}>
            {strings.buyNow}
          </button>
          <button type="button" className="btn btn--ghost" onClick={add}>
            {added ? strings.added : strings.addCart}
          </button>
        </div>

        <p className="mono cfg__ship">{strings.shipLine}</p>
      </div>

      <style>{`
        .cfg { display: flex; flex-direction: column; gap: 22px; }
        .cfg__group { border: 0; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .cfg__legend { padding: 0; }
        .cfg__options { display: flex; gap: 10px; }
        .cfg__option {
          flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 4px;
          align-items: flex-start; text-align: left;
          border: 1px solid var(--line-strong); background: var(--surface);
          border-radius: var(--r-field); padding: 13px 14px; min-height: 62px;
          transition: border-color 120ms ease, background-color 120ms ease;
        }
        .cfg__option:hover { border-color: var(--faint); }
        .cfg__option.is-selected { border-color: var(--accent); background: var(--accent-bg); }
        .cfg__optionLabel { font-family: var(--font-mono); font-size: 14px; color: var(--text-2); }
        .cfg__option.is-selected .cfg__optionLabel { color: var(--accent); }
        .cfg__optionDelta { font-family: var(--font-mono); font-size: 11px; color: var(--muted-2); }
        .cfg__buy {
          border: 1px solid var(--line); background: var(--surface);
          border-radius: var(--r-card); padding: 22px;
          display: flex; flex-direction: column; gap: 16px;
        }
        .cfg__prices { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
        .cfg__price { display: flex; flex-direction: column; gap: 3px; }
        .cfg__price--secondary { align-items: flex-end; }
        .cfg__priceLabel { font-size: 12px; color: var(--muted-2); }
        .cfg__priceValue { font-family: var(--font-mono); font-size: 36px; font-weight: 500; line-height: 1; }
        .cfg__priceGross { font-family: var(--font-mono); font-size: 16px; color: var(--muted); }
        .cfg__pay {
          display: flex; align-items: center; gap: 10px;
          border-top: 1px solid var(--line-faint); padding-top: 14px;
          font-size: 13px; color: var(--text-2);
        }
        .cfg__actions { display: flex; gap: 10px; }
        .cfg__primary { flex: 1 1 auto; }
        .cfg__ship { font-size: 11px; color: var(--muted-2); letter-spacing: 0.04em; }
        @media (max-width: 520px) {
          .cfg__options { flex-wrap: wrap; }
          .cfg__option { flex-basis: calc(50% - 5px); }
          .cfg__priceValue { font-size: 30px; }
          .cfg__actions { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
