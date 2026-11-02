import { AlertTriangle, MapPin } from "lucide-react";
import { PageHero, Section, Card } from "@/components/ui";

export const metadata = {
  title: "Contact DOCVY",
  description: "Business information and contact status for DOCVY.",
};

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT & BUSINESS INFORMATION"
        title="DOCVY is preparing for launch."
        text="The current website is informational only. Request submissions and customer-service workflows are temporarily unavailable."
      />
      <Section alt>
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <Card>
            <MapPin className="mb-4 text-mulb" size={26} />
            <h2 className="mb-2 font-bold">Operating entity</h2>
            <p className="text-sm text-grey">DSS Global Technologies Private Limited</p>
            <p className="mt-2 text-sm text-grey">Business location: Sector 66, Gurugram, Haryana, India.</p>
            <p className="mt-2 text-xs leading-5 text-grey">The location above is the locality supplied for publication. It is not represented as a complete registered or postal address.</p>
          </Card>
          <Card>
            <h2 className="mb-2 font-bold">Support availability</h2>
            <p className="text-sm text-grey">A public support email address and telephone number have not been published. DOCVY is not currently accepting request submissions or support tickets through this website.</p>
            <p className="mt-2 text-sm text-grey">Please do not send personal documents, payment details or health information through informal channels.</p>
          </Card>
        </div>
      </Section>
      <Section>
        <div className="flex max-w-3xl gap-4 rounded-card border border-rose bg-lav p-6">
          <AlertTriangle className="mt-1 shrink-0 text-plum" />
          <div>
            <h2 className="font-bold">Medical emergency?</h2>
            <p className="mt-2 text-sm">DOCVY is not an emergency service. In India, call 112 or go to the nearest emergency department for urgent medical help. Do not use this website for emergency assessment.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
