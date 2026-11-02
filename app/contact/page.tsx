import type { Metadata } from "next";
import { Building2, Mail, MapPin, ShieldAlert } from "lucide-react";
import { docvyOpenGraphImage } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contact and provider enquiries",
  description: "Contact DOCVY about clinic and hospital plans, provider onboarding, or privacy questions.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DOCVY",
    title: "Contact DOCVY about provider onboarding",
    description: "Contact DOCVY about clinic and hospital plans, provider onboarding, or privacy questions.",
    url: "/contact",
    images: [docvyOpenGraphImage],
  },
};

export default function ContactPage() {
  return <div className="bg-[#F6FAF8] text-[#173A37]">
    <section className="bg-white py-16 md:py-20"><div className="mx-auto max-w-[1440px] px-6 lg:px-[72px]">
      <p className="text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]">CONTACT DOCVY</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.04em] md:text-[52px]">Let’s talk about your clinic or hospital.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-[#526D66]">Reach out about provider plans, organisation verification, onboarding, a doctor profile or privacy. The request page shows whether DOCVY is currently accepting patient enquiries; appointments are not booked or confirmed on this site.</p>
    </div></section>
    <section className="mx-auto grid max-w-[1440px] gap-5 px-6 py-12 md:grid-cols-2 lg:px-[72px] md:py-16">
      <article className="rounded-[24px] border border-[#DCEAE5] bg-white p-7"><Building2 className="mb-5 text-[#087F83]" size={25} /><h2 className="text-xl font-bold">Provider partnerships</h2><p className="mt-3 text-sm leading-6 text-[#526D66]">For clinic and hospital plan enquiries, email DOCVY. Please include your organisation name and preferred contact details only. Do not email patient or health information.</p><a href="mailto:contact@docvy.in?subject=DOCVY%20provider%20enquiry" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white hover:bg-[#066D70]"><Mail size={16} />Contact now</a></article>
      <article className="rounded-[24px] border border-[#DCEAE5] bg-white p-7"><MapPin className="mb-5 text-[#087F83]" size={25} /><h2 className="text-xl font-bold">Business information</h2><p className="mt-3 text-sm leading-6 text-[#526D66]">DSS Global Technologies Private Limited</p><p className="mt-2 text-sm leading-6 text-[#526D66]">2nd Floor, Capital Cityscape, Sector 66, Gurugram, Haryana – 122101, India.</p><p className="mt-2 text-sm text-[#526D66]">General and privacy enquiries: <a className="font-semibold underline decoration-[#087F83] underline-offset-4" href="mailto:contact@docvy.in">contact@docvy.in</a></p></article>
    </section>
    <section className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-[72px]"><div className="flex gap-4 rounded-2xl border border-[#F2D5A9] bg-[#FFF9EE] p-6"><ShieldAlert className="mt-0.5 shrink-0 text-[#A36A12]" size={21} /><div><h2 className="font-bold">Patient appointment enquiries</h2><p className="mt-2 text-sm leading-6 text-[#6E5B39]">Use the request page only when its form is marked open. Do not send patient health or contact details by email. DOCVY enquiries do not reserve a slot or automatically notify a provider.</p></div></div></section>
    <section className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-[72px]"><div className="rounded-2xl border border-[#DCEAE5] bg-white p-6"><h2 className="font-bold">Medical emergency?</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">DOCVY is not an emergency service. In India, call 112 or go to the nearest emergency department for urgent medical help.</p></div></section>
  </div>;
}
