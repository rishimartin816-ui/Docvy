import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ClipboardList, ShieldCheck, Stethoscope } from "lucide-react";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "DOCVY clinic workspace", robots: { index: false, follow: true } };

const tools = [
  { title: "Manage appointments", text: "Open and block slots, confirm bookings, or reschedule a visit.", icon: CalendarDays },
  { title: "Follow up with patients", text: "Review enquiries and open booking history, contact details, and quoted fees.", icon: ClipboardList },
  { title: "See who’s in", text: "Check doctor presence and review booking volume for the selected day or week.", icon: Stethoscope },
];

export default function ForClinicsPage() {
  const crm = clinicCrmConfig();
  const live = crm?.staging === false;
  const workspaceHref = crm ? "/crm/clinic" : "https://docvy-clinic-demo.vercel.app/crm/clinic";

  return <div className="docvy-garden px-5 py-12 sm:px-9">
    <div className="mx-auto max-w-5xl">
      <section className="docvy-glass p-7 sm:p-10">
        <p className="docvy-eyebrow">FOR CLINIC TEAMS</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Clinic workspace</h1>
        <p className="mt-4 max-w-2xl text-lg text-[#545761]">
          {live ? `Staff at ${crm.clinicName} can sign in to manage the clinic’s day-to-day work.` : "Try the workspace with fictional clinic records. You’ll need a demo staff account to sign in."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={workspaceHref} className="docvy-pill docvy-pill-primary">{live ? "Staff sign-in" : "Open CRM demo"} <ArrowUpRight size={16} aria-hidden="true" /></Link>
          {crm && <Link href="/crm/admin" className="docvy-pill"><ShieldCheck size={16} aria-hidden="true" /> Owner sign-in</Link>}
        </div>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3" aria-label="Workspace features">
        {tools.map(({ title, text, icon: Icon }) => <article key={title} className="docvy-glass p-5">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f0eff8] text-[#202124]"><Icon size={20} aria-hidden="true" /></span>
          <h2 className="mt-4 font-bold">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#545761]">{text}</p>
        </article>)}
      </section>
    </div>
  </div>;
}
