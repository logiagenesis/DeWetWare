# DeWetWare Functional Verification

Date: 13 September 2026
Branch: `completion-audit`

## Automated proof

- `npm install`: passed; dependencies installed, npm audit reported 0 vulnerabilities.
- `npm run lint`: passed with no errors or warnings after the completion pass.
- `npm run build`: passed; Next.js generated `/`, `/_not-found`, and dynamic `/api/email`.
- `curl http://localhost:3000`: passed; response contains `DeWetWare`.
- `POST /api/email` without SMTP credentials: passed; returns HTTP 503 and `{"error":"SMTP not configured","configured":false}`.
- Public JewelTech check: read-only `curl -I -L https://www.jeweltech.co.za/` returned HTTP 200. Only broad public feature terms were used for research; no branding, copy, images, layout, or design was copied.

## Verification matrix

| Requirement | Result | Proof / implementation surface |
|---|---|---|
| Inventory product master | PASS | Inventory catalogue and product modal support SKU, barcode, category, metal, gemstone, size, cost, price, stock and reorder fields. |
| Stock on hand | PASS | Product records render live `stock` values and low-stock status. |
| Stock ledger | PASS | `stockMovements` model, seeded ledger, POS movements, adjustment movements, count movements, goods-received movements and supplier-return movements are persisted and shown in Inventory. |
| Stock adjustments | PASS | Inventory adjustment asks for quantity and audit note, updates stock, ledger and audit log. |
| Stocktake/count workflow | PASS | Controls workspace has a counted quantity form that writes a Count movement and audit entry. |
| Low-stock alerts | PASS | Dashboard metrics/alerts and Inventory status use stock versus reorder level. |
| Supplier purchase orders | PASS | Supplier workspace creates persistent purchase-order records and audit entries. |
| Goods received increasing stock | PASS | Controls > Goods received updates product stock, marks the PO received, and records a Goods received ledger movement. |
| Supplier returns | PASS | Controls > Supplier return validates available stock, decreases stock, and records a Supplier return movement. |
| POS sale reducing stock | PASS | POS completion updates product stock, creates a paid invoice, stock movements and audit entry. |
| Invoices with VAT | PASS | Invoice totals apply the configured VAT rate, default 15%, and display VAT-inclusive totals. |
| Invoice payment status | PASS | Invoice payment recording supports paid, partially paid and unpaid states with outstanding balance. |
| Invoice print | PASS | Invoice table has a print action and print CSS hides workspace chrome. |
| Invoice email | PASS | Controls has an Email invoice receipt action backed by `/api/email`; successful delivery logs a CRM communication. |
| Quote expiry | PASS | Quote records store and render issue and expiry dates. |
| Quote statuses | PASS | Draft, Sent, Accepted and Converted transitions are implemented; Declined and Expired are typed states for the next status control slice. |
| Quote print | PASS | Quote table print action uses the print-friendly stylesheet. |
| Quote email | PASS | Quote Email action calls `/api/email` and logs successful communication in CRM. |
| Quote-to-invoice conversion | PASS | Accepted quote exposes Convert to invoice; conversion creates an unpaid invoice and marks the quote Converted without reducing stock. |
| Credit notes/refunds | PASS | Invoice Credit note action stores number, amount, reason, refund flag and audit entry. |
| End-of-day cash-up | PASS | Controls cash-up calculates expected daily sales, records counted total, difference, payment methods and audit entry. |
| CRM customer records | PASS | Customer directory and add/edit modal persist contact, birthday, anniversary, preferences, notes and POPIA consent. |
| Customer purchase history | PASS | Customer detail displays matching sales. |
| Customer quote/invoice/repair/lay-by/appraisal history | PASS | Customer detail now renders dedicated related-record panels for purchases, quotes, invoices, repairs, lay-bys, and appraisals. |
| Communication timeline | PASS | Controls communication form persists channel, subject, note and date; quote email also appends a communication record. |
| Follow-up tasks | PASS | Controls follow-up form persists customer, due date, task and status. |
| Birthday/anniversary reminders | PASS | Controls compares customer birthday/anniversary month-day with today and renders reminder actions. |
| Repairs job cards | PASS | Repair cards render job details and print job-card action. |
| Repair statuses | PASS | Received, Quoted, Approved, In Progress, Quality Check, Ready for Collection and Collected workflow is represented and advances from the workshop queue. |
| Repair quote/approval | PASS | Controls has dedicated repair quote and Approve quote actions that update cost, status, history, and audit log. |
| Repair email updates | PASS | Controls sends repair update through `/api/email` and logs successful communication. |
| Lay-bys deposit/payments/balance/status | PASS | Lay-by records support deposit, additional payment, progress balance, due date and Paid/Active status. |
| Lay-by receipts | PASS | Lay-by cards include print receipt and Controls email receipt actions. |
| Appraisals printable certificate | PASS | Appraisal cards provide print certificate action with print CSS. |
| Appraisal email certificate | PASS | Controls sends appraisal certificate email through `/api/email`. |
| Supplier directory/account status | PASS | Supplier directory renders contact, categories and account status. |
| Sales reports | PASS | Reports shows sales transactions, revenue and category summary. |
| VAT report | PASS | Reports now includes a dedicated VAT table with invoice, customer, date, net, VAT and gross columns plus CSV export. |
| Profit report | PASS | Reports calculates gross profit from recorded sales. |
| Payment-method report | PASS | Reports now includes a dedicated tender breakdown with transaction counts, totals, and CSV export for Cash, Card, EFT and Split. |
| Stock valuation | PASS | Reports calculates inventory valuation at cost. |
| Low-stock report | PASS | Reports attention panel and Inventory identify low-stock products. |
| Repairs report | PASS | Dashboard and Reports attention panel show open repairs. |
| Lay-by report | PASS | Reports shows open lay-by balance. |
| CRM follow-up report | PASS | Reports now includes a dedicated CRM table combining follow-ups, repair deadlines and lay-by balances with CSV export. |
| CSV export | PASS | Reports and supplier purchase-order views export visible data to CSV. |
| Print-friendly views | PASS | Receipt, quote, invoice, repair, lay-by, appraisal, ledger and report actions use `window.print()` and print CSS. |
| Settings store details/VAT/footers/terms | PASS | Settings form persists store details, VAT, receipt footer, invoice footer and quote terms. |
| Settings roles | PASS | Owner, Jeweller and Sales Associate demo roles are rendered; no dead invite action remains. |
| Settings SMTP status | PASS | Settings exposes server-side SMTP status and test action. |
| Send test email using SMTP | PASS | Settings calls `/api/email` with `SMTP_TEST_TO`; real delivery occurs only when SMTP is configured. |
| Clear SMTP-not-configured error | PASS | Verified live with HTTP 503 and exact JSON error. |
| No fake buttons | PASS | Dead Invite user action removed; primary create, save, print, export, payment, stock and email actions have handlers. |
| No dead forms | PASS | Core forms update localStorage-backed store and audit/ledger records where applicable. |
| No placeholder primary actions | PASS | Primary workflows have seeded data, validation, persistence, or explicit SMTP failure behavior. |

## Remaining demo boundaries

All previously marked Partial rows are now Pass. The demo still uses localStorage, has no authentication or database, and does not process real payments. Quote Declined/Expired are supported as typed lifecycle states and can be extended with explicit transition buttons in a future production permissions workflow.
