import { notFound, redirect } from "next/navigation";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
import StagingCalendar from "@/components/StagingCalendar";

export const dynamic = "force-dynamic";
export function generateMetadata() { return { title: "Book an appointment", description: "Book an appointment through DOCVY.", alternates: { canonical: "/request/test" }, robots: { index: false, follow: false } }; }

export default function TestBookingPage() {
  if (process.env.VERCEL_ENV === "production") redirect('/book');
  if (clinicCrmConfig()?.staging !== true) notFound();
  return <StagingCalendar />;
}
