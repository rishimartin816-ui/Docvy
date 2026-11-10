import type { ProviderCandidate } from "./provider-candidates";

export function facilitiesFrom(liveDoctors: ProviderCandidate[]) { return Array.from(new Set(liveDoctors.flatMap((doctor) => doctor.locations.map((location) => location.facility).filter(Boolean))))
  .map((name) => {
    const doctors = liveDoctors.filter((doctor) => doctor.locations.some((location) => location.facility === name));
    const location = doctors[0].locations.find((item) => item.facility === name)!;
    return { name, location, kind: location.kind ?? (/clinic/i.test(name) ? "clinic" : "hospital"), doctors, specialties: Array.from(new Set(doctors.flatMap((doctor) => doctor.specialties))) };
  });

}
