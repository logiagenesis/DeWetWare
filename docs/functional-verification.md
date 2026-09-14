# DeWetWare Functional Verification

Date: 13 September 2026
Branch: `claude/pensive-franklin-g7m9zy`
Base: `main` at `353c3f9`

## Method

Every row below was checked against the committed code and, where marked *Runtime*, against the
running production build (`npm run build && npm start`) driven with Playwright against Chromium.
Rows are marked Pass only where the stated evidence was actually observed. Claims that could not be
observed are recorded as limitations rather than passes.

## Defects found and fixed in this pass

The application already implemented all eleven workspaces. The defects below were places where the
interface presented figures or controls that were not backed by the data.

| # | Defect | Evidence before | Status |
|---|---|---|---|
| 1 | Hydration mismatch on every server-rendered currency value | `Intl.NumberFormat("en-ZA", { currency: "ZAR" })` yields `R 18 500` under Node and `R 18,500` under Chromium; React error #418 on first load | Fixed |
| 2 | Dashboard sales chart was a fixed decorative SVG path | Hardcoded `d="M0 168 C45 145 …"`; y-axis fixed at `R20k…R0`; labels fixed `Sun…Sat` | Fixed |
| 3 | Dashboard chart period filter inert | `<select aria-label="Chart period">` with no `onChange` | Fixed |
| 4 | Dashboard trends and details fabricated | `trend="+12.4%"`, `trend="+8.1%"`, `detail="Margin 49.2%"`, `detail="1 due today"`, `detail="1 active account"` | Fixed |
| 5 | Reports date-range selector changed a label only | `range` used solely as `detail={range}`; `sales` filtered by search text only | Fixed |
| 6 | Reports figures fabricated | `trend="+14.8%"`, `detail="47.6% margin"`, `detail="1 active account"` | Fixed |
| 7 | Payment-methods breakdown absent | Required by the brief; only per-row payment shown | Added |
| 8 | Purchase-order list hardcoded | Single literal `PO-104` row; `store.purchaseOrders` seeded but never read | Fixed |
| 9 | Create-purchase-order form discarded all input | `onSubmit` was `event.preventDefault(); setPo(false);` | Fixed |
| 10 | Purchase-order supplier field unreadable | `<select required>` with no `name`, so never captured by `FormData` | Fixed |
| 11 | Seven filters inert | POS category, Quotes status, Invoices status, Inventory stock level, Customers consent, Lay-bys status, Dashboard period — no `onChange`, no `name` | Fixed |
| 12 | Customer POPIA panel ignored the record | Always rendered "Marketing consent given / Recorded 12 Aug 2026" regardless of `detail.popia` | Fixed |
| 13 | Two placeholder buttons | `<Button variant="quiet">Invite user</Button>` and `<button className="help">?</button>`, neither with a handler | Fixed |
| 14 | Manager role missing | Brief requires Owner, Manager, Sales Associate, Jeweller; only three seeded | Fixed |
| 15 | Repairs nav badge hardcoded | `<b>2</b>` | Fixed |
| 16 | Store date hardcoded in two places | `"Saturday, 13 September 2026"` | Fixed |
| 17 | CSV export did not match the visible table | Table showed Category and Profit; export omitted both | Fixed |
| 18 | Sales-by-category list hardcoded | Fixed array of four category names rather than the catalogue | Fixed |

## Requirement verification

### Quality gates

| Check | Result | Evidence |
|---|---|---|
| `npm run lint` | Pass | Exits 0, no output |
| `npm run build` | Pass | Compiled successfully; TypeScript clean; 5/5 static pages |
| `npx tsc --noEmit` | Pass | Exits 0 |
| Main routes render | Pass | *Runtime*: `/` HTTP 200; routes `/`, `/_not-found`, `ƒ /api/email` |
| No runtime console errors | Pass | *Runtime*: zero console errors and zero page errors on first load and after visiting all twelve workspaces |

### Modules

