import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import ReferenceArtwork from "./ReferenceArtwork";

export default function ReferenceCareSection({ id, tone = "mint", scene, kicker, title, benefits, text, href, label, children }: {
  id: string; tone?: "mint" | "rose" | "sand";
  scene: "doctor" | "calendar" | "hospital" | "workspace";
  kicker: string; title: ReactNode; benefits: string[]; text: string; href: string; label: string; children?: ReactNode;
}) {
  return <section id={id} className={`reference-section reference-section-${tone}`}>
    <div className="reference-wrap reference-care-grid">
      <aside className="reference-feature">
        <ReferenceArtwork scene={scene} />
        <div><h3>Designed around your needs</h3><ul>{benefits.map((benefit) => <li key={benefit}><Check size={15} strokeWidth={1.5} aria-hidden="true" /><span>{benefit}</span></li>)}</ul></div>
      </aside>
      <div className="reference-care-main">
        <p className="reference-eyebrow text-grey">{kicker}</p>
        <h2 className="reference-heading mt-4">{title}</h2>
        {children ?? <div className="reference-preview"><ReferenceArtwork scene={scene} /><div><p className="reference-eyebrow text-primary">YOUR NEXT STEP</p><h3 className="mt-3 text-xl font-medium">{label}</h3></div></div>}
        <p className="reference-copy mt-5">{text}</p>
        <Link href={href} className="docvy-pill docvy-pill-primary mt-6 gap-8 px-6">{label}<ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></Link>
      </div>
    </div>
  </section>;
}
