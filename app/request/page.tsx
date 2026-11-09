import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CalendarCheck } from "lucide-react";
import AppointmentRequestForm from "@/components/AppointmentRequestForm";
import { providerCandidates } from "@/lib/provider-candidates";
import { isAppointmentIntakeConfigured, providersWithAppointmentIntake } from "@/lib/appointment-intake";
import { buildPageSocialMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";
export function generateMetadata(): Metadata {
  const title = "Request an appointment through DOCVY";
  const description = "Send an appointment request to DOCVY for your chosen doctor and hospital. DOCVY records your preferences. The provider must confirm availability and fees.";
  return { title, description, alternates: { canonical: "/request" }, robots: { index: false, follow: false }, ...buildPageSocialMetadata(title, description, "/request") };
}

type Params = { provider?: string; city?: string; facility?: string };
export default async function RequestPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const doctors = providerCandidates.filter((doctor) => doctor.live === true);
  const available = await providersWithAppointmentIntake(doctors);
  const enabled = isAppointmentIntakeConfigured() && available.length > 0;
  const selected = doctors.find((doctor) => doctor.id === params.provider);
  return <div className="mx-auto max-w-site px-5 py-12 sm:px-9 md:py-16">
    <div className="mb-8 max-w-3xl">
      <p className="text-sm font-medium text-grey">APPOINTMENT REQUEST</p>
      <h1 className="mt-4 text-4xl font-medium leading-tight md:text-5xl">Request your visit through DOCVY.</h1>
      <p className="mt-5 text-lg leading-8 text-ink">Choose your doctor and practice location, then share how DOCVY can reach you. Availability, timing and fees need the provider’s confirmation.</p>
    </div>
    <div className="grid items-start gap-8 lg:grid-cols-[.8fr_1.2fr]">
      <section className="space-y-5">
        {selected && <div className="docvy-glass p-6">
          <Building2 size={25} strokeWidth={1.5} className="text-ink" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold">{selected.name}</h2>
          <p className="mt-2 text-sm text-grey">{selected.specialties.join(" · ")}</p>
          {selected.locations.map((location) => <p className="mt-3 text-sm leading-7" key={location.facility}>{location.facility}<br />{[location.locality, location.city].filter(Boolean).join(", ")}</p>)}
          <Link href={"/doctor/" + selected.id} className="mt-3 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Review doctor profile</Link>
        </div>}
        <div className="docvy-glass p-6">
          <CalendarCheck size={25} strokeWidth={1.5} className="text-ink" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold">What happens next</h2>
          <p className="mt-3 text-sm leading-7 text-grey">Once saved, your request has a DOCVY reference number and waits for coordination. No slot is reserved until the provider accepts it. DOCVY does not take payment here.</p>
          <p className="mt-3 text-sm leading-7 text-grey">Hospital profile sources describe the doctor’s practice. A listing does not establish a DOCVY hospital partnership. Share contact details and appointment preferences only. Please keep symptoms, diagnoses, identity documents and medical records out of this form.</p>
        </div>
      </section>
      {enabled ? <AppointmentRequestForm doctors={available} initialProvider={params.provider ?? ""} initialCity={params.city ?? ""} initialFacility={params.facility} enabled /> : <section className="docvy-glass p-6">
        <h2 className="text-xl font-semibold">DOCVY request intake is currently unavailable</h2>
        <p className="mt-3 text-sm leading-7 text-grey">Your details have not been collected. You can contact DOCVY about this doctor and practice location.</p>
        <a href="mailto:contact@docvy.in?subject=Appointment%20request" className="docvy-pill docvy-pill-primary mt-5">Email DOCVY</a>
      </section>}
    </div>
  </div>;
}
