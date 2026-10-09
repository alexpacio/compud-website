import type { ThemeConfig } from 'antd';

/** Shared by static style generation and every React island. */
export const compudTheme: ThemeConfig = {
  hashed: false,
  cssVar: { key: 'compud' },
  token: {
    colorPrimary: '#156b4d',
    colorInfo: '#156b4d',
    colorSuccess: '#156b4d',
    colorSuccessBg: '#eef6ed',
    colorSuccessBorder: '#c3ddc8',
    colorInfoBg: '#eef6ed',
    colorText: '#182822',
    colorTextSecondary: '#607168',
    colorBorder: '#dbe4de',
    colorBgLayout: '#f7f9f7',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    borderRadius: 8,
    controlHeight: 40,
    controlHeightLG: 48,
  },
  components: {
    Card: { borderRadiusLG: 16 },
    Button: { primaryShadow: 'none', fontWeight: 600 },
    Tabs: { horizontalItemGutter: 28 },
  },
};
