import IllustrationBackground from "@/components/IllustrationBackground";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SpecialtyIcon from "@/components/SpecialtyIcon";
import { specialties } from "@/lib/care-directory";

export const metadata: Metadata = { title: "Medical specialties explained", description: "Learn what common medical specialties do, from skin and hair to bones and joints, and what to bring to a first appointment.", alternates: { canonical: "/specialties" } };

export default function SpecialtiesPage() {
  return <div className="relative isolate overflow-hidden docvy-garden px-5 py-12 sm:px-9"><IllustrationBackground slug="specialties-care-options" alt="Meera and Aarav review different types of care."  />
    <div className="mx-auto max-w-6xl">
      <p className="docvy-eyebrow">FIND YOUR STARTING POINT</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">Medical specialties, in plain language</h1>
      <p className="mt-4 max-w-2xl text-lg text-[#5B6B7A]">Start with the part of your health you want to talk about. Each guide explains what the specialty does and how to prepare for a visit.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specialties.map(item => <Link key={item.slug} href={"/specialties/" + item.slug} className="docvy-glass flex flex-col items-start gap-3 p-5 hover:bg-white">
          <SpecialtyIcon slug={item.slug} />
          <h2 className="text-xl font-bold">{item.plain}</h2>
          <p className="text-sm text-[#5B6B7A]">{item.name}</p>
          <span className="inline-flex items-center gap-2 font-semibold text-[#0F2A3D]">Explore specialty <ArrowUpRight strokeWidth={1.5} size={16} aria-hidden="true" /></span>
        </Link>)}
      </div>
    </div>
  </div>;
}
