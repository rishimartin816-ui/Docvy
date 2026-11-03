import { Activity, Bone, CircleDot, Droplet, Eye, HeartPulse, Sprout, Stethoscope, Wind } from "lucide-react";

export const healthTopics = [
  { slug: "kidney-stones", label: "Kidney stones", description: "What to ask at a urology visit", icon: CircleDot },
  { slug: "gallstones", label: "Gallstones", description: "What a scan finding could mean and what to ask next", icon: Sprout },
  { slug: "high-blood-pressure", label: "High blood pressure", description: "What to bring to a blood pressure visit", icon: HeartPulse },
  { slug: "diabetes", label: "Diabetes", description: "Which doctor to see and how to prepare", icon: Droplet },
  { slug: "joint-pain-arthritis", label: "Joint pain", description: "Where to start if your joints hurt", icon: Bone },
  { slug: "pcos-pcod", label: "PCOS and PCOD", description: "Who to speak with and what to ask", icon: Activity },
  { slug: "cataract", label: "Cataracts", description: "What to expect from an eye appointment", icon: Eye },
  { slug: "asthma", label: "Asthma", description: "How to prepare for a breathing check-up", icon: Wind },
];

export function HealthTopicIcon({ slug, size = 23 }: { slug: string; size?: number }) {
  const Icon = healthTopics.find((topic) => topic.slug === slug)?.icon ?? Stethoscope;
  return <Icon size={size} aria-hidden="true" />;
}
