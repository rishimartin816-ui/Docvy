/** Public profile contract from preview/doctor-glass-claim; never an admin row. */
export type PublicDoctor = {
  id: string;
  live: true;
  name: string;
  specialties: string[];
  hospital: string;
  locations: { city: string; facility: string; locality?: string }[];
  profileStatus: "unclaimed" | "claimed" | "verified";
  consentGiven: boolean;
  registrationNumber: string | null;
  registrationCouncil: string | null;
  verifiedAt: string | null;
  summary?: string | null;
  sourceUrl: string;
};

// Preserve the established /doctor/[slug] URL format.
export function doctorSlug(id: string) {
  return id.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function isVerified(doctor: PublicDoctor) {
  return doctor.live === true && doctor.consentGiven === true && doctor.profileStatus === "verified" &&
    Boolean(doctor.registrationNumber?.trim() && doctor.registrationCouncil?.trim() && doctor.verifiedAt && Number.isFinite(Date.parse(doctor.verifiedAt)));
}

export function parsePublicDoctors(value: unknown): PublicDoctor[] {
  if (!Array.isArray(value)) throw new Error("Invalid public directory response");
  const slugs = new Set<string>();
  for (const row of value) {
    if (!row || typeof row !== "object" || typeof row.id !== "string" || !doctorSlug(row.id) ||
      row.live !== true || typeof row.name !== "string" || !row.name.trim() ||
      typeof row.hospital !== "string" || typeof row.sourceUrl !== "string" ||
      !Array.isArray(row.specialties) || !row.specialties.every((item: unknown) => typeof item === "string") ||
      !Array.isArray(row.locations) || !row.locations.length || !row.locations.every((item: unknown) => item && typeof item === "object" &&
        "city" in item && typeof item.city === "string" && "facility" in item && typeof item.facility === "string") ||
      !["unclaimed", "claimed", "verified"].includes(row.profileStatus) || typeof row.consentGiven !== "boolean" ||
      ![row.registrationNumber, row.registrationCouncil, row.verifiedAt, row.summary].every(item => item == null || typeof item === "string")) {
      throw new Error("Invalid public doctor record");
    }
    const slug = doctorSlug(row.id);
    if (slugs.has(slug)) throw new Error("Duplicate public doctor slug");
    slugs.add(slug);
  }
  // Explicit projection: additional RPC fields cannot accidentally reach this page.
  return value.map(row => ({
    id: row.id, live: true, name: row.name, specialties: row.specialties,
    hospital: row.hospital, locations: row.locations.map((location: PublicDoctor["locations"][number]) => ({ city: location.city, facility: location.facility })),
    profileStatus: row.profileStatus, consentGiven: row.consentGiven,
    registrationNumber: row.registrationNumber, registrationCouncil: row.registrationCouncil,
    verifiedAt: row.verifiedAt, summary: row.summary, sourceUrl: row.sourceUrl,
  }));
}
