import type { Metadata } from "next";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { legal } from "@/lib/content";
import { PageHero, Section } from "@/components/ui";
import Link from "next/link";

export function generateStaticParams() { return Object.keys(legal).map(slug => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = legal[slug];
  if (!page) return { title: "Page not found", robots: { index: false, follow: false } };

  const description = slug === "terms"
    ? "Read DOCVY's terms for patients, caregivers, doctors and clinics, covering directory use, appointment requests, privacy, payments and complaints."
    : page.intro.slice(0, 160);
  return {
    title: page.title,
    description,
    alternates: { canonical: `/legal/${slug}` },
    ...buildPageSocialMetadata(`${page.title} | DOCVY`, description, `/legal/${slug}`),
  };
}

export default async function Legal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = legal[slug]; if (!d) notFound();
  if (slug === "terms") return <article className="calm-wrap py-12 md:py-20">
    <div className="max-w-3xl">
      <p className="mb-4 text-sm font-medium text-grey">COMPANY POLICIES</p>
      <h1 className="text-4xl font-medium leading-tight tracking-tight md:text-5xl">{d.title}</h1>
      <p className="mt-5 text-lg leading-8 text-ink">{d.intro}</p>
      {d.draft && <p className="mt-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-6 text-ink">Draft for company review. Prepared {d.preparedOn}. An effective date will be added when the terms are approved.</p>}
      <nav aria-label="Related policies" className="mt-5 flex flex-wrap gap-x-5 text-sm">
        {[["Privacy", "/legal/privacy"], ["Cancellations and refunds", "/legal/refund"], ["Healthcare disclaimer", "/legal/disclaimer"], ["Grievance contact", "/grievance"]].map(([label, href]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">{label}</Link>)}
      </nav>
      <details className="mt-7 rounded-2xl border border-line bg-porc px-5 py-2">
        <summary className="flex min-h-11 cursor-pointer items-center font-medium text-primary">Jump to a section</summary>
        <nav aria-label="Terms sections"><ol className="pb-3">{d.sections.map((section, index) => <li key={section.heading}><a href={`#terms-${index + 1}`} className="inline-flex min-h-11 items-center py-2 text-sm text-primary underline-offset-4 hover:underline">{section.heading}</a></li>)}</ol></nav>
      </details>
      <div className="mt-10 space-y-10">
        {d.sections.map((section, index) => <section key={section.heading} id={`terms-${index + 1}`} aria-labelledby={`terms-heading-${index + 1}`} className="scroll-mt-28 border-t border-line pt-8">
          <h2 id={`terms-heading-${index + 1}`} className="text-xl font-semibold leading-8 md:text-2xl">{section.heading}</h2>
          <div className="mt-4 space-y-4">{section.body.map(paragraph => <p key={paragraph} className="text-base leading-8 text-ink sm:text-[17px]">{paragraph}</p>)}</div>
        </section>)}
      </div>
      <p className="mt-10 border-t border-line pt-6 text-sm text-grey">Questions about these terms? <a href="mailto:contact@docvy.in?subject=DOCVY%20terms" className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">Email contact@docvy.in</a></p>
    </div>
  </article>;
  return <><PageHero eyebrow="POLICIES & IMPORTANT INFORMATION" title={d.title} text={d.intro} />
    {d.sections.map((section) => <Section key={section.heading} alt={false}><article className="max-w-3xl"><h2 className="mb-4 text-2xl font-bold">{section.heading}</h2>{section.body.map(p => <p key={p} className="mb-4 leading-7 text-grey">{p}</p>)}</article></Section>)}</>;
}
