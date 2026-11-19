import MockupPages from "@/components/mockups/MockupPages";
import { buildPageSocialMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const title = "About DOCVY | A clearer next step in healthcare";
const description = "DOCVY helps patients and families in India understand health concerns, find the right type of doctor, and prepare for care in plain language.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  ...buildPageSocialMetadata(title, description, "/about"),
};

export default function AboutPage(){ return <MockupPages page="about"/>; }
