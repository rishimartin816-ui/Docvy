import { notFound } from "next/navigation";
import { legal } from "@/lib/content";
import { PageHero, Section } from "@/components/ui";
export function generateStaticParams() { return Object.keys(legal).map(slug => ({ slug })); }
export default function Legal({ params }: { params: { slug: string } }) {
  const d = legal[params.slug]; if (!d) notFound();
  return <><PageHero eyebrow="POLICIES & IMPORTANT INFORMATION" title={d.title} text={d.intro} />
    {d.sections.map((section) => <Section key={section.heading} alt={false}><article className="max-w-3xl"><h2 className="mb-4 text-2xl font-bold">{section.heading}</h2>{section.body.map(p => <p key={p} className="mb-4 leading-7 text-grey">{p}</p>)}</article></Section>)}</>;
}
