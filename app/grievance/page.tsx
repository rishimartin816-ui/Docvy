import type { Metadata } from "next";
import { ArrowRight, Mail, MapPin, ShieldCheck } from "lucide-react";
import { isAppointmentIntakeConfigured } from "@/lib/appointment-intake";
import { buildPageSocialMetadata } from "@/lib/metadata";

const grievanceDescription = "Find DOCVY's grievance contact and postal address. Grievances can be sent by email or post; please omit medical records and identity documents.";

export const metadata: Metadata = {
  title: "Grievance contact information",
  description: grievanceDescription,
  alternates: { canonical: "/grievance" },
  ...buildPageSocialMetadata("Grievance contact information | DOCVY", grievanceDescription, "/grievance"),
};

export default function GrievancePage() {
  const intakeEnabled = isAppointmentIntakeConfigured();

  return <main className="bg-[#fffbf1] text-[#2e281f]">
    <section className="bg-[radial-gradient(circle_at_78%_35%,#D5F0E8_0%,#EAF5F1_38%,#F4FAF7_100%)] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#e3d2b3] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-[#70501f]"><ShieldCheck size={15} aria-hidden="true" /> HELP &amp; ACCOUNTABILITY · INDIA</p>
        <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[56px]">How to contact DOCVY about a grievance</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[#5d5040] md:text-lg">Send a written grievance by email or post using the contact details below. DOCVY is currently an informational website; {intakeEnabled ? "appointment enquiries are recorded by DOCVY but no appointment is confirmed here." : "appointment enquiries are paused."}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="mailto:contact@docvy.in?subject=DOCVY%20grievance" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#70501f] px-5 text-sm font-bold text-white transition hover:bg-[#563b16]">Email DOCVY <ArrowRight size={16} aria-hidden="true" /></a>
          <a href="#postal-address" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#e3d2b3] bg-white/80 px-5 text-sm font-bold text-[#2e281f] transition hover:bg-white">View postal address <MapPin size={16} aria-hidden="true" /></a>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-5 text-[#5d5040]">Please do not email medical records, identity documents or other sensitive personal information.</p>
      </div>
    </section>

    <section className="px-6 py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-[#e8dac2] bg-white p-6 shadow-[0_12px_32px_rgba(23,58,55,0.04)] md:p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3d9] text-[#70501f]"><Mail size={22} aria-hidden="true" /></span>
          <h2 className="mt-5 text-xl font-bold text-[#2e281f]">Email the grievance contact</h2>
          <p className="mt-3 text-sm leading-7 text-[#5d5040]">Grievance contact: <strong className="text-[#2e281f]">Rishi Raj Martin</strong>, who has personally accepted responsibility for handling grievances.</p>
          <a href="mailto:contact@docvy.in?subject=DOCVY%20grievance" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#70501f] underline decoration-[#e3d2b3] underline-offset-4 hover:text-[#563b16]">contact@docvy.in <ArrowRight size={15} aria-hidden="true" /></a>
        </article>

        <article id="postal-address" className="scroll-mt-24 rounded-3xl border border-[#e8dac2] bg-white p-6 shadow-[0_12px_32px_rgba(23,58,55,0.04)] md:p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF7EA] text-[#9A6A1F]"><MapPin size={22} aria-hidden="true" /></span>
          <h2 className="mt-5 text-xl font-bold text-[#2e281f]">Send a written grievance</h2>
          <p className="mt-3 text-sm leading-7 text-[#5d5040]">Operating entity: <strong className="text-[#2e281f]">DSS Global Technologies Private Limited</strong>.</p>
          <address className="mt-3 not-italic text-sm leading-7 text-[#5d5040]">2nd Floor, Capital Cityscape<br />Sector 66, Gurugram<br />Haryana – 122101, India</address>
        </article>

        <aside className="rounded-3xl border border-[#F0DFB8] bg-[#FFF9EE] p-6 md:col-span-2 md:flex md:items-start md:gap-4 md:p-7">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#9A6A1F]"><ShieldCheck size={21} aria-hidden="true" /></span>
          <div>
            <h2 className="font-bold text-[#2e281f]">Please keep sensitive information out of grievance messages</h2>
            <p className="mt-2 text-sm leading-6 text-[#5d5040]">Grievances are not submitted through a web form. Do not attach medical records, identity documents or other sensitive personal information to an unverified channel.</p>
          </div>
        </aside>
      </div>
    </section>
  </main>;
}
