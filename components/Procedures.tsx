import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const procedures = [
  ["Hernia repair", "hernia-repair"], ["Gallbladder removal", "gallbladder-removal"],
  ["Knee replacement", "knee-replacement"], ["Cataract surgery", "cataract-surgery"],
  ["Tonsil removal", "tonsil-removal"], ["Kidney stone removal", "kidney-stone-removal"],
];

export default function Procedures() {
  return <section className="calm-section bg-sand" aria-labelledby="procedures-title">
    <div className="calm-wrap">
      <div className="calm-section-heading"><div><h2 id="procedures-title">Popular procedures</h2><p className="mt-3 text-ink">Understand your options before your visit.</p></div><Link href="/surgery-guide" className="calm-text-link">View all procedures <span aria-hidden="true">↗</span></Link></div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {procedures.map(([label, slug]) => <li key={slug}><Link href={"/surgeries/" + slug} className="calm-card flex min-h-20 items-center justify-between gap-4 px-5 py-4 text-base font-medium text-plum hover:text-mulberry">{label}<ArrowUpRight size={18} strokeWidth={1.5} className="shrink-0" aria-hidden="true" /></Link></li>)}
      </ul>
    </div>
  </section>;
}
