import ProfileRequestPage from "@/components/ProfileRequestPage";
export const dynamic = "force-dynamic";
export const metadata = { title: "Claim your doctor profile | DOCVY", description: "Give written consent to claim a DOCVY profile and receive appointment requests. Every claim is reviewed before publication.", alternates: { canonical: "/claim-profile" }, robots: { index: false, follow: true } };
export default function Page({searchParams}:{searchParams:{provider?:string}}) { return <ProfileRequestPage kind="claim" provider={searchParams.provider || ""} />; }
