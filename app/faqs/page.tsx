import { PageHero, Section } from "@/components/ui";
import Faq from "@/components/Faq";
export const metadata = { title: "FAQs – Docvy" };
export default function Faqs() { return (<><PageHero eyebrow="FAQS" title="Frequently asked questions" text="Plain answers about how Docvy works." /><Section><Faq /></Section></>); }
