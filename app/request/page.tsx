import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CalendarClock, ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import AppointmentRequestForm from "@/components/AppointmentRequestForm";
import { providerCandidates } from "@/lib/provider-candidates";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";
import { docvyOpenGraphImage } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  const intakeEnabled = isAppointmentIntakeConfigured();
  const title = intakeEnabled ? "Appointment enquiry information" : "Appointment enquiries currently paused";
  const description = intakeEnabled
    ? "Learn what happens when you send DOCVY an appointment enquiry for a listed Delhi NCR doctor. The selected clinic or hospital must confirm availability."
    : "DOCVY appointment enquiries are paused while its private intake connection is unavailable. Contact the clinic or hospital directly to confirm availability.";
  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      type: "website", locale: "en_IN", siteName: "DOCVY", title, description,
      url: "/request", images: [docvyOpenGraphImage],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export default async function RequestPage({ searchParams }: { searchParams: Promise<{ provider?: string; city?: string }> }) {
  if (process.env.DOCVY_CRM_STAGING === "true" && process.env.VERCEL_ENV !== "production") {
    return <section className="mx-auto max-w-3xl space-y-4 p-8">
      <h1 className="text-3xl font-bold">DOCVY staging appointments</h1>
      <p>Reserve a synthetic appointment in the CRM test calendar.</p>
      <Link className="inline-block rounded border p-2" href="/book">Open test booking</Link>
    </section>;
  }

  const params = await searchParams;
  const intakeEnabled = isAppointmentIntakeConfigured();
  const selectedProvider = providerCandidates.find((doctor) => doctor.id === params.provider);
  const selectedLocation = selectedProvider?.locations.find((location) =>
    !params.city || location.city.toLowerCase() === params.city.toLowerCase(),
  ) ?? selectedProvider?.locations[0];

  return <div className="min-h-[70vh] bg-[#F6FAF8] px-6 py-12 md:py-16">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
      <section className="pt-2">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]">{intakeEnabled ? <CalendarClock size={14}/> : <MapPin size={14}/>} {intakeEnabled ? "APPOINTMENT ENQUIRY · DELHI NCR" : "CONTACT THE PROVIDER · DELHI NCR"}</p>
        <h1 className="mt-5 text-4xl font-black leading-tight tracking-[-0.045em] text-[#173A37] md:text-[48px]">{intakeEnabled ? "Tell DOCVY which doctor you want to see." : "Contact the hospital to ask about an appointment."}</h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-[#526D66]">{intakeEnabled ? "Send an enquiry to DOCVY for a listed Delhi NCR doctor. Your details are recorded in DOCVY’s private intake; the selected hospital or clinic is not automatically notified." : "Appointment enquiries are not open yet. DOCVY’s private intake connection is not configured, and this page is not collecting your details."}</p>
        <div className="mt-6 rounded-2xl border border-[#DCEAE5] bg-white p-5">
          <div className="flex gap-3"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#087F83]"/><div><h2 className="font-bold text-[#173A37]">A request is not a confirmed appointment</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">The clinic or hospital must confirm the doctor, time and any consultation fee. DOCVY does not take patient payment or guarantee a slot.</p></div></div>
        </div>
        <p className="mt-4 text-xs leading-5 text-[#789089]">Please do not share symptoms, diagnoses, medical records or other health details with DOCVY. For urgent or emergency care, call 112 in India or go to the nearest emergency department.</p>
      </section>
      {intakeEnabled ? <AppointmentRequestForm doctors={providerCandidates} initialProvider={params.provider ?? ""} initialCity={params.city ?? ""} enabled /> : <section className="rounded-[24px] border border-[#DCEAE5] bg-white p-6 shadow-[0_14px_40px_rgba(23,58,55,0.07)] md:p-8" aria-labelledby="paused-enquiry-title">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4E4] text-[#A36A12]"><Building2 size={24}/></span>
        <p className="mt-5 text-xs font-extrabold tracking-[0.14em] text-[#A36A12]">NO FORM · NO DETAILS STORED</p>
        <h2 id="paused-enquiry-title" className="mt-2 text-2xl font-bold text-[#173A37]">Appointment enquiries are paused.</h2>
        <p className="mt-3 text-sm leading-6 text-[#526D66]">DOCVY is not collecting or forwarding appointment requests right now. Contact the hospital or clinic directly to ask about the doctor, available times and consultation fees.</p>
        {selectedProvider && selectedLocation ? <div className="mt-6 rounded-2xl border border-[#DCEAE5] bg-[#F8FBF9] p-5">
          <p className="text-[10px] font-extrabold tracking-[0.14em] text-[#789089]">THE PROFILE YOU SELECTED</p>
          <p className="mt-2 text-lg font-bold text-[#173A37]">{selectedProvider.name}</p>
          <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-[#526D66]"><Building2 size={16} className="mt-1 shrink-0 text-[#087F83]"/><span>{selectedProvider.hospital} · {selectedLocation.facility} · {selectedLocation.city}</span></p>
          <a href={selectedProvider.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white transition hover:bg-[#066D70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F83] focus-visible:ring-offset-2">Open the official {selectedProvider.hospital} profile <ExternalLink size={16}/></a>
        </div> : <p className="mt-6 rounded-2xl border border-[#DCEAE5] bg-[#F8FBF9] p-5 text-sm leading-6 text-[#526D66]">No doctor was selected on this link. Browse the current Delhi NCR listings and open the hospital source profile for the doctor you want to contact.</p>}
        <Link href="/doctors" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#C9DDD5] px-5 text-sm font-bold text-[#087F83] transition hover:bg-[#F8FBF9]">Browse current doctor listings <ArrowRight size={16}/></Link>
        <p className="mt-4 text-center text-xs leading-5 text-[#789089]">The hospital confirms appointments and fees. DOCVY does not reserve a slot or collect payment.</p>
      </section>}
    </div>
  </div>;
}
