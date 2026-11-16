"use client";
import {useEffect,useState} from "react";
type Appointment={reference:string;patientName:string;doctor:string;city:string;facility:string;startsAt:string;status:string;reportedStatus:string|null;expiresAt:string};
export default function DoctorAppointmentUpdate(){
 const [token,setToken]=useState("");const [appointment,setAppointment]=useState<Appointment|null>(null);
 const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);const [choice,setChoice]=useState("");
 useEffect(()=>{let active=true;const key=new URLSearchParams(window.location.hash.slice(1)).get("link")??"";setToken(key);
  if(!key){setMessage("Open the appointment update link shared privately by DOCVY.");return;}
  fetch("/api/booking/doctor",{headers:{"X-Docvy-Doctor-Link":key},cache:"no-store"}).then(async r=>{const data=await r.json();if(!r.ok)throw Error(data.error);if(active)setAppointment(data.appointment);}).catch(e=>{if(active)setMessage(e.message);});
  return ()=>{active=false};
 },[]);
 async function report(){setBusy(true);setMessage("");try{
  const r=await fetch("/api/booking/doctor",{method:"POST",headers:{"Content-Type":"application/json","X-Docvy-Doctor-Link":token},body:JSON.stringify({status:choice})});const data=await r.json();if(!r.ok)throw Error(data.error);
  setAppointment(data.appointment);setMessage("Your report is recorded by DOCVY. Patient confirmation is collected separately.");
 }catch(e){setMessage(e instanceof Error?e.message:"Report unavailable");}finally{setBusy(false);}}
 return <article className="mx-auto max-w-2xl px-6 py-12"><p className="text-sm font-bold">DOCVY</p><h1 className="mt-3 text-3xl font-bold">Appointment outcome update</h1><p className="mt-4">This private link covers one appointment. It provides no clinic CRM access. Keep it private and contact DOCVY if it reached you in error.</p>
 {appointment&&<><section className="my-6 rounded-xl border bg-white p-5"><h2 className="text-xl font-bold">{appointment.reference}</h2><p>{appointment.patientName}</p><p>{appointment.doctor} · {appointment.facility}, {appointment.city}</p><p>{new Date(appointment.startsAt).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})} IST</p><p>Status: {appointment.status.replaceAll("_"," ")}</p><p className="mt-3 text-sm">Link expires {new Date(appointment.expiresAt).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})} IST.</p></section>
 {appointment.reportedStatus?<p>Outcome already submitted: {appointment.reportedStatus.replaceAll("_"," ")}. Contact DOCVY to request a correction.</p>:appointment.status==="confirmed"?<form onSubmit={e=>{e.preventDefault();void report();}} className="space-y-4"><label className="block">Appointment outcome<select required value={choice} onChange={e=>setChoice(e.target.value)} disabled={busy} className="mt-2 block w-full rounded border p-3"><option value="">Select one outcome</option><option value="completed_reported">Patient attended</option><option value="no_show_reported">Patient did not attend</option><option value="cancelled">Doctor cannot attend — cancel this appointment</option></select></label><p className="text-sm">Attendance reports are accepted after the 30-minute appointment ends. Doctor cancellation is accepted before the appointment starts. One report can be submitted per link; it does not independently verify attendance.</p><label className="flex gap-3"><input required type="checkbox" disabled={busy}/><span>I am authorized to report this appointment outcome and confirm this information is accurate.</span></label><button disabled={busy||!choice} className="rounded bg-[#087F83] px-5 py-3 font-bold text-white disabled:opacity-50">{busy?"Saving…":"Submit outcome to DOCVY"}</button></form>:<p>This appointment no longer accepts an outcome report. Contact DOCVY if you need assistance.</p>}</>}
 <p role="status" className="mt-5">{message}</p></article>;
}
