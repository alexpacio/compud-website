import { ui, defaultLang, routes, type Lang, type UiKey } from './ui';

export type RouteName = 'home' | 'miniPc' | 'product' | 'servers' | 'checkout' | 'order';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'en' ? 'en' : defaultLang;
}

/**
 * Look up a translated string. `{placeholders}` in the value are replaced by
 * the matching key of `vars`, so plurals and references stay inside the copy.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey, vars?: Record<string, string | number>): string {
    const raw: string = ui[lang][key] ?? ui[defaultLang][key] ?? key;
    if (!vars) return raw;
    return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
      name in vars ? String(vars[name]) : match,
    );
  };
}

/** Build a locale-correct path. Italian is unprefixed, English lives under /en. */
export function href(lang: Lang, route: RouteName, param?: string): string {
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  const seg = routes[lang];
  switch (route) {
    case 'home':
      return `${prefix}/`;
    case 'miniPc':
      return `${prefix}/${seg.miniPc}/`;
    case 'product':
      return `${prefix}/${seg.miniPc}/${param}/`;
    case 'servers':
      return `${prefix}/${seg.servers}/`;
    case 'checkout':
      return `${prefix}/${seg.checkout}/`;
    case 'order':
      return `${prefix}/${seg.checkout}/${param}/`;
  }
}

export const otherLang = (lang: Lang): Lang => (lang === 'it' ? 'en' : 'it');
