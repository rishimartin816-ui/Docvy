"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import type { ProviderCandidate } from "@/lib/provider-candidates";

type Props = { doctors: ProviderCandidate[]; initialProvider: string; initialCity: string; initialFacility?: string; enabled: boolean };
type Result = { ok?: boolean; referenceId?: string; error?: string };

function keyFor(providerId: string, city: string, facility: string) {
  return `${providerId}::${city}::${facility}`;
}

export default function AppointmentRequestForm({ doctors, initialProvider, initialCity, initialFacility, enabled }: Props) {
  const locations = useMemo(() => doctors.flatMap((doctor) => doctor.locations.map((location) => ({
    key: keyFor(doctor.id, location.city, location.facility),
    providerId: doctor.id,
    provider: doctor.name,
    organisation: doctor.hospital,
    city: location.city,
    facility: location.facility,
  }))), [doctors]);
  const initialOption = locations.find((item) => item.providerId === initialProvider && (!initialCity || item.city.toLowerCase() === initialCity.toLowerCase()) && (!initialFacility || item.facility === initialFacility))?.key ?? "";
  const [selection, setSelection] = useState(initialOption);
  const [busy, setBusy] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [error, setError] = useState("");
  const requestId = useRef("");
  const selected = locations.find((item) => item.key === selection);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || busy || !selected) return;
    setBusy(true);
    setError("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const payload = {
      requestId: requestId.current,
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
      requestId.current = "";
      formElement.reset();
      setSelection(initialOption);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not send your enquiry. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  if (referenceId) return <section className="rounded-[24px] border border-line bg-white p-6  md:p-8" role="status" aria-live="polite">
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-ink"><CheckCircle2 strokeWidth={1.5} size={25}/></span>
    <p className="mt-5 text-xs font-extrabold tracking-[0.14em] text-ink">ENQUIRY RECEIVED</p>
    <h2 className="mt-2 text-2xl font-bold text-ink">DOCVY has your request.</h2>
    <p className="mt-3 text-sm leading-6 text-grey">Your reference is <strong>{referenceId}</strong>. DOCVY received your enquiry for the provider you selected. It is not a confirmed appointment and no slot has been reserved. The hospital or clinic must confirm the doctor, time and any fee.</p>
    <Link href="/doctors" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white">Return to doctor listings <ArrowRight strokeWidth={1.5} size={16}/></Link>
  </section>;

  return <form onSubmit={submit} onChange={() => { requestId.current = ""; }} className="rounded-[24px] border border-line bg-white p-6  md:p-8">
    {!enabled && <div role="status" className="mb-5 rounded-xl border border-line bg-surface p-4 text-sm leading-6 text-[#B45309]">Appointment enquiries are not open yet because DOCVY’s private intake connection is not configured. This form is not collecting your details.</div>}
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold text-ink">Choose a doctor and location <span className="text-[#B42318]">*</span></span><select required disabled={!enabled || busy} value={selection} onChange={(event) => setSelection(event.target.value)} className="min-h-12 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none focus:ring-2 focus:ring-primary"><option value="">Select a listed doctor</option>{locations.map((item) => <option key={item.key} value={item.key}>{item.provider} · {item.city} · {item.facility}</option>)}</select></label>
      <label><span className="mb-2 block text-sm font-bold text-ink">Your name <span className="text-[#B42318]">*</span></span><input required disabled={!enabled || busy} name="name" autoComplete="name" maxLength={100} className="min-h-12 w-full rounded-xl border border-line px-3 text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="Full name"/></label>
      <label><span className="mb-2 block text-sm font-bold text-ink">Mobile number <span className="text-[#B42318]">*</span></span><input required disabled={!enabled || busy} name="mobile" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} className="min-h-12 w-full rounded-xl border border-line px-3 text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="10-digit mobile number"/></label>
      <label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold text-ink">Email <span className="font-normal text-grey">(optional)</span></span><input disabled={!enabled || busy} name="email" type="email" autoComplete="email" maxLength={254} className="min-h-12 w-full rounded-xl border border-line px-3 text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com"/></label>
      <label><span className="mb-2 block text-sm font-bold text-ink">Preferred date <span className="font-normal text-grey">(optional)</span></span><input disabled={!enabled || busy} name="requestedDate" type="date" className="min-h-12 w-full rounded-xl border border-line px-3 text-sm outline-none focus:ring-2 focus:ring-primary"/></label>
      <label><span className="mb-2 block text-sm font-bold text-ink">Preferred time <span className="font-normal text-grey">(optional)</span></span><input disabled={!enabled || busy} name="requestedTime" type="time" className="min-h-12 w-full rounded-xl border border-line px-3 text-sm outline-none focus:ring-2 focus:ring-primary"/></label>
    </div>
    <p className="mt-3 rounded-xl bg-surface px-4 py-3 text-sm leading-6 text-grey">Not sure of a date or time? Leave your preferences blank and send the request. The provider still needs to confirm availability.</p>
    <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-grey"><input required disabled={!enabled || busy} name="consent" type="checkbox" className="mt-1 h-4 w-4 accent-primary"/><span>I agree that DOCVY may store my contact details and appointment preferences and share them with authorized staff at the selected clinic or hospital for appointment follow-up. I understand sending it does not reserve a slot or confirm an appointment. Read the <Link className="font-semibold text-ink underline" href="/legal/privacy" target="_blank">Privacy Policy</Link> and <Link className="font-semibold text-ink underline" href="/legal/terms" target="_blank">Terms</Link>.</span></label>
    <label aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"><span>Leave this field blank</span><input tabIndex={-1} autoComplete="off" name="website"/></label>
    {error && <p role="alert" className="mt-4 rounded-xl bg-[#FFFFFF] p-3 text-sm text-[#B42318]">{error}</p>}
    <button type="submit" disabled={!enabled || busy || !selection} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:bg-grey">{busy ? <><LoaderCircle strokeWidth={1.5} size={17} className="animate-spin"/> Sending your request…</> : <>Request an appointment <ArrowRight strokeWidth={1.5} size={17}/></>}</button>
    <p className="mt-3 text-center text-xs leading-5 text-grey">No payment is taken on DOCVY. Any consultation fee is confirmed and paid directly to the provider.</p>
  </form>;
}
