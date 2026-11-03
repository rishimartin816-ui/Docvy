import type { Metadata } from "next";
import Link from "next/link";
import DiscoverySearch, { DemoProvider, discoveryCities, discoverySpecialties } from "@/components/DiscoverySearch";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Browse doctors by specialty and city",
  description: "Explore city and specialty filters and view DOCVY’s fictional doctor and clinic demonstration.",
  robots: { index: false, follow: true },
};

export default function DoctorsPage({ searchParams }: { searchParams: { city?: string; specialty?: string } }) {
  const city = discoveryCities.find((item) => item === searchParams.city) ?? "";
  const specialty = discoverySpecialties.find((item) => item === searchParams.specialty) ?? "";
  const hasDemo = (!city || city === "Delhi") && (!specialty || specialty === "General medicine");
  return <div className="docvy-garden">
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-9 sm:py-16">
      <p className="docvy-eyebrow">DOCTOR DISCOVERY · DEMO DIRECTORY</p>
      <h1 className="mt-4 text-4xl font-bold leading-tight tracking-[-.05em] text-[#1e3028] sm:text-6xl">Browse by city and specialty.</h1>
      <p className="mb-7 mt-4 max-w-2xl leading-7 text-[#41584d]">Try the search with fictional clinic data. Real provider listings are currently paused.</p>
      <DiscoverySearch city={city} specialty={specialty} />
      <div className="mt-7">
        {hasDemo ? <section aria-labelledby="consultations"><h2 id="consultations" className="mb-3 text-2xl font-bold">Demo consultations</h2><DemoProvider bookingHref={clinicCrmConfig()?.staging === true ? "/book" : "https://docvy-clinic-demo.vercel.app/book"} /></section> :
          <section className="docvy-glass p-6">
            <h2 className="text-2xl font-bold text-[#1e3028]">No demo listings match this search</h2>
            <p className="mt-2 text-[#41584d]">Try General medicine in Delhi to see the fictional clinic workflow.</p>
            <Link href="/doctors?city=Delhi&specialty=General+medicine" className="docvy-pill mt-4">View the Delhi demo</Link>
          </section>}
      </div>
    </div>
  </div>;
}
