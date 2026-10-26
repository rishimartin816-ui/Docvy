import RequestForm from "@/components/RequestForm";
import { PageHero, Section } from "@/components/ui";
export const metadata = { title: "Request – Docvy" };
export default function Request({ searchParams }: { searchParams: { purpose?: string } }) {
  return (<><PageHero eyebrow="YOUR REQUEST" title="Start your medical documentation request" text="Share only what we need to route your request. No health details are collected at this stage." /><Section alt><RequestForm initial={searchParams.purpose} /></Section></>);
}
