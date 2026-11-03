export type ProviderCity = "Delhi" | "Gurugram" | "Noida";

export type ProviderLocation = {
  city: ProviderCity;
  locality?: string;
  facility: string;
  primary?: boolean;
};

export type ProviderCandidate = {
  id: string;
  name: string;
  specialties: string[];
  procedures?: readonly string[];
  locations: ProviderLocation[];
  otherNcrLocations: string[];
  hospital: "Max Healthcare" | "Medanta" | "Fortis Healthcare";
  sourceUrl: string;
  sourceChecked: "2 Nov 2026";
};

export const providerCandidates: ProviderCandidate[] = [];

export const providerCities: ProviderCity[] = ["Delhi", "Gurugram", "Noida"];

export const providerProfileCount = providerCandidates.length;
export const providerCityListLabel = providerCities.length < 2
  ? providerCities[0] ?? "no cities yet"
  : `${providerCities.slice(0, -1).join(", ")} and ${providerCities[providerCities.length - 1]}`;

export const providerSpecialties = Array.from(new Set(providerCandidates.flatMap((doctor) => doctor.specialties)))
  .sort((a, b) => a.localeCompare(b));
