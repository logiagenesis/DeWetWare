# DeWetWare Retail Gap Audit

Date: 13 September 2026
Branch: `one-stop-shop-upgrade`

## What was checked

- Inspected the App Router entry point, global styles, root layout, package manifest, TypeScript configuration, and Next configuration.
- Ran `npm install`; dependencies were current and npm reported zero vulnerabilities.
- Ran the baseline `npm run lint` and `npm run build`; both passed before the upgrade.
- Attempted a read-only request to `https://www.jeweltech.co.za/` from the Codespace with `curl -I -L --max-time 15`; it returned HTTP 200. A limited text-only category extraction surfaced broad public terms including `CUSTOMER`, `Jewellery`, `Point of Sale`, and `retail`. No branding, copy, images, layout, or proprietary design was reused.
- Reviewed current localStorage behavior. The app had one client-side `Store` object persisted as `dewetware-store`, with products, customers, repairs, lay-bys, appraisals, suppliers, sales, and settings.

## What existed before this pass

- Responsive navy-and-gold operations shell with mobile navigation.
- Dashboard, POS, inventory, customer, repair, lay-by, appraisal, supplier, reports, and settings screens.
- Seeded South African jewellery data, ZAR/en-ZA formatting, 15% VAT, print actions, CSV sales export, and browser persistence.
- Basic POS stock mutation and a simple product stock adjustment prompt.

## Gaps found

- No quotes or invoices as first-class records.
- Sales and adjustments did not create a complete stock ledger or audit trail.
- No quote lifecycle, conversion flow, invoice payment history, credit-note model, or proper invoice status model.
- Purchase orders were illustrative rather than persistent goods-received workflows.
- No server-side email boundary or SMTP configuration/status handling.
- CRM lacked communication and follow-up models.
- No cash-up record model.
- Settings only supported receipt text and did not expose invoice/quote terms or email configuration.
- The original README still described the starter app rather than the retail MVP.

## Implemented in this pass

- Added reusable domain models for stock movements, quotes, invoices/payments, purchase orders, audit entries, communications, follow-ups, and cash-ups in `src/lib/models.ts`.
- Added server-only Nodemailer transport and `POST /api/email`; it returns an explicit `SMTP not configured` error when environment values are absent and never fakes browser-side delivery.
- Added `.env.example` with the requested SMTP and app URL variables.
- Added Quotes workspace with draft creation, inventory/manual lines, issue/expiry dates, status progression, totals, printing, server email calls, and CRM communication logging.
- Added VAT Invoices workspace with invoice creation, payment recording for cash/card/EFT/split, outstanding balances, statuses, printing, sales history, and audit entries.
- Added persistent seed records for quotes, invoices, purchase orders, stock movements, audit history, communications, follow-ups, and document terms.
- Upgraded inventory adjustments to require a reason/note and create a stock-ledger movement plus audit entry; exposed recent ledger entries and print action.
- Added store invoice footer and quote terms settings, plus an explicit SMTP test status panel.
- Updated navigation, documentation, and production-safe validation.

## Remaining demo limitations

The MVP still uses localStorage rather than a database and does not process real payments. The current supplier purchase-order UI remains a local demonstration and needs a dedicated goods-received/returns screen for production use. Authentication, role enforcement, server-side persistence, transactional stock locking, real credit-note accounting, and production email templates remain future integration work.
