import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "DOCVY Doctor Directory — Opening Soon",
  description:
    "DOCVY is preparing reviewed doctor and clinic listings for Delhi NCR. Provider search and appointment requests are not open yet.",
  alternates: { canonical: "/doctors" },
  robots: { index: false, follow: true },
};

export default function DoctorsPage() {
  return (
    <div className="min-h-[70vh] bg-[#F6FAF8] px-6 py-16 text-[#173A37] md:py-24">
      <section className="mx-auto max-w-3xl rounded-[24px] border border-[#DCEAE5] bg-white p-7 shadow-sm md:p-10">
        <p className="text-[11px] font-extrabold tracking-[0.15em] text-[#087F83]">DOCVY DOCTOR DIRECTORY</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] md:text-[42px]">Reviewed provider listings are coming soon.</h1>
        <p className="mt-5 text-sm leading-7 text-[#526D66]">
          DOCVY is preparing a directory for Delhi, Gurugram and Noida. Profiles will appear only after their source and provider details have been reviewed. Patient search and appointment requests are not open yet.
        </p>
        <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#087F83] px-5 text-sm font-bold text-white hover:bg-[#066D70]">
          Clinic or hospital? Contact now <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}
