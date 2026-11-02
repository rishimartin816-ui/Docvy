import { MessageSquareWarning, ShieldCheck } from "lucide-react";
import { PageHero, Section, Card } from "@/components/ui";

export const metadata = {
  title: "Grievance contact information",
  description: "Current grievance-contact availability for DOCVY.",
  alternates: { canonical: "/grievance" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DOCVY",
    title: "Grievance contact | DOCVY",
    description: "Find the current grievance contact for DOCVY.",
    url: "/grievance",
  },
};

export default function Grievance() {
  return (
    <>
      <PageHero
        eyebrow="HELP & ACCOUNTABILITY"
        title="Your grievance contact at DOCVY."
        text="DOCVY is currently an informational website. Request submissions and service workflows are paused."
      />
      <Section alt>
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <Card>
            <MessageSquareWarning className="mb-4 text-mulb" size={28} />
            <h2 className="mb-2 text-lg font-bold">Operating entity</h2>
            <p className="text-sm text-grey">DSS Global Technologies Private Limited</p>
            <p className="mt-2 text-sm text-grey">Business address: 2nd Floor, Capital Cityscape, Sector 66, Gurugram, Haryana – 122101, India.</p>
            <p className="mt-2 text-xs leading-5 text-grey">Grievance contact: Rishi Raj Martin. Rishi Raj Martin has personally accepted responsibility for handling grievances. Email: contact@docvy.in. Written grievances may also be sent to the business address above.</p>
          </Card>
          <Card>
            <ShieldCheck className="mb-4 text-mulb" size={28} />
            <h2 className="mb-2 text-lg font-bold">Please do not submit sensitive information</h2>
            <p className="text-sm text-grey">The website is not accepting request submissions or complaints through a web form. Please do not send medical records, identity documents or other sensitive personal information through unverified channels.</p>
          </Card>
        </div>
      </Section>
    </>
  );
}
