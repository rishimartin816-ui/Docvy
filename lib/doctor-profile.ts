import type { ProviderCandidate } from "./provider-candidates";
import { doctorPath } from "./directory-normalization";
import { productionOrigin } from "./metadata";

export function doctorDescription(doctor: ProviderCandidate) {
  const places = [...new Set(doctor.locations.map(location => location.city))].join(", ");
  const details = doctor.profileDetails;
  return `${doctor.name}: ${doctor.specialties.join(", ")} in ${places}. View practice locations${details?.consultationFee != null ? ", consultation fee ₹" + details.consultationFee : ""}, contact details and appointment-request options on DOCVY.`;
}

export function doctorStructuredData(doctor: ProviderCandidate) {
  const details = doctor.profileDetails;
  return {
    "@context": "https://schema.org", "@type": doctor.specialties.some(specialty => /physiotherapy/i.test(specialty)) ? "MedicalBusiness" : doctor.specialties.includes("Dentistry") ? "Dentist" : "Physician",
    name: doctor.name, url: productionOrigin + doctorPath(doctor),
    description: doctor.summary || doctorDescription(doctor),
    medicalSpecialty: doctor.specialties,
    ...(doctor.photoUrl ? { image: new URL(doctor.photoUrl, productionOrigin).href } : {}),
    ...(details?.practicePhone ? { telephone: details.practicePhone } : {}),
    ...(details?.languages?.length ? { availableLanguage: details.languages } : {}),
    identifier: { "@type": "PropertyValue", propertyID: doctor.registrationCouncil, value: doctor.registrationNumber },
    location: doctor.locations.map(location => ({
      "@type": "MedicalClinic", name: location.facility,
      address: { "@type": "PostalAddress", streetAddress: location.address || location.locality, addressLocality: location.city, addressCountry: "IN" },
      ...(location.practicePhone ? { telephone: location.practicePhone } : {}),
      ...(location.mapsUrl ? { hasMap: location.mapsUrl } : {}),
      ...(location.consultingHours ? { description: "Consulting hours: " + location.consultingHours + " IST. Please book in advance." } : {}),
      ...(location.consultationFee != null ? { priceRange: "INR " + location.consultationFee } : {}),
    })),
  };
}
