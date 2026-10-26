"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { purposes } from "@/lib/content";
type E = Record<string, string>;
export default function RequestForm({ initial }: { initial?: string }) {
  const r = useRouter();
  const [step, setStep] = useState(0);
  const [v, setV] = useState({ purpose: purposes.some(p => p.key === initial) ? initial! : "", name: "", email: "", mobile: "", urgent: false, c1: false, c2: false, c3: false });
  const [err, setErr] = useState<E>({});
  const [busy, setBusy] = useState(false);
  const set = (k: string, val: string | boolean) => setV(s => ({ ...s, [k]: val }));
  const next = () => {
    const e: E = {};
    if (step === 0 && !v.purpose) e.purpose = "Choose a purpose.";
    if (step === 1 && !v.urgent) {
      if (v.name.trim().length < 2) e.name = "Enter your full name.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) e.email = "Enter a valid email address.";
      if (!/^[6-9]\d{9}$/.test(v.mobile)) e.mobile = "Enter a 10-digit Indian mobile number.";
    }
    setErr(e); if (!Object.keys(e).length && !(step === 1 && v.urgent)) setStep(step + 1);
  };
  const submit = async () => {
    if (!(v.c1 && v.c2 && v.c3)) return setErr({ consent: "Please tick all three boxes to continue." });
    setBusy(true); setErr({});
    try {
      const res = await fetch("/api/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      if (!res.ok) throw new Error();
      const { token, orderId, keyId, amount } = await res.json();
      await new Promise<void>((ok, bad) => { const s = document.createElement("script"); s.src = "https://checkout.razorpay.com/v1/checkout.js"; s.onload = () => ok(); s.onerror = () => bad(); document.body.appendChild(s); });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rz = new (window as any).Razorpay({ key: keyId, amount, currency: "INR", order_id: orderId, name: "Docvy", description: "Medical documentation request",
        prefill: { name: v.name, email: v.email, contact: v.mobile }, theme: { color: "#402442" },
        handler: async (p: { razorpay_payment_id: string; razorpay_signature: string }) => {
          await fetch("/api/payments/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId, paymentId: p.razorpay_payment_id, signature: p.razorpay_signature }) });
          r.push(`/status?t=${token}`); },
        modal: { ondismiss: () => { setBusy(false); setErr({ form: "Payment was not completed. You have not been charged." }); } } });
      rz.on("payment.failed", () => { setBusy(false); setErr({ form: "Payment failed. You have not been charged. Please try again." }); });
      rz.open();
    } catch { setErr({ form: "We could not start your request. You have not been charged. Please try again." }); setBusy(false); }
  };
  const F = ({ id, label, type = "text", mode }: { id: "name" | "email" | "mobile"; label: string; type?: string; mode?: "numeric" }) => (
    <div className="mb-4"><label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
      <input id={id} type={type} inputMode={mode} value={v[id]} onChange={e => set(id, e.target.value)} aria-invalid={!!err[id]} aria-describedby={err[id] ? id + "e" : undefined} className="min-h-12 w-full rounded-btn border-[1.5px] border-line bg-porc px-3.5 aria-[invalid=true]:border-[#B42318]" />
      {err[id] && <span id={id + "e"} className="mt-1 block text-sm text-[#B42318]">{err[id]}</span>}</div>);
  const btn = "inline-flex min-h-12 items-center rounded-btn border-[1.5px] border-plum px-6 font-semibold";
  return (<div className="mx-auto max-w-2xl rounded-card border border-line bg-sand p-6 md:p-8" aria-live="polite">
    <p className="mb-6 text-sm font-semibold text-mulb">Step {step + 1} of 4</p>
    {step === 0 && <fieldset><legend className="mb-4 font-head text-2xl font-bold text-plum">Purpose</legend>{purposes.map(p => <label key={p.key} className="mb-3 flex cursor-pointer gap-3 rounded-card border border-line bg-porc p-4 has-[:checked]:border-mulb has-[:checked]:bg-lav"><input type="radio" name="purpose" className="mt-1.5 accent-[#653B60]" checked={v.purpose === p.key} onChange={() => set("purpose", p.key)} /><span><strong>{p.title}</strong><br /><span className="text-sm text-grey">{p.text}</span></span></label>)}{err.purpose && <span className="text-sm text-[#B42318]">{err.purpose}</span>}</fieldset>}
    {step === 1 && <div><h2 className="mb-2 font-head text-2xl font-bold text-plum">Your details</h2><F id="name" label="Full name" /><F id="email" label="Email" type="email" /><F id="mobile" label="Mobile number (10 digits)" type="tel" mode="numeric" />
      <label className="mb-3 flex gap-3"><input type="checkbox" className="mt-1.5 accent-[#653B60]" checked={v.urgent} onChange={e => set("urgent", e.target.checked)} /> I have urgent symptoms right now</label>
      {v.urgent && <div role="alert" className="rounded-xl border-l-4 border-[#B42318] bg-lav p-4"><strong>Please get medical care first.</strong><p>For severe or sudden symptoms such as chest pain, trouble breathing, heavy bleeding or loss of consciousness, call 112 or go to the nearest emergency department. Documentation can wait.</p></div>}</div>}
    {step === 2 && <div><h2 className="mb-3 font-head text-2xl font-bold text-plum">What you are paying for</h2><div className="rounded-card border border-line bg-porc p-5"><p className="font-head text-4xl font-extrabold text-plum">₹299</p><p><strong>Included:</strong> [confirm before launch]</p><p><strong>Not included:</strong> in-person care, treatment, or a guaranteed certificate.</p><p className="mt-2 text-sm text-grey">A registered practitioner decides independently whether a certificate is clinically justified. Additional assessment or a different service may be required. Refund terms: [final policy].</p></div></div>}
    {step === 3 && <div><h2 className="mb-3 font-head text-2xl font-bold text-plum">Consent</h2>
      {([["c1", "I have read the Privacy Policy and consent to my information being used to process this request."], ["c2", "I accept the Terms of Service and the Cancellation and Refund Policy."], ["c3", "I understand a certificate is not guaranteed and depends on a practitioner's clinical judgement."]] as const).map(([k, t]) => <label key={k} className="mb-3 flex gap-3"><input type="checkbox" className="mt-1.5 accent-[#653B60]" checked={v[k]} onChange={e => set(k, e.target.checked)} />{t}</label>)}
      <p className="text-sm text-grey">Pay ₹299 (proposed price) securely through Razorpay. Your request starts only after payment is confirmed by our server. A certificate is not guaranteed.</p>
      {(err.consent || err.form) && <p role="alert" className="mt-2 text-sm text-[#B42318]">{err.consent || err.form}</p>}</div>}
    <div className="mt-6 flex gap-3">{step > 0 && <button className={btn} onClick={() => setStep(step - 1)}>Back</button>}
      {step < 3 ? <button className={`${btn} bg-plum text-porc`} onClick={next} disabled={step === 1 && v.urgent}>Continue</button> : <button className={`${btn} bg-plum text-porc disabled:opacity-60`} onClick={submit} disabled={busy}>{busy ? "Submitting…" : "Pay and submit"}</button>}</div>
  </div>);
}
