import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpenCheck, ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import { HealthTopicIcon } from "@/components/HealthTopicIcon";
import { patientTopicGuides } from "@/lib/patient-topic-guides";
import { slugify } from "@/lib/directory";
import { procedures, specialties } from "@/lib/care-directory";
import { buildPageSocialMetadata } from "@/lib/metadata";

const site = "https://www.docvy.in";

export function generateStaticParams() {
  return patientTopicGuides.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = patientTopicGuides.find((item) => item.slug === params.slug);
  if (!guide) return {};
  const url = `/patient-guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: { canonical: url },
    ...buildPageSocialMetadata(`${guide.title} | DOCVY`, guide.metaDescription, url, "article"),
  };
}

export default function PatientTopicGuidePage({ params }: { params: { slug: string } }) {
  const guide = patientTopicGuides.find((item) => item.slug === params.slug);
  if (!guide) notFound();

  const procedure = procedures.find(({ name }) => name === guide.procedure);
  const breadcrumbs = [
    { name: "Home", item: site },
    { name: "Patient guide", item: `${site}/care-guide` },
    { name: guide.topic, item: `${site}/patient-guides/${guide.slug}` },
  ];
  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };

  const articleJson = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: guide.title,
    description: guide.metaDescription,
    inLanguage: "en-IN",
    url: breadcrumbs[2].item,
    publisher: { "@id": site + "/#organization" },
    citation: guide.references.map((reference) => reference.url),
    ...(guide.lastReviewed ? { lastReviewed: guide.lastReviewed } : {}),
    ...(guide.reviewedBy ? { reviewedBy: { "@type": "Person", name: guide.reviewedBy } } : {}),
  };

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.questions.map(({ question, answer }) => ({
      "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return <div className="docvy-garden min-h-screen">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson).replace(/</g, "\\u003c") }} />
    <section className="px-5 py-10 sm:px-9 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#5B6B7A]">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbs.map((crumb, index) => <li key={crumb.item} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === breadcrumbs.length - 1 ? <span aria-current="page" className="font-semibold text-ink">{crumb.name}</span> : <Link href={index === 0 ? "/" : "/care-guide"} className="underline decoration-[#DCE5E8] underline-offset-4 hover:text-ink">{crumb.name}</Link>}
            </li>)}
          </ol>
        </nav>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#DCE5E8] bg-white/75 px-4 py-2 text-[11px] font-extrabold tracking-[0.14em] text-ink"><BookOpenCheck strokeWidth={1.5} size={14} aria-hidden="true" /> PATIENT GUIDE · INDIA</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-[-0.045em] md:text-[54px]">{guide.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#5B6B7A] md:text-lg">{guide.answer}</p>
            <dl className="mt-4 grid max-w-md grid-cols-2 gap-3 text-sm">
              <div><dt className="font-semibold">Last reviewed</dt><dd>{guide.lastReviewed}</dd></div>
              <div><dt className="font-semibold">Reviewed by</dt><dd>{guide.reviewedBy}</dd></div>
            </dl>
            <Link href="/legal/disclaimer" className="mt-2 inline-block text-sm underline">Medical disclaimer</Link>
            <div className="mt-6 flex flex-wrap gap-3">
              {procedure && <Link href={"/surgeries/" + slugify(procedure.name)} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-hover">Find doctors for {procedure.name.toLowerCase()} <ArrowRight strokeWidth={1.5} size={17} aria-hidden="true" /></Link>}
              <Link href="/#concerns" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#DCE5E8] bg-white px-5 text-sm font-bold text-ink hover:bg-[#F4F8F8]">Search another concern</Link>
            </div>
          </div>
          <aside className="rounded-3xl border border-[#DCE5E8] bg-white/90 p-6  md:p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E3F2F0] text-ink"><HealthTopicIcon slug={guide.slug} /></span>
            <p className="mt-5 text-xs font-extrabold tracking-[0.13em] text-ink">QUICK ANSWER</p>
            <p className="mt-2 text-sm leading-7 text-[#5B6B7A]">This page explains broad specialty roles, not a diagnosis or a personal referral. The same concern can have different causes and care routes.</p>
            <div className="mt-5 rounded-2xl bg-[#F4F8F8] p-4">
              <div className="flex items-center gap-2 text-xs font-extrabold tracking-wide text-ink"><MapPin strokeWidth={1.5} size={15} aria-hidden="true" /> CURRENT LISTING AREA</div>
              <p className="mt-2 text-sm leading-6 text-[#5B6B7A]">The guide is for people across India. The directory currently contains a fictional clinic demo.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="flex items-start gap-4 rounded-2xl border border-[#DCE5E8] bg-[#F4F8F8] p-5 md:p-6">
        <ShieldCheck strokeWidth={1.5} size={22} className="mt-0.5 shrink-0 text-[#B45309]" aria-hidden="true" />
        <div><h2 className="font-bold text-[#B45309]">How to use this information</h2><p className="mt-2 text-sm leading-6 text-[#B45309]">Use the specialty names to understand the directory and prepare questions for a provider. A qualified clinician must assess your individual situation. For a life-threatening emergency in India, call <a href="tel:112" className="font-bold underline underline-offset-4">112</a> or go to the nearest emergency department.</p></div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <article className="rounded-3xl border border-[#DCE5E8] bg-white p-6 md:p-8">
          <p className="text-xs font-extrabold tracking-[0.13em] text-ink">SPECIALTIES THAT MAY BE RELATED</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">Which doctor types could be relevant?</h2>
          <p className="mt-3 text-sm leading-7 text-[#5B6B7A]">These specialty names can help you describe what you are looking for when you call a clinic.</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {guide.relatedSpecialties.map((specialty) => {
              const match = specialties.find(({ name }) => name === specialty || (name === "General medicine" && specialty.startsWith("General physician")) || (name === "Gynaecology" && specialty.endsWith("gynaecology")));
              return <li key={specialty} className="rounded-full bg-[#E3F2F0] px-3 py-1 text-sm font-semibold text-ink">
                {match ? <Link href={`/specialties/${match.slug}`} className="underline underline-offset-4">{specialty}</Link> : specialty}
              </li>;
            })}
          </ul>
        </article>

        <aside className="rounded-3xl border border-[#DCE5E8] bg-white p-6 md:p-8">
          <p className="text-xs font-extrabold tracking-[0.13em] text-ink">BEFORE YOU CONTACT A PROVIDER</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">Check the details directly</h2>
          <ol className="mt-6 space-y-4">{[
            "Open the hospital’s own profile to confirm the doctor’s current location and specialty.",
            "Ask the clinic or hospital about appointment availability, consultation fees and any referral requirements.",
            "DOCVY does not reserve appointments. The current enquiry form is closed and does not collect your details.",
          ].map((text, index) => <li key={text} className="flex gap-3 rounded-2xl bg-[#F4F8F8] p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white">{index + 1}</span><span className="pt-1 text-sm leading-6 text-[#5B6B7A]">{text}</span></li>)}</ol>
          <Link href="/doctors" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0F2A3D] px-4 text-sm font-bold text-white hover:bg-primary-hover">Browse by city and specialty <ArrowRight strokeWidth={1.5} size={16} aria-hidden="true" /></Link>
        </aside>
      </div>

      <section className="mt-12" aria-labelledby="guide-questions">
        <p className="text-xs font-extrabold tracking-[0.13em] text-ink">COMMON QUESTIONS</p>
        <h2 id="guide-questions" className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Questions people ask about {guide.topic.toLowerCase()}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">{guide.questions.map(({ question, answer }) => <article key={question} className="rounded-2xl border border-[#DCE5E8] bg-white p-5 md:p-6"><h3 className="text-base font-bold">{question}</h3><p className="mt-3 text-sm leading-7 text-[#5B6B7A]">{answer}</p></article>)}</div>
      </section>

      <section className="mt-12 rounded-3xl border border-[#DCE5E8] bg-white p-6 md:p-8" aria-labelledby="guide-sources">
        <p className="text-xs font-extrabold tracking-[0.13em] text-ink">SOURCES AND LIMITS</p>
        <h2 id="guide-sources" className="mt-3 text-2xl font-bold tracking-tight">Read the source information</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-[#5B6B7A]">These public health and hospital resources explain the topic in more detail. Ask your own care team how the information applies to you.</p>
        <p className="mt-3 text-xs font-semibold text-[#5B6B7A]">Source links checked 3 November 2026.</p>
        <ul className="mt-5 flex flex-col gap-3">{guide.references.map((reference) => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-[#DCE5E8] underline-offset-4 hover:text-primary">{reference.label}<ExternalLink strokeWidth={1.5} size={14} aria-hidden="true" /></a></li>)}</ul>
      </section>

      <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-[#0F2A3D] p-6 text-white md:flex-row md:items-center md:justify-between md:p-8"><div><p className="text-xs font-extrabold tracking-[0.13em] text-[#E3F2F0]">DOCVY COVERAGE TODAY</p><h2 className="mt-2 text-2xl font-bold text-white">India-wide guide. Limited city directory.</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-[#E3F2F0]">Use the guide from anywhere in India. For a real appointment, check availability directly with your clinic.</p></div><Link href="/care-guide" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#0F2A3D] hover:bg-[#E3F2F0]">Explore the patient guide <ArrowRight strokeWidth={1.5} size={16} aria-hidden="true" /></Link></div>
    </section>
  </div>;
}
