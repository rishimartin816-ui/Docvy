import type { Metadata } from "next";
import ReferenceHome from "@/components/ReferenceHome";
import { buildPageSocialMetadata, productionOrigin, homeLanguageLinks } from "@/lib/metadata";

const title = "Find Doctors in India by Specialty, Hospital & City | DOCVY";
const description = "Find doctors across India by specialty, city and clinic. Compare practice details, read health guides and request a visit with participating doctors on DOCVY.";
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: productionOrigin + "/", languages: homeLanguageLinks },
  ...buildPageSocialMetadata(title, description, "/"),
};
export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "WebSite", "@id": productionOrigin + "/#website",
      name: "DOCVY", url: productionOrigin + "/", inLanguage: "en-IN",
      publisher: { "@id": productionOrigin + "/#organization" },
      potentialAction: { "@type": "SearchAction", target: productionOrigin + "/doctors?q={search_term_string}", "query-input": "required name=search_term_string" },
    }).replace(/</g, "\\u003c") }} />
    <ReferenceHome />
  </>;
}
