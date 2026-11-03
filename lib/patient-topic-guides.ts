import { providerCityListLabel } from "@/lib/provider-candidates";

export type PatientTopicGuide = {
  slug: string;
  topic: string;
  title: string;
  metaDescription: string;
  answer: string;
  relatedSpecialties: string[];
  questions: { question: string; answer: string }[];
  references: { label: string; url: string }[];
};

/** Search-oriented patient explainers. These provide navigation, not diagnosis or personal medical advice. */
export const patientTopicGuides: PatientTopicGuide[] = [
  {
    slug: "high-blood-pressure",
    topic: "High blood pressure (hypertension)",
    title: "Which doctor should I see for high blood pressure?",
    metaDescription: "Learn which doctor types may be associated with high blood pressure, see current DOCVY listings, and confirm appointments directly with providers.",
    answer: "For directory browsing, general medicine and cardiology are broad specialties associated with high blood pressure. India’s National Health Mission includes hypertension in its medical-officer training material, and AIIMS Delhi lists cardiology services. These are reference examples, not a personal referral; a qualified clinician should decide the right care route for an individual.",
    relatedSpecialties: ["General physician / internal medicine", "Cardiology"],
    questions: [
      { question: "Does high blood pressure always mean I need a cardiologist?", answer: "No single online directory can decide that. A clinician can consider your health and advise whether general care or specialist input is suitable." },
      { question: "Can DOCVY confirm an appointment or treatment plan?", answer: "No. DOCVY does not diagnose, reserve a slot, or confirm treatment. The current enquiry form is closed; contact the hospital or clinic through its official profile." },
    ],
    references: [
      { label: "National Health Mission, Government of India: 2025–26 medical-officer training module on hypertension", url: "https://nhm.gov.in/New-Update-2025-26/Whats-new/NCD-Medical-Officers.pdf" },
      { label: "AIIMS Delhi: Department of Cardiology", url: "https://aiims.edu/index.php/en/centre_home?id=642" },
    ],
  },
  {
    slug: "diabetes",
    topic: "Diabetes",
    title: "Which doctor treats diabetes?",
    metaDescription: `Understand how diabetes and endocrinology specialties relate, view DOCVY’s current source-linked listings in ${providerCityListLabel}, and check providers directly.`,
    answer: "Diabetology and endocrinology services commonly include diabetes care. A general physician or internal-medicine doctor may also be a starting point. The Government of India’s VMMC & Safdarjung Hospital lists a dedicated diabetes clinic within its endocrinology department.",
    relatedSpecialties: ["Diabetology / endocrinology", "General physician / internal medicine"],
    questions: [
      { question: "Is an endocrinologist the only doctor who can help with diabetes?", answer: "No. Different clinicians may be involved depending on the person's needs and local services. A qualified clinician can explain which provider is appropriate." },
      { question: "Does DOCVY currently list diabetes specialists across India?", answer: `The guide is available across India, but source-linked doctor profiles currently cover ${providerCityListLabel} only. Check the hospital profile for current details.` },
    ],
    references: [
      { label: "VMMC & Safdarjung Hospital, Government of India: endocrinology and diabetes clinics", url: "https://www.vmmc-sjh.mohfw.gov.in/endocrinology" },
    ],
  },
  {
    slug: "pcos-pcod",
    topic: "PCOS / PCOD",
    title: "Which doctor should I see for PCOS or PCOD?",
    metaDescription: `See which specialties may be relevant for PCOS or PCOD and how DOCVY’s India-wide guide differs from its current listings in ${providerCityListLabel}.`,
    answer: "Endocrinology and gynaecology may both be relevant to PCOS, depending on the questions and care needed. VMMC & Safdarjung Hospital's endocrinology department lists PCOS among its services; reproductive-health concerns may also involve a gynaecologist. A clinician can help determine the right route for an individual.",
    relatedSpecialties: ["Diabetology / endocrinology", "Obstetrics and gynaecology"],
    questions: [
      { question: "Should I choose an endocrinologist or a gynaecologist for PCOS?", answer: "There is no one answer for everyone. These specialties can address different aspects of care; discuss your concern with a qualified clinician who understands your situation." },
      { question: "Can DOCVY book a PCOS appointment?", answer: "No. Appointment booking is not live. DOCVY’s enquiry form is closed, so contact a clinic or hospital directly using its official information." },
    ],
    references: [
      { label: "VMMC & Safdarjung Hospital, Government of India: PCOS in endocrinology services", url: "https://www.vmmc-sjh.mohfw.gov.in/endocrinology" },
    ],
  },
  {
    slug: "joint-pain-arthritis",
    topic: "Joint pain and arthritis",
    title: "Which doctor should I see for joint pain or arthritis?",
    metaDescription: "Compare the broad roles of orthopaedics and rheumatology for joint concerns and see where DOCVY currently lists source-linked profiles.",
    answer: "Orthopaedics and rheumatology are broad specialties associated with some joint concerns. AIIMS Delhi describes orthopaedic joint services and a rheumatology department that sees inflammatory arthritis. This directory guide cannot determine which specialty is appropriate for an individual.",
    relatedSpecialties: ["Orthopaedics", "Rheumatology"],
    questions: [
      { question: "Is arthritis always treated by an orthopaedic doctor?", answer: "Not necessarily. Different forms of arthritis may involve different care teams. Use these specialty labels to understand the directory, not as a diagnosis or personal referral." },
      { question: "Are rheumatology profiles currently available in DOCVY?", answer: "DOCVY’s guide includes rheumatology information, but the current NCR directory may not have a related source-linked profile. Listings are limited and are not a complete city directory." },
    ],
    references: [
      { label: "AIIMS Delhi: Orthopaedics and joint services", url: "https://www.aiims.edu/index.php/en/orthopaedics_intro" },
      { label: "AIIMS Delhi: Rheumatology and inflammatory arthritis services", url: "https://www.aiims.edu/index.php/en/component/content/article?id=6188" },
    ],
  },
  {
    slug: "cataract",
    topic: "Cataract and vision concerns",
    title: "Which doctor treats cataracts?",
    metaDescription: `Learn which eye-care specialty is associated with cataracts and browse DOCVY’s limited, hospital-source-linked listings in ${providerCityListLabel}.`,
    answer: "An ophthalmologist is a specialist eye doctor who assesses and treats eye conditions, including cataracts. AIIMS Delhi's ophthalmology services include cataract care. The right examination and treatment depend on a clinician's assessment, and access pathways vary by location.",
    relatedSpecialties: ["Ophthalmology"],
    questions: [
      { question: "Is an ophthalmologist the same as an optometrist?", answer: "They have different roles. An ophthalmologist is a medical doctor specialising in eye diseases; an optometrist provides eye-care services within their own scope. Local referral arrangements vary." },
      { question: "Does DOCVY list cataract appointments across India?", answer: `No. DOCVY’s patient guide is nationwide, while source-linked doctor listings are currently limited to ${providerCityListLabel}. DOCVY does not book or confirm appointments.` },
    ],
    references: [
      { label: "AIIMS Delhi: ophthalmology services including cataract care", url: "https://www.aiims.edu/index.php/en/unit-i" },
    ],
  },
  {
    slug: "asthma",
    topic: "Asthma and breathing concerns",
    title: "Which doctor should I see for asthma?",
    metaDescription: `Learn which doctor types may be involved in asthma care, view DOCVY’s current listings in ${providerCityListLabel}, and contact providers directly.`,
    answer: "For directory searches, general medicine and pulmonary or respiratory medicine are broad specialties associated with asthma. India’s National Health Mission includes asthma in its clinician training materials, and AIIMS Delhi lists a Pulmonary, Critical Care & Sleep Medicine department. A clinician must assess which care is suitable; this guide is not for urgent breathing problems.",
    relatedSpecialties: ["Pulmonology / respiratory medicine", "General physician / internal medicine"],
    questions: [
      { question: "Can a DOCVY search assess asthma symptoms?", answer: "No. DOCVY search only connects words to broad specialty information; it cannot assess symptoms or urgency. For a life-threatening emergency in India, call 112 or go to the nearest emergency department." },
      { question: "Does DOCVY arrange an asthma appointment?", answer: "No. Booking is not live and the enquiry form is closed. Use an official clinic or hospital contact to confirm services and availability." },
    ],
    references: [
      { label: "National Health Mission, Government of India: medical-officer training module on asthma", url: "https://nhm.gov.in/New-Update-2025-26/Whats-new/NCD-Medical-Officers.pdf" },
      { label: "AIIMS Delhi: Pulmonary, Critical Care & Sleep Medicine", url: "https://aiims.edu/index.php/en/pulmonary-intro" },
    ],
  },
];
