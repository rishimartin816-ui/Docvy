import IllustrationBackground from "@/components/IllustrationBackground";
import { notFound } from "next/navigation";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
import StagingCalendar from "@/components/StagingCalendar";

export const dynamic = "force-dynamic";
export function generateMetadata() { return { title: "Demo appointment booking", description: "Try the fictional DOCVY appointment flow using test slots.", alternates: { canonical: "/book" }, robots: { index: false, follow: false } }; }

export default function TestBookingPage() {
  if (clinicCrmConfig()?.staging !== true) notFound();
  return <div className="relative isolate overflow-hidden"><IllustrationBackground slug="booking-confirmation" alt="Meera checks the details of a clinic visit." /><StagingCalendar /></div>;
}
