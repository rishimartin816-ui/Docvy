import type { MetadataRoute } from "next";
import { specialties } from "@/lib/care-directory";
import { patientTopicGuides } from "@/lib/patient-topic-guides";

import { directoryProcedures, directorySpecialties, doctorsIn, availableCities, citySlug, slugify } from "@/lib/directory";
import { getDirectoryDoctors } from "@/lib/public-directory";
export const dynamic = "force-dynamic";
const site = "https://www.docvy.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const liveDoctors = await getDirectoryDoctors();
  const indexableCities = availableCities(liveDoctors, 3);
  if (process.env.VERCEL_ENV !== "production" || process.env.DOCVY_INDEXING_ENABLED !== "true") return [];
  const pages = [
    ["", 1],
    ["/doctors", 0.9],
    ["/hospitals", 0.7],
    ["/about", 0.6],
    ["/care-guide", 0.9],
    ["/surgery-guide", 0.8],
    ["/specialties", 0.9],
    ["/contact", 0.7],
    ["/for-doctors", 0.7],
    ["/faqs", 0.6],
    ["/grievance", 0.3],
    ["/how-it-works", 0.6],
    ["/legal/privacy", 0.2],
    ["/legal/terms", 0.2],
    ["/legal/refund", 0.2],
    ["/legal/disclaimer", 0.2],
    ["/pricing", 0.7],
  ] as const;

  return [...pages,
    ...indexableCities.flatMap(({ slug }) => [
      [`/doctors/${slug}`, 0.8] as const,
      ...Array.from(new Set(doctorsIn(slug,undefined,liveDoctors).flatMap(d=>d.locations.filter(l=>citySlug(l.city)===slug && l.locality).map(l=>l.locality!)))).filter(area=>doctorsIn(slug,undefined,liveDoctors).filter(d=>d.locations.some(l=>citySlug(l.city)===slug && l.locality===area)).length>=3).map(area=>[`/doctors/${slug}/areas/${slugify(area)}`,0.6] as const),
      ...directorySpecialties.filter((specialty) => doctorsIn(slug, specialty.slug, liveDoctors).length >= 3).map((specialty) => [`/doctors/${slug}/${specialty.slug}`, 0.7] as const),
    ]),
    ...liveDoctors.map(({ id }) => [`/doctor/${slugify(id)}`, 0.7] as const),
    ...directoryProcedures.map(({ slug }) => [`/surgeries/${slug}`, 0.7] as const), ...specialties.map(({ slug }) => [`/specialties/${slug}`, 0.7] as const), ...patientTopicGuides.map(({ slug }) => [`/patient-guides/${slug}`, 0.7] as const)].map(([path, priority]) => ({
    url: `${site}${path}`,
    lastModified: "2026-11-10",
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
  }));
}
