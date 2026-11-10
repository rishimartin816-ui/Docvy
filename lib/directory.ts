import { procedures, specialties, surgeryGroups } from "./care-directory";
import { careGuide } from "./care-guide";
import { nationalCities } from "./national-cities";
import { providerCandidates, type ProviderCandidate } from "./provider-candidates";

export const cities = [
  {
    slug: "gurgaon", name: "Gurgaon",
    intro: "Finding a doctor in Gurgaon often means choosing between a neighbourhood clinic and a hospital outpatient department. Start with the kind of visit you need, then check the branch address before you make plans. A hospital group may have more than one location, and a doctor’s schedule can differ between them. If you’re arranging care for a parent or travelling across the city after work, ask about lift access, parking, and how early to arrive. Bring relevant reports and prescriptions, and check whether the clinic wants them in print or on your phone. Use the specialty and procedure guides below to prepare questions, explore the sourced doctor profiles and request an appointment where the doctor has opted in.",
    question: "What should I check before travelling to a Gurgaon clinic?",
    answer: "Check the branch address, arrival time, and whether the clinic can accommodate anyone coming with you.",
  },
  {
    slug: "delhi", name: "Delhi",
    intro: "In Delhi, the first step in planning a consultation is often narrowing down the area you can reach comfortably. Check the facility’s full address, especially if the same department operates at different sites. For a repeat visit, ask whether your records can be retrieved at that branch or whether you should carry copies. If a family member will accompany you, find out where they can wait and whether they can join the consultation. For a procedure discussion, write down what the referring clinician said and take any reports you already have. Use DOCVY’s guides to prepare questions, then review the sourced profiles. Appointment requests are available only for opted-in doctors.",
    question: "How do I check which Delhi branch to visit?",
    answer: "Confirm the full address and outpatient department with the clinic before travelling.",
  },
  {
    slug: "noida", name: "Noida",
    intro: "When arranging a consultation in Noida, check the sector and branch details together. Two facilities with similar names may be in different areas, and a listing may cover only one of them. If you’re booking around school or work, ask how the clinic handles delays and whether you need a separate visit for tests. For a child’s appointment, check which previous records the clinic asks you to bring. For a follow-up, note what changed since your last visit and keep the previous prescription handy. Start with the guides below to understand the type of specialist involved and decide what to confirm with the facility.",
    question: "What should I confirm with a clinic in Noida?",
    answer: "Ask which sector and branch to visit, when to arrive, and which reports to bring.",
  },
  {
    slug: "ghaziabad", name: "Ghaziabad",
    intro: "Planning care in Ghaziabad starts with checking the neighbourhood and the hospital branch. Nehru Nagar, Sanjay Nagar, Vaishali and Indirapuram are separate destinations, so a hospital name alone may not tell you where to go. Review the practice address on the doctor’s profile and keep any directions handy. If you are accompanying a parent, ask about step-free access and how long before the visit to arrive. For a repeat consultation, take the previous prescription and any reports your care team has requested. DOCVY brings the published doctor and practice details together so you can compare the relevant specialties and check whether appointment requests are enabled. The provider still needs to confirm the final time and consultation fee.",
    question: "How do I choose the correct Ghaziabad branch?", answer: "Check the locality, full practice address and doctor profile before sending your request. Wait for confirmation before travelling.",
  },
  {
    slug: "faridabad", name: "Faridabad",
    intro: "For a consultation in Faridabad, start with the specialty your clinician has suggested or the concern you want assessed. Check the sector and full hospital address together, especially when you are comparing departments at different facilities. A first consultation is a chance to explain what has changed, review relevant reports and ask what should happen next. If surgery has been mentioned, write down questions about alternatives, recovery, costs and who will coordinate follow-up. You can browse the source-linked profiles below and request a visit where a doctor has opted in. A profile does not show a live appointment slot. The provider must confirm availability, fees and the final timing before your visit.",
    question: "Are published consulting hours a confirmed appointment?", answer: "No. They are information from the practice source. Send a request and wait for the provider to confirm your visit.",
  },
  ...nationalCities,
] as const;

export function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function citySlug(value: string) {
  const slug = slugify(value);
  return ({rangapani:"siliguri",gurugram:"gurgaon",bangalore:"bengaluru",mangalore:"mangaluru",mysore:"mysuru"} as Record<string,string>)[slug] ?? slug;
}

