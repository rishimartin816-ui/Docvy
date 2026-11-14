import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Info } from "lucide-react";
import { buildPageSocialMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Appointment status",
  description: "Follow up on your DOCVY appointment request using your reference and selected clinic.",
  alternates: { canonical: "/status" }, robots: { index: false, follow: false },
  ...buildPageSocialMetadata("Appointment status | DOCVY", "Follow up on your DOCVY appointment request using your reference and selected clinic.", "/status"),
};

export default function StatusPage() {
  return <div className="min-h-[70vh] bg-[#FFFFFF] px-6 py-16"><div className="mx-auto max-w-2xl rounded-[24px] border border-line bg-white p-7  md:p-10"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-ink"><Info strokeWidth={1.5} size={21} /></span><h1 className="mt-5 text-3xl font-bold tracking-tight text-ink">Follow up on your appointment request.</h1><p className="mt-3 text-sm leading-7 text-grey">Keep your DOCVY reference handy and contact your selected clinic for your visit time, consultation fee and arrival instructions.</p><div className="mt-6 rounded-xl bg-[#FFFFFF] p-4"><div className="flex items-start gap-3"><Building2 strokeWidth={1.5} size={19} className="mt-0.5 shrink-0 text-ink"/><p className="text-sm leading-6 text-grey">Find your doctor in the directory to view their registration details, practice locations, consulting hours and contact information.</p></div></div><div className="mt-6 flex flex-wrap gap-3"><Link href="/doctors" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white">Open the doctor directory <ArrowRight strokeWidth={1.5} size={16} /></Link><Link href="/faqs" className="inline-flex min-h-11 items-center rounded-xl border border-line px-5 text-sm font-bold text-ink">Read patient FAQs</Link></div></div></div>;
}
