import MockupPages from "@/components/mockups/MockupPages";
import { buildPageSocialMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const pageDescription = "Contact DOCVY for public doctor profile corrections, planned clinic and hospital workflows, privacy support or business details. Appointment booking is not live.";

export const metadata: Metadata = {
  title: "Contact DOCVY about doctor profiles and clinic plans",
  description: pageDescription,
  alternates: { canonical: "/contact" },
  ...buildPageSocialMetadata("Contact DOCVY about doctor profiles and clinic plans | DOCVY", pageDescription, "/contact"),
};

export default function ContactPage(){ return <MockupPages page="contact"/>; }
