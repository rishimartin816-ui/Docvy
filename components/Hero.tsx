import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import RecentBookingActivity from "./RecentBookingActivity";

const topics = [
  ["Diabetes", "/patient-guides/diabetes"],
  ["Joint pain", "/patient-guides/joint-pain-arthritis"],
  ["Skin and hair", "/specialties/dermatology"],
  ["Blood pressure", "/patient-guides/high-blood-pressure"],
];

export default function Hero() {
  return <section className="calm-hero calm-section relative isolate overflow-hidden">
    <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-8 w-[380px] opacity-[0.10] md:right-0 md:top-1/2 md:w-[560px] md:-translate-y-1/2 md:opacity-20 xl:right-[max(0px,calc((100vw-1440px)/2))]">
      <Image src="/images/hero-healthcare-doctor.jpg" alt="" width={512} height={512} sizes="(min-width: 768px) 560px, 380px" priority className="h-auto w-full" />
    </div>
    <div className="calm-wrap relative z-10">
      <p className="mb-5 text-sm font-medium text-primary">A little clarity. A confident next step.</p>
      <h1 className="max-w-[900px] text-[clamp(2.25rem,5.2vw,4.4rem)] font-medium leading-[1.12] tracking-[-0.035em]">Find the right doctor and book with confidence.</h1>
      <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-ink sm:text-lg">Explore specialties and procedures across India. Request an appointment where clinic intake is available.</p>
      <form action="/doctors" role="search" aria-label="Find a doctor" className="mt-8 flex max-w-3xl items-center gap-2 rounded-2xl border border-line bg-porc p-2 sm:p-3">
        <label htmlFor="home-search" className="sr-only">Search by symptom, doctor, specialty or clinic</label>
        <Search size={21} strokeWidth={1.5} className="ml-2 hidden shrink-0 text-primary sm:block" aria-hidden="true" />
        <input id="home-search" name="q" type="search" maxLength={120} placeholder="Symptom, doctor, specialty or clinic" className="min-h-12 min-w-0 flex-1 rounded-xl bg-transparent px-2 text-base text-ink placeholder:text-grey sm:px-3" />
        <button type="submit" className="calm-button shrink-0 px-5 sm:px-7">Search</button>
      </form>
      <nav aria-label="Explore health topics" className="mt-4 flex max-w-3xl flex-wrap gap-2">
        {topics.map(([label, href]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center rounded-full bg-surface px-4 text-sm font-medium text-primary hover:bg-surface">{label}</Link>)}
      </nav>
      <RecentBookingActivity />
    </div>
  </section>;
}
