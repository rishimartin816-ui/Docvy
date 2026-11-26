import { ResponsivePage } from "@/components/mobile/Viewport";
import { Policy } from "@/components/mobile/Guides";
import type { Metadata } from "next";
import { buildPageSocialMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { legal } from "@/lib/content";
import { terms } from "@/lib/terms";
import Link from "next/link";
import GuideContents from "@/components/patient/GuideContents";
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
  return <ResponsivePage mobile={<Policy policy={d}/>}><><PageHero eyebrow="POLICIES & IMPORTANT INFORMATION" title={d.title} text={d.intro} />
    <div className="mx-auto max-w-site px-5"><GuideContents items={d.sections.map((section,index)=>({id:"policy-section-"+index,label:section.heading}))}/></div>{d.sections.map((section,index) => <Section key={section.heading} alt={false}><article id={"policy-section-"+index} className="max-w-3xl"><h2 className="mb-4 text-2xl font-bold">{section.heading}</h2>{section.body.map(p => <p key={p} className="mb-4 leading-7 text-grey">{p}</p>)}</article></Section>)}
    <Section><nav aria-label="Related policies" className="flex flex-wrap gap-5">{[["Privacy", "/legal/privacy"], ["Medical disclaimer", "/legal/disclaimer"], ["Refunds", "/legal/refund"], ["Claim a profile", "/claim-profile"], ["Request removal", "/remove-profile"], ["Grievance", "/grievance"]].map(([label, href]) => <Link key={href} href={href} className="underline">{label}</Link>)}</nav></Section></></ResponsivePage>;
}
