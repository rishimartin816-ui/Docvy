"use client";
import Link from "next/link";
import { useState } from "react";

export type PartnerApplication = { id: string; reference: string; created_at: string; status: string; provider_id: string | null; evidence: string | null; payload: Record<string, string | boolean> };
const fields = [
  ["doctorName", "Doctor name", 120, true], ["specialty", "Primary specialty", 100, true],
  ["city", "City", 60, true], ["facility", "Clinic / hospital (optional for independent doctors)", 160, false],
  ["locality", "Neighbourhood (optional)", 100, false], ["address", "Public practice address (optional)", 400, false],
  ["registrationNumber", "Registration number", 100, true], ["registrationCouncil", "Registration council", 150, true],
  ["sourceUrl", "Official professional website (optional)", 500, false],
] as const;

export default function PartnerApplicationsReview({ applications, onSaved }: { applications: PartnerApplication[]; onSaved: () => Promise<unknown> }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const pending = applications.filter(a => a.status === "pending");
  return <section className="mt-10"><h2 className="text-2xl font-medium">Partner applications</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-grey">Review the submitter’s identity, authority, consent and proposed public details. Approval creates a claimed profile and enables appointment requests. Registration verification remains a separate manual check.</p>
    {!pending.length && <p className="mt-4 text-grey">No pending partner applications.</p>}
    <div className="mt-4 grid gap-5">{pending.map(application => <details key={application.id} className="docvy-glass p-5">
      <summary className="min-h-11 cursor-pointer font-medium">{String(application.payload.doctorName)} · {String(application.payload.city)} · {application.reference}</summary>
      <p className="mt-4 break-words text-sm">Private contact: {String(application.payload.email)} · {String(application.payload.phone)}</p>
      <p className="mt-2 text-sm">Applying as: {application.payload.role === "clinic" ? "Authorised clinic / hospital representative" : "Doctor"} · Received {new Date(application.created_at).toLocaleString("en-IN")}</p>
      <p className="mt-3 whitespace-pre-wrap text-sm">Authority statement: {String(application.payload.details)}</p>
      <p className="mt-3 text-sm">Listing and appointment-request consent: {application.payload.consent === true ? "Given in application" : "Missing"}</p>
      <form method="post" action="/api/directory-admin/partner" className="mt-5 grid gap-5" onSubmit={async event => {
        event.preventDefault(); setBusy(true); setMessage("");
        const form = new FormData(event.currentTarget);
        try {
          const result = await fetch("/api/directory-admin/partner", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ applicationId: application.id, action: form.get("action"), data: { ...Object.fromEntries(form), confirmedConsent: form.get("confirmedConsent") === "on" } }) });
          const data = await result.json() as { error?: string; providerId?: string };
          if (!result.ok) throw new Error(data.error || "Could not save this review.");
          await onSaved(); setMessage(data.providerId ? "Approved. The claimed profile is now published. Verify registration separately before awarding the badge." : "Application rejected. No public profile was created.");
        } catch (error) { setMessage(error instanceof Error ? error.message : "Could not save this review."); }
        finally { setBusy(false); }
      }}>
        <div className="grid gap-5 sm:grid-cols-2">{fields.map(([name,label,max,required]) => <label className="text-sm" key={name}>{label}<input name={name} maxLength={max} required={required} defaultValue={String(application.payload[name] ?? "")} type={name === "sourceUrl" ? "url" : "text"} className="docvy-select mt-2" /></label>)}</div>
        <label className="text-sm">Approved doctor-supplied bio<textarea name="bio" maxLength={2000} rows={4} defaultValue={String(application.payload.bio ?? "")} className="docvy-select mt-2" /></label>
        <label className="text-sm">Decision<select name="action" className="docvy-select mt-2"><option value="approve">Approve and publish claimed profile</option><option value="reject">Reject application</option></select></label>
        <label className="flex items-start gap-3 text-sm leading-7"><input type="checkbox" name="confirmedConsent" className="mt-1.5 h-5 w-5 shrink-0" /><span>I checked the submitter’s authority and written consent to publication and appointment requests. Required for approval.</span></label>
        <label className="text-sm">Review evidence and reason<textarea name="evidence" required minLength={10} maxLength={2000} rows={3} className="docvy-select mt-2" /></label>
        <button disabled={busy} className="docvy-pill docvy-pill-primary justify-self-start">{busy ? "Saving…" : "Save application review"}</button>
      </form>
    </details>)}</div>
    {message && <p role="status" className="mt-4 rounded-xl border border-line p-4">{message}</p>}
    {applications.some(a=>a.status!=="pending") && <details className="mt-5"><summary className="min-h-11 cursor-pointer">Previous application decisions</summary><ul className="space-y-3">{applications.filter(a=>a.status!=="pending").slice(0,30).map(a=><li key={a.id} className="border-b border-line py-3 text-sm">{a.reference} · {String(a.payload.doctorName)} · {a.status}{a.provider_id && <> · <Link className="underline" href={"/doctor/"+a.provider_id}>View profile</Link></>}<p className="mt-2">{a.evidence}</p></li>)}</ul></details>}
  </section>;
}
