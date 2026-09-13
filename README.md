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

- Dashboard with ZAR sales and gross-profit metrics, low-stock and repair alerts, lay-by balance, recent transactions, deadlines, quick actions, and an SVG sales chart.
- Point of Sale with inventory search, cart quantities, customer selection, discounts, 15% VAT, card/cash/EFT/split method selection, stock mutation, completed-sale history, and printable receipt view.
- Inventory catalogue with search/filter controls, product creation/editing, stock adjustment audit prompt, pricing, material, gemstone, barcode, reorder and status data.
- Customer directory with add/edit forms, POPIA consent, preferences, purchase history, repairs and lay-by detail.
- Repair workshop queue with create flow, searchable statuses, status progression, due-date highlighting, timeline seed data, and print job card action.
- Lay-by accounts with deposits, balances, due dates, additional payments, payment history, statuses, and printable receipt action.
- Appraisals with valuation records and printable certificate view.
- Suppliers with directory, account status, purchase-order creation flow, and exportable purchase-order list.
- Reports with date-range selector, revenue/profit/inventory/lay-by metrics, category bars, attention items, printable report view, and CSV export.
- Settings with store details, VAT rate, receipt footer, demo roles, and reset demo data action.

## Demo limitations

This MVP deliberately has no database, authentication, server actions, payment gateway, or external integrations. All records are seeded in the client and persisted to `localStorage` under `dewetware-store`; data is therefore browser-specific and should not be treated as production storage. The purchase order flow is a local demonstration and the payment methods do not process real payments.

Dates and currency use South African conventions: `en-ZA` dates and `ZAR` currency. The default VAT rate is 15% and can be changed in Settings for demonstration purposes.

## Deploy

The app is a standard Next.js App Router project and can be deployed to Vercel or any Node-compatible Next.js host:

```bash
npm run build
npm start
```

For a production version, replace the local store with a server-side database and add authentication, role enforcement, audit logging, server-side validation, real payment integrations, and POPIA-compliant consent management.
