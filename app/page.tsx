import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, HeartPulse, MapPin } from "lucide-react";
import DiscoverySearch, { DemoProvider } from "@/components/DiscoverySearch";
import { HealthTopicIcon, healthTopics } from "@/components/HealthTopicIcon";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";

export const dynamic = "force-dynamic";

const title = "Which doctor should I see? Patient guide for India";
const description = "Learn which type of doctor to look for, how to prepare for a visit, and what to ask. Explore patient guides and search by specialty and city on DOCVY.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  ...buildPageSocialMetadata(title + " | DOCVY", description, "/"),
};

export default function Home() {
  const demo = clinicCrmConfig()?.staging === true;
  return <div className="docvy-garden">
    <section className="relative isolate mx-auto grid max-w-[1320px] items-center gap-8 px-5 pb-10 pt-10 sm:px-9 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
      <div>
        <p className="docvy-eyebrow">CARE DISCOVERY · INDIA</p>
        <h1 className="mt-5 max-w-[720px] text-5xl font-bold leading-[.98] tracking-[-.06em] text-[#1e3028] sm:text-6xl lg:text-7xl">Care starts with a question.</h1>
        <p className="my-6 max-w-lg text-base leading-7 text-[#41584d] sm:text-lg">Not sure which doctor to look for? Start with what is on your mind, learn which specialists handle it, or browse by specialty and city.</p>
        <DiscoverySearch />
        <p className="mt-3 text-sm text-[#41584d]">The directory currently shows a fictional clinic. You can still explore every patient guide.</p>
      </div>
      <figure className="docvy-glass overflow-hidden p-3 sm:p-4">
        <Image src="/images/docvy-consultation-nci.jpg" width={800} height={600} priority sizes="(max-width: 1023px) 90vw, 42vw" alt="A clinician speaking with a patient in a consultation room" className="aspect-[4/3] w-full rounded-[22px] object-cover" />
        <figcaption className="px-2 pt-2 text-xs text-[#41584d]">Illustrative photo by the National Cancer Institute.</figcaption>
      </figure>
    </section>
    <section className="mx-auto max-w-[1320px] px-5 py-10 sm:px-9" aria-labelledby="specialties">
      <p className="docvy-eyebrow">START WITH A CONCERN</p>
      <h2 id="specialties" className="mt-3 text-3xl font-bold tracking-tight text-[#1e3028] sm:text-5xl">Which doctor should I see?</h2>
      <p className="mt-3 max-w-xl text-[#41584d]">Choose a topic to learn which specialists are commonly involved and how to prepare for a visit.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {healthTopics.map(({ slug, label, description }) => <Link key={slug} href={"/patient-guides/" + slug} className="docvy-glass flex items-start gap-4 p-4 transition hover:bg-white sm:p-5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e0efe5] text-[#245a46]"><HealthTopicIcon slug={slug} /></span>
          <span><strong className="block text-lg">{label}</strong><span className="text-sm text-[#41584d]">{description}</span></span>
        </Link>)}
      </div>
    </section>
    <section className="mx-auto grid max-w-[1320px] gap-5 px-5 py-10 sm:px-9 lg:grid-cols-2">
      <div className="docvy-glass p-6 sm:p-8">
        <MapPin className="text-[#245a46]" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-bold text-[#1e3028]">Explore cities across India</h2>
        <p className="mt-2 text-sm text-[#41584d]">Choose your city and specialty together. The fictional booking walkthrough is set in Delhi.</p>
        <Link href="/doctors" className="docvy-pill mt-5">Browse cities and specialties <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
      <div className="docvy-glass p-6 sm:p-8">
        <HeartPulse className="text-[#245a46]" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-bold text-[#1e3028]">Understand your options</h2>
        <p className="mt-2 leading-7 text-[#41584d]">Use the patient guide to learn about common health concerns and the types of specialists you may encounter.</p>
        <Link href="/care-guide" className="docvy-pill mt-5">Read the patient guide <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
    <section className="mx-auto max-w-[1320px] px-5 pb-16 pt-8 sm:px-9" aria-labelledby="demo">
      <p className="docvy-eyebrow">TRY THE WORKFLOW</p>
      <h2 id="demo" className="mb-5 mt-3 flex items-center gap-3 text-3xl font-bold text-[#1e3028]"><CalendarCheck aria-hidden="true" /> Clinic appointment demo</h2>
      <DemoProvider bookingHref={demo ? "/book" : "https://docvy-clinic-demo.vercel.app/book"} />
      <Link href={demo ? "/crm/clinic" : "https://docvy-clinic-demo.vercel.app/crm/clinic"} className="docvy-pill mt-4">Open the clinic CRM <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </section>
  </div>;
}
