import type { Metadata } from "next";
import Hero from "@/components/Hero";
import SpecialtyGrid from "@/components/SpecialtyGrid";
import HowItWorks from "@/components/HowItWorks";
import Procedures from "@/components/Procedures";
import Guides from "@/components/Guides";
import { buildPageSocialMetadata, productionOrigin } from "@/lib/metadata";

const title = "Find & Book Doctors in India | DOCVY";
const description = "Find doctors and clinics across India, explore specialties and procedures, and learn what to check before requesting an appointment through DOCVY.";
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: "/" },
  ...buildPageSocialMetadata(title, description, "/"),
};

export default function Home() {
  return <div className="calm-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "WebSite", "@id": productionOrigin + "/#website",
      name: "DOCVY", url: productionOrigin + "/", inLanguage: "en-IN",
      publisher: { "@id": productionOrigin + "/#organization" },
      potentialAction: { "@type": "SearchAction", target: productionOrigin + "/doctors?q={search_term_string}", "query-input": "required name=search_term_string" },
    }).replace(/</g, "\\u003c") }} />
    <Hero /><SpecialtyGrid /><HowItWorks /><Procedures /><Guides />
  </div>;
}
