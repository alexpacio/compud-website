import { Button, Card, Tag } from 'antd';
import {
  ArrowRightOutlined,
  CodeOutlined,
  DeploymentUnitOutlined,
  DesktopOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import AntProvider from './AntProvider';
import type { Lang } from '../i18n/ui';
import { omarchyCopy } from '../i18n/omarchy';
import '../styles/omarchy.css';

export default function OmarchyBenefits({ lang }: { lang: Lang }) {
  const c = omarchyCopy[lang];
  const icons = [
    DesktopOutlined,
    CodeOutlined,
    DeploymentUnitOutlined,
    SafetyCertificateOutlined,
  ];
  return (
    <AntProvider lang={lang}>
      <section
        className="omarchy-section"
        id="omarchy"
        aria-labelledby="omarchy-title"
      >
        <div className="wrap">
          <div className="omarchy-heading">
            <p>{c.eyebrow}</p>
            <Tag color="green">Omarchy · Arch Linux · Hyprland</Tag>
            <h2 id="omarchy-title">{c.title}</h2>
            <p>{c.intro}</p>
          </div>
          <div className="omarchy-grid">
            {c.benefits.map((benefit, index) => {
              const Icon = icons[index];
              return (
                <Card key={benefit.title} className="omarchy-benefit">
                  <span className="omarchy-icon">
                    <Icon aria-hidden />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                  <a
                    href={benefit.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.source} <ArrowRightOutlined aria-hidden />
                  </a>
                </Card>
              );
            })}
          </div>
          <p className="omarchy-scope">{c.scope}</p>
          <div className="omarchy-links">
            <Button
              type="primary"
              href="https://omarchy.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.website}
            </Button>
            <Button
              href="https://omarchy.org/manual/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.manual}
            </Button>
          </div>
          <p className="omarchy-note">{c.note}</p>
        </div>
      </section>
    </AntProvider>
  );
}
