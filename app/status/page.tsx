import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Info } from "lucide-react";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { providerCityListLabel } from "@/lib/provider-candidates";

export const metadata: Metadata = {
  title: "Appointment status",
  description: "DOCVY enquiries do not confirm or track an appointment.",
  alternates: { canonical: "/status" }, robots: { index: false, follow: false },
  ...buildPageSocialMetadata("Appointment status | DOCVY", "DOCVY enquiries do not confirm or track an appointment.", "/status"),
};

export default function StatusPage() {
  return <div className="min-h-[70vh] bg-[#FFFFFF] px-6 py-16"><div className="mx-auto max-w-2xl rounded-[24px] border border-[#DCE5E8] bg-white p-7  md:p-10"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E3F2F0] text-[#0F2A3D]"><Info strokeWidth={1.5} size={21} /></span><h1 className="mt-5 text-3xl font-bold tracking-tight text-[#0F2A3D]">DOCVY does not confirm or track appointments.</h1><p className="mt-3 text-sm leading-7 text-[#5B6B7A]">An enquiry reference only confirms that DOCVY saved a request. It does not mean a provider received it or reserved a time. Contact the hospital or clinic directly to confirm availability, location, time and fee. If a provider has already confirmed an appointment with you, follow its instructions.</p><div className="mt-6 rounded-xl bg-[#FFFFFF] p-4"><div className="flex items-start gap-3"><Building2 strokeWidth={1.5} size={19} className="mt-0.5 shrink-0 text-[#0F2A3D]"/><p className="text-sm leading-6 text-[#5B6B7A]">Doctor listings are currently limited to {providerCityListLabel}. DOCVY has not independently confirmed credentials or appointment availability.</p></div></div><div className="mt-6 flex flex-wrap gap-3"><Link href="/doctors" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0F2A3D] px-5 text-sm font-bold text-white">Open the doctor directory <ArrowRight strokeWidth={1.5} size={16} /></Link><Link href="/faqs" className="inline-flex min-h-11 items-center rounded-xl border border-[#DCE5E8] px-5 text-sm font-bold text-[#0F2A3D]">Read patient FAQs</Link></div></div></div>;
}
