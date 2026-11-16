import ProfileRequestPage from "@/components/ProfileRequestPage";
export const dynamic = "force-dynamic";
export const metadata = { title: "Request doctor profile removal | DOCVY", description: "Request removal of a sourced doctor profile from DOCVY. Removal requests are actioned within 48 hours.", alternates: { canonical: "/remove-profile" }, robots: { index: false, follow: true } };
export default function Page({searchParams}:{searchParams:{provider?:string}}) { return <ProfileRequestPage kind="removal" provider={searchParams.provider || ""} />; }
