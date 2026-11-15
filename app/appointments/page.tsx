import { notFound } from "next/navigation";
import BookingRequest from "@/components/BookingRequest";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
export const dynamic = "force-dynamic";
export const metadata = { title: "Staging appointment request", robots: { index: false, follow: false } };
export default function Page() { if (process.env.DOCVY_BOOKING_WORKFLOW_ENABLED !== "true" || clinicCrmConfig()?.staging !== true)
    notFound(); return <BookingRequest />; }
