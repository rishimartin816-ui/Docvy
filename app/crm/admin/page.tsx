import { notFound } from "next/navigation";
import StagingCalendar from "@/components/StagingCalendar";

import { clinicCrmConfig } from "@/lib/clinic-crm-config";

export const dynamic = "force-dynamic";
export function generateMetadata() { return { title: "Clinic owner sign-in", description: "Sign in to the DOCVY owner console for your clinic.", alternates: { canonical: "/crm/admin" }, robots: { index: false, follow: false } }; }

export default function AdminPage() {
  const config = clinicCrmConfig();
  if (!config) notFound();
  return <StagingCalendar clinic admin clinicName={config.clinicName} staging={config.staging} />;
}
