import { notFound, redirect } from "next/navigation";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
import StagingCalendar from "@/components/StagingCalendar";

export const dynamic = "force-dynamic";
export function generateMetadata() { return { title: "DOCVY appointments", description: "Book an appointment through DOCVY.", alternates: { canonical: "/clinic" }, robots: { index: false, follow: false } }; }

export default function ClinicPage() {
  if (process.env.VERCEL_ENV === "production") redirect('/book');
  if (clinicCrmConfig()?.staging !== true) notFound();
  return <StagingCalendar clinic />;
}
