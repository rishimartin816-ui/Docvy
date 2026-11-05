import Link from "next/link";
import { Activity, ArrowUpRight, Bone, Droplets, Ear, Eye, Stethoscope } from "lucide-react";

const procedures = [
  ["Hernia repair", "hernia-repair"], ["Gallbladder removal", "gallbladder-removal"],
  ["Knee replacement", "knee-replacement"], ["Cataract surgery", "cataract-surgery"],
  ["Tonsil removal", "tonsil-removal"], ["Kidney stone removal", "kidney-stone-removal"],
];
const procedureIcons = [Stethoscope, Activity, Bone, Eye, Ear, Droplets];
const procedureTones = ["bg-icon-mint text-icon-teal", "bg-icon-cream text-icon-amber", "bg-icon-blue text-icon-cobalt", "bg-icon-sky text-icon-ocean", "bg-icon-peach text-icon-coral", "bg-icon-lilac text-icon-violet"];

export default function Procedures() {
  return <section className="calm-section bg-surface" aria-labelledby="procedures-title">
    <div className="calm-wrap">
      <div className="calm-section-heading"><div><h2 id="procedures-title">Popular procedures</h2><p className="mt-3 text-ink">Understand your options before your visit.</p></div><Link href="/surgery-guide" className="calm-text-link">View all procedures <span aria-hidden="true">↗</span></Link></div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {procedures.map(([label, slug], index) => {
          const Icon = procedureIcons[index];
          return <li key={slug}><Link href={"/surgeries/" + slug} className="calm-card flex min-h-20 items-center gap-3 px-5 py-4 text-base font-medium text-primary hover:text-primary-hover"><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${procedureTones[index]}`}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /></span><span className="flex-1">{label}</span><ArrowUpRight size={18} strokeWidth={1.5} className="shrink-0" aria-hidden="true" /></Link></li>;
        })}
      </ul>
    </div>
  </section>;
}
