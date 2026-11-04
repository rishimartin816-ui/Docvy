import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SpecialtyIcon from "@/components/SpecialtyIcon";
import { specialties } from "@/lib/care-directory";

export function generateStaticParams() {
  return specialties.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = specialties.find(({ slug }) => slug === params.slug);
  return item ? { title: item.name + " | What this specialty does", description: item.description, alternates: { canonical: "/specialties/" + item.slug } } : {};
}

export default function SpecialtyPage({ params }: { params: { slug: string } }) {
  const item = specialties.find(({ slug }) => slug === params.slug);
  if (!item) notFound();
  return <div className="docvy-garden px-5 py-12 sm:px-9">
    <div className="mx-auto max-w-3xl">
      <Link href="/specialties" className="font-semibold text-[#202124] underline underline-offset-4">All specialties</Link>
      <div className="docvy-glass mt-6 space-y-4 p-6 sm:p-9">
        <SpecialtyIcon slug={item.slug} />
        <p className="docvy-eyebrow">{item.plain}</p>
        <h1 className="text-4xl font-bold tracking-tight">{item.name}</h1>
        <p className="text-lg text-[#545761]">{item.description}</p>
        <h2 className="text-xl font-bold">Before your visit</h2>
        <p className="text-[#545761]">{item.prep}</p>
        <Link href={{ pathname: "/doctors", query: { specialty: item.name } }} className="docvy-pill docvy-pill-primary">Browse this specialty</Link>
      </div>
    </div>
  </div>;
}
