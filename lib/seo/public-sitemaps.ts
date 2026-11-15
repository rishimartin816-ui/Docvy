import "server-only";
import { getDirectoryDoctors } from "@/lib/public-directory";
import { doctorSlug, isVerified, type PublicDoctor } from "@/lib/public-doctor-policy";
import { paginateGroups, sitemapGroups } from "@/lib/seo/segmented-sitemaps";

export function doctorProfilePaths(doctors: PublicDoctor[]) {
  return doctors.filter(isVerified).map(doctor => "/doctor/" + doctorSlug(doctor.id));
}

export async function getPublicSitemapPages() {
  // One read of the existing public RPC, never the provider base table or CRM.
  // ponytail: RPC aggregates visible records; use bounded keyset reads when volume warrants.
  return paginateGroups({ ...sitemapGroups, "doctor-profiles": doctorProfilePaths(await getDirectoryDoctors()) });
}
