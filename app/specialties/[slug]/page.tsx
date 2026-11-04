import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/DirectoryPage";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { patientTopicGuides } from "@/lib/patient-topic-guides";
import { slugify } from "@/lib/directory";
import { notFound } from "next/navigation";
import SpecialtyIcon from "@/components/SpecialtyIcon";
import { specialties } from "@/lib/care-directory";

export function generateStaticParams() {
  return specialties.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = specialties.find(({ slug }) => slug === params.slug);
  return item ? { title: item.name + " | What this specialty does", description: item.description, alternates: { canonical: "/specialties/" + item.slug }, ...buildPageSocialMetadata(item.name + " | DOCVY", item.description, "/specialties/" + item.slug) } : {};
}

export default function SpecialtyPage({ params }: { params: { slug: string } }) {
  const item = specialties.find(({ slug }) => slug === params.slug);
  if (!item) notFound();
  return <div className="docvy-garden px-5 py-12 sm:px-9">
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs items={[{ name: "Medical specialties", href: "/specialties" }, { name: item.name, href: "/specialties/" + item.slug }]} />
      <div className="docvy-glass mt-6 space-y-4 p-6 sm:p-9">
        <SpecialtyIcon slug={item.slug} />
        <p className="docvy-eyebrow">{item.plain}</p>
        <h1 className="text-4xl font-bold tracking-tight">{item.name}</h1>
        <p className="text-lg text-[#5B6B7A]">{item.description}</p>
        <h2 className="text-xl font-bold">Before your visit</h2>
        <p className="text-[#5B6B7A]">{item.prep}</p>
        <Link href={{ pathname: "/doctors", query: { specialty: item.name } }} className="docvy-pill docvy-pill-primary">Browse this specialty</Link>
      </div>
    </div>
    {patientTopicGuides.some((guide) => guide.relatedSpecialties.some((name) => name.split("/").some((part) => slugify(part) === params.slug))) &&
      <section className="mx-auto mt-6 max-w-4xl docvy-glass p-6">
        <h2 className="text-xl font-bold">Related patient guides</h2>
        <ul className="mt-3 space-y-2">{patientTopicGuides.filter((guide) => guide.relatedSpecialties.some((name) => name.split("/").some((part) => slugify(part) === params.slug))).map(({ slug, title }) =>
          <li key={slug}><Link href={"/patient-guides/" + slug} className="underline">{title}</Link></li>)}</ul>
      </section>}
  </div>;
}
