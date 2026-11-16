import { notFound } from "next/navigation";
import StagingCalendar from "@/components/StagingCalendar";

import { clinicCrmConfig } from "@/lib/clinic-crm-config";
import { workspaceEnabled } from "@/lib/workspace";
import ProductionCrm from "@/components/ProductionCrm";

export const dynamic = "force-dynamic";
export function generateMetadata() { return { title: "Clinic staff sign-in", description: "Sign in to the DOCVY workspace to manage your clinic schedule.", alternates: { canonical: "/crm/clinic" }, robots: { index: false, follow: false } }; }

export default function ClinicPage() {
  if (workspaceEnabled()) return <ProductionCrm />;
  const config = clinicCrmConfig();
  if (!config) notFound();
  return <StagingCalendar clinic clinicName={config.clinicName} staging={config.staging} />;
}
