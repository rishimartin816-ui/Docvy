import { notFound } from "next/navigation";
import StagingCalendar from "@/components/StagingCalendar";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default function ClinicPage() {
  if (process.env.DOCVY_CRM_STAGING !== "true" || process.env.VERCEL_ENV === "production") notFound();
  return <StagingCalendar clinic />;
}
