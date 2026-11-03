import type { Metadata } from "next";
import Link from "next/link";
import DiscoverySearch, { DemoProvider, discoveryCities, discoverySpecialties } from "@/components/DiscoverySearch";
import { procedures, specialties } from "@/lib/care-directory";
import { clinicCrmConfig } from "@/lib/clinic-crm-config";
import { providerCandidates } from "@/lib/provider-candidates";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Browse doctors by specialty and city",
  description: "Browse DOCVY's doctor directory by city, specialty, or procedure.",
  robots: { index: false, follow: true },
};

export default function DoctorsPage({ searchParams }: { searchParams: { city?: string; specialty?: string; procedure?: string } }) {
  const city = discoveryCities.find((item) => item === searchParams.city) ?? "";
  const procedure = procedures.find(({ name }) => name === searchParams.procedure);
  const specialty = procedure?.specialty ?? discoverySpecialties.find((item) => item === searchParams.specialty) ?? "";
  const matches = providerCandidates.filter((doctor) =>
    (!city || doctor.locations.some((location) => location.city === city)) &&
    (!specialty || doctor.specialties.some((name) => name.toLowerCase() === specialty.toLowerCase())) &&
    (!procedure || doctor.procedures?.includes(procedure.name))
  );
  const hasDemo = !procedure && (!city || city === "Delhi") && (!specialty || specialty === "General medicine");
  const specialtyPage = specialties.find(({ name }) => name === specialty);
  const guideHref = procedure ? "/surgery-guide#procedures" : specialtyPage ? "/specialties/" + specialtyPage.slug : "/specialties";
  const guideLabel = procedure ? "Back to procedures" : specialtyPage ? "Read the specialty guide" : "Explore specialties";

  return <div className="docvy-garden">
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-9 sm:py-16">
      <p className="docvy-eyebrow">DOCTOR DIRECTORY</p>
      <h1 className="mt-4 text-4xl font-bold leading-tight tracking-[-.05em] text-[#1e3028] sm:text-6xl">{procedure?.name ?? (specialty || "Find a doctor")}</h1>
      <p className="mb-7 mt-4 max-w-2xl leading-7 text-[#41584d]">{procedure ? "Choose a city to see doctors listed for this procedure." : "Choose a city and the type of doctor you want to see."}</p>
      <DiscoverySearch city={city} specialty={specialty} procedure={procedure?.name} />
      <div className="mt-7 space-y-4">
        {matches.map((doctor) => <article key={doctor.id} className="docvy-glass p-6">
          <h2 className="text-2xl font-bold">{doctor.name}</h2>
          <p className="mt-2 text-[#41584d]">{doctor.specialties.join(", ")}</p>
          <ul className="mt-2 text-[#41584d]">{doctor.locations.filter((location) => !city || location.city === city).map((location) =>
            <li key={location.city + location.facility}>{location.facility}, {location.city}</li>
          )}</ul>
          <a href={doctor.sourceUrl} className="docvy-pill docvy-pill-primary mt-4">View hospital profile</a>
        </article>)}
        {matches.length === 0 && <section className="docvy-glass p-6">
          <h2 className="text-2xl font-bold text-[#1e3028]">{procedure ? "No doctors are listed for this procedure yet" : "No doctors are listed for this search yet"}</h2>
          <p className="mt-2 text-[#41584d]">{procedure ? "You can return to the surgery guide for questions to ask your care team." : "Read about the different types of doctors and what to bring to a visit."}</p>
          <Link href={guideHref} className="docvy-pill mt-4">{guideLabel}</Link>
        </section>}
        {hasDemo && <section aria-labelledby="consultations"><h2 id="consultations" className="mb-3 text-2xl font-bold">Try a fictional consultation</h2><DemoProvider bookingHref={clinicCrmConfig()?.staging === true ? "/book" : "https://docvy-clinic-demo.vercel.app/book"} /></section>}
      </div>
    </div>
  </div>;
}
