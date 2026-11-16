import type { ProviderCandidate } from "./provider-candidates";
import { citySlug, searchDoctors, specialtyMatches, specialtySlug } from "./directory";
export type DirectoryParams = Record<string, string | string[] | undefined>;
export function parseDirectoryFilters(params: DirectoryParams) {
 const value=(key:string,max=160)=>typeof params[key]==="string"?(params[key] as string).trim().slice(0,max):"";
 return {query:value("q",120),specialty:specialtySlug(value("specialty",100)),city:citySlug(value("location",60)),area:value("area",120),facility:value("facility",160),requestedPage:Math.max(1,Number.parseInt(value("page",8),10)||1)};
}
export type DirectoryFilters = ReturnType<typeof parseDirectoryFilters>;
export function filterDirectory(doctors: ProviderCandidate[], filters: DirectoryFilters) {
 return searchDoctors(filters.query,undefined,doctors).filter(d=>(!filters.specialty||d.specialties.some(s=>specialtyMatches(s,filters.specialty)))&&d.locations.some(l=>(!filters.city||citySlug(l.city)===filters.city)&&(!filters.facility||l.facility===filters.facility)&&(!filters.area||l.locality?.toLowerCase()===filters.area.toLowerCase())));
}
export function directoryPageHref(filters: DirectoryFilters,page:number) {
 const query=new URLSearchParams();
 for(const [key,value] of [["q",filters.query],["specialty",filters.specialty],["location",filters.city],["facility",filters.facility],["area",filters.area]]) if(value)query.set(key,value);
 if(page>1)query.set("page",String(page));
 return "/doctors"+(query.size?"?"+query.toString():"");
}
