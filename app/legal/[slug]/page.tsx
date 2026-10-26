import { notFound } from "next/navigation";
import { legal } from "@/lib/content";
import { PageHero, Section } from "@/components/ui";
export function generateStaticParams() { return Object.keys(legal).map(slug => ({ slug })); }
export default function Legal({ params }: { params: { slug: string } }) {
  const d = legal[params.slug]; if (!d) notFound();
  return (<><PageHero eyebrow="LEGAL" title={d.title} text="" /><Section>{d.body.map(p => <p key={p} className="mb-4 max-w-2xl">{p}</p>)}</Section></>);
}
