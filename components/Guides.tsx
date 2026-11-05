import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HealthTopicIcon } from "./HealthTopicIcon";

const guides = [
  { title: "Kidney stones", slug: "kidney-stones", text: "Plan a urology visit." },
  { title: "High blood pressure", slug: "high-blood-pressure", text: "Prepare for your visit." },
  { title: "Diabetes", slug: "diabetes", text: "Find where to start." },
  { title: "Joint pain", slug: "joint-pain-arthritis", text: "Plan your next step." },
];
const guideTints = ["bg-icon-blue", "bg-icon-pink", "bg-icon-cream", "bg-icon-sky"];

export default function Guides() {
  return <section className="calm-section bg-surface/40" aria-labelledby="guides-title">
    <div className="calm-wrap">
      <div className="calm-section-heading"><div><h2 id="guides-title">Health guides</h2><p className="mt-3 text-ink">Clear information. More useful conversations.</p></div><Link href="/care-guide" className="calm-text-link">View all guides <span aria-hidden="true">↗</span></Link></div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {guides.map(({ title, slug, text }, index) => <li key={slug}><Link href={"/patient-guides/" + slug} className="calm-card flex h-full flex-col p-5 sm:p-6"><span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${guideTints[index]}`}><HealthTopicIcon slug={slug} /></span><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-ink">{text}</p><ArrowUpRight size={18} strokeWidth={1.5} className="mt-6 text-primary" aria-hidden="true" /></Link></li>)}
      </ul>
    </div>
  </section>;
}
