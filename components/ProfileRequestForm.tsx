"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DoctorProfileSearch, { type ClaimDoctor } from "./DoctorProfileSearch";
async function portraitData(file: File) {
  if (!file.size) return undefined;
  if (file.size > 8 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Choose a JPG, PNG or WebP portrait under 8 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    const ratio = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * ratio)); canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not prepare the portrait.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", 0.85);
  } finally { bitmap.close(); }
}
export default function ProfileRequestForm({ kind, doctors, initialProvider }: { kind: "claim" | "removal"; doctors: ClaimDoctor[]; initialProvider: string }) {
  const initial=doctors.find(d=>d.id===initialProvider);
  const [providerId,setProviderId]=useState(initial?.id??"");
  const [doctorName,setDoctorName]=useState(initial?.name??"");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [photoNotice, setPhotoNotice] = useState("");
  const id = useRef("");
  if (reference) return <section role="status" className="docvy-glass p-6"><h2 className="text-xl font-medium">Your request is saved</h2><p className="mt-4">Reference: <strong>{reference}</strong>.</p><p className="mt-3">{kind === "removal" ? "Your removal request is due within 48 hours." : "DOCVY will review your authority and written consent before changing the profile. This does not mark it verified."}</p>{photoNotice && <p className="mt-3 text-sm">{photoNotice}</p>}<p className="mt-3 text-sm text-grey">Email notification to contact@docvy.in is pending while email delivery is being connected. Your private review record has been saved.</p></section>;
  return <form method="post" action="/api/profile-request" className="docvy-glass grid gap-5 p-6" onSubmit={async event => {
    event.preventDefault(); setBusy(true); setError("");
    if(!providerId){setError("Search your name and select the correct profile first.");setBusy(false);return;}
    const form = new FormData(event.currentTarget);
    if (!id.current) id.current = crypto.randomUUID();
    try {
      const file = form.get("portrait");
      const photo = file instanceof File ? await portraitData(file) : undefined;
      form.delete("portrait");
      const response = await fetch("/api/profile-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(form), photo, requestId: id.current, kind, consent: form.get("consent") === "on" }) });
      const data = await response.json() as { reference?: string; error?: string; photoStatus?: string };
      if (!response.ok || !data.reference) throw new Error(data.error || "The request could not be saved.");
      setReference(data.reference);
      if (data.photoStatus === "private_review") setPhotoNotice("Your portrait is stored privately for review. It is not public yet.");
      if (data.photoStatus === "upload_failed") setPhotoNotice("Your request was saved, but the portrait upload failed. Contact DOCVY with your reference to arrange a replacement.");
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Please try again."); }
    finally { setBusy(false); }
  }}>
    <DoctorProfileSearch disabled={!ready || busy} doctors={doctors} selectedId={providerId} onSelect={doctor=>{setProviderId(doctor?.id??"");setDoctorName(doctor?.name??"");}} partnerLink={kind==="claim"}/>
    <label className="text-sm font-medium">Doctor name<input required name="doctorName" value={doctorName} onChange={e=>setDoctorName(e.target.value)} maxLength={120} autoComplete="name" className="docvy-select mt-2" /></label>
    {kind === "claim" && <><label className="text-sm font-medium">Medical registration number<input required name="registrationNumber" maxLength={100} className="docvy-select mt-2" /></label><label className="text-sm font-medium">Registration council<input required name="registrationCouncil" maxLength={150} placeholder="State medical council or NMC" className="docvy-select mt-2" /></label></>}
    <label className="text-sm font-medium">Work email<input required type="email" name="email" maxLength={254} autoComplete="email" className="docvy-select mt-2" /></label>
    <label className="text-sm font-medium">Work phone (optional)<input type="tel" name="phone" maxLength={24} autoComplete="tel" className="docvy-select mt-2" /></label>
    {kind === "claim" && <label className="text-sm font-medium">Your professional bio (optional)<textarea name="bio" maxLength={2000} rows={4} className="docvy-select mt-2" /><span className="mt-2 block font-normal text-grey">Only your approved bio and your own uploaded photo will be published after consent review.</span></label>}
    {kind === "claim" && <label className="text-sm font-medium">Your own portrait (optional)<input type="file" name="portrait" accept="image/jpeg,image/png,image/webp" className="mt-2 block min-h-11 w-full text-sm" /><span className="mt-2 block font-normal text-grey">JPG, PNG or WebP, up to 8 MB. It is resized and stored privately until approved. Upload only a photo you are authorised to use.</span></label>}
    <label className="text-sm font-medium">{kind === "removal" ? "Removal details" : "Your role and authority to claim"}<textarea required name="details" maxLength={1500} rows={3} className="docvy-select mt-2" /><span className="mt-2 block font-normal text-grey">Do not include patient information or identity documents.</span></label>
    <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="flex gap-3 text-sm leading-7"><input required type="checkbox" name="consent" className="mt-1.5 h-5 w-5 shrink-0 accent-primary" /><span>{kind === "claim" ? "I am this doctor or an authorised clinic representative. I give written consent to this profile being listed on DOCVY and to receiving appointment requests." : "I am this doctor or an authorised representative and request removal of this profile."} I agree that DOCVY may use these details to review and respond to this request. <Link className="underline" href="/legal/privacy">Privacy policy</Link>.</span></label>
    {error && <p role="alert" className="text-sm text-danger">{error}</p>}
    <button disabled={!ready || busy || !providerId} className="docvy-pill docvy-pill-primary justify-self-start" type="submit">{busy ? "Saving…" : kind === "claim" ? "Submit claim for review" : "Request removal"}</button>
  </form>;
}
