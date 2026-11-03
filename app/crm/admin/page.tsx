import { notFound } from "next/navigation";
import StagingCalendar from "@/components/StagingCalendar";

import { clinicCrmConfig } from "@/lib/clinic-crm-config";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default function AdminPage() {
  const config = clinicCrmConfig();
  if (!config) notFound();
  return <StagingCalendar clinic admin clinicName={config.clinicName} staging={config.staging} />;
}
