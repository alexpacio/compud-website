import type { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import itIT from 'antd/locale/it_IT';
import enGB from 'antd/locale/en_GB';
import type { Lang } from '../i18n/ui';
import { compudTheme } from '../lib/design-theme';

export default function AntProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  return (
    <ConfigProvider locale={lang === 'it' ? itIT : enGB} theme={compudTheme}>
      {children}
    </ConfigProvider>
  );
}
