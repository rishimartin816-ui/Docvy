import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import DoctorDirectory from "@/components/DoctorDirectory";
import { providerCandidates, providerCities, type ProviderCity } from "@/lib/provider-candidates";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";
import { docvyOpenGraphImage } from "@/lib/metadata";

const citySlugs: Record<string, ProviderCity> = {
  delhi: "Delhi",
  gurugram: "Gurugram",
  noida: "Noida",
};

export function generateStaticParams() {
  return Object.keys(citySlugs).map((city) => ({ city }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = citySlugs[params.city];
  if (!city) return { title: "City not found" };
  const locationName = city === "Gurugram" ? "Gurugram (Gurgaon)" : city;
  const title = `Doctors in ${locationName}`;
  const profileCount = providerCandidates.filter((doctor) => doctor.locations.some((location) => location.city === city)).length;
  const description = `Browse ${profileCount} source-linked doctor profiles currently listed in ${locationName}, Delhi NCR. Filter by specialty and hospital; this is a limited directory, so confirm current details with the hospital.`;
  const cityPath = "/doctors/" + params.city;
  return {
    title,
    description,
    alternates: { canonical: cityPath },
    openGraph: { type: "website", locale: "en_IN", siteName: "DOCVY", title: title + " | DOCVY", description, url: cityPath, images: [docvyOpenGraphImage] },
    twitter: { card: "summary_large_image", title: title + " | DOCVY", description, images: ["/opengraph-image"] },
  };
}

export default function CityDoctorsPage({ params }: { params: { city: string } }) {
  const intakeEnabled = isAppointmentIntakeConfigured();
  const city = citySlugs[params.city];
  if (!city || !providerCities.includes(city)) notFound();
  const listings = providerCandidates.flatMap((doctor) => doctor.locations.filter((location) => location.city === city).map((location) => ({ doctor, location })));
  const hospitals = [...new Set(listings.map(({ doctor }) => doctor.hospital))];
  const specialties = [...new Set(listings.flatMap(({ doctor }) => doctor.specialties))].sort((a, b) => a.localeCompare(b));
  const uniqueProfiles = new Set(listings.map(({ doctor }) => doctor.id)).size;
  const locations = [...new Set(listings.map(({ location }) => location.locality).filter(Boolean))] as string[];
  const canonicalUrl = `https://www.docvy.in/doctors/${params.city}`;

  return <div className="bg-[#F6FAF8] text-[#173A37]">
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_84%_30%,#C9ECE2_0%,#EAF5F1_42%,#F6FAF8_100%)] px-6 py-14 md:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-16 h-72 w-72 rounded-full bg-white/50 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="text-sm font-semibold text-[#087F83]">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-[#066D70]">Home</Link></li>
            <li aria-hidden="true"><ArrowRight size={14} /></li>
            <li><Link href="/doctors" className="hover:text-[#066D70]">Doctor directory</Link></li>
            <li aria-hidden="true"><ArrowRight size={14} /></li>
            <li aria-current="page" className="text-[#526D66]">{city}</li>
          </ol>
        </nav>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.docvy.in/" },
                { "@type": "ListItem", position: 2, name: "Doctor directory", item: "https://www.docvy.in/doctors" },
                { "@type": "ListItem", position: 3, name: `Doctors in ${city}`, item: canonicalUrl },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><MapPin size={14} /> DOCTORS · {city.toLocaleUpperCase()}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[56px]">Doctors in {city}: browse by specialty and hospital</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#526D66] md:text-lg">Explore {uniqueProfiles} current DOCVY profile{uniqueProfiles === 1 ? "" : "s"} linked to hospital sources in {city}. Filter by specialty or facility, then use the official hospital profile to confirm current location and appointments.</p>
        <div className="mt-7 flex flex-wrap gap-2"><span className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#087F83]">{uniqueProfiles} source-linked profiles</span><span className="rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#526D66]">{hospitals.length} hospital groups</span><span className="rounded-full bg-[#FFF9EE] px-4 py-2 text-xs font-bold text-[#80672E]">DOCVY review pending</span></div>
        {locations.length > 0 && <div className="mt-6 rounded-2xl border border-[#DCEAE5] bg-white/80 p-4"><h2 className="text-sm font-bold text-[#173A37]">Browse source-listed locations in {city}</h2><p className="mt-1 text-xs leading-5 text-[#526D66]">These area names appear in hospital profile sources; they are not a complete neighbourhood directory.</p><nav className="mt-3 flex flex-wrap gap-2" aria-label={`Browse listed doctor locations in ${city}`}>{locations.map((locality) => <Link key={locality} href={`/doctors?city=${encodeURIComponent(city)}&locality=${encodeURIComponent(locality)}`} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#C9DDD5] bg-white px-3 py-1.5 text-xs font-semibold text-[#36564F] transition hover:border-[#087F83] hover:text-[#087F83]">{locality} · {city}</Link>)}</nav></div>}
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-6 py-10 md:py-14" aria-label={`${city} doctor profiles`}>
      <div className="mb-8 rounded-2xl border border-[#E7C99A] bg-[#FFF9EE] p-4 md:p-5"><p className="text-sm leading-6 text-[#6E5B39]">This is a limited set of hospital-listed profiles, not a complete list of doctors in {city}. DOCVY has not independently verified credentials or appointment slots. Listings may repeat across NCR cities when sources list multiple facilities.</p></div>
      <DoctorDirectory key={city} initialCity={city} intakeEnabled={intakeEnabled} />
    </section>

    <section className="border-y border-[#DCEAE5] bg-white px-6 py-12 md:py-14"><div className="mx-auto max-w-6xl"><p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">SPECIALTIES IN THESE LISTINGS</p><h2 className="mt-2 text-2xl font-bold">Browse listed specialties in {city}</h2><div className="mt-5 flex flex-wrap gap-2">{specialties.map((specialty) => <Link key={specialty} href={`/doctors?city=${encodeURIComponent(city)}&specialty=${encodeURIComponent(specialty)}`} className="rounded-full border border-[#DCEAE5] bg-[#F8FBF9] px-3 py-2 text-sm font-medium text-[#36564F] transition hover:border-[#B8DCD0] hover:text-[#087F83]">{specialty}</Link>)}</div><p className="mt-6 text-sm text-[#526D66]">Also browse <Link className="font-semibold text-[#087F83] underline underline-offset-4" href="/doctors/delhi">Delhi</Link>, <Link className="font-semibold text-[#087F83] underline underline-offset-4" href="/doctors/gurugram">Gurugram (Gurgaon)</Link> and <Link className="font-semibold text-[#087F83] underline underline-offset-4" href="/doctors/noida">Noida</Link>.</p></div></section>

    <section className="bg-[#F6FAF8] px-6 py-12 md:py-16" aria-labelledby="city-faq-heading">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-extrabold tracking-[0.14em] text-[#087F83]">CLEAR ANSWERS BEFORE YOU CONTACT A PROVIDER</p>
        <h2 id="city-faq-heading" className="mt-2 text-2xl font-bold">Doctor listings in {city}: common questions</h2>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#DCEAE5] bg-white p-5">
            <dt className="font-bold text-[#173A37]">Is this a complete list of doctors in {city}?</dt>
            <dd className="mt-2 text-sm leading-6 text-[#526D66]">No. DOCVY currently shows a limited set of profiles linked to public hospital pages. It is not a complete city directory.</dd>
          </div>
          <div className="rounded-2xl border border-[#DCEAE5] bg-white p-5">
            <dt className="font-bold text-[#173A37]">Can I book an appointment through DOCVY?</dt>
            <dd className="mt-2 text-sm leading-6 text-[#526D66]">No. The appointment enquiry form is closed, and DOCVY does not reserve a slot. Open the hospital source profile and contact the provider to confirm the doctor, location, time and fee.</dd>
          </div>
          <div className="rounded-2xl border border-[#DCEAE5] bg-white p-5">
            <dt className="font-bold text-[#173A37]">Has DOCVY independently verified each doctor&apos;s credentials?</dt>
            <dd className="mt-2 text-sm leading-6 text-[#526D66]">No. The profile is linked to a public listing from {hospitals.join(", ")}. DOCVY&apos;s credential review is pending; use the linked hospital page to check current details.</dd>
          </div>
          <div className="rounded-2xl border border-[#DCEAE5] bg-white p-5">
            <dt className="font-bold text-[#173A37]">Can I use the patient guide outside Delhi NCR?</dt>
            <dd className="mt-2 text-sm leading-6 text-[#526D66]">Yes. The plain-language patient guide is available across India. Doctor listings currently cover Delhi, Gurugram and Noida. Other city listings are planned when useful, source-linked coverage is ready; no expansion date has been announced.</dd>
          </div>
        </dl>
      </div>
    </section>
  </div>;
}
