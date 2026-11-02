import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";

export const metadata: Metadata = { title: "Appointment status", description: "DOCVY appointment requests are not open yet.", robots: { index: false, follow: false } };

export default function StatusPage() {
  return <div className="min-h-[70vh] bg-[#F6FAF8] px-6 py-16"><div className="mx-auto max-w-2xl rounded-[24px] border border-[#DCEAE5] bg-white p-7 shadow-sm md:p-10"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#087F83]"><Info size={21} /></span><h1 className="mt-5 text-3xl font-bold tracking-tight text-[#173A37]">Appointment requests are paused.</h1><p className="mt-3 text-sm leading-7 text-[#526D66]">DOCVY is preparing provider verification and secure staff access. No appointment has been made unless a provider directly confirms it with you.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/doctors" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white">Search for care <ArrowRight size={16} /></Link><Link href="/contact" className="inline-flex min-h-11 items-center rounded-xl border border-[#B8D2C9] px-5 text-sm font-bold text-[#087F83]">Contact DOCVY</Link></div></div></div>;
}
