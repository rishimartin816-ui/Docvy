import MockupPages from "@/components/mockups/MockupPages";
import { buildPageSocialMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const title = "Surgery guide and procedure directory";
const description = "Prepare for a surgical consultation in India with questions about your options, hospital costs, insurance paperwork, and recovery.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/surgery-guide" },
  ...buildPageSocialMetadata(title + " | DOCVY", description, "/surgery-guide", "article"),
};

export default function SurgeryGuidePage(){ return <MockupPages page="surgery-guide"/>; }
