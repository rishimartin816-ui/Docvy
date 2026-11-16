import DirectoryAdmin from "@/components/DirectoryAdmin";
export const dynamic = "force-dynamic";
export const metadata = { title: "Directory review | DOCVY", alternates: { canonical: "/admin/directory" }, robots: { index: false, follow: false } };
export default function Page() { return <DirectoryAdmin />; }
