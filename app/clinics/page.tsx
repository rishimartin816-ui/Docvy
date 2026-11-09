import FacilitiesDirectory from "@/components/FacilitiesDirectory";
import { buildPageSocialMetadata } from "@/lib/metadata";

export function generateMetadata() {
  const title = "Find outpatient care and practice locations";
  const description = "Explore doctors for an outpatient visit at listed hospital practice locations. Independent clinic listings are being added. Request appointments through DOCVY.";
  return { title, description, alternates: { canonical: "/clinics" }, ...buildPageSocialMetadata(title, description, "/clinics"), robots: { index: false, follow: true } };
}
export default function ClinicsPage() { return <FacilitiesDirectory outpatient />; }
