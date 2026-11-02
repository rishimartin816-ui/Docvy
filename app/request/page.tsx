import type { Metadata } from "next";
import { CalendarClock, ShieldCheck } from "lucide-react";
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
  const params = await searchParams;
  const intakeEnabled = isAppointmentIntakeConfigured();

  return <div className="min-h-[70vh] bg-[#F6FAF8] px-6 py-12 md:py-16">
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
      <section className="pt-2">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#B8DCD0] bg-white px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#087F83]"><CalendarClock size={14}/> APPOINTMENT ENQUIRY · DELHI NCR</p>
        <h1 className="mt-5 text-4xl font-black leading-tight tracking-[-0.045em] text-[#173A37] md:text-[48px]">Tell DOCVY which doctor you want to see.</h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-[#526D66]">{intakeEnabled ? "Send an enquiry to DOCVY for a listed Delhi NCR doctor. Your details are recorded in DOCVY’s private intake; the selected hospital or clinic is not automatically notified." : "Appointment enquiries are not open yet. DOCVY’s private intake connection is not configured, and this page is not collecting your details."}</p>
        <div className="mt-6 rounded-2xl border border-[#DCEAE5] bg-white p-5">
          <div className="flex gap-3"><ShieldCheck size={20} className="mt-0.5 shrink-0 text-[#087F83]"/><div><h2 className="font-bold text-[#173A37]">A request is not a confirmed appointment</h2><p className="mt-2 text-sm leading-6 text-[#526D66]">The clinic or hospital must confirm the doctor, time and any consultation fee. DOCVY does not take patient payment or guarantee a slot.</p></div></div>
        </div>
        <p className="mt-4 text-xs leading-5 text-[#789089]">Please do not include symptoms, diagnoses, medical records or other health details in this form. For urgent or emergency care, call 112 in India or go to the nearest emergency department.</p>
      </section>
      <AppointmentRequestForm doctors={providerCandidates} initialProvider={params.provider ?? ""} initialCity={params.city ?? ""} enabled={intakeEnabled}/>
    </div>
  </div>;
}
