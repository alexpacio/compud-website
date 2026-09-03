import { useState } from 'react';

export interface BuildView {
  id: string;
  name: string;
  tag: string;
  units: string;
  title: string;
  blurb: string;
  price: string;
  rows: { label: string; value: string }[];
}

interface Props {
  builds: BuildView[];
  strings: { pick: string; baseConfig: string; quote: string };
  quoteUrl: string;
  children?: React.ReactNode;
}

/** Picks the reference build shown beside the rack illustration. */
export default function WorkloadPicker({ builds, strings, quoteUrl, children }: Props) {
  const [activeId, setActiveId] = useState(builds[0]?.id ?? '');
  const build = builds.find((b) => b.id === activeId) ?? builds[0];
  if (!build) return null;

  return (
    <div className="wl">
      <div className="wl__head">
        <p className="kicker">{strings.pick}</p>
        <div className="wl__tabs" role="tablist" aria-label={strings.pick}>
          {builds.map((item) => {
            const selected = item.id === build.id;
            return (
              <button
                type="button"
                key={item.id}
                role="tab"
                id={`wl-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="wl-panel"
                className={selected ? 'wl__tab is-selected' : 'wl__tab'}
                onClick={() => setActiveId(item.id)}
              >
                <span className="wl__tabName">{item.name}</span>
                <span className="wl__tabTag">{item.tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="wl__panel" id="wl-panel" role="tabpanel" aria-labelledby={`wl-tab-${build.id}`}>
        <div className="wl__detail">
          <div className="wl__title">
            <span className="wl__units">{build.units}</span>
            <h2 className="h2">{build.title}</h2>
          </div>
          <p className="wl__blurb">{build.blurb}</p>

          <dl className="wl__specs">
            {build.rows.map((row) => (
              <div className="wl__spec" key={row.label}>
                <dt className="wl__specKey">{row.label}</dt>
                <dd className="wl__specValue">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="wl__foot">
            <div className="wl__price">
              <span className="wl__priceLabel">{strings.baseConfig}</span>
              <span className="wl__priceValue">{build.price}</span>
            </div>
            <a className="btn btn--primary" href={quoteUrl}>
              {strings.quote}
            </a>
          </div>
        </div>

        <div className="wl__figure">{children}</div>
      </div>

      <style>{`
        .wl { display: flex; flex-direction: column; gap: 28px; }
        .wl__head { display: flex; flex-direction: column; gap: 14px; }
        .wl__tabs { display: flex; gap: 12px; }
        .wl__tab {
          flex: 1 1 0; min-width: 0; text-align: left;
          display: flex; flex-direction: column; gap: 6px;
          border: 1px solid var(--line); background: var(--surface);
          border-radius: var(--r-panel); padding: 18px 20px;
          transition: border-color 120ms ease, background-color 120ms ease;
        }
        .wl__tab:hover { border-color: var(--faint); }
        .wl__tab.is-selected { border-color: var(--accent); background: var(--accent-bg); }
        .wl__tabName { font-family: var(--font-display); font-size: 17px; font-weight: 500; }
        .wl__tab.is-selected .wl__tabName { color: var(--accent); }
        .wl__tabTag { font-size: 13px; color: var(--muted); }
        .wl__panel {
          display: grid; grid-template-columns: 1fr 1.05fr; gap: 40px;
          border: 1px solid var(--line); background: var(--surface);
          border-radius: var(--r-card); padding: 32px;
        }
        .wl__detail { display: flex; flex-direction: column; gap: 22px; min-width: 0; }
        .wl__title { display: flex; align-items: center; gap: 12px; }
        .wl__units {
          font-family: var(--font-mono); font-size: 12px; color: var(--accent-ink);
          background: var(--text-2); padding: 3px 9px; border-radius: 2px;
        }
        .wl__blurb { font-size: 14px; line-height: 1.65; color: #a8b0b7; }
        .wl__specs {
          margin: 0; display: flex; flex-direction: column;
          border: 1px solid var(--line); border-radius: var(--r-panel); overflow: hidden;
        }
        .wl__spec {
          display: flex; justify-content: space-between; gap: 20px;
          padding: 13px 16px; background: var(--surface-2);
          border-bottom: 1px solid var(--line-faint);
        }
        .wl__spec:last-child { border-bottom: 0; }
        .wl__specKey {
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em;
          color: var(--muted-2); text-transform: uppercase; margin: 0;
        }
        .wl__specValue {
          font-family: var(--font-mono); font-size: 13px; color: var(--text-2);
          margin: 0; text-align: right;
        }
        .wl__foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .wl__price { display: flex; flex-direction: column; gap: 3px; }
        .wl__priceLabel { font-size: 12px; color: var(--muted-2); }
        .wl__priceValue { font-family: var(--font-mono); font-size: 30px; font-weight: 500; }
        .wl__figure {
          min-width: 0;
          background: var(--surface-2); border: 1px solid var(--line);
          border-radius: var(--r-panel); display: flex; align-items: center;
          justify-content: center; padding: 24px; min-height: 420px;
        }
        @media (max-width: 1000px) {
          .wl__tabs { flex-wrap: wrap; }
          .wl__tab { flex-basis: calc(50% - 6px); }
          .wl__panel { grid-template-columns: minmax(0, 1fr); padding: 22px; }
          .wl__figure { min-height: 0; order: -1; }
        }
        @media (max-width: 560px) {
          .wl__tab { flex-basis: 100%; }
          .wl__spec { flex-direction: column; gap: 4px; }
          .wl__specValue { text-align: left; }
        }
      `}</style>
    </div>
  );
}
