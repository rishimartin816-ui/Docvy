import { procedures, specialties, surgeryGroups } from "./care-directory";
import { careGuide } from "./care-guide";
import { providerCandidates } from "./provider-candidates";

export const cities = [
  {
    slug: "gurgaon", name: "Gurgaon",
    intro: "Finding a doctor in Gurgaon often means choosing between a neighbourhood clinic and a hospital outpatient department. Start with the kind of visit you need, then check the branch address before you make plans. A hospital group may have more than one location, and a doctor’s schedule can differ between them. If you’re arranging care for a parent or travelling across the city after work, ask about lift access, parking, and how early to arrive. Bring relevant reports and prescriptions, and check whether the clinic wants them in print or on your phone. Use the specialty and procedure guides below to prepare questions while DOCVY adds live listings.",
    question: "What should I check before travelling to a Gurgaon clinic?",
    answer: "Check the branch address, arrival time, and whether the clinic can accommodate anyone coming with you.",
  },
  {
    slug: "delhi", name: "Delhi",
    intro: "In Delhi, the first step in planning a consultation is often narrowing down the area you can reach comfortably. Check the facility’s full address, especially if the same department operates at different sites. For a repeat visit, ask whether your records can be retrieved at that branch or whether you should carry copies. If a family member will accompany you, find out where they can wait and whether they can join the consultation. For a procedure discussion, write down what the referring clinician said and take any reports you already have. DOCVY’s guides can help you prepare while local doctor listings are being added.",
    question: "How do I check which Delhi branch to visit?",
    answer: "Confirm the full address and outpatient department with the clinic before travelling.",
  },
  {
    slug: "noida", name: "Noida",
    intro: "When arranging a consultation in Noida, check the sector and branch details together. Two facilities with similar names may be in different areas, and a listing may cover only one of them. If you’re booking around school or work, ask how the clinic handles delays and whether you need a separate visit for tests. For a child’s appointment, check which previous records the clinic asks you to bring. For a follow-up, note what changed since your last visit and keep the previous prescription handy. Start with the guides below to understand the type of specialist involved and decide what to confirm with the facility.",
    question: "What should I confirm with a clinic in Noida?",
    answer: "Ask which sector and branch to visit, when to arrive, and which reports to bring.",
  },
] as const;

export function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function citySlug(value: string) {
  const slug = slugify(value);
  return slug === "gurugram" ? "gurgaon" : slug;
}

export const directorySpecialties = [
  ...specialties.map(({ slug, name }) => ({ slug, name })),
  ...Array.from(new Set(surgeryGroups.map(({ specialty }) => specialty)))
    .filter((name) => !specialties.some((item) => item.name === name))
    .map((name) => ({ slug: slugify(name), name })),
];

export const liveDoctors = providerCandidates.filter((doctor) => doctor.live === true);
export const directoryProcedures = procedures.map((procedure) => ({ ...procedure, slug: slugify(procedure.name) }));

export function doctorsIn(city?: string, specialty?: string) {
  return liveDoctors.filter((doctor) =>
    (!city || doctor.locations.some((location) => citySlug(location.city) === city)) &&
    (!specialty || doctor.specialties.some((name) => slugify(name) === specialty))
  );
}

export function searchDoctors(query: string, city?: string) {
  const words = query.toLowerCase().replace(/\bgurugram\b/g, "gurgaon").trim().split(/\s+/).filter(Boolean);
  return doctorsIn(city).filter((doctor) => {
    const doctorSpecialties = doctor.specialties.map(slugify);
    const symptomTerms = careGuide.filter((entry) => [entry.directoryQuery ?? "", ...entry.directorySpecialties ?? []]
      .some((label) => doctorSpecialties.includes(slugify(label)))).flatMap((entry) => entry.keywords);
    const terms = [
      doctor.name, ...doctor.specialties, ...(doctor.procedures ?? []), ...symptomTerms,
      ...doctor.specialties.flatMap((name) => specialties.filter((specialty) => specialty.slug === slugify(name)).map(({ plain }) => plain)),
      ...doctor.locations.flatMap(({ city, facility, locality }) => [citySlug(city), facility, locality ?? ""]),
    ].join(" ").toLowerCase();
    return words.every((word) => terms.includes(word));
  });
}

export const liveCities = cities.filter(({ slug }) => doctorsIn(slug).length > 0);
export const indexableCities = cities.filter(({ slug }) => doctorsIn(slug).length >= 3);
export const popularProcedures = ["cataract-surgery", "knee-replacement", "hernia-repair", "kidney-stone-removal", "gallbladder-removal", "tonsil-removal"];
