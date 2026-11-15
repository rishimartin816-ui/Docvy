import { notFound } from "next/navigation";
import FounderDashboard from "@/components/FounderDashboard";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
export const dynamic = "force-dynamic";
export const metadata = { title: "DOCVY founder dashboard", robots: { index: false, follow: false } };
export default function Page() { if (process.env.DOCVY_BOOKING_WORKFLOW_ENABLED !== "true" || clinicCrmConfig()?.staging !== true)
    notFound(); return <FounderDashboard />; }
