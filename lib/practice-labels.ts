import type { ProviderLocation } from "./provider-candidates";
export function practiceLocationLabel(location: Pick<ProviderLocation,"city"|"state"|"locality">, includeLocality=false) {
  const state=location.state?.trim().toLowerCase()===location.city.trim().toLowerCase()?undefined:location.state;
  return [includeLocality?location.locality:undefined,location.city,state].filter(Boolean).join(", ");
}
// Preserve clinic selection in links and forms created before the punctuation correction.
export function canonicalClinicName(name: string) {
  return /^Dr[.]?\s+Basab Raj Ghosh['’]s clinic$/i.test(name.trim()) ? "Dr. Basab Raj Ghosh's Clinic" : name;
}
