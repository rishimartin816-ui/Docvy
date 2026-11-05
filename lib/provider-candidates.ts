export type ProviderCity = "Delhi" | "Gurgaon" | "Gurugram" | "Noida";

export type ProviderLocation = {
  city: ProviderCity;
  locality?: string;
  facility: string;
  primary?: boolean;
};

export type ProviderCandidate = {
  id: string;
  live?: boolean;
  manuallyVerified?: boolean;
  nmcRegistrationNumber?: string;
  name: string;
  specialties: string[];
  procedures?: readonly string[];
  locations: ProviderLocation[];
  otherNcrLocations: string[];
  hospital: string;
  sourceUrl: string;
  sourceChecked: string;
};

export const providerCandidates: ProviderCandidate[] = [];

export const providerCities: ProviderCity[] = ["Delhi", "Gurgaon", "Noida"];

export const providerProfileCount = providerCandidates.filter((doctor) => doctor.live === true).length;
export const providerCityListLabel = providerCities.length < 2
  ? providerCities[0] ?? "no cities yet"
  : `${providerCities.slice(0, -1).join(", ")} and ${providerCities[providerCities.length - 1]}`;

export const providerSpecialties = Array.from(new Set(providerCandidates.flatMap((doctor) => doctor.specialties)))
  .sort((a, b) => a.localeCompare(b));
