export type PaymentMethod = "Cash" | "Card" | "EFT" | "Split";
export type QuoteStatus = "Draft" | "Sent" | "Accepted" | "Declined" | "Expired" | "Converted";
export type InvoiceStatus = "Paid" | "Partially paid" | "Unpaid" | "Overdue" | "Cancelled";

export type StockMovement = {
  id: string;
  productId: string;
  date: string;
  quantity: number;
  balance: number;
  type: "Sale" | "Adjustment" | "Goods received" | "Supplier return" | "Count";
  reason: string;
  note: string;
  user: string;
  reference?: string;
};

export type QuoteLine = { id: string; description: string; quantity: number; unitPrice: number; productId?: string; vatApplicable: boolean };
export type Quote = { id: string; number: string; customer: string; issueDate: string; expiryDate: string; status: QuoteStatus; lines: QuoteLine[]; discount: number; notes: string };
export type InvoiceLine = QuoteLine;
export type InvoicePayment = { id: string; date: string; amount: number; method: PaymentMethod };
export type CreditNote = { id: string; number: string; invoiceNumber: string; date: string; amount: number; reason: string; refunded: boolean };
export type Invoice = { id: string; number: string; customer: string; issueDate: string; dueDate: string; status: InvoiceStatus; lines: InvoiceLine[]; discount: number; payments: InvoicePayment[]; sourceQuote?: string; creditNotes: CreditNote[] };
export type PurchaseOrder = { id: string; number: string; supplier: string; createdDate: string; expectedDate: string; status: "Draft" | "Sent" | "Partially received" | "Received" | "Cancelled"; lines: { productId: string; quantity: number; cost: number }[]; receivedDate?: string };
export type AuditEntry = { id: string; date: string; action: string; reference: string; user: string; note: string };
export type Communication = { id: string; date: string; customer: string; channel: "Email" | "Phone" | "In-store"; subject: string; note: string };
export type FollowUp = { id: string; customer: string; dueDate: string; task: string; status: "Open" | "Done" };
export type CashUp = { id: string; date: string; expected: number; counted: number; difference: number; methods: Record<PaymentMethod, number>; note: string };
