import { notFound } from "next/navigation";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
import StagingCalendar from "@/components/StagingCalendar";

export const dynamic = "force-dynamic";
export function generateMetadata() { return { title: "Demo appointment request", description: "Try a fictional DOCVY appointment request.", alternates: { canonical: "/request/test" }, robots: { index: false, follow: false } }; }

export default function TestBookingPage() {
  if (clinicCrmConfig()?.staging !== true) notFound();
  return <StagingCalendar />;
}
