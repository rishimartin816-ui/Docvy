export type CareGuideEntry = {
  specialty: string;
  description: string;
  examples: string[];
  keywords: string[];
  references?: { label: string; url: string }[];
  /** Exact source-listed provider specialty labels that belong in this directory category. */
  directorySpecialties?: string[];
  /** Query used to open the live directory with matching profiles. */
  directoryQuery?: string;
};

/** General navigation examples only; not a diagnostic or triage tool. */
export const careGuide: CareGuideEntry[] = [
  {
    specialty: "General physician / internal medicine",
    description: "A practical first contact when a concern is new, unclear, or involves more than one part of your health.",
    examples: ["A new or unclear health concern", "Fever or several symptoms that need assessment", "A first review before specialist care"],
    keywords: ["general doctor", "general physician", "internal medicine", "primary care", "fever", "weakness", "fatigue", "tired", "headache", "high blood pressure", "hypertension", "blood pressure", "check up", "checkup", "health check", "unclear", "not sure"],
    directorySpecialties: ["General physician", "Internal medicine"],
    directoryQuery: "general physician",
  },
  {
    specialty: "Cardiology",
    description: "Specialist care for conditions affecting the heart and circulation. High blood pressure may also be assessed in general care; the right clinician depends on the person and situation.",
    examples: ["Known heart condition follow-up", "Heart rhythm or palpitations", "High blood pressure or hypertension review"],
    keywords: ["heart", "cardiology", "blood pressure", "high blood pressure", "hypertension", "bp", "palpitation", "palpitations", "rhythm", "arrhythmia", "heart failure", "coronary artery disease", "circulation"],
    references: [
      { label: "Healthdirect: high blood pressure and specialist care", url: "https://www.healthdirect.gov.au/conditions/heart-diseases/high-blood-pressure-hypertension" },
      { label: "Healthdirect: the role of a cardiologist", url: "https://www.healthdirect.gov.au/healthcare-and-services/roles-and-specialties/the-role-of-a-cardiologist" },
    ],
    directorySpecialties: ["Cardiology", "Interventional cardiology", "Cardiac electrophysiology and pacemakers"],
    directoryQuery: "cardiology",
  },
  {
    specialty: "Dermatology",
    description: "Specialist care for skin, hair, and nail conditions.",
    examples: ["Acne, eczema or psoriasis", "A recurring or worsening rash", "Hair, nail or changing-mole concerns"],
    keywords: ["skin", "rash", "rashes", "acne", "eczema", "dermatitis", "psoriasis", "vitiligo", "hives", "fungal infection", "dandruff", "hair", "hair loss", "alopecia", "nail", "mole", "dermatology", "dermatologist"],
    references: [{ label: "Healthdirect: the role of a dermatologist", url: "https://www.healthdirect.gov.au/healthcare-and-services/roles-and-specialties/dermatologist" }],
  },
  {
    specialty: "Diabetology / endocrinology",
    description: "Care for diabetes and conditions involving hormones, thyroid, and metabolism.",
    examples: ["Type 1 or type 2 diabetes care", "Thyroid conditions", "PCOS or other hormone concerns"],
    keywords: ["diabetes", "type 1 diabetes", "type 2 diabetes", "blood sugar", "sugar", "thyroid", "hypothyroidism", "hyperthyroidism", "pcos", "pcod", "polycystic ovary syndrome", "hormone", "endocrine", "endocrinology", "diabetology", "metabolism"],
    references: [{ label: "VMMC & Safdarjung Hospital: endocrinology services", url: "https://www.vmmc-sjh.mohfw.gov.in/endocrinology" }],
  },
  {
    specialty: "Gastroenterology",
    description: "Specialist care for the digestive system, including the stomach, intestines, and liver.",
    examples: ["Persistent digestive concerns", "Reflux (GERD) or bowel-condition follow-up", "Liver-related review"],
    keywords: ["stomach", "stomach pain", "digestion", "digestive", "acidity", "reflux", "gerd", "heartburn", "bowel", "ibs", "irritable bowel syndrome", "crohn", "ulcerative colitis", "intestine", "liver", "fatty liver", "hepatitis", "gastro", "gastroenterology"],
  },
  {
    specialty: "Neurology",
    description: "Specialist care for conditions affecting the brain, spinal cord, and nerves. A general physician may assess a new headache or symptom and advise whether specialist care is needed.",
    examples: ["Known seizure or epilepsy follow-up", "Migraine or nerve-condition review", "Movement, memory or stroke follow-up"],
    keywords: ["brain", "nerve", "nerves", "neuropathy", "seizure", "seizures", "epilepsy", "migraine", "headache", "parkinson", "parkinsons", "stroke follow up", "stroke follow-up", "multiple sclerosis", "neurology", "neurologist", "memory"],
    references: [{ label: "Healthdirect: headaches and when a neurologist may help", url: "https://www.healthdirect.gov.au/headaches" }],
  },
  {
    specialty: "Orthopaedics",
    description: "Specialist care for bones, joints, muscles, and injuries affecting movement.",
    examples: ["Joint or bone concerns, including osteoarthritis", "Back, knee or mobility review", "Fracture or injury follow-up"],
    keywords: ["bone", "joint", "arthritis", "osteoarthritis", "joint replacement", "back pain", "knee", "fracture", "injury", "sports injury", "orthopaedic", "orthopedic", "movement"],
    directorySpecialties: ["Orthopaedics", "Joint replacement"],
    directoryQuery: "orthopaedics",
    references: [
      { label: "Healthdirect: arthritis and possible care teams", url: "https://www.healthdirect.gov.au/conditions/joint-and-muscle-diseases/arthritis" },
      { label: "Healthdirect: osteoarthritis", url: "https://www.healthdirect.gov.au/osteoarthritis" },
    ],
  },
  {
    specialty: "Rheumatology",
    description: "Specialist care for inflammatory and autoimmune conditions that can affect joints and connective tissue. Several kinds of clinicians may be involved, depending on the condition.",
    examples: ["Rheumatoid or psoriatic arthritis follow-up", "Persistent joint swelling or stiffness", "Known gout or lupus care"],
    keywords: ["arthritis", "rheumatoid arthritis", "rheumatoid", "psoriatic arthritis", "autoimmune joint", "joint swelling", "stiffness", "gout", "lupus", "ankylosing spondylitis", "rheumatology", "rheumatologist"],
    references: [{ label: "Healthdirect: arthritis and when a rheumatologist may help", url: "https://www.healthdirect.gov.au/conditions/joint-and-muscle-diseases/arthritis" }],
  },
  {
    specialty: "Obstetrics and gynaecology",
    description: "Care related to pregnancy, menstrual health, and the reproductive system.",
    examples: ["Pregnancy or menstrual health", "Fibroids or endometriosis follow-up", "PCOS or fertility questions"],
    keywords: ["pregnancy", "pregnant", "period", "periods", "period pain", "irregular periods", "menstrual", "fibroid", "fibroids", "endometriosis", "pcos", "pcod", "women", "reproductive", "gynaecology", "gynecology", "obstetrics", "fertility", "menopause"],
    references: [{ label: "VMMC & Safdarjung Hospital: endocrinology services, including PCOS", url: "https://www.vmmc-sjh.mohfw.gov.in/endocrinology" }],
  },
  {
    specialty: "Paediatrics",
    description: "Medical care for babies, children, and adolescents.",
    examples: ["Child health review", "Growth and development questions", "Ongoing childhood conditions"],
    keywords: ["child", "children", "baby", "infant", "newborn", "paediatric", "pediatric", "growth", "vaccination", "child fever"],
  },
  {
    specialty: "Pulmonology / respiratory medicine",
    description: "Specialist care for lung and breathing conditions.",
    examples: ["Asthma follow-up", "COPD care", "Ongoing respiratory concerns"],
    keywords: ["lung", "breathing", "asthma", "copd", "bronchitis", "pneumonia", "respiratory", "pulmonology", "chronic cough", "sleep apnea", "sleep apnoea"],
    references: [{ label: "Healthdirect: asthma and respiratory specialist care", url: "https://www.healthdirect.gov.au/conditions/lung-and-respiratory-diseases/asthma-in-adolescents-and-adults" }],
  },
  {
    specialty: "Mental health",
    description: "A psychiatrist is a medical doctor; psychologists and counsellors provide other forms of mental health support.",
    examples: ["Anxiety or low mood support", "Psychiatric review", "Ongoing mental health care"],
    keywords: ["mental health", "anxiety", "anxiety disorder", "depression", "mood", "psychiatry", "psychiatrist", "psychologist", "counselling", "counseling", "stress", "panic", "ocd", "bipolar", "ptsd", "insomnia"],
  },
  {
    specialty: "Nephrology",
    description: "Specialist care for kidney conditions and kidney function.",
    examples: ["Known kidney condition", "Kidney function follow-up", "Specialist kidney care"],
    keywords: ["kidney", "chronic kidney disease", "kidney disease", "renal", "nephrology", "nephrologist", "dialysis", "protein in urine"],
  },
  {
    specialty: "Urology",
    description: "Specialist care for the urinary system and conditions involving the bladder or prostate.",
    examples: ["Bladder concerns", "Urinary symptoms", "Prostate-related care"],
    keywords: ["urinary", "urine", "uti", "urinary infection", "urine infection", "kidney stone", "kidney stones", "bladder", "prostate", "enlarged prostate", "urology", "urologist", "incontinence"],
    directorySpecialties: ["Urology", "Kidney transplant"],
    directoryQuery: "urology",
  },
  {
    specialty: "Ophthalmology",
    description: "Medical and surgical care for eye conditions and vision health.",
    examples: ["Eye condition review", "Vision changes", "Eye surgery consultation"],
    keywords: ["eye", "eyes", "vision", "cataract", "glaucoma", "conjunctivitis", "diabetic retinopathy", "ophthalmology", "ophthalmologist", "sight"],
  },
  {
    specialty: "ENT (ear, nose and throat)",
    description: "Specialist care for conditions affecting the ears, nose, throat, and related areas.",
    examples: ["Hearing concerns", "Recurring sinus problems", "Throat or voice concerns"],
    keywords: ["ear", "ear infection", "nose", "throat", "sinus", "sinusitis", "hearing", "hearing loss", "ent", "voice", "tonsil", "tonsillitis"],
  },
  {
    specialty: "Oncology",
    description: "Specialist care for cancer diagnosis, treatment planning, and follow-up.",
    examples: ["Cancer treatment consultation", "Second opinion", "Cancer follow-up care"],
    keywords: ["cancer", "breast cancer", "lung cancer", "colon cancer", "prostate cancer", "blood cancer", "tumour", "tumor", "oncology", "oncologist", "chemotherapy"],
  },
  {
    specialty: "Dentistry",
    description: "Dental professionals provide care for teeth, gums, and oral health.",
    examples: ["Tooth pain", "Gum concerns", "Routine dental care"],
    keywords: ["tooth", "toothache", "teeth", "cavity", "cavities", "gum", "gum disease", "dental", "dentist", "oral", "root canal", "dental abscess"],
  },
];
