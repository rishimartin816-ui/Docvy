"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { productionOrigin } from "@/lib/metadata";

const labels: Record<string, string> = {
  "/clinics": "Outpatient care",
  "/hospitals": "Hospitals",
  "/about": "About DOCVY",
  "/book": "Demo booking",
  "/care-guide": "Patient guide",
  "/clinic": "Demo clinic",
  "/contact": "Contact",
  "/crm/admin": "Owner console",
  "/crm/clinic": "Clinic workspace",
  "/faqs": "FAQs",
  "/for-clinics": "For clinics",
  "/for-doctors": "For doctors",
  "/grievance": "Grievances",
  "/how-it-works": "How it works",
  "/legal/disclaimer": "Medical disclaimer",
  "/legal/privacy": "Privacy policy",
  "/legal/refund": "Cancellation and refunds",
  "/legal/terms": "Terms of service",
  "/pricing": "Clinic and hospital plans",
  "/request": "Appointment enquiry",
  "/request/test": "Demo appointment enquiry",
  "/specialties": "Medical specialties",
  "/status": "Appointment status",
};

export default function RouteBreadcrumbs() {
  const path = usePathname();
  const name = labels[path];
  if (!name) return null;
  return <div className="mx-auto max-w-site px-5 pt-4 sm:px-9">
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex gap-2"><li><Link href="/" className="underline">Home</Link></li><li aria-current="page" className="flex items-center gap-2"><ChevronRight size={14} strokeWidth={1.5} aria-hidden="true" />{name}</li></ol>
    </nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: productionOrigin + "/" },
        { "@type": "ListItem", position: 2, name, item: productionOrigin + path },
      ],
    }).replace(/</g, "\\u003c") }} />
  </div>;
}
