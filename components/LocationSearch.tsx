"use client";

import { useState } from "react";
import { LocateFixed } from "lucide-react";

// Approximate city centres, used solely to suggest covered cities, never doctor distance.
const centres: Record<string, [number, number]> = {
  delhi: [28.61,77.21], gurgaon: [28.46,77.03], noida: [28.54,77.39], ghaziabad: [28.67,77.45], faridabad: [28.41,77.31],
  bengaluru: [12.97,77.59], pune: [18.52,73.86], kolkata: [22.57,88.36], jaipur: [26.91,75.79], ranchi: [23.34,85.31],
  vijayawada: [16.51,80.65], salem: [11.66,78.15], patiala: [30.34,76.39], mangaluru: [12.91,74.86], bhubaneswar: [20.30,85.82],
  siliguri: [26.73,88.40], mysuru: [12.30,76.64], rangapani: [26.65,88.38],
};
type City = { slug: string; name: string; areas: string[] };
export default function LocationSearch({ cities, city, area = "" }: { cities: City[]; city: string; area?: string }) {
  const [selected, setSelected] = useState(city);
  const [status, setStatus] = useState("");
  const [locating, setLocating] = useState(false);
  function locate() {
    if (!navigator.geolocation) { setStatus("Your browser cannot share location. Choose a city instead."); return; }
    setLocating(true); setStatus("Your browser will ask permission. Coordinates stay on your device.");
    navigator.geolocation.getCurrentPosition(({coords}) => {
      const rad = Math.PI / 180;
      const choices = cities.flatMap(c => {
        const centre = centres[c.slug]; if (!centre) return [];
        const a = Math.sin((centre[0]-coords.latitude)*rad/2)**2 + Math.cos(coords.latitude*rad)*Math.cos(centre[0]*rad)*Math.sin((centre[1]-coords.longitude)*rad/2)**2;
        return [{...c, distance: 6371*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))}];
      }).sort((a,b)=>a.distance-b.distance);
      const closest = choices[0];
      if (closest && closest.distance <= 150) { setSelected(closest.slug); setStatus(`${closest.name} selected as an approximate covered city. This does not identify the nearest doctor. Select Search to see profiles.`); }
      else setStatus("No covered city was found near your location. Choose a city manually.");
      setLocating(false);
    }, () => { setStatus("Location was unavailable or permission was declined. Choose a city manually."); setLocating(false); }, {enableHighAccuracy:false,timeout:10000,maximumAge:60000});
  }
  const areas = cities.find(c=>c.slug===selected)?.areas ?? [];
  return <div className="flex min-w-0 flex-1 basis-72 flex-wrap items-end gap-3">
    <label className="min-w-36 flex-1 text-sm font-semibold"><span className="mb-1.5 block">City (optional)</span><select name="location" value={selected} onChange={e=>{setSelected(e.target.value);setStatus("");}} className="docvy-select min-h-12"><option value="">All cities</option>{cities.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
    {areas.length>0 && <label key={selected} className="min-w-36 flex-1 text-sm font-semibold"><span className="mb-1.5 block">Area (optional)</span><select name="area" defaultValue={selected===city?area:""} className="docvy-select min-h-12"><option value="">All areas</option>{areas.map(a=><option key={a} value={a}>{a}</option>)}</select></label>}
    <button type="button" onClick={locate} disabled={locating} className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold underline"><LocateFixed size={17} strokeWidth={1.5} aria-hidden="true" />{locating?"Locating…":"Use my location"}</button>
    <p role="status" className="basis-full text-xs leading-5 text-grey">{status || "Optional location access suggests a covered city. Your coordinates are not sent to DOCVY."}</p>
  </div>;
}
