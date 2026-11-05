import Link from "next/link";
import { Activity, Baby, Bone, Ear, Eye, HeartPulse, Sparkles, Stethoscope } from "lucide-react";

const specialties = [
  { name: "General medicine", slug: "general-medicine", text: "Everyday health concerns", icon: Stethoscope },
  { name: "Cardiology", slug: "cardiology", text: "Heart and circulation", icon: HeartPulse },
  { name: "Dermatology", slug: "dermatology", text: "Skin, hair and nails", icon: Sparkles },
  { name: "Orthopaedics", slug: "orthopaedics", text: "Bones and joints", icon: Bone },
  { name: "Paediatrics", slug: "paediatrics", text: "Care for children", icon: Baby },
  { name: "Gynaecology", slug: "gynaecology", text: "Reproductive health", icon: Activity },
  { name: "Ophthalmology", slug: "ophthalmology", text: "Eyes and vision", icon: Eye },
  { name: "ENT", slug: "ent", text: "Ear, nose and throat", icon: Ear },
];

export default function SpecialtyGrid() {
  return <section className="calm-section bg-lavender/40" aria-labelledby="specialties-title">
    <div className="calm-wrap">
      <div className="calm-section-heading"><div><h2 id="specialties-title">Explore specialties</h2><p className="mt-3 max-w-[65ch] text-ink">Start with the care you’re looking for.</p></div><Link href="/specialties" className="calm-text-link">View all specialties <span aria-hidden="true">↗</span></Link></div>
      <ul className="mt-8 grid auto-rows-fr grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {specialties.map(({ name, slug, text, icon: Icon }, index) => <li key={slug}>
          <Link href={"/specialties/" + slug} className="calm-card flex h-full flex-col p-4 sm:p-6">
            <span className={"flex h-12 w-12 items-center justify-center rounded-2xl " + (index % 2 ? "bg-rose/50" : "bg-lavender")}><Icon size={24} strokeWidth={1.5} className="text-plum" aria-hidden="true" /></span>
            <h3 className="mt-5 text-[15px] font-semibold leading-snug sm:text-lg">{name}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink">{text}</p>
          </Link>
        </li>)}
      </ul>
    </div>
  </section>;
}
