import RequestForm from "@/components/RequestForm";
import { Card, PageHero, Section } from "@/components/ui";
export const metadata = { title: "Request – Docvy" };
export const dynamic = "force-dynamic";
export default function Request({ searchParams }: { searchParams: { purpose?: string } }) {
  const requestsEnabled = process.env.DOCVY_REQUESTS_ENABLED === "true";
  return (<><PageHero eyebrow="YOUR REQUEST" title={requestsEnabled ? "Start your medical documentation request" : "Request submissions are paused"} text={requestsEnabled ? "Share only what we need to route your request. No health details are collected at this stage." : "We are not collecting or storing request details through this page right now. Please check back later."} /><Section alt>{requestsEnabled ? <RequestForm initial={searchParams.purpose} /> : <Card className="max-w-2xl border-l-4 border-mulb"><p className="font-semibold text-plum">No details are being collected.</p><p className="mt-2 text-sm text-grey">The request form is temporarily unavailable.</p></Card>}</Section></>);
}
