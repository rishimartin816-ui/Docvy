import FacilitiesDirectory from "@/components/FacilitiesDirectory";
import { buildPageSocialMetadata } from "@/lib/metadata";

export function generateMetadata() {
  const title = "Find outpatient care and practice locations";
  const description = "Find clinic and outpatient practice locations across India. Review associated doctors, addresses and appointment-request options before planning your visit.";
  return { title, description, alternates: { canonical: "/clinics" }, ...buildPageSocialMetadata(title, description, "/clinics"), robots: { index: false, follow: true } };
}
export default function ClinicsPage() { return <FacilitiesDirectory outpatient />; }
