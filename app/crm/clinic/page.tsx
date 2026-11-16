import BookingAdmin from "@/components/BookingAdmin";
import { notFound } from "next/navigation";
import StagingCalendar from "@/components/StagingCalendar";

import { clinicCrmConfig } from "@/lib/clinic-crm-config";

export const dynamic = "force-dynamic";
export function generateMetadata() { return { title: "Clinic staff sign-in", description: "Sign in to the DOCVY workspace to manage your clinic schedule.", alternates: { canonical: "/crm/clinic" }, robots: { index: false, follow: false } }; }

export default function ClinicPage() {
  const config = clinicCrmConfig();
  if (!config) notFound();
  if(!config.staging&&process.env.DOCVY_HYBRID_BOOKING_ENABLED==="true")return <BookingAdmin/>;
  return <StagingCalendar clinic clinicName={config.clinicName} staging={config.staging} />;
}
