import MockupPages from "@/components/mockups/MockupPages";
import { buildPageSocialMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinic and hospital plans",
  description: "Explore DOCVY’s planned clinic and hospital workflows. Rates are not published and dashboards are not live; contact DOCVY to discuss future onboarding and pricing.",
  alternates: { canonical: "/pricing" },
  ...buildPageSocialMetadata("Clinic and hospital plans | DOCVY", "Explore DOCVY’s planned clinic and hospital workflows. Rates are not published and dashboards are not live; contact DOCVY to discuss future onboarding and pricing.", "/pricing"),
};

export default function PricingPage(){ return <MockupPages page="pricing"/>; }
