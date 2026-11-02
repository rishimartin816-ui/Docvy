import { MessageSquareWarning, ShieldCheck } from "lucide-react";
import { PageHero, Section, Card } from "@/components/ui";

export const metadata = {
  title: "Grievance information – DOCVY",
  description: "Current grievance-contact availability for DOCVY.",
};

export default function Grievance() {
  return (
    <>
      <PageHero
        eyebrow="HELP & ACCOUNTABILITY"
        title="Grievance contact details are being finalised."
        text="DOCVY is currently an informational website. Request submissions and service workflows are paused."
      />
      <Section alt>
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <Card>
            <MessageSquareWarning className="mb-4 text-mulb" size={28} />
            <h2 className="mb-2 text-lg font-bold">Operating entity</h2>
            <p className="text-sm text-grey">DSS Global Technologies Private Limited</p>
            <p className="mt-2 text-sm text-grey">Business location supplied: Sector 66, Gurugram, Haryana, India.</p>
            <p className="mt-2 text-xs leading-5 text-grey">This is not a complete postal or registered address. A designated grievance contact name and verified contact channel have not yet been supplied.</p>
          </Card>
          <Card>
            <ShieldCheck className="mb-4 text-mulb" size={28} />
            <h2 className="mb-2 text-lg font-bold">Please do not submit sensitive information</h2>
            <p className="text-sm text-grey">The website is not accepting requests, complaints through a web form, medical records or health information. Do not include sensitive personal information in public comments or unverified channels.</p>
          </Card>
        </div>
      </Section>
    </>
  );
}
