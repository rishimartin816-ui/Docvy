import type { Metadata } from "next";
import ReferenceHome from "@/components/ReferenceHome";
import { buildPageSocialMetadata, productionOrigin } from "@/lib/metadata";

const title = "Find Doctors in Delhi NCR | Request an Appointment | DOCVY";
const description = "Search doctors by specialty and hospital across Delhi NCR. Read sourced profiles, check practice locations and send an appointment request in minutes.";
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: "/" },
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
