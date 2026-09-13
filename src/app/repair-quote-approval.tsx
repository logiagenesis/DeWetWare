"use client";

import { FormEvent, useState } from "react";

type RepairRecord = { id: string; customer: string; item: string; cost: number; deposit: number; status: string; history: string[] };
type RepairStore = { repairs: RepairRecord[]; auditLog: { id: string; date: string; action: string; reference: string; user: string; note: string }[] };
const today = new Date().toISOString().slice(0, 10);
const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
const money = (value: number) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(value);

export function RepairQuoteApproval({ store, save }: { store: RepairStore; save: (store: RepairStore, message?: string) => void }) {
  const [repairId, setRepairId] = useState(store.repairs[0]?.id ?? ""); const repair = store.repairs.find((item) => item.id === repairId);
  const quote = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); const cost = Number(data.get("cost")); if (!repair || !(cost >= 0)) return; save({ ...store, repairs: store.repairs.map((item) => item.id === repair.id ? { ...item, cost, status: "Quoted", history: [...item.history, `Quoted ${money(cost)} on ${today}`] } : item), auditLog: [{ id: uid("audit"), date: today, action: "Repair quoted", reference: repair.id, user: "Nandi Maseko", note: money(cost) }, ...store.auditLog] }, "Repair quote saved"); };
  const approve = () => { if (!repair) return; save({ ...store, repairs: store.repairs.map((item) => item.id === repair.id ? { ...item, status: "Approved", history: [...item.history, `Approved on ${today}`] } : item), auditLog: [{ id: uid("audit"), date: today, action: "Repair approved", reference: repair.id, user: "Nandi Maseko", note: "Customer approved repair quote" }, ...store.auditLog] }, "Repair approved"); };
  return <section className="panel"><div className="panel-head"><div><h2>Repair quote & approval</h2><p>Quote the job, then record customer approval</p></div></div><form className="form-grid" onSubmit={quote}><Field label="Repair job"><select value={repairId} onChange={(event) => setRepairId(event.target.value)}>{store.repairs.map((item) => <option key={item.id} value={item.id}>{item.id} · {item.item}</option>)}</select></Field><Field label="Quoted cost"><input name="cost" type="number" min="0" defaultValue={repair?.cost ?? 0} required /></Field><div className="form-actions"><Button type="submit">Save repair quote</Button><Button type="button" variant="secondary" onClick={approve} disabled={!repair || repair.status !== "Quoted"}>Approve quote</Button></div></form><p>{repair ? `${repair.id} · ${repair.status} · ${money(repair.cost)}` : "No repair jobs"}</p></section>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="field"><span>{label}</span>{children}</label>; }
function Button({ children, onClick, variant = "primary", type = "button", disabled = false }: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary"; type?: "button" | "submit"; disabled?: boolean }) { return <button type={type} onClick={onClick} disabled={disabled} className={`btn btn-${variant}`}>{children}</button>; }
