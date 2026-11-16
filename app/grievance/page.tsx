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
  const responseDays = Number(process.env.DOCVY_GRIEVANCE_RESPONSE_DAYS);
  const intakeEnabled = isAppointmentIntakeConfigured();

  return <div className="bg-surface text-ink">
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-site">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-ink"><ShieldCheck strokeWidth={1.5} size={15} aria-hidden="true" /> HELP &amp; ACCOUNTABILITY · INDIA</p>
        <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[56px]">How to contact DOCVY about a grievance</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-grey md:text-lg">Send a written grievance by email or post using the contact details below. DOCVY is currently an informational website; {intakeEnabled ? "appointment enquiries are recorded by DOCVY but no appointment is confirmed here." : "appointment enquiries are paused."}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="mailto:contact@docvy.in?subject=DOCVY%20grievance" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-hover">Email DOCVY <ArrowRight strokeWidth={1.5} size={16} aria-hidden="true" /></a>
          <a href="#postal-address" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-line bg-white/80 px-5 text-sm font-bold text-ink transition hover:bg-white">View postal address <MapPin strokeWidth={1.5} size={16} aria-hidden="true" /></a>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-5 text-grey">Please do not email medical records, identity documents or other sensitive personal information.</p>
      </div>
    </section>

    <section className="px-6 py-12 md:py-16">
      <div className="mx-auto grid max-w-site gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-line bg-white p-6  md:p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-ink"><Mail strokeWidth={1.5} size={22} aria-hidden="true" /></span>
          <h2 className="mt-5 text-xl font-bold text-ink">Email the grievance contact</h2>
          <p className="mt-3 text-sm leading-7 text-grey">Grievance officer: <strong className="text-ink">Rishi Raj Martin</strong>, who has personally accepted responsibility for handling grievances.</p>
          <p className="mt-2 text-sm">We aim to acknowledge ordinary grievances within 24 hours and address them within {Number.isInteger(responseDays) && responseDays > 0 ? responseDays : 15} calendar days, subject to applicable statutory deadlines. Profile removal requests have a separate 48-hour commitment.</p>
          <a href="mailto:contact@docvy.in?subject=DOCVY%20grievance" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-ink underline decoration-[#DEDEDA] underline-offset-4 hover:text-primary">contact@docvy.in <ArrowRight strokeWidth={1.5} size={15} aria-hidden="true" /></a>
        </article>

        <article id="postal-address" className="scroll-mt-24 rounded-3xl border border-line bg-white p-6  md:p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-[#B45309]"><MapPin strokeWidth={1.5} size={22} aria-hidden="true" /></span>
          <h2 className="mt-5 text-xl font-bold text-ink">Send a written grievance</h2>
          <p className="mt-3 text-sm leading-7 text-grey">Operating entity: <strong className="text-ink">DSS Global Technologies Private Limited</strong>.</p>
          <address className="mt-3 not-italic text-sm leading-7 text-grey">Sector 48, Gurugram<br />Haryana 122101, India</address>
        </article>

        <aside className="rounded-3xl border border-line bg-surface p-6 md:col-span-2 md:flex md:items-start md:gap-4 md:p-7">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#B45309]"><ShieldCheck strokeWidth={1.5} size={21} aria-hidden="true" /></span>
          <div>
            <h2 className="font-bold text-ink">Please keep sensitive information out of grievance messages</h2>
            <p className="mt-2 text-sm leading-6 text-grey">Grievances are not submitted through a web form. Do not attach medical records, identity documents or other sensitive personal information to an unverified channel.</p>
          </div>
        </aside>
      </div>
    </section>
  </div>;
}
