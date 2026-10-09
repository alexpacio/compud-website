import { Badge, Button, Card, Collapse, Steps, Tabs, Tag } from 'antd';
import {
  ApiOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  CodeOutlined,
  CustomerServiceOutlined,
  DesktopOutlined,
  HddOutlined,
  LaptopOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import AntProvider from '../components/AntProvider';
import OmarchyBenefits from '../components/OmarchyBenefits';
import type { Lang } from '../i18n/ui';
import { serviceCopy } from '../i18n/service';
import { formatEur } from '../lib/money';
import {
  BUYOUT_PERCENT,
  DEFAULT_RENTAL_MONTHS,
  monthlyRentalCents,
  rentalBuyoutCents,
  RENTAL_MARKUP_PERCENT,
  RENTAL_MONTHS,
} from '../lib/rental';
import '../styles/service.css';

export interface ServiceProduct {
  slug: string;
  name: string;
  section: 'miniPc' | 'nas' | 'gpu' | 'laptop' | 'server';
  summary: string;
  image?: string;
  url: string;
  valueCents: number;
  rentalAvailable: boolean;
}

interface Props {
  lang: Lang;
  products: ServiceProduct[];
  miniPcUrl: string;
  serverUrl: string;
}

export default function ServiceHome({
  lang,
  products,
  miniPcUrl,
  serverUrl,
}: Props) {
  const c = serviceCopy[lang];
  const mini = products.find((p) => p.section === 'miniPc');
  const laptop = products.find((p) => p.section === 'laptop' && p.image);
  const money = (cents: number) => formatEur(cents, lang, { decimals: true });
  const serviceIcons = [
    DesktopOutlined,
    CodeOutlined,
    ToolOutlined,
    CustomerServiceOutlined,
  ];
  const workloadIcons = [ApiOutlined, CodeOutlined, HddOutlined];
  const sections = [
    'featured',
    'miniPc',
    'laptop',
    'nas',
    'gpu',
    'server',
  ] as const;

  const productCard = (product: ServiceProduct) => (
    <Card
      className="service-product"
      key={product.slug}
      hoverable
      cover={
        <a
          className={`service-product__image service-product__image--${product.section}`}
          href={product.url}
          tabIndex={-1}
          aria-hidden="true"
        >
          {product.image ? (
            <img
              src={product.image}
              alt=""
              width={480}
              height={330}
              loading="lazy"
            />
          ) : (
            <div className="service-product__placeholder">
              {product.section === 'gpu' ? (
                <ThunderboltOutlined />
              ) : (
                <HddOutlined />
              )}
              <span>{c.categories[product.section]}</span>
            </div>
          )}
        </a>
      }
    >
      <div className="service-product__labels">
        <Tag color={product.rentalAvailable ? 'green' : 'default'}>
          {product.rentalAvailable ? c.rental : c.purchase}
        </Tag>
        <span>{c.categories[product.section]}</span>
      </div>
      <h3>
        <a href={product.url}>{product.name}</a>
      </h3>
      <p className="service-product__summary">{product.summary}</p>
      <div className="service-product__price">
        {product.rentalAvailable && <span>{c.from} </span>}
        <strong>
          {money(
            product.rentalAvailable
              ? monthlyRentalCents(product.valueCents, DEFAULT_RENTAL_MONTHS)
              : product.valueCents,
          )}
        </strong>
        {product.rentalAvailable && <span>{c.month}</span>}
        <small>{c.vat}</small>
      </div>
      <p className="service-product__term">
        {product.rentalAvailable ? c.cardTerm : c.purchase}
      </p>
      <Button
        block
        href={product.url}
        icon={<ArrowRightOutlined aria-hidden />}
        iconPlacement="end"
      >
        {c.configure}
      </Button>
    </Card>
  );

  return (
    <AntProvider lang={lang}>
      <div className="service-home">
        <section className="service-hero">
          <div className="wrap service-hero__inner">
            <div className="service-hero__copy">
              <Tag color="green" className="service-eyebrow-tag">
                <span className="service-status-dot" />
                {c.eyebrow}
              </Tag>
              <h1>
                {c.title}
                <br />
                <span>{c.titleAccent}</span>
              </h1>
              <p className="service-hero__lead">{c.intro}</p>
              <div className="service-actions">
                <Button
                  type="primary"
                  size="large"
                  href="#catalogo"
                  icon={<ArrowRightOutlined aria-hidden />}
                  iconPlacement="end"
                >
                  {c.primary}
                </Button>
                <Button size="large" href="#contatti">
                  {c.secondary}
                </Button>
              </div>
              <p className="service-hero__note">
                <TeamOutlined />
                {c.heroNote}
              </p>
            </div>
            <div className="service-hero__visual">
              <div className="service-hero__grid" aria-hidden="true" />
              <div className="service-device">
                <div className="service-device__bar">
                  <span className="service-device__brand">
                    Compud<span> / Linux first</span>
                  </span>
                  <Badge status="success" text={c.ready} />
                </div>
                {mini?.image && (
                  <img
                    className="service-device__photo"
                    src={mini.image}
                    alt={mini.name}
                    width={520}
                    height={420}
                    fetchPriority="high"
                  />
                )}
                <div className="service-device__info">
                  <div>
                    <p className="service-overline">Mini PC · Ryzen 7 H255</p>
                    <strong>{c.linuxReady}</strong>
                  </div>
                  {mini && (
                    <div className="service-device__rate">
                      <strong>
                        {money(monthlyRentalCents(mini.valueCents, 36))}
                      </strong>
                      <span>
                        {c.month} · 36 {c.months} · {c.vat}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="service-stack-float">
                <CodeOutlined />
                <div>
                  <strong>Omarchy</strong>
                  <span>Arch Linux · Hyprland</span>
                </div>
                <CheckCircleFilled />
              </div>
              {laptop?.image && (
                <a
                  className="service-laptop-float"
                  href={laptop.url}
                  aria-label={laptop.name}
                >
                  <img
                    src={laptop.image}
                    alt={laptop.name}
                    width={220}
                    height={140}
                  />
                  <span>
                    <LaptopOutlined /> {c.categories.laptop}
                  </span>
                </a>
              )}
              <p className="service-hero__caption">{c.heroCaption}</p>
            </div>
          </div>
        </section>
        <div className="service-pillar-band">
          <div className="wrap service-pillars">
            {c.pillars.map((pillar) => (
              <span key={pillar}>
                <CheckCircleFilled />
                {pillar}
              </span>
            ))}
          </div>
        </div>

        <section className="service-section" id="servizio">
          <div className="wrap">
            <div className="service-section__head">
              <p className="service-overline">{c.serviceEyebrow}</p>
              <h2>{c.serviceTitle}</h2>
              <p>{c.serviceLead}</p>
            </div>
            <div className="service-four-grid">
              {c.services.map((service, index) => {
                const Icon = serviceIcons[index];
                return (
                  <Card className="service-benefit" key={service.title}>
                    <span className="service-icon">
                      <Icon />
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.body}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="service-section service-section--soft"
          id="workloads"
        >
          <div className="wrap">
            <div className="service-section__head">
              <p className="service-overline">{c.workloadEyebrow}</p>
              <h2>{c.workloadTitle}</h2>
            </div>
            <div className="service-three-grid">
              {c.workloads.map((workload, index) => {
                const Icon = workloadIcons[index];
                return (
                  <Card className="service-workload" key={workload.title}>
                    <span className="service-icon">
                      <Icon />
                    </span>
                    <p className="service-workload__label">{workload.label}</p>
                    <h3>{workload.title}</h3>
                    <p>{workload.body}</p>
                    <Button
                      type="link"
                      href={index === 2 ? serverUrl : '#catalogo'}
                      icon={<ArrowRightOutlined aria-hidden />}
                      iconPlacement="end"
                    >
                      {c.primary}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <OmarchyBenefits lang={lang} />

        <section className="service-section" id="catalogo">
          <div className="wrap">
            <div className="service-section__head">
              <p className="service-overline">{c.catalogEyebrow}</p>
              <h2>{c.catalogTitle}</h2>
              <p>{c.catalogLead}</p>
            </div>
            <Tabs
              className="service-catalog"
              defaultActiveKey="featured"
              items={sections.map((section) => ({
                key: section,
                label: c.categories[section],
                children: (
                  <div className="service-catalog__grid">
                    {(section === 'featured'
                      ? ['miniPc', 'laptop', 'nas', 'server'].flatMap(
                          (group) =>
                            products.find((p) => p.section === group) ?? [],
                        )
                      : products.filter((p) => p.section === section)
                    ).map(productCard)}
                  </div>
                ),
              }))}
            />
          </div>
        </section>

        <section
          className="service-section service-section--soft"
          id="come-funziona"
        >
          <div className="wrap">
            <div className="service-section__head">
              <p className="service-overline">{c.processEyebrow}</p>
              <h2>{c.processTitle}</h2>
              <p>{c.processLead}</p>
            </div>
            <Steps
              className="service-process"
              current={-1}
              titlePlacement="vertical"
              items={c.process.map((step, index) => ({
                title: step.title,
                content: step.body,
                icon: (
                  <span className="service-step-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                ),
              }))}
            />
          </div>
        </section>

        {mini && (
          <section className="service-section" id="noleggio">
            <div className="wrap">
              <div className="service-section__head">
                <p className="service-overline">{c.pricingEyebrow}</p>
                <h2>{c.pricingTitle}</h2>
                <p>{c.pricingLead}</p>
              </div>
              <div className="service-pricing-example">
                <DesktopOutlined />
                <div>
                  <strong>{c.pricingExample}</strong>
                  <p>
                    {c.pricingBase} {money(mini.valueCents)} · {c.vat}
                  </p>
                </div>
              </div>
              <div className="service-three-grid service-pricing">
                {RENTAL_MONTHS.map((months) => {
                  const monthly = monthlyRentalCents(mini.valueCents, months);
                  return (
                    <Card
                      key={months}
                      className={
                        months === 36
                          ? 'service-plan service-plan--featured'
                          : 'service-plan'
                      }
                    >
                      <div className="service-plan__head">
                        <h3>
                          {months} {c.months}
                        </h3>
                        {months === 36 && (
                          <Tag color="green">{c.recommended}</Tag>
                        )}
                      </div>
                      <p className="service-plan__markup">
                        {RENTAL_MARKUP_PERCENT[months] === 0
                          ? c.noMarkup
                          : `${c.markup} +${RENTAL_MARKUP_PERCENT[months]}%`}
                      </p>
                      <p className="service-plan__price">
                        <strong>{money(monthly)}</strong>
                        <span>{c.month}</span>
                      </p>
                      <p className="service-plan__vat">{c.vat}</p>
                      <p className="service-plan__total">
                        {c.rentalTotal}:{' '}
                        <strong>{money(monthly * months)}</strong>
                      </p>
                      <Button
                        type={months === 36 ? 'primary' : 'default'}
                        block
                        size="large"
                        href={`${miniPcUrl}?months=${months}`}
                      >
                        {c.configure}
                      </Button>
                    </Card>
                  );
                })}
              </div>
              <Card className="service-buyout">
                <div>
                  <span className="service-buyout__percent">
                    {BUYOUT_PERCENT}%
                  </span>
                  <div>
                    <h3>{c.buyoutTitle}</h3>
                    <p>
                      {c.buyoutBody}{' '}
                      <strong>
                        {money(rentalBuyoutCents(mini.valueCents))} {c.vat}
                      </strong>
                    </p>
                  </div>
                </div>
              </Card>
              <p className="service-pricing-note">{c.pricingNote}</p>
              <div className="service-rack-note">
                <HddOutlined />
                <p>{c.rackNote}</p>
                <Button
                  href={serverUrl}
                  icon={<ArrowRightOutlined aria-hidden />}
                  iconPlacement="end"
                >
                  {c.rackCta}
                </Button>
              </div>
            </div>
          </section>
        )}

        <section className="service-section service-section--soft" id="per-chi">
          <div className="wrap">
            <div className="service-section__head">
              <p className="service-overline">{c.audienceEyebrow}</p>
              <h2>{c.audienceTitle}</h2>
            </div>
            <div className="service-two-grid">
              {c.audiences.map((audience, index) => (
                <Card className="service-audience" key={audience.title}>
                  <span className="service-icon">
                    {index === 0 ? <TeamOutlined /> : <UserOutlined />}
                  </span>
                  <h3>{audience.title}</h3>
                  <p>{audience.body}</p>
                  <ul>
                    {audience.points.map((point) => (
                      <li key={point}>
                        <CheckCircleFilled />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="#contatti"
                    icon={<ArrowRightOutlined aria-hidden />}
                    iconPlacement="end"
                  >
                    {c.secondary}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="service-section" id="supporto">
          <div className="wrap service-support">
            <div className="service-section__head">
              <p className="service-overline">{c.supportEyebrow}</p>
              <h2>{c.supportTitle}</h2>
              <p>{c.supportBody}</p>
              <p className="service-support__note">{c.supportNote}</p>
              <Button
                href="#onsite"
                icon={<ArrowRightOutlined aria-hidden />}
                iconPlacement="end"
              >
                {c.onsiteCta}
              </Button>
            </div>
            <Card className="service-software">
              <div className="service-software__bar">
                <span className="service-terminal-dots" aria-hidden="true">
                  ● ● ●
                </span>
                <span>compud / setup</span>
              </div>
              <p className="service-software__command">$ ready-to-work</p>
              <ul>
                {c.stack.map((line) => (
                  <li key={line}>
                    <CheckCircleFilled />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="service-software__result">
                <span className="service-status-dot" />
                {c.linuxReady}
              </div>
            </Card>
          </div>
        </section>

        <section className="service-section service-section--soft" id="faq">
          <div className="wrap service-faq">
            <div className="service-section__head">
              <p className="service-overline">{c.faqEyebrow}</p>
              <h2>{c.faqTitle}</h2>
              <Button href="#contatti">{c.secondary}</Button>
            </div>
            <Collapse
              className="service-faq__list"
              expandIconPlacement="end"
              items={c.faq.map((item, index) => ({
                key: String(index),
                label: item.question,
                children: <p>{item.answer}</p>,
              }))}
            />
          </div>
        </section>
      </div>
    </AntProvider>
  );
}
