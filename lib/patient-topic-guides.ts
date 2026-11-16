import { additionalPatientGuides, pcosGuide } from "./additional-patient-guides";


export type PatientTopicGuide = {
  slug: string;
  topic: string;
  title: string;
  metaDescription: string;
  answer: string;
  relatedSpecialties: string[];
  procedure?: string;
  sourceChecked?: string;
  sections?: { heading: string; paragraphs: string[]; points?: string[] }[];
  lastReviewed?: string;
  reviewedBy?: string;
  questions: { question: string; answer: string }[];
  references: { label: string; url: string }[];
};

/** Search-oriented patient explainers. These provide navigation, not diagnosis or personal medical advice. */
export const patientTopicGuides: PatientTopicGuide[] = [
  {
    slug: "kidney-stones",
    topic: "Kidney stones",
    title: "Kidney stones and your urology visit",
    metaDescription: "Learn what kidney stones are, when to get urgent help, and what to ask at a urology visit.",
    answer: "Kidney stones are hard deposits that form in the kidneys. Small stones can pass without you noticing. Others can cause strong pain in your side or lower back, nausea, or changes when you pee. If you have severe pain, fever, or chills and suspect a kidney stone, seek urgent medical help.",
    relatedSpecialties: ["Urology"],
    procedure: "Kidney stone removal",
    questions: [
      { question: "What should I bring to the visit?", answer: "Bring previous scan reports and a list of medicines. Note when the pain began, where it is, and whether you have had fever or trouble passing urine." },
      { question: "Does every kidney stone need a procedure?", answer: "Some stones pass on their own. Ask the clinician what the stone’s size and location mean for your options and whether you need follow-up." },
    ],
    references: [{ label: "NHS guide to kidney stones", url: "https://www.nhs.uk/conditions/kidney-stones/" }],
  },
  {
    slug: "gallstones",
    topic: "Gallstones",
    title: "Gallstones and what to ask about treatment",
    metaDescription: "Learn what gallstones are, which symptoms need urgent care, and what to ask if surgery is discussed.",
    answer: "Gallstones form in the gallbladder, a small organ below the liver. Many people have no symptoms. A stone can cause pain if it blocks a bile duct. Seek emergency care for sudden severe abdominal pain, or if you have abdominal pain with fever or yellowing of the skin or eyes.",
    relatedSpecialties: ["General surgery"],
    procedure: "Gallbladder removal",
    questions: [
      { question: "What if a scan found gallstones by chance?", answer: "Gallstones without symptoms may not need treatment. Ask the clinician who ordered the scan what the finding means for you." },
      { question: "What can I ask if my doctor suggests surgery?", answer: "Ask why they recommend it, what alternatives apply in your case, and how long you may need help at home after the operation." },
    ],
    references: [{ label: "NHS guide to gallstones", url: "https://www.nhs.uk/conditions/gallstones/" }],
  },
  {
    slug: "high-blood-pressure",
    topic: "High blood pressure (hypertension)",
    title: "Which doctor should I see for high blood pressure?",
    metaDescription: "Learn which doctor types may be associated with high blood pressure, see current DOCVY listings, and confirm appointments directly with providers.",
    answer: "For directory browsing, general medicine and cardiology are broad specialties associated with high blood pressure. India’s National Health Mission includes hypertension in its medical-officer training material, and AIIMS Delhi lists cardiology services. These are reference examples, not a personal referral; a qualified clinician should decide the right care route for an individual.",
    relatedSpecialties: ["General physician / internal medicine", "Cardiology"],
    questions: [
      { question: "Does high blood pressure always mean I need a cardiologist?", answer: "No single online directory can decide that. A clinician can consider your health and advise whether general care or specialist input is suitable." },
      { question: "Can DOCVY confirm an appointment or treatment plan?", answer: "DOCVY does not diagnose or confirm treatment. You can request a visit for a listed doctor through DOCVY. The provider must confirm availability and the final appointment." },
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
    metaDescription: "Learn which doctors help with diabetes and what to bring to your first visit.",
    answer: "Diabetology and endocrinology services commonly include diabetes care. A general physician or internal-medicine doctor may also be a starting point. The Government of India’s VMMC & Safdarjung Hospital lists a dedicated diabetes clinic within its endocrinology department.",
    relatedSpecialties: ["Diabetology / endocrinology", "General physician / internal medicine"],
    questions: [
      { question: "Is an endocrinologist the only doctor who can help with diabetes?", answer: "No. Different clinicians may be involved depending on the person's needs and local services. A qualified clinician can explain which provider is appropriate." },
      { question: "Does DOCVY currently list diabetes specialists across India?", answer: "Real appointments are currently unavailable through DOCVY. Contact the clinic directly to check availability." },
    ],
    references: [
      { label: "VMMC & Safdarjung Hospital, Government of India: endocrinology and diabetes clinics", url: "https://www.vmmc-sjh.mohfw.gov.in/endocrinology" },
    ],
  },
  pcosGuide,
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
    metaDescription: "Real appointments are currently unavailable through DOCVY. Contact the clinic directly to check availability.",
    answer: "An ophthalmologist is a specialist eye doctor who assesses and treats eye conditions, including cataracts. AIIMS Delhi's ophthalmology services include cataract care. The right examination and treatment depend on a clinician's assessment, and access pathways vary by location.",
    relatedSpecialties: ["Ophthalmology"],
    procedure: "Cataract surgery",
    questions: [
      { question: "Is an ophthalmologist the same as an optometrist?", answer: "They have different roles. An ophthalmologist is a medical doctor specialising in eye diseases; an optometrist provides eye-care services within their own scope. Local referral arrangements vary." },
      { question: "Does DOCVY list cataract appointments across India?", answer: "Real appointments are currently unavailable through DOCVY. Contact the clinic directly to check availability." },
    ],
    references: [
      { label: "AIIMS Delhi: ophthalmology services including cataract care", url: "https://www.aiims.edu/index.php/en/unit-i" },
    ],
  },
  {
    slug: "asthma",
    topic: "Asthma and breathing concerns",
    title: "Which doctor should I see for asthma?",
    metaDescription: "Real appointments are currently unavailable through DOCVY. Contact the clinic directly to check availability.",
    answer: "For directory searches, general medicine and pulmonary or respiratory medicine are broad specialties associated with asthma. India’s National Health Mission includes asthma in its clinician training materials, and AIIMS Delhi lists a Pulmonary, Critical Care & Sleep Medicine department. A clinician must assess which care is suitable; this guide is not for urgent breathing problems.",
    relatedSpecialties: ["Pulmonology / respiratory medicine", "General physician / internal medicine"],
    questions: [
      { question: "Can a DOCVY search assess asthma symptoms?", answer: "No. DOCVY search only connects words to broad specialty information; it cannot assess symptoms or urgency. For a life-threatening emergency in India, call 112 or go to the nearest emergency department." },
      { question: "Does DOCVY arrange an asthma appointment?", answer: "If a suitable respiratory specialist is listed, you can request a visit through DOCVY. The provider must confirm availability and whether the service fits your needs." },
    ],
    references: [
      { label: "National Health Mission, Government of India: medical-officer training module on asthma", url: "https://nhm.gov.in/New-Update-2025-26/Whats-new/NCD-Medical-Officers.pdf" },
      { label: "AIIMS Delhi: Pulmonary, Critical Care & Sleep Medicine", url: "https://aiims.edu/index.php/en/pulmonary-intro" },
    ],
  },
  ...additionalPatientGuides,
];
