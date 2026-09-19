import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// Catalogue pages are prerendered; checkout and the order API opt out of
// prerendering (`export const prerender = false`) because an order and its
// payment reference only exist at request time.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://compud.it',
  output: 'static',
  server: { port: 4322 },
  // The rack server is a single build, so its section index lands on it. The
  // redirect is a static page under public/ rather than a `redirects` entry:
  // with an adapter configured Astro resolves `redirects` at request time, and
  // GitHub Pages has no request to resolve — the entries produced no file in
  // dist/client and both URLs 404'd.
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
