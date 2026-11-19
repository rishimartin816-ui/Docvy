import MockupPages from "@/components/mockups/MockupPages";
import { buildPageSocialMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const title = "DOCVY Help: Patient Guides and Appointments";
const description = "Learn how DOCVY sourced profiles, written consent, appointment requests, registration verification and profile removal work.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/faqs" },
  ...buildPageSocialMetadata(title, description, "/faqs"),
};

export default function FaqsPage(){ return <MockupPages page="faqs"/>; }
