# Compud

Compud is a **specialist Linux system rental and sales service for local AI,
developers, development teams and professionals**. Mini PCs, laptops and NAS ship with Omarchy (Arch Linux + Hyprland) and the
agreed tools preinstalled and tested. Rack servers ship with **Proxmox VE only**;
GPUs are tested hardware components,
with preparation and shipping estimates provided for each order based on
configuration and component availability. **On-site installation is quoted
separately**. Italian and English, paid by **instant SEPA bank transfer** — no
card processor is involved at any point.

**Mini PCs, NAS, laptops and GPUs are available only on 12, 24 or 36-month
rentals. Rack servers remain available for purchase at their existing prices.**

## Rental pricing

`src/lib/rental.ts` calculates monthly rates from the original net configuration
value in `src/data/catalogue.ts`, including all selected upgrades:

| Term | Monthly rate, excluding VAT |
| --- | --- |
| 12 months | Original value × 1.30 ÷ 12 |
| 24 months | Original value × 1.15 ÷ 24 |
| 36 months | Original value ÷ 36 |

Rates are rounded once to integer cents. The rental total is the rounded monthly
rate multiplied by the term, so it may differ from the unrounded value by a few
cents. The optional end-of-term buyout is **30% of the original configured
value**, excluding VAT, in addition to the rental payments. It is not included
in the first payment.

Cards show the 36-month monthly rate. The configurator and cart allow all three
terms and carry the selected term into the email request and server orders.
The first payment covers the first monthly rental, any rack server purchases
and one-off shipping, with VAT. Subsequent payments cover only the monthly
rentals. Bank reconciliation tracks the first payment; recurring billing and
the eventual buyout are handled separately. Historical purchase carts remain
under their previous localStorage key and are not converted into rentals.

The service home content lives in `src/i18n/service.ts`, with shared navigation,
metadata and commerce strings in `src/i18n/ui.ts`. The home explains the service,
workloads, catalogue, preparation process, rental plans, audiences, support and
FAQs. The information structure is inspired by Fleet, with original Compud copy
and only services supported by this catalogue. Omarchy is used on the non-server
systems; rack servers use Proxmox VE exclusively. Omarchy benefits
and official references are kept in `src/i18n/omarchy.ts`. The existing `compud`
OS option IDs remain stable on non-server products. Saved server carts with
the old default profile resolve to Proxmox VE; historical orders keep their
persisted descriptions. Do not promise fixed preparation, shipping or
delivery deadlines: provide estimates with the order confirmation.

Built with **Astro 5** (static pages + a small on-demand island of server
routes) and **React** for the interactive parts.

## Running it

```bash
npm install
cp .env.example .env      # fill in at least the bank details
npm run dev               # http://localhost:4322
```

`npm test` runs the rental pricing and cart regression checks (Node 22.6+).

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
- **Catalogue values** in `src/data/catalogue.ts` are in integer cents, net of
  VAT. Rental markups and the buyout percentage live in `src/lib/rental.ts`.

## Layout

```
src/
  data/catalogue.ts     products, options, price deltas, server builds
  i18n/                 the it/en string catalogue and route helpers
  components/           header, footer, audience, turnkey stack, on-site band
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

The UI uses **Ant Design 6** with a shared Compud theme: light surfaces, green
accents and Inter typography. `src/lib/design-theme.ts` defines Ant Design
tokens and `src/styles/global.css` defines corresponding Astro tokens.
`AntProvider.tsx` supplies the theme and Italian/English locale to the React
islands. Cards, tabs, steps, FAQ accordions, configurator radios and checkout
controls are real Ant Design components.

`npm run dev` and `npm run build` generate `src/styles/ant-design.generated.css`
before Astro runs, so prerendered components have their styles before hydration.
The generated CSS is ignored by Git. Node 22.6+ is required for style generation
and the pricing tests. The older design canvas under `design/` is historical.
