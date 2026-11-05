import { Activity, Baby, Bone, Brain, Ear, Eye, HeartPulse, Smile, Sparkles, Stethoscope } from "lucide-react";

const icons = { "general-medicine": Stethoscope, cardiology: HeartPulse, dermatology: Sparkles, dentistry: Smile, orthopaedics: Bone, paediatrics: Baby, gynaecology: Activity, ophthalmology: Eye, ent: Ear, "mental-health": Brain };
const tones = {
  "general-medicine": "bg-icon-mint text-icon-teal", cardiology: "bg-icon-pink text-icon-berry",
  dermatology: "bg-icon-cream text-icon-amber", dentistry: "bg-icon-sky text-icon-ocean",
  orthopaedics: "bg-icon-blue text-icon-cobalt", paediatrics: "bg-icon-peach text-icon-coral",
  gynaecology: "bg-icon-lilac text-icon-violet", ophthalmology: "bg-icon-sky text-icon-ocean",
  ent: "bg-icon-mint text-icon-teal", "mental-health": "bg-icon-lilac text-icon-violet",
};

export default function SpecialtyIcon({ slug }: { slug: keyof typeof icons }) {
  const Icon = icons[slug];
  return <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tones[slug]}`}><Icon size={24} strokeWidth={1.5} aria-hidden="true" /></span>;
}
