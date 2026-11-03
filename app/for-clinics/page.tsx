import type { Metadata } from "next";
import Link from "next/link";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Clinic workspace demo", robots: { index: false, follow: true } };

export default function ForClinicsPage() {
  const crm = clinicCrmConfig();
  return <div className="docvy-garden px-5 py-14 sm:px-9"><div className="docvy-glass mx-auto max-w-3xl p-7 sm:p-10">
    <p className="docvy-eyebrow">FOR CLINIC TEAMS</p>
    <h1 className="mt-3 text-4xl font-bold tracking-tight">Clinic workspace</h1>
    <p className="mt-4 text-lg text-[#41584d]">See how staff manage appointment slots, review enquiries, and find a booking’s history.</p>
    <p className="mt-3 text-[#41584d]">The walkthrough uses fictional records and requires a demo staff sign-in.</p>
    <Link href={crm ? "/crm/clinic" : "https://docvy-clinic-demo.vercel.app/crm/clinic"} className="docvy-pill docvy-pill-primary mt-6">Open the clinic workspace</Link>
  </div></div>;
}
