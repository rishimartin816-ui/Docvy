import { ResponsivePage } from "@/components/mobile/Viewport";
import { Specialty } from "@/components/mobile/Guides";
import { MobileCards, Results } from "@/components/mobile/Doctors";
import {getDirectoryDoctors} from '@/lib/public-directory';
import {specialtyMatches} from '@/lib/directory';
import {productionOrigin} from '@/lib/metadata';
import {doctorPath} from '@/lib/directory-normalization';
import { specialtyGuideTitle } from "@/lib/specialty-taxonomy";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, DoctorCards } from "@/components/DirectoryPage";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { patientTopicGuides } from "@/lib/patient-topic-guides";
import { specialtySlug } from "@/lib/directory";
import { notFound } from "next/navigation";
import GuideContents from "@/components/patient/GuideContents";
import SpecialtyIcon from "@/components/SpecialtyIcon";
import { specialties } from "@/lib/care-directory";

export function generateStaticParams() {
  return specialties.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = specialties.find(({ slug }) => slug === params.slug);
  return item ? { title: specialtyGuideTitle(item.slug,item.name), description: item.description, alternates: { canonical: "/specialties/" + item.slug }, ...buildPageSocialMetadata(specialtyGuideTitle(item.slug,item.name) + " | DOCVY", item.description, "/specialties/" + item.slug) } : {};
}

export default async function SpecialtyPage({ params }: { params: { slug: string } }) {
  const item = specialties.find(({ slug }) => slug === params.slug);
  if (!item) notFound();
  const providers=(await getDirectoryDoctors()).filter(d=>d.specialties.some(name=>specialtyMatches(name,item.slug)));
  return <ResponsivePage mobile={<>{providers.length > 0 && <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'ItemList',name:item.name+' profiles on DOCVY',numberOfItems:providers.length,itemListElement:providers.map((doctor,i)=>({'@type':'ListItem',position:i+1,name:doctor.name,url:productionOrigin+doctorPath(doctor)}))}).replace(/</g,'\\u003c')}}/></>}<Specialty item={item}>{providers.length ? <MobileCards doctors={providers}/> : <p>No {item.name} profiles are currently published on DOCVY.</p>}</Specialty></>}><div className="docvy-garden px-5 py-12 sm:px-9">
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs items={[{ name: "Medical specialties", href: "/specialties" }, { name: item.name, href: "/specialties/" + item.slug }]} />
      <GuideContents items={[{id:"specialty-overview",label:"Overview"},{id:"specialty-preparation",label:"Before your visit"},{id:"specialty-related",label:"Related guides"}]}/><div id="specialty-overview" className="docvy-glass mt-6 space-y-4 p-6 sm:p-9">
        <SpecialtyIcon slug={item.slug} />
        <p className="docvy-eyebrow">{item.plain}</p>
        <h1 className="text-4xl font-bold tracking-tight">{specialtyGuideTitle(item.slug,item.name)}</h1>
        <p className="text-lg text-grey">{item.description}</p>
        <h2 id="specialty-preparation" className="text-xl font-bold">Before your visit</h2>
        <p className="text-grey">{item.prep}</p>
        <Link href={"/doctors/specialty/" + item.slug} className="docvy-pill docvy-pill-primary">Browse this specialty</Link>
      </div>
    </div>
    <section className="mx-auto mt-8 max-w-4xl docvy-glass p-6" aria-labelledby="specialty-doctors"><h2 id="specialty-doctors" className="text-2xl font-bold">Published {item.name} profiles</h2><p className="mt-3 text-grey">Review qualifications, practice locations and fees before choosing your next step. Appointment requests require confirmation from DOCVY.</p>{providers.length?<><DoctorCards doctors={providers}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'ItemList',name:item.name+' profiles on DOCVY',numberOfItems:providers.length,itemListElement:providers.map((doctor,i)=>({'@type':'ListItem',position:i+1,name:doctor.name,url:productionOrigin+doctorPath(doctor)}))}).replace(/</g,'\\u003c')}}/></>:<p className="mt-4 text-grey">No {item.name} profiles are currently published on DOCVY. <Link href="/doctors" className="underline">Explore current doctor profiles</Link> or use the preparation guidance above when speaking to your clinician.</p>}</section>
    {patientTopicGuides.some((guide) => guide.relatedSpecialties.some((name) => name.split("/").some((part) => specialtySlug(part.trim()) === params.slug))) &&
      <section id="specialty-related" className="mx-auto mt-6 max-w-4xl docvy-glass p-6">
        <h2 className="text-xl font-bold">Related patient guides</h2>
        <ul className="mt-3 space-y-2">{patientTopicGuides.filter((guide) => guide.relatedSpecialties.some((name) => name.split("/").some((part) => specialtySlug(part.trim()) === params.slug))).map(({ slug, title }) =>
          <li key={slug}><Link href={"/patient-guides/" + slug} className="underline">{title}</Link></li>)}</ul>
      </section>}
  </div></ResponsivePage>;
}
