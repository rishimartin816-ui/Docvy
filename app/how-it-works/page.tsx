import MockupPages from "@/components/mockups/MockupPages";
import { providerCityListLabel } from "@/lib/directory-coverage";
import { buildPageSocialMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const howItWorksDescription = `See how DOCVY's India-wide care discovery works. The patient guide is available across India; current source-linked doctor listings are in ${providerCityListLabel}.`;

export const metadata: Metadata = {
  title: "How to use the patient guide and doctor directory",
  description: howItWorksDescription,
  alternates: { canonical: "/how-it-works" },
  ...buildPageSocialMetadata("How to use the patient guide and doctor directory | DOCVY", howItWorksDescription, "/how-it-works"),
};

export default async function HowItWorksPage(){ return <MockupPages page="how-it-works"/>; }
