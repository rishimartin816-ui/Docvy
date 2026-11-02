import { PageHero, Section } from "@/components/ui";

export const metadata = { title: "Requests temporarily paused", robots: { index: false, follow: false } };

export default function Request() {
  return (
    <>
      <PageHero
        eyebrow="DOCVY EARLY ACCESS"
        title="Request submissions are temporarily paused"
        text="We are preparing the DOCVY platform for launch. The request service is not accepting new submissions at this time. Please check back soon."
      />
      <Section alt>
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#DCEAE5] bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-[#173A37]">We are getting things ready.</h2>
          <p className="mt-3 text-sm leading-7 text-[#526D66]">
            No personal information can be submitted through this page while the service is paused.
          </p>
        </div>
      </Section>
    </>
  );
}
