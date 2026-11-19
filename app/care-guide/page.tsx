import MockupPages from "@/components/mockups/MockupPages";
import { buildPageSocialMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const title = "Which doctor should I see? Patient guide";
const description = "Find plain-language guides for common health concerns in India, learn what different specialists do, and prepare questions for your visit.";
const canonical = "https://www.docvy.in/care-guide";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  ...buildPageSocialMetadata(title + " | DOCVY", description, "/care-guide"),
};

export default async function CareGuidePage(){ return <MockupPages page="care-guide"/>; }
