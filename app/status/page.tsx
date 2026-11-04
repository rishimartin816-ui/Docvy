import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Info } from "lucide-react";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { providerCityListLabel } from "@/lib/provider-candidates";

export const metadata: Metadata = {
  title: "Appointment status",
  description: "DOCVY enquiries do not confirm or track an appointment.",
  robots: { index: false, follow: false },
  ...buildPageSocialMetadata("Appointment status | DOCVY", "DOCVY enquiries do not confirm or track an appointment.", "/status"),
};

export default function StatusPage() {
  return <div className="min-h-[70vh] bg-[#fafafb] px-6 py-16"><div className="mx-auto max-w-2xl rounded-[24px] border border-[#e5e5ea] bg-white p-7 shadow-sm md:p-10"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0eff8] text-[#202124]"><Info size={21} /></span><h1 className="mt-5 text-3xl font-bold tracking-tight text-[#151518]">DOCVY does not confirm or track appointments.</h1><p className="mt-3 text-sm leading-7 text-[#545761]">An enquiry reference only confirms that DOCVY saved a request. It does not mean a provider received it or reserved a time. Contact the hospital or clinic directly to confirm availability, location, time and fee. If a provider has already confirmed an appointment with you, follow its instructions.</p><div className="mt-6 rounded-xl bg-[#fafafb] p-4"><div className="flex items-start gap-3"><Building2 size={19} className="mt-0.5 shrink-0 text-[#202124]"/><p className="text-sm leading-6 text-[#545761]">Doctor listings are currently limited to {providerCityListLabel}. DOCVY has not independently confirmed credentials or appointment availability.</p></div></div><div className="mt-6 flex flex-wrap gap-3"><Link href="/doctors" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#202124] px-5 text-sm font-bold text-white">Open the doctor directory <ArrowRight size={16} /></Link><Link href="/faqs" className="inline-flex min-h-11 items-center rounded-xl border border-[#d9dae2] px-5 text-sm font-bold text-[#202124]">Read patient FAQs</Link></div></div></div>;
}
