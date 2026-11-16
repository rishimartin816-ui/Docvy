import FacilitiesDirectory from "@/components/FacilitiesDirectory";
import { buildPageSocialMetadata } from "@/lib/metadata";

export function generateMetadata() {
  const title = "Explore hospitals and their doctors in India";
  const description = "Explore hospital practice locations and associated doctor profiles on DOCVY. Review specialties and request a visit, subject to provider confirmation.";
  return { title, description, alternates: { canonical: "/hospitals" }, ...buildPageSocialMetadata(title, description, "/hospitals") };
}
export default function HospitalsPage() { return <FacilitiesDirectory />; }
