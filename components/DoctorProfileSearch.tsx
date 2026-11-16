"use client";
import { Search, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState } from "react";

export type ClaimDoctor = { id:string;name:string;city:string;facility:string };
export default function DoctorProfileSearch({doctors,selectedId,onSelect,partnerLink=true,disabled=false}:{doctors:ClaimDoctor[];selectedId:string;onSelect:(doctor:ClaimDoctor|null)=>void;partnerLink?:boolean;disabled?:boolean}){
 const selected=doctors.find(d=>d.id===selectedId);const [query,setQuery]=useState(selected?.name??"");const input=useRef<HTMLInputElement>(null);const id=useId();
 const words=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
 const matches=query.trim().length<2?[]:doctors.filter(d=>words.every(w=>`${d.name} ${d.city} ${d.facility}`.toLocaleLowerCase().includes(w)));
 return <fieldset className="min-w-0"><legend className="text-sm font-medium">Search your name</legend>
  <div className="relative mt-2"><Search size={18} strokeWidth={1.5} aria-hidden="true" className="absolute left-3 top-3.5 text-grey"/><input ref={input} type="search" disabled={disabled} aria-label="Search your name" value={query} onChange={e=>{setQuery(e.target.value);onSelect(null);}} maxLength={120} placeholder="Enter your name, e.g. Dr. Priya Sharma" aria-describedby={id} className="docvy-select !pl-10"/></div>
  <input type="hidden" name="providerId" value={selected?.id??""}/>
  <p id={id} role="status" className="mt-2 text-xs leading-6 text-grey">{selected?"Profile selected. Check the city and practice below before continuing.":!doctors.length?"Profiles could not be loaded. Please try again or contact DOCVY.":query.trim().length<2?"Type at least 2 characters, then select your profile. Add your city to narrow the results.":matches.length?`${matches.length} matching ${matches.length===1?"profile":"profiles"}. ${matches.length>10?"Showing the first 10; add your city to narrow the results.":"Select your profile below."}`:"No matching profile found. Check the spelling or try your city."}</p>
  {selected?<div className="mt-3 rounded-xl border border-primary bg-primary-tint p-4"><div className="flex items-start justify-between gap-3"><div><p className="flex items-center gap-2 font-medium"><Check size={17} strokeWidth={1.5} aria-hidden="true"/>{selected.name}</p><p className="mt-1 text-sm text-grey">{[selected.facility,selected.city].filter(Boolean).join(" · ")}</p></div><button type="button" disabled={disabled} className="min-h-11 shrink-0 text-sm font-medium underline" onClick={()=>{onSelect(null);setQuery("");input.current?.focus();}}>Change</button></div></div>:matches.length>0&&<ul aria-label="Matching doctor profiles" className="mt-3 max-h-80 overflow-y-auto rounded-xl border border-line">{matches.slice(0,10).map(d=><li key={d.id} className="border-b border-line last:border-0"><button type="button" className="flex min-h-16 w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-surface" onClick={()=>{onSelect(d);setQuery(d.name);}}><span className="min-w-0"><span className="block font-medium">{d.name}</span><span className="mt-1 block text-sm text-grey">{[d.facility,d.city].filter(Boolean).join(" · ")}</span></span><ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" className="shrink-0"/></button></li>)}</ul>}
  {partnerLink&&query.trim().length>=2&&!selected&&matches.length===0&&<p className="mt-3 text-sm">Not listed yet? <Link href="/partner-with-us" className="font-semibold text-primary underline">Partner with us and submit your profile.</Link></p>}
 </fieldset>;
}
