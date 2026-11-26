"use client";
import { useState } from "react";
import { ArrowRight, Hospital, Video, MapPin, Search } from "lucide-react";
export default function HomeSearch({places}:{places:{city:string;area?:string}[]}) {
  const [video,setVideo]=useState(false);
  const [place,setPlace]=useState("");
  const selected=places.find(p=>JSON.stringify(p)===place);
  return <form action="/doctors" className="home-search" role="search">
    <label><Search/><input name="q" type="search" maxLength={120} aria-label="Search doctors, specialities, symptoms, or conditions" placeholder="Search doctors, specialities, symptoms, or conditions"/></label>
    <label><MapPin/><select aria-label="Enter city, locality or area" value={video ? "" : place} disabled={video} onChange={e=>setPlace(e.target.value)}><option value="">{video ? "Online" : "Enter city, locality or area"}</option>{places.map(p=><option key={JSON.stringify(p)} value={JSON.stringify(p)}>{p.area ? p.area+', '+p.city : p.city}</option>)}</select></label>
    <input type="hidden" name="location" value={video ? "Online" : selected?.city ?? ""}/>{!video && selected?.area && <input type="hidden" name="area" value={selected.area}/>}
    <div className="visit-modes"><button type="button" aria-pressed={!video} onClick={()=>setVideo(false)}><Hospital/>In-clinic</button><button type="button" aria-pressed={video} onClick={()=>setVideo(true)}><Video/>Video Consultation</button></div><button className="find">Find Doctors <ArrowRight/></button>
  </form>;
}
