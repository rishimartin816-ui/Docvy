"use client";

import { useState, type FormEvent } from "react";

type Candidate={provider_id:string;doctor_name:string;city:string;facility:string};
type Option={provider_id:string;mode:string};
type Roster={id:string;provider_id:string|null;clinic_id:string;name:string;present:boolean|null};
type Clinic={id:string;name:string;city:string;booking_enabled:boolean};
type ScheduleQueue={ok?:boolean;rosters?:Roster[];clinics?:Clinic[]};
type Booking={provider_id:string;id:string;reference:string;doctor_name:string;city:string;facility:string;patient_name:string;patient_mobile:string;patient_email:string|null;preferred_date:string|null;preferred_time:string|null;confirmed_starts_at:string|null;status:string;mode:string;created_at:string;patient_attended:boolean|null;patient_response_at:string|null;patient_check_in_at:string|null};
type Queue={notifications?:{ready:boolean;queued?:number;accepted?:number;failed?:number;skipped?:number};founderManaged?:boolean;ok?:boolean;isAdmin?:boolean;cases?:Booking[];candidates?:Candidate[];profiles?:Option[];nextCursor?:string|null;summary?:{total:number;byDoctorAndCity:{provider_id:string;doctor_name:string;city:string;total:number;confirmed:number;doctor_reported:number;patient_confirmed:number;disputed:number;awaiting_patient_confirmation:number}[]};error?:string};
type AuthConfig={enabled:boolean;url?:string;anonKey?:string};
const transitions:Record<string,string[]>={
  requested:["confirmed","declined","cancelled"],
  confirmed:["cancelled","completed_reported","no_show_reported","disputed"],
  completed_reported:["disputed"],no_show_reported:["disputed"],completed_verified:["disputed"]
};
export default function BookingAdmin(){
  const [token,setToken]=useState("");
  const [range,setRange]=useState({start:"",end:""});
  const [queue,setQueue]=useState<Queue|null>(null);
  const [busy,setBusy]=useState(false);
  const [schedules,setSchedules]=useState<ScheduleQueue|null>(null);
  const [slotInputs,setSlotInputs]=useState<Record<string,{start:string;end:string}>>({});
  const [message,setMessage]=useState("");
  const [timeline,setTimeline]=useState<Record<string,{new_status:string;actor_type:string;created_at:string}[]>>({});
  const [doctorLinks,setDoctorLinks]=useState<Record<string,string>>({});
  const [filter,setFilter]=useState("all");
  const [pending,setPending]=useState<Record<string,{status:string;note:string;time:string;doctorConfirmed?:boolean}>>({});

  async function refresh(accessToken=token){
    const response=await fetch("/api/booking/admin",{headers:{Authorization:`Bearer ${accessToken}`},cache:"no-store"});
    const result=await response.json() as Queue;
    if(!response.ok||!result.ok)throw new Error(result.error||"Not permitted");
    setQueue(result);setMessage("");
    const scheduleResponse=await fetch("/api/booking/admin/schedules",{
      headers:{Authorization:`Bearer ${accessToken}`},cache:"no-store",
    });
    if(scheduleResponse.ok)setSchedules(await scheduleResponse.json() as ScheduleQueue);
  }
  async function login(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setBusy(true);setMessage("");
    const data=new FormData(e.currentTarget);
    try{
      const response=await fetch("/api/booking/admin/auth-config",{cache:"no-store"});
      const config=await response.json() as AuthConfig;
      if(!response.ok||!config.enabled||!config.url||!config.anonKey)throw new Error("Operator login is not configured.");
      const auth=await fetch(`${config.url}/auth/v1/token?grant_type=password`,{
        method:"POST",headers:{"Content-Type":"application/json",apikey:config.anonKey},
        body:JSON.stringify({email:data.get("email"),password:data.get("password")}),
      });
      const result=await auth.json() as {access_token?:string;error_description?:string;msg?:string};
      if(!auth.ok||!result.access_token)throw new Error(result.error_description||result.msg||"Login failed");
      await refresh(result.access_token);
      setToken(result.access_token);
    }catch(error){setMessage(error instanceof Error?error.message:"Could not sign in")}
    finally{setBusy(false)}
  }
  async function updateStatus(b:Booking){
    const change=pending[b.id];
    if(!change?.status)return;
    setBusy(true);setMessage("");
    try{
      const response=await fetch("/api/booking/admin",{method:"POST",
        headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
        body:JSON.stringify({
          action:"transition",caseId:b.id,status:change.status,note:change.note,doctorConfirmed:change.doctorConfirmed===true,
          confirmedStart:change.status==="confirmed"&&change.time?new Date(change.time+"+05:30").toISOString():null,
        }),
      });
      const output=await response.json() as {error?:string};
      if(!response.ok)throw new Error(output.error||"Unable to update status");
      await refresh();
    }catch(error){setMessage(error instanceof Error?error.message:"Update failed")}
    finally{setBusy(false)}
  }
  async function setMode(providerId:string,mode:string){
    setBusy(true);setMessage("");
    try{
      const response=await fetch("/api/booking/admin",{
        method:"POST",
        headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
        body:JSON.stringify({action:"mode",providerId,mode}),
      });
      const output=await response.json() as {error?:string};
      if(!response.ok)throw new Error(output.error||"Could not change booking mode");
      await refresh();
    }catch(error){setMessage(error instanceof Error?error.message:"Update failed")}
    finally{setBusy(false)}
  }
  async function scheduleAction(rosterId:string,action:"presence"|"slot"|"activate_clinic"){
    setBusy(true);setMessage("");
    try{
      const slot=slotInputs[rosterId];
      const startsAt=slot?.start?new Date(slot.start+":00+05:30").toISOString():null;
      const endsAt=slot?.end?new Date(slot.end+":00+05:30").toISOString():null;
      const response=await fetch("/api/booking/admin/schedules",{
        method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
        body:JSON.stringify({action,rosterId,startsAt,endsAt,confirmedByClinic:action==="presence"}),
      });
      const output=await response.json() as {error?:string};
      if(!response.ok)throw new Error(output.error||"Schedule update rejected");
      await refresh();
    }catch(error){setMessage(error instanceof Error?error.message:"Schedule error")}
    finally{setBusy(false)}
  }
  if(!token)return <form onSubmit={login} className="mt-8 max-w-lg space-y-4 rounded-2xl border bg-white p-6">
    <h2 className="text-xl font-bold">DOCVY founder sign-in</h2>
    <p className="text-sm text-[#526D66]">Use your verified DOCVY founder/admin account. No clinic CRM login is needed for DOCVY-managed appointments. Passwords are authenticated by Supabase and are not stored by DOCVY’s booking dashboard.</p>
    <label className="block text-sm font-semibold">Email<input type="email" name="email" required autoComplete="username" className="mt-2 w-full rounded-lg border p-3"/></label>
    <label className="block text-sm font-semibold">Password<input type="password" name="password" required autoComplete="current-password" className="mt-2 w-full rounded-lg border p-3"/></label>
    {message&&<p role="alert" className="text-sm text-red-700">{message}</p>}
    <button disabled={busy} className="rounded-lg bg-[#087F83] px-5 py-3 font-bold text-white disabled:opacity-50">{busy?"Checking…":"Sign in"}</button>
  </form>;

  async function publishRange(rosterId:string){setBusy(true);try{const r=await fetch("/api/booking/admin/schedules",{method:"POST",headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({action:"approved_range",rosterId,confirmedByClinic:true,startDate:range.start,endDate:range.end})});const d=await r.json();if(!r.ok)throw Error(d.error);setMessage("Created "+d.created+" approved slots; "+d.existing+" already existed. Clinic activation is separate.");}catch(e){setMessage(e instanceof Error?e.message:"Schedule publication failed");}finally{setBusy(false);}}
  async function more(){if(!queue?.nextCursor)return;setBusy(true);try{const r=await fetch("/api/booking/admin?cursor="+encodeURIComponent(queue.nextCursor),{headers:{Authorization:"Bearer "+token},cache:"no-store"});const d=await r.json() as Queue;if(!r.ok)throw Error(d.error);setQueue(q=>({...d,cases:[...(q?.cases??[]),...(d.cases??[])]}));}catch(e){setMessage(e instanceof Error?e.message:"Could not load older appointments");}finally{setBusy(false);}}
  async function doctorLink(caseId:string,action:"issue"|"revoke"){setBusy(true);try{const r=await fetch("/api/booking/admin/doctor-link",{method:"POST",headers:{Authorization:"Bearer "+token,"Content-Type":"application/json"},body:JSON.stringify({caseId,action})});const d=await r.json();if(!r.ok)throw Error(d.error);setDoctorLinks(v=>({...v,[caseId]:d.url??""}));setMessage(action==="issue"?"Private one-appointment link created. Share directly with the doctor; no message was sent.":"Doctor links revoked.");}catch(e){setMessage(e instanceof Error?e.message:"Could not update link");}finally{setBusy(false);}}
  async function processEmails(){setBusy(true);try{const r=await fetch("/api/booking/notifications",{method:"POST",headers:{Authorization:"Bearer "+token}});const d=await r.json();if(!r.ok)throw Error(d.error);await refresh();setMessage("Resend accepted "+d.accepted+"; retry "+d.retry+"; failed "+d.failed+". Acceptance does not verify delivery to an inbox.");}catch(e){setMessage(e instanceof Error?e.message:"Could not process emails");}finally{setBusy(false);}}
  async function history(id:string){try{const r=await fetch("/api/booking/admin?case="+id,{headers:{Authorization:"Bearer "+token},cache:"no-store"});const d=await r.json();if(!r.ok)throw Error(d.error);setTimeline(t=>({...t,[id]:d.events}));}catch(e){setMessage(e instanceof Error?e.message:"History unavailable");}}
  async function logout(){try{const r=await fetch("/api/booking/logout",{method:"POST",headers:{Authorization:"Bearer "+token}});if(!r.ok)throw Error("Server session could not be closed");setMessage("Signed out");}catch(e){setMessage(e instanceof Error?e.message:"Sign-out failed");}finally{setToken("");setQueue(null);setDoctorLinks({});setTimeline({});setSchedules(null);setPending({});}}
  const cases=(queue?.cases??[]).filter(c=>filter==="all"||c.status===filter);
  const metrics={total:queue?.cases?.length??0,requested:queue?.cases?.filter(c=>c.status==="requested").length??0,
    confirmed:queue?.cases?.filter(c=>c.status==="confirmed").length??0,
    completed:queue?.cases?.filter(c=>c.status==="completed_verified").length??0};
  return <div className="mt-8 space-y-7">
    <div className="flex flex-wrap items-center gap-3">
      <button className="rounded-lg border bg-white px-4 py-2" disabled={busy} onClick={()=>refresh().catch(e=>setMessage(String(e)))}>Refresh</button>
      <button className="rounded-lg border bg-white px-4 py-2" onClick={()=>void logout()}>Sign out</button>
      <span className="text-xs text-[#526D66]">{queue?.isAdmin?"DOCVY admin access":"Clinic-scoped access"}</span>
    </div>
    {message&&<p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}
    <p className="text-sm text-[#526D66]">Counts below cover the loaded queue. The doctor/city table covers the full appointment ledger.</p>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {Object.entries(metrics).map(([key,value])=><div key={key} className="rounded-xl border bg-white p-4"><p className="text-xs font-bold uppercase text-[#526D66]">{key}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>)}
    </div>
    {queue?.isAdmin&&<section className="rounded-2xl border bg-white p-5">
      <h2 className="text-xl font-bold">Provider booking activation</h2>
      <p className="mt-2 text-sm text-[#526D66]">DOCVY manages approval and coordination. Patients request a preferred time; confirm only after checking directly with the doctor. Clinics need no CRM login.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {(queue.candidates??[]).map(p=><div key={p.provider_id} className="flex items-center justify-between gap-4 rounded-lg border p-3">
          <div><p className="text-sm font-bold">{p.doctor_name}</p><p className="text-xs text-[#526D66]">{p.city} · {p.facility}</p></div>
          <select aria-label={`Booking mode for ${p.doctor_name}`} disabled={busy} className="rounded-md border p-2 text-sm"
            value={queue.founderManaged?(queue.profiles?.find(o=>o.provider_id===p.provider_id)?.mode&&queue.profiles.find(o=>o.provider_id===p.provider_id)?.mode!=="disabled"?"approval":"disabled"):(queue.profiles?.find(o=>o.provider_id===p.provider_id)?.mode??"disabled")}
            onChange={e=>setMode(p.provider_id,e.target.value)}>
            <option value="disabled">Disabled</option><option value="approval">DOCVY approval</option>{!queue.founderManaged&&<option value="instant">Instant slots</option>}
          </select>
        </div>)}
      </div>
    </section>}
    {!queue?.founderManaged&&<section className="rounded-2xl border bg-white p-5">
      <h2 className="text-xl font-bold">Clinic schedules and doctor availability</h2>
      <p className="mt-2 text-sm text-[#526D66]">Use only clinic-confirmed timings. A published doctor’s general hours are not reservable slots. All times below are in India Standard Time.</p>
      {queue?.isAdmin&&<div className="mt-4 flex flex-wrap gap-4"><label>Approved range starts (IST)<input type="date" className="block rounded border p-2" value={range.start} onChange={e=>setRange(r=>({...r,start:e.target.value}))}/></label><label>Range ends, exclusive (IST)<input type="date" className="block rounded border p-2" value={range.end} onChange={e=>setRange(r=>({...r,end:e.target.value}))}/></label><p className="text-sm">Publish only after confirming closures and staff coverage. Repeated publication does not overwrite existing slots.</p></div>}
      <div className="mt-4 space-y-4">
        {(schedules?.rosters??[]).filter(r=>r.provider_id).map(r=>{
          const clinic=schedules?.clinics?.find(c=>c.id===r.clinic_id);
          const input=slotInputs[r.id]??{start:"",end:""};
          return <article key={r.id} className="rounded-xl border p-4">
            <p className="font-bold">{r.name}</p>
            <p className="text-sm text-[#526D66]">{clinic?.name??"Clinic"} · {clinic?.city??""} · Clinic bookings: {clinic?.booking_enabled?"Enabled":"Disabled"} · Doctor availability: {r.present===true?"Confirmed":"Not confirmed"}</p>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              {r.present!==true&&<button disabled={busy} onClick={()=>scheduleAction(r.id,"presence")}
                className="rounded-lg border border-[#087F83] px-3 py-2 text-sm font-semibold text-[#087F83]">Confirm doctor availability</button>}
              <label className="text-xs font-semibold">Slot starts (IST)<input type="datetime-local" className="mt-1 block rounded-lg border p-2" value={input.start}
                onChange={e=>setSlotInputs(s=>({...s,[r.id]:{...input,start:e.target.value}}))}/></label>
              <label className="text-xs font-semibold">Slot ends (IST)<input type="datetime-local" className="mt-1 block rounded-lg border p-2" value={input.end}
                onChange={e=>setSlotInputs(s=>({...s,[r.id]:{...input,end:e.target.value}}))}/></label>
              <button disabled={busy||!input.start||!input.end||r.present!==true} onClick={()=>scheduleAction(r.id,"slot")}
                className="rounded-lg bg-[#087F83] px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">Add managed slot</button>
              {queue?.isAdmin&&<button disabled={busy||r.present!==true||!range.start||!range.end} onClick={()=>void publishRange(r.id)} className="rounded border p-3">Publish approved schedule for this practice</button>}
              {queue?.isAdmin&&!clinic?.booking_enabled&&<button disabled={busy||r.present!==true}
                onClick={()=>scheduleAction(r.id,"activate_clinic")} className="rounded-lg border px-3 py-2 text-sm font-semibold disabled:opacity-50">Enable clinic bookings</button>}
            </div>
          </article>
        })}
        {!(schedules?.rosters??[]).length&&<p className="text-sm text-[#526D66]">No mapped doctor rosters are available for this account.</p>}
      </div>
    </section>}
    {queue?.isAdmin&&queue.notifications&&<section className="rounded-2xl border bg-white p-5"><h2 className="text-xl font-bold">DOCVY email notifications</h2><p className="mt-3 text-sm">Sender: contact@docvy.in · Delivery worker: {queue.notifications.ready?"Enabled":"Not enabled / configuration incomplete"}</p><p className="mt-2 text-sm">Queued: {queue.notifications.queued??"Unavailable"} · Accepted by Resend: {queue.notifications.accepted??"Unavailable"} · Failed: {queue.notifications.failed??"Unavailable"} · Skipped: {queue.notifications.skipped??"Unavailable"}</p><p className="mt-2 text-sm">Acceptance does not establish inbox delivery. Scheduled retries must be configured and tested before launch.</p><button disabled={busy||!queue.notifications.ready} className="mt-4 rounded border p-3 disabled:opacity-50" onClick={()=>void processEmails()}>Process pending emails (up to 2)</button></section>}
    {queue?.summary&&<section className="rounded-2xl border bg-white p-5"><h2 className="text-xl font-bold">DOCVY — all appointment records</h2><p>Total: {queue.summary.total}. These are live ledger counts, not revenue or clinical-quality measures.</p><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr>{["Doctor","City","All","Confirmed","Doctor-reported","Patient-confirmed","Disputed","Awaiting patient"].map(h=><th key={h} className="p-2">{h}</th>)}</tr></thead><tbody>{queue.summary.byDoctorAndCity.map(r=><tr key={r.provider_id+r.city}>{[r.doctor_name,r.city,r.total,r.confirmed,r.doctor_reported,r.patient_confirmed,r.disputed,r.awaiting_patient_confirmation].map((v,i)=><td key={i} className="p-2">{v}</td>)}</tr>)}</tbody></table></div></section>}
    <section className="rounded-2xl border bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Appointment queue</h2>
        <select className="rounded-lg border p-2 text-sm" value={filter} onChange={e=>setFilter(e.target.value)}>
          {["all","requested","confirmed","declined","cancelled","completed_reported","completed_verified","no_show_reported","disputed"].map(s=><option key={s} value={s}>{s.replaceAll("_"," ")}</option>)}
        </select>
      </div>
      {!cases.length&&<p className="mt-4 text-sm text-[#526D66]">No matching appointments.</p>}
      <div className="mt-4 space-y-4">
        {cases.map(b=><article key={b.id} className="rounded-xl border p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><p className="text-sm font-extrabold">{b.reference} · {b.status.replaceAll("_"," ")}</p>
              <p className="mt-1 text-sm">{b.doctor_name} · {b.facility}, {b.city}</p>
              <p className="mt-1 text-xs text-[#526D66]">{new Date(b.created_at).toLocaleString("en-IN")} · {b.mode}</p>
            </div>
            <div className="text-sm"><p>{b.patient_name} · {b.patient_mobile}</p>
              {b.patient_email&&<p className="text-xs">{b.patient_email}</p>}
              <p className="text-xs">Preferred: {b.preferred_date??"—"} {b.preferred_time??""}</p>
            </div>
          </div>
          {pending[b.id]?.status==="confirmed"&&queue?.founderManaged&&<label className="mt-4 flex gap-3 text-sm"><input type="checkbox" checked={pending[b.id]?.doctorConfirmed??false} onChange={e=>setPending(s=>({...s,[b.id]:{...s[b.id],doctorConfirmed:e.target.checked}}))}/><span>I checked the doctor’s availability and recorded their agreement below. The time is IST; physical visits must use the approved schedule.</span></label>}
          <p className="mt-3 text-sm">Patient contact-confirmed visit response: {b.patient_response_at?(b.patient_attended?"Attended":"Did not attend"):"Not yet received"}. Check-in: {b.patient_check_in_at?"Patient reported arrival":"Not recorded"}.</p>
          <button type="button" className="mt-3 rounded border p-2" onClick={()=>void history(b.id)}>View DOCVY audit timeline</button>
          {timeline[b.id]&&<ol className="mt-3 text-sm">{timeline[b.id].map((e,i)=><li key={i}>{e.new_status.replaceAll("_"," ")} · {e.actor_type} · {new Date(e.created_at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})} IST</li>)}</ol>}
          {queue?.isAdmin&&b.status==="confirmed"&&<div className="mt-4 space-y-3"><button disabled={busy} className="rounded border p-2" onClick={()=>void doctorLink(b.id,"issue")}>Create / replace private doctor update link</button><button disabled={busy} className="ml-3 rounded border p-2" onClick={()=>void doctorLink(b.id,"revoke")}>Revoke doctor links</button>{doctorLinks[b.id]&&<label className="block text-sm">Private link — share only with the treating doctor<input readOnly value={doctorLinks[b.id]} onFocus={e=>e.target.select()} className="mt-2 w-full rounded border p-3"/></label>}</div>}
          {transitions[b.status]?.length>0&&<div className="mt-4 grid gap-3 border-t pt-4 md:grid-cols-[180px_1fr_220px_auto]">
            <select className="rounded-lg border p-2 text-sm" value={pending[b.id]?.status??""}
              onChange={e=>setPending(s=>({...s,[b.id]:{status:e.target.value,note:s[b.id]?.note??"",time:s[b.id]?.time||(e.target.value==="confirmed"&&b.preferred_date?b.preferred_date+"T"+(b.preferred_time??"10:00").slice(0,5):"")}}))}>
              <option value="">Choose action</option>{transitions[b.status].map(s=><option key={s} value={s}>{s.replaceAll("_"," ")}</option>)}
            </select>
            <input aria-label="Clinic confirmation evidence or action reason" placeholder="Confirmation details / reason" className="rounded-lg border p-2 text-sm" maxLength={500}
              value={pending[b.id]?.note??""} onChange={e=>setPending(s=>({...s,[b.id]:{...s[b.id],status:s[b.id]?.status??"",note:e.target.value,time:s[b.id]?.time??""}}))}/>
            {pending[b.id]?.status==="confirmed"&&<input aria-label="Confirmed appointment date and time" type="datetime-local" className="rounded-lg border p-2 text-sm"
              value={pending[b.id]?.time??""} onChange={e=>setPending(s=>({...s,[b.id]:{...s[b.id],status:s[b.id]?.status??"",note:s[b.id]?.note??"",time:e.target.value}}))}/>}
            <button disabled={busy||!pending[b.id]?.status} onClick={()=>updateStatus(b)} className="rounded-lg bg-[#087F83] px-4 py-2 text-sm font-bold text-white disabled:opacity-50">Save update</button>
          </div>}
        </article>)}
        {queue?.nextCursor&&<button disabled={busy} className="mt-4 rounded border p-3" onClick={()=>void more()}>Load older DOCVY appointments</button>}
      </div>
    </section>
  </div>;
}
