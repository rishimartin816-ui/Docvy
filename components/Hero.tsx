import Link from "next/link";
import { Search } from "lucide-react";
import RecentBookingActivity from "./RecentBookingActivity";

const topics = [
  ["Diabetes", "/patient-guides/diabetes"],
  ["Joint pain", "/patient-guides/joint-pain-arthritis"],
  ["Skin and hair", "/specialties/dermatology"],
  ["Blood pressure", "/patient-guides/high-blood-pressure"],
];

export default function Hero() {
  return <section className="calm-hero calm-section">
    <div className="calm-wrap">
      <p className="mb-5 text-sm font-medium text-plum">A little clarity. A confident next step.</p>
      <h1 className="max-w-[900px] text-[clamp(2.25rem,5.2vw,4.4rem)] font-medium leading-[1.12] tracking-[-0.035em]">Find the right doctor and book with confidence.</h1>
      <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-ink sm:text-lg">Explore specialties and procedures across India. Request an appointment where clinic intake is available.</p>
      <form action="/doctors" role="search" aria-label="Find a doctor" className="mt-8 flex max-w-3xl items-center gap-2 rounded-2xl border border-taupe bg-porcelain p-2 sm:p-3">
        <label htmlFor="home-search" className="sr-only">Search by symptom, doctor, specialty or clinic</label>
        <Search size={21} strokeWidth={1.5} className="ml-2 hidden shrink-0 text-plum sm:block" aria-hidden="true" />
        <input id="home-search" name="q" type="search" maxLength={120} placeholder="Symptom, doctor, specialty or clinic" className="min-h-12 min-w-0 flex-1 rounded-xl bg-transparent px-2 text-base text-ink placeholder:text-grey sm:px-3" />
        <button type="submit" className="calm-button shrink-0 px-5 sm:px-7">Search</button>
      </form>
      <nav aria-label="Explore health topics" className="mt-4 flex max-w-3xl flex-wrap gap-2">
        {topics.map(([label, href]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center rounded-full bg-lavender px-4 text-sm font-medium text-plum hover:bg-rose/50">{label}</Link>)}
      </nav>
      <RecentBookingActivity />
    </div>
  </section>;
}
