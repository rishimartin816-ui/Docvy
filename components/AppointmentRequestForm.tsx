"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import type { ProviderCandidate } from "@/lib/provider-candidates";

type Props = { doctors: ProviderCandidate[]; initialProvider: string; initialCity: string; enabled: boolean };
type Result = { ok?: boolean; referenceId?: string; providerNotified?: boolean; error?: string };

function keyFor(providerId: string, city: string, facility: string) {
  return `${providerId}::${city}::${facility}`;
}

export default function AppointmentRequestForm({ doctors, initialProvider, initialCity, enabled }: Props) {
  const locations = useMemo(() => doctors.flatMap((doctor) => doctor.locations.map((location) => ({
    key: keyFor(doctor.id, location.city, location.facility),
    providerId: doctor.id,
    provider: doctor.name,
    organisation: doctor.hospital,
    city: location.city,
    facility: location.facility,
  }))), [doctors]);
  const initialOption = locations.find((item) => item.providerId === initialProvider && (!initialCity || item.city.toLowerCase() === initialCity.toLowerCase()))?.key ?? "";
  const [selection, setSelection] = useState(initialOption);
  const [busy, setBusy] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [providerNotified, setProviderNotified] = useState(false);
  const [error, setError] = useState("");
  const selected = locations.find((item) => item.key === selection);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || busy || !selected) return;
    setBusy(true);
    setError("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      providerId: selected.providerId,
      city: selected.city,
      facility: selected.facility,
      name: String(form.get("name") ?? ""),
      mobile: String(form.get("mobile") ?? ""),
      email: String(form.get("email") ?? ""),
      requestedDate: String(form.get("requestedDate") ?? ""),
      requestedTime: String(form.get("requestedTime") ?? ""),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
    };
    try {
      const response = await fetch("/api/appointment-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as Result;
      if (!response.ok || !result.ok || !result.referenceId) throw new Error(result.error || "We could not send your enquiry. Please try again later.");
      setReferenceId(result.referenceId);
      setProviderNotified(result.providerNotified === true);
      formElement.reset();
      setSelection(initialOption);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not send your enquiry. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  if (referenceId) return <section className="rounded-[24px] border border-[#B8DCD0] bg-white p-6 shadow-[0_14px_40px_rgba(23,58,55,0.07)] md:p-8" role="status" aria-live="polite">
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF5F1] text-[#087F83]"><CheckCircle2 size={25}/></span>
    <p className="mt-5 text-xs font-extrabold tracking-[0.14em] text-[#087F83]">ENQUIRY RECEIVED</p>
    <h2 className="mt-2 text-2xl font-bold text-[#173A37]">DOCVY has your request.</h2>
    <p className="mt-3 text-sm leading-6 text-[#526D66]">Your reference is <strong>{referenceId}</strong>. This is not an appointment confirmation. {providerNotified ? "Your request details were emailed to the provider’s verified appointment contact. The provider must still confirm availability, the slot and any fee." : "DOCVY received your request, but this provider does not yet have a verified email contact. Please contact the hospital or clinic directly to confirm a slot and fee."}</p>
    <Link href="/doctors" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white">Return to doctor listings <ArrowRight size={16}/></Link>
  </section>;

  return <form onSubmit={submit} className="rounded-[24px] border border-[#DCEAE5] bg-white p-6 shadow-[0_14px_40px_rgba(23,58,55,0.07)] md:p-8">
    {!enabled && <div role="status" className="mb-5 rounded-xl border border-[#E7C99A] bg-[#FFF9EE] p-4 text-sm leading-6 text-[#6E5B39]">Appointment enquiries are not open yet. DOCVY is finishing the private intake connection and confirming provider email contacts. This form is not collecting your details.</div>}
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold text-[#173A37]">Choose a doctor and location <span className="text-[#B3432E]">*</span></span><select required disabled={!enabled || busy} value={selection} onChange={(event) => setSelection(event.target.value)} className="min-h-12 w-full rounded-xl border border-[#C9DDD5] bg-white px-3 text-sm text-[#173A37] outline-none focus:ring-2 focus:ring-[#087F83]"><option value="">Select a listed doctor</option>{locations.map((item) => <option key={item.key} value={item.key}>{item.provider} · {item.city} · {item.facility}</option>)}</select></label>
      <label><span className="mb-2 block text-sm font-bold text-[#173A37]">Your name <span className="text-[#B3432E]">*</span></span><input required disabled={!enabled || busy} name="name" autoComplete="name" maxLength={100} className="min-h-12 w-full rounded-xl border border-[#C9DDD5] px-3 text-sm outline-none focus:ring-2 focus:ring-[#087F83]" placeholder="Full name"/></label>
      <label><span className="mb-2 block text-sm font-bold text-[#173A37]">Mobile number <span className="text-[#B3432E]">*</span></span><input required disabled={!enabled || busy} name="mobile" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} className="min-h-12 w-full rounded-xl border border-[#C9DDD5] px-3 text-sm outline-none focus:ring-2 focus:ring-[#087F83]" placeholder="10-digit mobile number"/></label>
      <label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold text-[#173A37]">Email <span className="font-normal text-[#789089]">(optional)</span></span><input disabled={!enabled || busy} name="email" type="email" autoComplete="email" maxLength={254} className="min-h-12 w-full rounded-xl border border-[#C9DDD5] px-3 text-sm outline-none focus:ring-2 focus:ring-[#087F83]" placeholder="you@example.com"/></label>
      <label><span className="mb-2 block text-sm font-bold text-[#173A37]">Preferred date <span className="font-normal text-[#789089]">(optional)</span></span><input disabled={!enabled || busy} name="requestedDate" type="date" className="min-h-12 w-full rounded-xl border border-[#C9DDD5] px-3 text-sm outline-none focus:ring-2 focus:ring-[#087F83]"/></label>
      <label><span className="mb-2 block text-sm font-bold text-[#173A37]">Preferred time <span className="font-normal text-[#789089]">(optional)</span></span><input disabled={!enabled || busy} name="requestedTime" type="time" className="min-h-12 w-full rounded-xl border border-[#C9DDD5] px-3 text-sm outline-none focus:ring-2 focus:ring-[#087F83]"/></label>
    </div>
    <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[#526D66]"><input required disabled={!enabled || busy} name="consent" type="checkbox" className="mt-1 h-4 w-4 accent-[#087F83]"/><span>I agree that DOCVY may use my contact details and selected provider to coordinate this appointment enquiry with that clinic or hospital. I understand it is not confirmed until the provider confirms the slot and fee. Read the <Link className="font-semibold text-[#087F83] underline" href="/legal/privacy" target="_blank">Privacy Policy</Link> and <Link className="font-semibold text-[#087F83] underline" href="/legal/terms" target="_blank">Terms</Link>.</span></label>
    <label aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"><span>Leave this field blank</span><input tabIndex={-1} autoComplete="off" name="website"/></label>
    {error && <p role="alert" className="mt-4 rounded-xl bg-[#FFF1ED] p-3 text-sm text-[#8E2D20]">{error}</p>}
    <button type="submit" disabled={!enabled || busy || !selection} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white transition hover:bg-[#066D70] disabled:cursor-not-allowed disabled:bg-[#9AB8AF]">{busy ? <><LoaderCircle size={17} className="animate-spin"/> Sending your enquiry…</> : <>Send appointment enquiry <ArrowRight size={17}/></>}</button>
    <p className="mt-3 text-center text-xs leading-5 text-[#789089]">No payment is taken on DOCVY. Any consultation fee is confirmed and paid directly to the provider.</p>
  </form>;
}
