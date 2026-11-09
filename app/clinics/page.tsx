import FacilitiesDirectory from "@/components/FacilitiesDirectory";
import { buildPageSocialMetadata } from "@/lib/metadata";

export function generateMetadata() {
  const title = "Find outpatient care and practice locations";
  const description = "Explore doctors at clinic and hospital outpatient locations across Delhi NCR. Review practice details and send appointment requests through DOCVY.";
  return { title, description, alternates: { canonical: "/clinics" }, ...buildPageSocialMetadata(title, description, "/clinics"), robots: { index: false, follow: true } };
}
export default function ClinicsPage() { return <FacilitiesDirectory outpatient />; }
