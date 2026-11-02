import Link from "next/link";
import { ArrowRight, Building2, Search } from "lucide-react";

export const metadata = { title: "Requests temporarily paused", robots: { index: false, follow: false } };

export default function Request() {
  return (
    <div className="min-h-[70vh] bg-[#F6FAF8] px-6 py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]">PATIENT APPOINTMENTS · NOT OPEN</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-[-0.045em] text-[#173A37] md:text-[52px]">DOCVY is not accepting appointment requests yet.</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66]">This request page is paused. DOCVY does not receive booking details, reserve appointment slots, or send appointment confirmations. You can still browse the current source-linked doctor profiles and contact a hospital or clinic directly.</p>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#087F83]"><Search size={20}/></span><h2 className="mt-4 text-lg font-bold text-[#173A37]">Find a current listing</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">Browse doctor profiles in Delhi, Gurugram and Noida. Listings are limited and DOCVY has not confirmed appointment availability.</p><Link href="/doctors" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#087F83]">Open the doctor directory <ArrowRight size={15}/></Link></article>
          <article className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF5F1] text-[#087F83]"><Building2 size={20}/></span><h2 className="mt-4 text-lg font-bold text-[#173A37]">Contact the provider directly</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">Open the official hospital profile linked from a listing to ask about appointments, current location and availability.</p><Link href="/doctors" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#087F83]">See hospital-linked profiles <ArrowRight size={15}/></Link></article>
        </div>
        <p className="mt-6 rounded-xl border border-[#E7C99A] bg-[#FFF9EE] p-4 text-sm leading-6 text-[#6E5B39]">Do not enter patient contact details or health information here. No information is collected through this paused page.</p>
      </div>
    </div>
  );
}
