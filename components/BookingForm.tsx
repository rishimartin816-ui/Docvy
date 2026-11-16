"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Provider={key:string;id:string;name:string;city:string;facility:string;mode:"approval"|"instant"};
type Slot={id:string;startsAt:string;endsAt:string};
type Result={ok?:boolean;reference?:string;status?:string;mode?:string;receiptKey?:string;error?:string};
const fmt=(v:string)=>new Intl.DateTimeFormat("en-IN",{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Kolkata"}).format(new Date(v));
export default function BookingForm(){
  const [providers,setProviders]=useState<Provider[]>([]);
  const [selected,setSelected]=useState("");
  const [slots,setSlots]=useState<Slot[]>([]);
  const [slotId,setSlotId]=useState("");
  const [loading,setLoading]=useState(true);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");
  const [result,setResult]=useState<Result|null>(null);
  const requestKey=useRef<string|null>(null);
  const active=providers.find(p=>p.key===selected);
  useEffect(()=>{
    let mounted=true;
    fetch("/api/booking/providers",{cache:"no-store"}).then(r=>r.json()).then((data:{providers?:Provider[]})=>{
      if(mounted){setProviders(data.providers??[]);const requested=new URLSearchParams(window.location.search).get("provider");const match=data.providers?.find(p=>p.id===requested);if(match)setSelected(match.key);}
    }).catch(()=>{if(mounted)setMessage("Could not check participating doctors.")})
      .finally(()=>{if(mounted)setLoading(false)});
    return ()=>{mounted=false};
  },[]);
  useEffect(()=>{
    let mounted=true;
    setSlots([]);setSlotId("");
    if(!active||active.mode!=="instant")return;
    fetch(`/api/booking/slots?provider=${encodeURIComponent(active.id)}&city=${encodeURIComponent(active.city)}&facility=${encodeURIComponent(active.facility)}`,{cache:"no-store"})
      .then(r=>r.json()).then((data:{slots?:Slot[]})=>{if(mounted)setSlots(data.slots??[])})
      .catch(()=>{if(mounted)setMessage("Could not load appointment slots.")});
    return ()=>{mounted=false};
  },[active]);
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(!active||busy)return;
    setBusy(true);setMessage("");
    if(!requestKey.current)requestKey.current=crypto.randomUUID();
    const data=new FormData(e.currentTarget);
    const payload={
      idempotencyKey:requestKey.current,providerId:active.id,city:active.city,facility:active.facility,
      name:data.get("name"),mobile:data.get("mobile"),email:data.get("email"),
      requestedDate:data.get("requestedDate"),requestedTime:data.get("requestedTime"),
      slotId:active.mode==="instant"?slotId:"",consent:data.get("consent")==="on",
      website:data.get("website"),
    };
    try{
      const response=await fetch("/api/booking",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const body=await response.json() as Result;
      if(!response.ok||!body.ok)throw new Error(body.error||"Request was not accepted.");
      setResult(body);requestKey.current=null;
    }catch(error){setMessage(error instanceof Error?error.message:"Could not submit request.")}
    finally{setBusy(false)}
  }
  if(result)return <section className="mt-8 rounded-3xl border border-[#B8DCD0] bg-white p-7" role="status">
    <p className="text-xs font-bold uppercase tracking-[.16em] text-[#087F83]">DOCVY reference</p>
    <h2 className="mt-2 text-2xl font-bold">{result.reference}</h2>
    <p className="mt-3 text-sm leading-6 text-[#526D66]">{result.status==="confirmed"?
      "Appointment confirmed. Please retain this reference and verify the location details before travelling.":
      "Your request is pending confirmation. No appointment has been reserved yet; DOCVY must confirm your date and time before you travel."}</p>
    {result.receiptKey&&<a className="mt-5 inline-flex rounded-xl border px-4 py-3" href={"/appointments/track#reference="+encodeURIComponent(result.reference??"")+"&receipt="+encodeURIComponent(result.receiptKey)}>Track and verify your DOCVY visit</a>}
    <p className="mt-3 text-sm">Save this private tracking link. Do not share it with your provider.</p>
    <button className="mt-5 rounded-xl border px-4 py-2" onClick={()=>setResult(null)}>Request another appointment</button>
  </section>;
  return <form onSubmit={submit} onChange={()=>{requestKey.current=null}} className="mt-8 space-y-5 rounded-3xl border border-[#DCEAE5] bg-white p-6 shadow-sm md:p-8">
    {loading?<p role="status">Checking participating doctors…</p>:providers.length===0?
      <p role="status" className="rounded-xl bg-[#FFF4E4] p-4 text-sm">Online appointment bookings are not accepting requests at present. No doctor has been activated for this booking service.</p>:null}
    <label className="block text-sm font-semibold">Doctor and location
      <select required className="mt-2 w-full rounded-xl border p-3" value={selected} onChange={e=>{setSelected(e.target.value);requestKey.current=null}} disabled={busy||!providers.length}>
        <option value="">Select a participating provider</option>
        {providers.map(p=><option key={p.key} value={p.key}>{p.name} — {p.city} · {p.facility}</option>)}
      </select>
    </label>
    {active&&<div className="rounded-xl bg-[#F1F8F5] p-4 text-sm leading-6">
      <strong>{active.mode==="instant"?"Available-slot booking":"DOCVY-approved booking"}</strong>
      <p>{active.mode==="instant"?"Select a listed clinic-managed slot. Confirmation is issued only when that slot is successfully reserved.":active.city==="Online"?"Online consultations require the doctor’s availability and confirmation through DOCVY. No automatic online slots are published.":"Your preferred date and time will remain pending until DOCVY checks the doctor’s availability and confirms it."}</p>
    </div>}
    {active?.mode==="instant"?<label className="block text-sm font-semibold">Available slot
      <select required className="mt-2 w-full rounded-xl border p-3" value={slotId} onChange={e=>setSlotId(e.target.value)}>
        <option value="">Select available date and time</option>
        {slots.map(s=><option key={s.id} value={s.id}>{fmt(s.startsAt)}</option>)}
      </select>
      {!slots.length&&<span className="mt-1 block text-xs text-[#946029]">No confirmed slots available. Try another provider or contact DOCVY.</span>}
    </label>:active?<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="text-sm font-semibold">Preferred date <input type="date" name="requestedDate" required className="mt-2 w-full rounded-xl border p-3"/></label>
      <label className="text-sm font-semibold">Preferred time <input type="time" name="requestedTime" required className="mt-2 w-full rounded-xl border p-3"/></label>
    </div>:null}
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-semibold">Patient name <input required minLength={2} maxLength={100} name="name" autoComplete="name" className="mt-2 w-full rounded-xl border p-3"/></label>
      <label className="text-sm font-semibold">Mobile number <input required name="mobile" inputMode="tel" pattern="[6-9][0-9]{9}" maxLength={10} className="mt-2 w-full rounded-xl border p-3"/></label>
      <label className="text-sm font-semibold sm:col-span-2">Email for private visit verification <input required type="email" name="email" className="mt-2 w-full rounded-xl border p-3"/></label>
    </div>
    <label className="flex gap-3 text-sm leading-6"><input required name="consent" type="checkbox" className="mt-1"/>
      <span>I consent to DOCVY using my contact details to coordinate this appointment with the selected provider. I understand requests are not confirmed until explicitly marked confirmed. See <a href="/legal/privacy" className="underline">Privacy Policy</a>.</span>
    </label>
    <div className="hidden" aria-hidden="true"><label>Leave blank<input tabIndex={-1} name="website" autoComplete="off"/></label></div>
    {message&&<p role="alert" className="rounded-xl bg-[#FFF1ED] p-3 text-sm text-[#8E2D20]">{message}</p>}
    <button disabled={!active||busy||(active.mode==="instant"&&!slotId)} className="w-full rounded-xl bg-[#087F83] px-5 py-3 font-bold text-white disabled:opacity-50">{busy?"Submitting…":active?.mode==="instant"?"Confirm this available slot":"Request an appointment"}</button>
    <p className="text-center text-xs text-[#526D66]">Consultation fees are paid directly to the healthcare provider, not DOCVY.</p>
  </form>;
}
