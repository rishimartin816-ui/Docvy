import type { ProviderCandidate } from "./provider-candidates";
import { canonicalSpecialty } from "./specialty-taxonomy";

export function cleanDoctorSlug(id: string) {
 const rank = "(?:air-cmde|col|colonel|lt-col|lt-gen|surg-lt-cdr|brig|brigadier|maj-gen|gp-capt|wg-cdr)";
 return id.replace(new RegExp("^"+rank+"-dr-"),"dr-").replace(new RegExp("^dr-"+rank+"-"),"dr-");
}
export const doctorPath = (doctor: Pick<ProviderCandidate,"id"|"profileSlug">) => "/doctor/" + (doctor.profileSlug ?? cleanDoctorSlug(doctor.id));
export function normalizeDoctor(doctor: ProviderCandidate): ProviderCandidate {
 const ranks: string[] = [];
 const rankPattern = "(?:Surg\\.?\\s+Lt\\.?\\s+Cdr\\.?|Lt\\.?\\s+(?:Col|Gen)\\.?|Air\\s+Cmde\\.?|Col(?:onel)?\\.?|Brig(?:adier)?\\.?|Maj\\.?\\s+Gen\\.?|Gp\\s+Capt\\.?|Wg\\s+Cdr\\.?)";
 let name = doctor.name.replace(/\(\s*Dr\.?\s*\)/gi,"Dr. ");
 name = name.replace(new RegExp("\\(\\s*("+rankPattern+")\\s*\\)","gi"),(_,rank:string)=>{ranks.push(rank);return " ";});
 name = name.replace(new RegExp("^(\\s*(?:Dr\\.?\\s+)?)("+rankPattern+")\\s+","i"),(_,prefix:string,rank:string)=>{ranks.push(rank);return prefix;});
 const hasDoctorTitle = /\bdr[.]?(?=\s)/i.test(name);
 name = name.replace(/\bdr[.]?(?=\s)/gi," ").trim().replace(/\s+/g," ");
 name = name.split(" ").map(word=>word.split("-").map(part=>{
  const letters = part.replace(/[.,]/g,"");
  if (/^[A-Z]{1,2}$/.test(letters) || /^(VSM|AVSM|PVSM)$/.test(letters)) return part;
  if (/[a-z].*[A-Z]/.test(part)) return part;
  return part.replace(/[A-Za-z]+/g,word=>word.charAt(0).toUpperCase()+word.slice(1).toLowerCase());
 }).join("-")).join(" ");
 const clinical = new Set<string>(); const centres = new Set<string>(doctor.centres ?? []);
 for (const raw of doctor.specialties) { const specialty = canonicalSpecialty(raw); if (specialty) clinical.add(specialty.name); else centres.add(raw); }
 return {...doctor,name:(hasDoctorTitle?"Dr. ":"")+name,profileSlug:cleanDoctorSlug(doctor.id),specialties:[...clinical],centres:[...centres],serviceTitle:ranks.map(r=>r.toLowerCase()==="col"?"Col":r.replace(/\b\w/g,c=>c.toUpperCase())).join(" · ") || undefined};
}
