import { Activity, Baby, Bone, Brain, Ear, Eye, HeartPulse, Smile, Sparkles, Stethoscope } from "lucide-react";

const icons = { "general-medicine": Stethoscope, cardiology: HeartPulse, dermatology: Sparkles, dentistry: Smile, orthopaedics: Bone, paediatrics: Baby, gynaecology: Activity, ophthalmology: Eye, ent: Ear, "mental-health": Brain };

export default function SpecialtyIcon({ slug }: { slug: keyof typeof icons }) {
  const Icon = icons[slug];
  return <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#f0eff8] text-[#202124]"><Icon size={24} aria-hidden="true" /></span>;
}
