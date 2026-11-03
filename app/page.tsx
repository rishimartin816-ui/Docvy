import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, HeartPulse, MapPin, Stethoscope } from "lucide-react";
import DiscoverySearch, { DemoProvider, discoveryCities, discoverySpecialties } from "@/components/DiscoverySearch";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find care by specialty and city in India",
  description: "Explore medical specialties and patient guides on DOCVY. Browse cities across India and try a clearly labeled clinic appointment demo.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const demo = clinicCrmConfig()?.staging === true;
  return <div className="docvy-bloom">
    <section className="relative isolate mx-auto grid max-w-[1320px] items-center gap-8 px-5 pb-10 pt-10 sm:px-9 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
      <div>
        <p className="docvy-eyebrow">CARE DISCOVERY · INDIA</p>
        <h1 className="mt-5 max-w-[720px] text-5xl font-bold leading-[.98] tracking-[-.06em] text-[#251b35] sm:text-6xl lg:text-7xl">Find care that feels closer.</h1>
        <p className="my-6 max-w-lg text-base leading-7 text-[#584968] sm:text-lg">Explore doctors by specialty and city, learn what different specialists do, and see how an appointment moves from booking to the clinic calendar.</p>
        <DiscoverySearch />
        <p className="mt-3 text-sm text-[#584968]">The current directory contains a fictional demo profile.</p>
      </div>
      <div className="docvy-glass overflow-hidden p-3 sm:p-4">
        <Image src="/images/docvy-homepage-care-team.png" width={800} height={600} priority sizes="(max-width: 1023px) 90vw, 42vw" alt="Illustration of a clinician and patient talking" className="aspect-[4/3] w-full rounded-[22px] object-cover" />
      </div>
    </section>
    <section className="mx-auto max-w-[1320px] px-5 py-10 sm:px-9" aria-labelledby="specialties">
      <p className="docvy-eyebrow">FIND THE RIGHT SPECIALTY</p>
      <h2 id="specialties" className="mt-3 text-3xl font-bold tracking-tight text-[#251b35] sm:text-5xl">Browse medical specialties</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {discoverySpecialties.map((specialty) => <Link key={specialty} href={{ pathname: "/doctors", query: { specialty } }} className="docvy-glass flex min-h-24 flex-col justify-between gap-2 p-4 text-sm font-bold transition hover:bg-white">
          <Stethoscope size={19} className="text-[#6544a6]" aria-hidden="true" /><span>{specialty}</span>
        </Link>)}
      </div>
    </section>
    <section className="mx-auto grid max-w-[1320px] gap-5 px-5 py-10 sm:px-9 lg:grid-cols-2">
      <div className="docvy-glass p-6 sm:p-8">
        <MapPin className="text-[#6544a6]" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-bold text-[#251b35]">Explore cities across India</h2>
        <p className="mt-2 text-sm text-[#584968]">Location filters are available nationwide. Demo appointment availability is in Delhi.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {discoveryCities.map((city) => <Link key={city} href={{ pathname: "/doctors", query: { city } }} className="docvy-pill">{city}</Link>)}
        </div>
      </div>
      <div className="docvy-glass p-6 sm:p-8">
        <HeartPulse className="text-[#6544a6]" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-bold text-[#251b35]">Understand your options</h2>
        <p className="mt-2 leading-7 text-[#584968]">Use the patient guide to learn about common health concerns and the types of specialists you may encounter.</p>
        <Link href="/care-guide" className="docvy-pill mt-5">Read the patient guide <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
    <section className="mx-auto max-w-[1320px] px-5 pb-16 pt-8 sm:px-9" aria-labelledby="demo">
      <p className="docvy-eyebrow">TRY THE WORKFLOW</p>
      <h2 id="demo" className="mb-5 mt-3 flex items-center gap-3 text-3xl font-bold text-[#251b35]"><CalendarCheck aria-hidden="true" /> Clinic appointment demo</h2>
      <DemoProvider bookingHref={demo ? "/book" : "https://docvy-clinic-demo.vercel.app/book"} />
      <Link href={demo ? "/crm/clinic" : "https://docvy-clinic-demo.vercel.app/crm/clinic"} className="docvy-pill mt-4">Open the clinic CRM <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>
  </div>;
}
