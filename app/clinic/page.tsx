import { notFound } from "next/navigation";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
import StagingCalendar from "@/components/StagingCalendar";

export const dynamic = "force-dynamic";
export function generateMetadata() { return { title: "Demo clinic calendar", description: "Explore the fictional DOCVY clinic calendar and staff sign-in.", alternates: { canonical: "/clinic" }, robots: { index: false, follow: false } }; }

export default function ClinicPage() {
  if (clinicCrmConfig()?.staging !== true) notFound();
  return <StagingCalendar clinic />;
}