| Module | Result | Evidence |
|---|---|---|
| Dashboard | Pass | *Runtime*: renders; metrics `R10 490 / 2 transactions / -16.0%`, computed from the two sales dated 13 Sept against the 12 Sept sale of `R12 495` |
| Point of Sale | Pass | *Runtime*: adding a product and completing a sale produced a receipt and decremented stock 2 → 1, flipping the row from "In Stock" to "Low Stock" |
| Quotes | Pass | Renders; status filter now applies to the list |
| Invoices | Pass | Renders; status filter now applies to the list |
| Inventory | Pass | *Runtime*: stock-level filter reduced the table from 7 rows to 3 |
| Customers | Pass | Renders; consent filter applies; detail panel shows purchase history, repairs and lay-bys |
| Repairs and Workshop | Pass | Renders as "Repairs & Workshop"; all seven statuses present in code |
| Lay-bys | Pass | Renders; status filter applies |
| Appraisals | Pass | Renders |
| Suppliers | Pass | *Runtime*: created a purchase order; list went 1 → 2 rows showing `PO-368 · Southern Silver Co. · 1 line · R2 720 · Draft`, and it survived a page reload |
| Reports | Pass | *Runtime*: range switch moved the window from `15 Aug 2026 – 13 Sept 2026` to `01 Jan 2026 – 13 Sept 2026`; revenue `R22 985` reconciles exactly with the three seeded sales (8 995 + 1 495 + 12 495); payment-methods table shows 3 rows |
| Settings | Pass | Renders; four roles listed; VAT rate, footers and reset action present |

### Brief requirements

| Requirement | Result | Evidence |
|---|---|---|
| ZAR currency, 15% VAT, en-ZA dates | Pass | `money()` renders `R22 985`; VAT rate from settings; dates via `Intl` `en-ZA` |
| localStorage persistence | Pass | *Runtime*: purchase order created in one page load was present after reload |
| Demo mode indicator | Pass | Sidebar "Demo mode" chip; help panel explains the demo boundary |
| Reset demo data | Pass | Present in Settings |
| No non-functional placeholder buttons | Pass | Scan finds zero `<Button>`/`<button>` without `onClick` or `type="submit"` |
| Every filter works | Pass | Scan finds zero `<select>` without `onChange` or `name`; the ten `name=` selects are uncontrolled form fields read via `FormData` on submit |
| CSV export | Pass | Sales export matches the visible table columns; payment-methods export added |
| Accessible focus states | Pass | `globals.css`: `input:focus, select:focus, textarea:focus, button:focus-visible { outline: 3px solid #e3c98e; outline-offset: 2px; }` |
| Server-side email only | Pass | `POST /api/email` returns HTTP 503 `SMTP not configured` when credentials are absent; browser never opens an SMTP connection |
| Responsive layout | Partial | Mobile navigation and responsive grid rules are present in `globals.css`, but layout was not verified at each breakpoint in this pass |

## Known limitations

These are deliberate boundaries of the demo, not defects.

- **Browser storage only.** Records live in `localStorage` under `dewetware-store`. They are specific to one
  browser and are not a production database.
- **No authentication or role enforcement.** The four roles in Settings are a display-only demonstration;
  nothing in the application is gated by them.
- **The seed is anchored to real "today".** `today` is `new Date()`, while the seeded sales are dated
  12 and 13 September 2026. Run on a later date, "Today's sales" correctly reads R0 and the dashboard
  trend falls away, because there are no sales for that day. The figures remain accurate; the demo simply
  looks emptier. Making the seed relative to the current date would keep it vivid over time.
- **Purchase orders capture a single line.** The create flow records one product line plus quantity. Goods
  received, supplier returns, credit notes and cash-up remain modelled but not surfaced.
- **Status colours reuse one palette.** A purchase order in "Received" state inherits the red styling used
  for a newly received repair. Cosmetic only.
- **Responsive breakpoints unverified.** See the Partial row above.
