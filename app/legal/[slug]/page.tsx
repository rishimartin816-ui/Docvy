import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legal } from "@/lib/content";
import { PageHero, Section } from "@/components/ui";

export function generateStaticParams() { return Object.keys(legal).map(slug => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = legal[slug];
  if (!page) return { title: "Page not found", robots: { index: false, follow: false } };

  const description = page.intro.slice(0, 160);
  return {
    title: page.title,
    description,
    alternates: { canonical: `/legal/${slug}` },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "DOCVY",
      title: `${page.title} | DOCVY`,
      description,
      url: `/legal/${slug}`,
    },
  };
}

export default async function Legal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = legal[slug]; if (!d) notFound();
  return <><PageHero eyebrow="POLICIES & IMPORTANT INFORMATION" title={d.title} text={d.intro} />
    {d.sections.map((section) => <Section key={section.heading} alt={false}><article className="max-w-3xl"><h2 className="mb-4 text-2xl font-bold">{section.heading}</h2>{section.body.map(p => <p key={p} className="mb-4 leading-7 text-grey">{p}</p>)}</article></Section>)}</>;
}
