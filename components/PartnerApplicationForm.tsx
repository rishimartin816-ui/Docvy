"use client";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { portraitData } from "@/lib/portrait-upload";

export default function PartnerApplicationForm({ specialties }: { specialties: string[] }) {
  const [ready,setReady]=useState(false), [role,setRole]=useState("doctor"), [busy,setBusy]=useState(false), [error,setError]=useState(""), [reference,setReference]=useState("");
  const requestId=useRef(""), list=useId(), field="docvy-select mt-2";
  useEffect(()=>setReady(true),[]);
  if(reference)return <section role="status" className="docvy-glass p-6"><h2 className="text-2xl font-medium">Application Saved</h2><p className="mt-4">Reference: <strong>{reference}</strong></p><p className="mt-4 leading-7">Your details and portrait are saved privately for DOCVY review. Approved details will appear on your profile.</p><Link href="/for-doctors" className="docvy-pill mt-5">For Doctors</Link></section>;
  return <form method="post" action="/api/partner-application" className="docvy-glass grid gap-6 p-6 sm:p-8" onSubmit={async event=>{
    event.preventDefault();setBusy(true);setError("");
    const form=new FormData(event.currentTarget);if(!requestId.current)requestId.current=crypto.randomUUID();
    try {
      const file=form.get("portrait");if(!(file instanceof File)||!file.size)throw new Error("Upload the doctor's professional photograph.");
      const photo=await portraitData(file);form.delete("portrait");
      const result=await fetch("/api/partner-application",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...Object.fromEntries(form),photo,consent:form.get("consent")==="on",requestId:requestId.current})});
      const data=await result.json();if(!result.ok||!data.reference)throw new Error(data.error||"Your application could not be saved. Retry with the same details.");
      setReference(data.reference);
    }catch(failure){setError(failure instanceof Error?failure.message:"Please try again.");}finally{setBusy(false);}
  }}>
    <p className="text-sm text-grey">Complete the required details below. Biography and additional links are optional.</p>
    <label className="text-sm font-medium">Applying As<select name="role" value={role} onChange={event=>setRole(event.target.value)} className={field}><option value="doctor">Doctor</option><option value="clinic">Authorised Clinic / Hospital Representative</option></select></label>
    <fieldset><legend className="mb-4 text-xl font-medium">Doctor Details</legend><div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-medium">Full Name<input name="doctorName" required minLength={2} maxLength={120} autoComplete="name" autoCapitalize="words" className={field}/></label>
      <label className="text-sm font-medium">Speciality<input name="specialty" required minLength={2} maxLength={100} list={list} className={field}/><datalist id={list}>{specialties.map(name=><option key={name} value={name}/>)}</datalist></label>
      <label className="text-sm font-medium">Qualifications<input name="qualifications" required minLength={2} maxLength={300} placeholder="e.g. MBBS, MD / BHMS / BPT" className={field}/></label>
      <label className="text-sm font-medium">Experience (Years)<input name="experienceYears" type="number" required min={0} max={80} step="0.01" className={field}/></label>
      <label className="text-sm font-medium">Registration Number<input name="registrationNumber" required minLength={2} maxLength={100} className={field}/></label>
      <label className="text-sm font-medium">Registration Council / Body<input name="registrationCouncil" required minLength={2} maxLength={150} className={field}/></label>
      <label className="text-sm font-medium">Professional Photograph<input name="portrait" type="file" required accept="image/jpeg,image/png,image/webp" className="mt-2 block min-h-11 w-full text-sm"/><span className="mt-1 block text-xs font-normal text-grey">JPG, PNG or WebP · Up to 8 MB</span></label>
      <label className="text-sm font-medium">Languages (Optional)<input name="languages" maxLength={150} placeholder="e.g. Hindi, English" className={field}/></label>
    </div></fieldset>
    <fieldset><legend className="mb-4 text-xl font-medium">Clinic &amp; Appointments</legend><div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-medium">Clinic / Hospital {role==="doctor"&&"(Optional)"}<input name="facility" required={role==="clinic"} maxLength={160} autoComplete="organization" className={field}/></label>
      <label className="text-sm font-medium">Public Appointment Number<input name="practicePhone" type="tel" required minLength={10} maxLength={24} autoComplete="tel" className={field}/></label>
      <label className="text-sm font-medium sm:col-span-2">Full Clinic Address<textarea name="address" required minLength={10} maxLength={400} rows={2} autoComplete="street-address" className={field}/></label>
      <div className="grid gap-4 sm:col-span-2 sm:grid-cols-3">
        <label className="text-sm font-medium">City<input name="city" required minLength={2} maxLength={60} autoComplete="address-level2" className={field}/></label>
        <label className="text-sm font-medium">State / UT<input name="state" required minLength={2} maxLength={60} autoComplete="address-level1" className={field}/></label>
        <label className="text-sm font-medium">PIN Code<input name="postalCode" required pattern="[1-9][0-9]{5}" maxLength={6} inputMode="numeric" autoComplete="postal-code" className={field}/></label>
      </div>
      <label className="text-sm font-medium">Consultation Fee (₹)<input name="consultationFee" type="number" required min={0} max={100000} step={1} placeholder="0 for free consultations" className={field}/></label>
      <label className="text-sm font-medium">Consultation Timings<input name="consultingHours" required minLength={2} maxLength={100} placeholder="e.g. 9 AM–2 PM, 5 PM–8 PM" className={field}/></label>
      <label className="text-sm font-medium sm:col-span-2">Working Days<input name="workingDays" required minLength={2} maxLength={80} placeholder="e.g. Monday–Saturday" className={field}/></label>
    </div></fieldset>
    <details className="rounded-xl border border-line p-4"><summary className="cursor-pointer font-medium">Additional Profile Details (Optional)</summary><div className="mt-4 grid gap-4">
      <label className="text-sm">Biography<textarea name="bio" maxLength={2000} rows={3} className={field}/></label>
      <label className="text-sm">Services / Treatments<input name="services" maxLength={500} className={field}/></label>
      <label className="text-sm">Google Maps Link<input name="mapsUrl" type="url" maxLength={500} placeholder="https://" className={field}/></label>
      <label className="text-sm">Professional Website<input name="sourceUrl" type="url" maxLength={500} placeholder="https://" className={field}/></label>
    </div></details>
    <fieldset><legend className="mb-4 text-xl font-medium">Private Review Contact</legend><div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-medium">Work Email<input name="email" type="email" required maxLength={254} autoComplete="email" className={field}/></label>
      <label className="text-sm font-medium">Work Mobile<input name="phone" type="tel" required minLength={10} maxLength={24} className={field}/></label>
    </div><p className="mt-2 text-xs text-grey">These review contacts stay private. Only the appointment number is displayed publicly.</p></fieldset>
    <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label className="flex items-start gap-3 text-sm leading-7"><input name="consent" type="checkbox" required className="mt-1.5 h-5 w-5 shrink-0 accent-primary"/><span>I am this doctor or an authorised representative. I authorise DOCVY to publish approved profile details and my portrait, receive appointment requests, use the approved profile for DOCVY marketing, and contact me about this application. <Link href="/legal/privacy" className="underline">Privacy Policy</Link> · <Link href="/legal/terms" className="underline">Terms</Link>.</span></label>
    {error&&<p role="alert" className="text-sm text-danger">{error}</p>}
    <button type="submit" disabled={!ready||busy} className="docvy-pill docvy-pill-primary justify-self-start">{busy?"Saving…":"Submit Profile"}</button>
  </form>;
}
