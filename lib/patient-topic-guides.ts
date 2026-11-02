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
    answer: "A general physician or internal-medicine doctor can be a practical first contact for a new or ongoing blood-pressure concern. A cardiologist may be involved for some people. The right care route depends on an individual assessment by a qualified clinician.",
    relatedSpecialties: ["General physician / internal medicine", "Cardiology"],
    questions: [
      { question: "Does high blood pressure always mean I need a cardiologist?", answer: "No single online directory can decide that. A clinician can consider your health and advise whether general care or specialist input is suitable." },
      { question: "Can DOCVY confirm an appointment or treatment plan?", answer: "No. DOCVY does not diagnose, reserve a slot, or confirm treatment. The current enquiry form is closed; contact the hospital or clinic through its official profile." },
    ],
    references: [
      { label: "Healthdirect: high blood pressure and when to see a doctor", url: "https://www.healthdirect.gov.au/conditions/heart-diseases/high-blood-pressure-hypertension" },
      { label: "Healthdirect: the role of a GP", url: "https://www.healthdirect.gov.au/healthcare-and-services/roles-and-specialties/the-role-of-a-gp" },
      { label: "Healthdirect: the role of a cardiologist", url: "https://www.healthdirect.gov.au/healthcare-and-services/roles-and-specialties/the-role-of-a-cardiologist" },
    ],
  },
  {
    slug: "diabetes",
    topic: "Diabetes",
    title: "Which doctor treats diabetes?",
    metaDescription: "Understand how diabetes and endocrinology specialties relate, view DOCVY’s current NCR-only doctor listings, and check providers directly.",
    answer: "Diabetology and endocrinology services commonly include diabetes care. A general physician or internal-medicine doctor may also be a starting point. The Government of India’s VMMC & Safdarjung Hospital lists a dedicated diabetes clinic within its endocrinology department.",
    relatedSpecialties: ["Diabetology / endocrinology", "General physician / internal medicine"],
    questions: [
      { question: "Is an endocrinologist the only doctor who can help with diabetes?", answer: "No. Different clinicians may be involved depending on the person's needs and local services. A qualified clinician can explain which provider is appropriate." },
      { question: "Does DOCVY currently list diabetes specialists across India?", answer: "The guide is available across India, but source-linked doctor profiles currently cover Delhi, Gurugram and Noida only. Check the hospital profile for current details." },
    ],
    references: [
      { label: "VMMC & Safdarjung Hospital, Government of India: endocrinology and diabetes clinics", url: "https://www.vmmc-sjh.mohfw.gov.in/endocrinology" },
      { label: "Healthdirect: the role of an endocrinologist", url: "https://www.healthdirect.gov.au/healthcare-and-services/roles-and-specialties/endocrinologist" },
    ],
  },
  {
    slug: "pcos-pcod",
    topic: "PCOS / PCOD",
    title: "Which doctor should I see for PCOS or PCOD?",
    metaDescription: "See which specialties may be relevant for PCOS or PCOD and how DOCVY’s India-wide guide differs from its current Delhi NCR listings.",
    answer: "Endocrinology and gynaecology may both be relevant to PCOS, depending on the questions and care needed. VMMC & Safdarjung Hospital's endocrinology department lists PCOS among its services; reproductive-health concerns may also involve a gynaecologist. A clinician can help determine the right route for an individual.",
    relatedSpecialties: ["Diabetology / endocrinology", "Obstetrics and gynaecology"],
    questions: [
      { question: "Should I choose an endocrinologist or a gynaecologist for PCOS?", answer: "There is no one answer for everyone. These specialties can address different aspects of care; discuss your concern with a qualified clinician who understands your situation." },
      { question: "Can DOCVY book a PCOS appointment?", answer: "No. Appointment booking is not live. DOCVY’s enquiry form is closed, so contact a clinic or hospital directly using its official information." },
    ],
    references: [
      { label: "VMMC & Safdarjung Hospital, Government of India: PCOS in endocrinology services", url: "https://www.vmmc-sjh.mohfw.gov.in/endocrinology" },
      { label: "Healthdirect: the role of an endocrinologist", url: "https://www.healthdirect.gov.au/healthcare-and-services/roles-and-specialties/endocrinologist" },
      { label: "Healthdirect: the role of a gynaecologist", url: "https://www.healthdirect.gov.au/healthcare-and-services/roles-and-specialties/gynaecologist" },
    ],
  },
  {
    slug: "joint-pain-arthritis",
    topic: "Joint pain and arthritis",
    title: "Which doctor should I see for joint pain or arthritis?",
    metaDescription: "Compare the broad roles of orthopaedics and rheumatology for joint concerns and see where DOCVY currently lists source-linked profiles.",
    answer: "Orthopaedics and rheumatology are two specialties that may be related to joint concerns. Orthopaedics covers bones, joints and movement; rheumatology focuses on inflammatory and autoimmune conditions. A clinician should assess the person's situation before deciding which care is appropriate.",
    relatedSpecialties: ["Orthopaedics", "Rheumatology"],
    questions: [
      { question: "Is arthritis always treated by an orthopaedic doctor?", answer: "Not necessarily. Different forms of arthritis may involve different care teams. Use these specialty labels to understand the directory, not as a diagnosis or personal referral." },
      { question: "Are rheumatology profiles currently available in DOCVY?", answer: "DOCVY’s guide includes rheumatology information, but the current NCR directory may not have a related source-linked profile. Listings are limited and are not a complete city directory." },
    ],
    references: [
      { label: "Healthdirect: arthritis and possible care teams", url: "https://www.healthdirect.gov.au/conditions/joint-and-muscle-diseases/arthritis" },
      { label: "Healthdirect: osteoarthritis", url: "https://www.healthdirect.gov.au/osteoarthritis" },
    ],
  },
  {
    slug: "cataract",
    topic: "Cataract and vision concerns",
    title: "Which doctor treats cataracts?",
    metaDescription: "Learn which eye-care specialty is associated with cataracts and browse DOCVY’s limited, hospital-source-linked Delhi NCR listings.",
    answer: "An ophthalmologist is a specialist eye doctor who assesses and treats eye conditions, including cataracts. AIIMS Delhi's ophthalmology services include cataract care. The right examination and treatment depend on a clinician's assessment, and access pathways vary by location.",
    relatedSpecialties: ["Ophthalmology"],
    questions: [
      { question: "Is an ophthalmologist the same as an optometrist?", answer: "They have different roles. An ophthalmologist is a medical doctor specialising in eye diseases; an optometrist provides eye-care services within their own scope. Local referral arrangements vary." },
      { question: "Does DOCVY list cataract appointments across India?", answer: "No. DOCVY’s patient guide is nationwide, while source-linked doctor listings are currently limited to Delhi, Gurugram and Noida. DOCVY does not book or confirm appointments." },
    ],
    references: [
      { label: "AIIMS Delhi: ophthalmology services including cataract care", url: "https://www.aiims.edu/index.php/en/unit-i" },
      { label: "Healthdirect: cataracts and specialist eye care", url: "https://www.healthdirect.gov.au/conditions/eye-diseases/cataracts" },
      { label: "Healthdirect: the role of an ophthalmologist", url: "https://www.healthdirect.gov.au/healthcare-and-services/roles-and-specialties/ophthalmologist" },
    ],
  },
  {
    slug: "asthma",
    topic: "Asthma and breathing concerns",
    title: "Which doctor should I see for asthma?",
    metaDescription: "Learn which doctor types may be involved in asthma care, view DOCVY’s current Delhi NCR listings, and contact providers directly.",
    answer: "A general physician can be a starting point for asthma review. A respiratory specialist, also called a pulmonologist, may be involved when asthma is difficult to control. A clinician can advise what care is suitable; this guide is not for urgent breathing problems.",
    relatedSpecialties: ["Pulmonology / respiratory medicine", "General physician / internal medicine"],
    questions: [
      { question: "Can a DOCVY search assess asthma symptoms?", answer: "No. DOCVY search only connects words to broad specialty information; it cannot assess symptoms or urgency. For a life-threatening emergency in India, call 112 or go to the nearest emergency department." },
      { question: "Does DOCVY arrange an asthma appointment?", answer: "No. Booking is not live and the enquiry form is closed. Use an official clinic or hospital contact to confirm services and availability." },
    ],
    references: [
      { label: "Healthdirect: asthma in adolescents and adults", url: "https://www.healthdirect.gov.au/conditions/lung-and-respiratory-diseases/asthma-in-adolescents-and-adults" },
      { label: "Healthdirect: asthma medicines and respiratory specialist referrals", url: "https://www.healthdirect.gov.au/medicines/medicines-for-asthma" },
    ],
  },
];
