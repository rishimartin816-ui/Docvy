import type { Metadata } from "next";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { legal } from "@/lib/content";
import { terms } from "@/lib/terms";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui";

export function generateStaticParams() { return Object.keys(legal).map(slug => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = slug === "terms" ? terms : legal[slug];
  if (!page) return { title: "Page not found", robots: { index: false, follow: false } };

  const description = page.intro.slice(0, 160);
  return {
    title: page.title,
    description,
    alternates: { canonical: `/legal/${slug}` },
    ...buildPageSocialMetadata(`${page.title} | DOCVY`, description, `/legal/${slug}`),
  };
}

export default async function Legal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = slug === "terms" ? terms : legal[slug]; if (!d) notFound();
  return <><PageHero eyebrow="POLICIES & IMPORTANT INFORMATION" title={d.title} text={d.intro} />
    {d.sections.map((section) => <Section key={section.heading} alt={false}><article className="max-w-3xl"><h2 className="mb-4 text-2xl font-bold">{section.heading}</h2>{section.body.map(p => <p key={p} className="mb-4 leading-7 text-grey">{p}</p>)}</article></Section>)}
    <Section><nav aria-label="Related policies" className="flex flex-wrap gap-5">{[["Privacy", "/legal/privacy"], ["Medical disclaimer", "/legal/disclaimer"], ["Refunds", "/legal/refund"], ["Claim a profile", "/claim-profile"], ["Request removal", "/remove-profile"], ["Grievance", "/grievance"]].map(([label, href]) => <Link key={href} href={href} className="underline">{label}</Link>)}</nav></Section></>;
}
