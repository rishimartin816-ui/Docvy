import MockupPages from "@/components/mockups/MockupPages";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "DOCVY clinic workspace", description: "Explore the DOCVY clinic workspace and find staff and owner sign-in.", alternates: { canonical: "/for-clinics" }, robots: { index: false, follow: true } };

export default function ForClinicsPage(){ return <MockupPages page="for-clinics"/>; }
