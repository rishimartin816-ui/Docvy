"use client";

import { useState, type FormEvent } from "react";

type Candidate={provider_id:string;doctor_name:string;city:string;facility:string};
type Option={provider_id:string;mode:string};
type Booking={id:string;reference:string;doctor_name:string;city:string;facility:string;patient_name:string;patient_mobile:string;patient_email:string|null;preferred_date:string|null;preferred_time:string|null;confirmed_starts_at:string|null;status:string;mode:string;created_at:string};
type Queue={ok?:boolean;isAdmin?:boolean;cases?:Booking[];candidates?:Candidate[];profiles?:Option[];error?:string};
type AuthConfig={enabled:boolean;url?:string;anonKey?:string};
const transitions:Record<string,string[]>={
  requested:["confirmed","declined","cancelled"],
  confirmed:["cancelled","completed_reported","no_show_reported","disputed"],
  completed_reported:["disputed"],no_show_reported:["disputed"]
};
export default function BookingAdmin(){
  const [token,setToken]=useState("");
  const [queue,setQueue]=useState<Queue|null>(null);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");
  const [filter,setFilter]=useState("all");
  const [pending,setPending]=useState<Record<string,{status:string;note:string;time:string}>>({});

  async function refresh(accessToken=token){
    const response=await fetch("/api/booking/admin",{headers:{Authorization:`Bearer ${accessToken}`},cache:"no-store"});
    const result=await response.json() as Queue;
    if(!response.ok||!result.ok)throw new Error(result.error||"Not permitted");
    setQueue(result);setMessage("");
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
          action:"transition",caseId:b.id,status:change.status,note:change.note,
          confirmedStart:change.status==="confirmed"&&change.time?new Date(change.time).toISOString():null,
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
  if(!token)return <form onSubmit={login} className="mt-8 max-w-lg space-y-4 rounded-2xl border bg-white p-6">
    <h2 className="text-xl font-bold">Operator sign-in</h2>
    <p className="text-sm text-[#526D66]">Use your existing verified DOCVY admin or authorized clinic account. Passwords are authenticated by Supabase and are not stored by DOCVY's booking dashboard.</p>
    <label className="block text-sm font-semibold">Email<input type="email" name="email" required autoComplete="username" className="mt-2 w-full rounded-lg border p-3"/></label>
    <label className="block text-sm font-semibold">Password<input type="password" name="password" required autoComplete="current-password" className="mt-2 w-full rounded-lg border p-3"/></label>
    {message&&<p role="alert" className="text-sm text-red-700">{message}</p>}
    <button disabled={busy} className="rounded-lg bg-[#087F83] px-5 py-3 font-bold text-white disabled:opacity-50">{busy?"Checking…":"Sign in"}</button>
  </form>;
  const cases=(queue?.cases??[]).filter(c=>filter==="all"||c.status===filter);
  const metrics={total:queue?.cases?.length??0,requested:queue?.cases?.filter(c=>c.status==="requested").length??0,
    confirmed:queue?.cases?.filter(c=>c.status==="confirmed").length??0,
    completed:queue?.cases?.filter(c=>c.status==="completed_verified").length??0};
  return <div className="mt-8 space-y-7">
    <div className="flex flex-wrap items-center gap-3">
      <button className="rounded-lg border bg-white px-4 py-2" disabled={busy} onClick={()=>refresh().catch(e=>setMessage(String(e)))}>Refresh</button>
      <button className="rounded-lg border bg-white px-4 py-2" onClick={()=>{setToken("");setQueue(null)}}>Sign out</button>
      <span className="text-xs text-[#526D66]">{queue?.isAdmin?"DOCVY admin access":"Clinic-scoped access"}</span>
    </div>
    {message&&<p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>}
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {Object.entries(metrics).map(([key,value])=><div key={key} className="rounded-xl border bg-white p-4"><p className="text-xs font-bold uppercase text-[#526D66]">{key}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>)}
    </div>
    {queue?.isAdmin&&<section className="rounded-2xl border bg-white p-5">
      <h2 className="text-xl font-bold">Provider booking activation</h2>
      <p className="mt-2 text-sm text-[#526D66]">Do not enable a provider until DOCVY can respond to every request. Instant booking requires a clinic-managed doctor-specific calendar.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {(queue.candidates??[]).map(p=><div key={p.provider_id} className="flex items-center justify-between gap-4 rounded-lg border p-3">
          <div><p className="text-sm font-bold">{p.doctor_name}</p><p className="text-xs text-[#526D66]">{p.city} · {p.facility}</p></div>
          <select aria-label={`Booking mode for ${p.doctor_name}`} disabled={busy} className="rounded-md border p-2 text-sm"
            value={queue.profiles?.find(o=>o.provider_id===p.provider_id)?.mode??"disabled"}
            onChange={e=>setMode(p.provider_id,e.target.value)}>
            <option value="disabled">Disabled</option><option value="approval">DOCVY approval</option><option value="instant">Instant slots</option>
          </select>
        </div>)}
      </div>
    </section>}
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
          {transitions[b.status]?.length>0&&<div className="mt-4 grid gap-3 border-t pt-4 md:grid-cols-[180px_1fr_220px_auto]">
            <select className="rounded-lg border p-2 text-sm" value={pending[b.id]?.status??""}
              onChange={e=>setPending(s=>({...s,[b.id]:{status:e.target.value,note:s[b.id]?.note??"",time:s[b.id]?.time??""}}))}>
              <option value="">Choose action</option>{transitions[b.status].map(s=><option key={s} value={s}>{s.replaceAll("_"," ")}</option>)}
            </select>
            <input aria-label="Clinic confirmation evidence or action reason" placeholder="Confirmation details / reason" className="rounded-lg border p-2 text-sm" maxLength={500}
              value={pending[b.id]?.note??""} onChange={e=>setPending(s=>({...s,[b.id]:{status:s[b.id]?.status??"",note:e.target.value,time:s[b.id]?.time??""}}))}/>
            {pending[b.id]?.status==="confirmed"&&<input aria-label="Confirmed appointment date and time" type="datetime-local" className="rounded-lg border p-2 text-sm"
              value={pending[b.id]?.time??""} onChange={e=>setPending(s=>({...s,[b.id]:{status:s[b.id]?.status??"",note:s[b.id]?.note??"",time:e.target.value}}))}/>}
            <button disabled={busy||!pending[b.id]?.status} onClick={()=>updateStatus(b)} className="rounded-lg bg-[#087F83] px-4 py-2 text-sm font-bold text-white disabled:opacity-50">Save update</button>
          </div>}
        </article>)}
      </div>
    </section>
  </div>;
}
