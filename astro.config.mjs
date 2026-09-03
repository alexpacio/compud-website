import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// Catalogue pages are prerendered; checkout and the order API opt out of
// prerendering (`export const prerender = false`) because an order and its
// payment reference only exist at request time.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://www.compud.it',
  output: 'static',
  server: { port: 4322 },
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
