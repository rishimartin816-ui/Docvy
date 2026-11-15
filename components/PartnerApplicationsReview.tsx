"use client";
import Link from "next/link";
import { useState } from "react";

export type PartnerApplication = { id: string; reference: string; created_at: string; status: string; provider_id: string | null; evidence: string | null; payload: Record<string, string | boolean | number> };
const fields = [
  ["doctorName","Doctor Name",120,true],["specialty","Speciality",100,true],
  ["qualifications","Qualifications",300,true],["experienceYears","Experience (Years)",8,true],
  ["registrationNumber","Registration Number",100,true],["registrationCouncil","Registration Body",150,true],
  ["facility","Clinic / Hospital",160,false],["city","City",60,true],["state","State / UT",60,true],
  ["postalCode","PIN Code",6,true],["locality","Locality",100,false],["address","Public Clinic Address",400,true],
  ["consultationFee","Consultation Fee (₹)",8,true],["workingDays","Working Days",80,true],
  ["consultingHours","Consultation Timings",100,true],["practicePhone","Public Appointment Number",24,true],
  ["languages","Languages",150,false],["services","Services / Treatments",500,false],
  ["mapsUrl","Google Maps Link",500,false],["sourceUrl","Professional Website",500,false],
] as const;
const extended = new Set(["qualifications","experienceYears","state","postalCode","address","consultationFee","workingDays","consultingHours","practicePhone"]);
export default function PartnerApplicationsReview({applications,onSaved}:{applications:PartnerApplication[];onSaved:()=>Promise<unknown>}) {
  const [busy,setBusy]=useState(false),[message,setMessage]=useState("");
  async function save(application:PartnerApplication,data:Record<string,unknown>,action="approve"){
    const result=await fetch("/api/directory-admin/partner",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({applicationId:application.id,action,data})});
    const response=await result.json();if(!result.ok)throw new Error(response.error||"Could not save this review.");
    await onSaved();setMessage(response.providerId?"Approved profile and supplied details are published.":"Application rejected.");
  }
  return <section className="mt-10"><h2 className="text-2xl font-medium">Partner Applications</h2>
    <p className="mt-3 text-sm leading-7 text-grey">Review the professional details and portrait, then approve the public profile. Private review contacts stay private.</p>
    {!applications.some(a=>a.status==="pending")&&<p className="mt-4 text-grey">No pending partner applications.</p>}
    <div className="mt-4 grid gap-5">{applications.filter(a=>a.status==="pending").map(application=><details key={application.id} className="docvy-glass p-5">
      <summary className="min-h-11 cursor-pointer font-medium">{String(application.payload.doctorName)} · {String(application.payload.city)} · {application.reference}</summary>
      <p className="mt-4 text-sm">Private Contact: {String(application.payload.email)} · {String(application.payload.phone)}</p>
      <p className="mt-2 text-sm">Authority: {String(application.payload.details)}</p>
      <p className="mt-2 text-sm">Publication Consent: {application.payload.consent===true?"Given":"Missing"}</p>
      {application.payload.hasPhoto===true&&<a href={"/api/directory-admin/photo?application="+application.id} target="_blank" rel="noopener noreferrer" className="docvy-pill mt-3">Review Uploaded Portrait</a>}
      <form className="mt-5 grid gap-4" onSubmit={async event=>{
        event.preventDefault();setBusy(true);setMessage("");const form=new FormData(event.currentTarget);
        try{await save(application,{...Object.fromEntries(form),confirmedConsent:form.get("confirmedConsent")==="on"},String(form.get("action")));}catch(error){setMessage(error instanceof Error?error.message:"Could not save this review.");}finally{setBusy(false);}
      }}>
        <div className="grid gap-4 sm:grid-cols-2">{fields.map(([name,label,max,required])=><label className="text-sm" key={name}>{label}<input name={name} maxLength={max} required={required&&(!extended.has(name)||application.payload.profileVersion===2)} defaultValue={String(application.payload[name]??"")} type={["experienceYears","consultationFee"].includes(name)?"number":["mapsUrl","sourceUrl"].includes(name)?"url":"text"} min={["experienceYears","consultationFee"].includes(name)?0:undefined} step={name==="experienceYears"?"0.01":name==="consultationFee"?"1":undefined} className="docvy-select mt-2"/></label>)}</div>
        <label className="text-sm">Approved Biography (Optional)<textarea name="bio" maxLength={2000} rows={3} defaultValue={String(application.payload.bio??"")} className="docvy-select mt-2"/></label>
        <label className="text-sm">Decision<select name="action" className="docvy-select mt-2"><option value="approve">Approve and Publish Claimed Profile</option><option value="reject">Reject Application</option></select></label>
        <label className="flex gap-3 text-sm leading-7"><input type="checkbox" name="confirmedConsent" className="mt-1.5 h-5 w-5 shrink-0"/><span>I reviewed the authority, supplied portrait and consent to publication. Required for approval.</span></label>
        <label className="text-sm">Review Evidence<textarea name="evidence" required minLength={10} maxLength={2000} rows={2} className="docvy-select mt-2"/></label>
        <button disabled={busy} className="docvy-pill docvy-pill-primary justify-self-start">{busy?"Saving…":"Save Review"}</button>
      </form>
    </details>)}</div>
    {message&&<p role="status" className="mt-4 rounded-xl border border-line p-4">{message}</p>}
    {applications.some(a=>a.status!=="pending")&&<details className="mt-5"><summary className="min-h-11 cursor-pointer">Previous Application Decisions</summary><ul className="space-y-3">{applications.filter(a=>a.status!=="pending").slice(0,30).map(application=><li key={application.id} className="border-b border-line py-3 text-sm">{application.reference} · {String(application.payload.doctorName)} · {application.status}{application.provider_id&&<> · <Link href={"/doctor/"+application.provider_id} className="underline">View Profile</Link></>}<p className="mt-2">{application.evidence}</p>{application.status==="approved"&&application.payload.hasPhoto===true&&application.payload.photoPublished!==true&&<button disabled={busy} className="docvy-pill mt-3" onClick={async()=>{setBusy(true);try{await save(application,{confirmedConsent:true,evidence:"Finish publication of the portrait approved with this application."});}catch(error){setMessage(error instanceof Error?error.message:"Photo publication failed.");}finally{setBusy(false);}}}>Finish Photo Publication</button>}</li>)}</ul></details>}
  </section>;
}