export function specialtySlug(value: string) {
  const slug = slugify(value);
  const aliases: Record<string,string> = {"orthopedics":"orthopaedics", "orthopedic":"orthopaedics", "pediatrics":"paediatrics", "pediatrician":"paediatrics", "gynecology":"gynaecology", "gynecologist":"gynaecology", "internal-medicine":"general-medicine", "internal-medicine-evening-clinic":"general-medicine", "general-physician":"general-medicine", "psychiatry":"mental-health", "ear-nose-throat":"ent", "dental-medicine":"dentistry", "obstetrics-and-gynaecology":"gynaecology", "paediatric-and-child-care":"paediatrics", "diabetes-and-endocrinology":"endocrinology", "pulmonary-medicine":"pulmonology", "pulmonology-respiratory-and-sleep-medicine":"pulmonology", "gastrointestinal-science":"gastroenterology", "medical-gastro":"gastroenterology", "surgical-gastro":"gastrointestinal-surgery", "cancer-care-oncology":"oncology", "radiotherapy-oncology-radiation":"radiation-oncology"};
  return aliases[slug] ?? slug;
}
export function specialtyMatches(name: string, requested: string) { return specialtySlug(name) === specialtySlug(requested); }

export const directorySpecialties = [
  ...specialties.map(({ slug, name }) => ({ slug, name })),
  ...Array.from(new Set([...surgeryGroups.map(({ specialty }) => specialty), ...providerCandidates.filter((doctor) => doctor.live).flatMap((doctor) => doctor.specialties)]))
    .filter((name) => !specialties.some((item) => item.name === name))
    .map((name) => ({ slug: slugify(name), name })),
].filter((item, index, list) => list.findIndex(other => specialtySlug(other.slug) === specialtySlug(item.slug)) === index)
  .map(item => ({ ...item, slug: specialtySlug(item.slug) }));

export const directoryProcedures = procedures.map((procedure) => ({ ...procedure, slug: slugify(procedure.name) }));

export function doctorsIn(city?: string, specialty?: string, doctors: ProviderCandidate[] = []) {
  return doctors.filter((doctor) =>
    (!city || doctor.locations.some((location) => citySlug(location.city) === city)) &&
    (!specialty || doctor.specialties.some((name) => specialtyMatches(name, specialty)))
  );
}

export function searchDoctors(query: string, city?: string, doctors: ProviderCandidate[] = []) {
  const queryAliases: Record<string,string> = {orthopedic:"orthopaedics",orthopedics:"orthopaedics",orthopedist:"orthopaedics",pediatric:"paediatrics",pediatrics:"paediatrics",gynecology:"gynaecology",urologist:"urology",cardiologist:"cardiology",dermatologist:"dermatology",paediatrician:"paediatrics",pediatrician:"paediatrics",gynaecologist:"gynaecology",gynecologist:"gynaecology",ophthalmologist:"ophthalmology",neurologist:"neurology",nephrologist:"nephrology",dentist:"dentistry",psychiatrist:"psychiatry",gastroenterologist:"gastroenterology"};
  const words = query.toLowerCase().replace(/\bnear\s+me\b/g, "").replace(/\bgurugram\b/g, "gurgaon").replace(/\bbangalore\b/g,"bengaluru").replace(/\bmangalore\b/g,"mangaluru").replace(/\bmysore\b/g,"mysuru").trim().split(/\s+/).filter(Boolean).map(w=>queryAliases[w]??w);
  return doctorsIn(city, undefined, doctors).filter((doctor) => {
    const doctorSpecialties = doctor.specialties.map(specialtySlug);
    const symptomTerms = careGuide.filter((entry) => [entry.specialty, entry.directoryQuery ?? "", ...entry.directorySpecialties ?? []]
      .some((label) => doctorSpecialties.includes(specialtySlug(label)))).flatMap((entry) => entry.keywords);
    const terms = [
      doctor.name, ...doctor.specialties, ...doctor.specialties.map(s=>specialtySlug(s).replace(/-/g," ")), ...(doctor.procedures ?? []), ...symptomTerms,
      ...doctor.specialties.flatMap((name) => specialties.filter((specialty) => specialty.slug === specialtySlug(name)).map(({ plain }) => plain)),
      ...doctor.locations.flatMap(({ city, facility, locality }) => [citySlug(city), facility, locality ?? ""]),
    ].join(" ").toLowerCase();
    return words.every((word) => terms.includes(word));
  });
}

export function availableCities(doctors: ProviderCandidate[], minimum = 1): { slug: string; name: string }[] {
  const curated = cities.filter(({ slug }) => doctorsIn(slug, undefined, doctors).length >= minimum);
  // Additional practice cities are searchable; editorial city pages need their own reviewed content.
  if (minimum > 1) return curated;
  const extra = new Map<string, string>();
  for (const doctor of doctors) for (const location of doctor.locations) {
    const slug = citySlug(location.city);
    if (slug && !cities.some(c => c.slug === slug)) extra.set(slug, location.city);
  }
  return [...curated, ...Array.from(extra, ([slug, name]) => ({ slug, name })).sort((a,b) => a.name.localeCompare(b.name))];
}
export const popularProcedures = ["cataract-surgery", "knee-replacement", "hernia-repair", "kidney-stone-removal", "gallbladder-removal", "tonsil-removal"];
