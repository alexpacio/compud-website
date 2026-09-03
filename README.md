# Compud

Showcase and shop for Compud: mini PCs held in stock and rack servers assembled
to order. Italian and English, paid by **instant SEPA bank transfer** — no card
processor is involved at any point.

Built with **Astro 5** (static pages + a small on-demand island of server
routes) and **React** for the interactive parts.

## Running it

```bash
npm install
cp .env.example .env      # fill in at least the bank details
npm run dev               # http://localhost:4322
```

Production:

```bash
npm run build
npm run preview           # node ./dist/server/entry.mjs, same port
```

The build emits `dist/client` (prerendered pages and assets) and
`dist/server` (the Node standalone server). Everything except the checkout and
the order/API routes is prerendered at build time.

## How the payment flow works

There is no payment gateway. The site issues bank-transfer instructions and
watches for the money to arrive.

1. **Cart** — kept in `localStorage` only (`src/lib/cart.ts`). Prices are never
   stored there; they are recomputed from the catalogue on every render.
2. **Checkout** (`/checkout/`) — the customer's details are validated in the
   browser and again on the server.
3. **`POST /api/orders`** — recomputes every price from `src/data/catalogue.ts`
   (client-supplied amounts are ignored), allocates a unique payment reference
   like `CPD-4K2P-7Z`, persists the order and returns its URL.
4. **`/checkout/<ref>/`** — shows beneficiary, IBAN, exact amount and the
   reference, each with a copy button, plus an **EPC QR code** that European
   banking apps scan to pre-fill the whole transfer. The page polls
   `GET /api/orders/<ref>` every five seconds so the status flips to paid
   without a reload.
5. **`POST /api/orders/<ref>/confirm`** — the reconciliation hook. Call it once
   a SEPA credit carrying the reference has been matched on the account:

   ```bash
   curl -X POST https://www.compud.it/api/orders/CPD-4K2P-7Z/confirm \
        -H "authorization: Bearer $COMPUD_ADMIN_TOKEN" \
        -H "content-type: application/json" \
        -d '{"amountCents":182878,"endToEndId":"...","valueDate":"2026-09-03"}'
   ```

   It refuses a short payment (`409 amount_mismatch`) instead of marking the
   order paid, and stays disabled entirely while `COMPUD_ADMIN_TOKEN` is unset.
   Send `content-type: application/json`: Astro's origin check rejects
   form-shaped cross-origin posts.

### What still needs wiring before launch

- **Reconciliation.** Something has to call `/confirm`. Either an operator
  working from the statement, or a PSD2/AIS poller (Banca Sella, Fabrick,
  Nordigen/GoCardless and Salt Edge all expose Italian accounts) matching the
  reference in the remittance field. Nothing in the codebase talks to a bank.
- **Order persistence.** `src/lib/orders.ts` writes a JSON file under
  `COMPUD_DATA_DIR`, guarded by an in-process write queue. That is honest for a
  single node; replace `readAll`/`writeAll` with a database client before you
  run more than one instance. Nothing else in the app changes.
- **Transactional email.** `POST /api/orders` marks the spot where the
  confirmation email with the transfer details should be sent.
- **Product photography.** `src/components/HardwareGlyph.astro` draws vector
  stand-ins. Swap in real photos of the machines.
- **Placeholders.** Anything in `[SQUARE BRACKETS]` — VAT number, address,
  phone, dimensions — is waiting for a real value, in `.env` or in
  `src/data/catalogue.ts`.
- **Prices** in `src/data/catalogue.ts` are drafts, in integer cents, net of VAT.

## Layout

```
src/
  data/catalogue.ts     products, options, price deltas, server builds
  i18n/                 the it/en string catalogue and route helpers
  islands/              React: configurator, workload picker, checkout, payment
  layouts/Base.astro    <head>, hreflang, header and footer
  lib/                  cart, money, orders, EPC QR, config
  pages/                Italian at /, English under /en/
  sections/             page bodies shared by both languages
  styles/global.css     design tokens
```

Both languages render from the same section components, so a page is written
once. Italian is the default locale and is unprefixed; English lives under
`/en/`. Route segments are translated too (`/server-rack/` ↔ `/en/rack-servers/`),
in `src/i18n/ui.ts`.

Adding a language means adding a key to `ui`, a `routes` entry, and one thin
page file per route under `src/pages/<lang>/`.

## Design

The visual system — dark graphite, Space Grotesk over Archivo with JetBrains
Mono for every number, one green accent — comes from the design canvas in
`design/`. `src/styles/global.css` holds the tokens; component styles are
scoped to their `.astro` file or their island.
