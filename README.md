# DeWetWare

DeWetWare is a polished MVP demo for a single South African jewellery store. It is a browser-based daily operations desk with a navy-and-gold retail workspace, seeded jewellery data, and a practical desktop, tablet, and mobile layout.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production checks:

```bash
npm run lint
npm run build
npm start
```

## Implemented

- Dashboard with ZAR sales and gross-profit metrics, low-stock and repair alerts, lay-by balance, recent transactions, deadlines, quick actions, and an SVG sales chart plotted from the stored sales with a working 7-day / 30-day period selector. Metric trends and details are calculated from the records, not fixed strings.
- Point of Sale with inventory search, cart quantities, customer selection, discounts, 15% VAT, card/cash/EFT/split method selection, stock mutation, completed-sale history, and printable receipt view.
- Inventory catalogue with product master data, search/filter controls, product creation/editing, stock adjustment reason and audit note, persistent stock ledger, pricing, material, gemstone, barcode, reorder and status data.
- Quotes with inventory/manual lines, issue and expiry dates, draft/sent/accepted/declined/converted statuses, print, server email calls, and conversion-ready records that do not reduce stock while quoted.
- VAT invoices with customer lines, payment status, cash/card/EFT/split payment recording, outstanding balances, print, sales history, and audit entries.
- Customer directory with add/edit forms, POPIA consent, preferences, purchase history, repairs and lay-by detail.
- Repair workshop queue with create flow, searchable statuses, status progression, due-date highlighting, timeline seed data, and print job card action.
- Lay-by accounts with deposits, balances, due dates, additional payments, payment history, statuses, and printable receipt action.
- Appraisals with valuation records and printable certificate view.
- Suppliers with directory, account status, and a purchase-order workflow that persists orders to the store: supplier, product line, quantity and expected delivery are captured on submit, written to `purchaseOrders` with an audit entry, and listed with order value and status.
- Reports with a working date-range selector that filters the underlying sales, revenue/profit/inventory/lay-by metrics computed from the visible range, a payment-methods breakdown with its own CSV export, category bars derived from the catalogue, attention items, printable report view, and CSV export matching the visible table columns.
- Settings with store details, VAT rate, receipt and invoice footers, quote terms, demo roles, SMTP test status, and reset demo data action.
- Server-side SMTP endpoint at `/api/email` using Nodemailer. Quotes and the Settings test action surface the exact configuration error instead of claiming a message was sent.

## Demo limitations

This MVP deliberately has no database, authentication, server actions, payment gateway, or external accounting integration. All demo records are persisted to `localStorage` under `dewetware-store`; data is therefore browser-specific and should not be treated as production storage. The supplier purchase-order screen remains a local demonstration; goods received, supplier returns, end-of-day cash-up, credit-note accounting, and full CRM task management are represented in the domain model and are next production workflow slices.

Dates and currency use South African conventions: `en-ZA` dates and `ZAR` currency. The default VAT rate is 15% and can be changed in Settings for demonstration purposes.

## SMTP configuration

Copy `.env.example` to `.env.local` and provide real server-side credentials. Never commit `.env.local` or credentials:

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMTP_TEST_TO=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

The `/api/email` route returns `SMTP not configured` until the required values are present. Configure and test delivery from Settings; browser code never opens an SMTP connection.

Dates and currency are normalised so that server and browser render identically. `Intl.NumberFormat` groups
`en-ZA` amounts differently under Node and Chromium (`R 18 500` against `R 18,500`), which mismatches on
hydration, so `money()` formats the number and applies the South African space separator itself.

See [docs/retail-gap-audit.md](docs/retail-gap-audit.md) for the original implementation audit, and
[docs/functional-verification.md](docs/functional-verification.md) for the verification pass covering what was
tested, the defects it found, and the remaining demo boundaries.

## Deploy

The app is a standard Next.js App Router project and can be deployed to Vercel or any Node-compatible Next.js host:

```bash
npm run build
npm start
```

For a production version, replace the local store with a server-side database and add authentication, role enforcement, audit logging, server-side validation, real payment integrations, and POPIA-compliant consent management.
