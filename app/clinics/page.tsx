import FacilitiesDirectory from "@/components/FacilitiesDirectory";
import { buildPageSocialMetadata } from "@/lib/metadata";

export function generateMetadata() {
  const title = "Find outpatient care and practice locations";
  const description = "Find clinic and outpatient practice locations across India. Review associated doctors, addresses and appointment-request options before planning your visit.";
  return { title, description, alternates: { canonical: "/clinics" }, ...buildPageSocialMetadata(title, description, "/clinics"), robots: { index: false, follow: true } };
}
export default function ClinicsPage({searchParams}:{searchParams:{q?:string;city?:string}}) { return <FacilitiesDirectory outpatient query={typeof searchParams.q==="string"?searchParams.q.slice(0,120):""} city={typeof searchParams.city==="string"?searchParams.city.slice(0,70):""}/>; }
