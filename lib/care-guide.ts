export type CareGuideEntry = {
  specialty: string;
  description: string;
  examples: string[];
  keywords: string[];
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
    examples: ["A new or unclear health concern", "Several ongoing conditions", "A first review before specialist care"],
    keywords: ["general doctor", "general physician", "internal medicine", "fever", "weakness", "check up", "checkup", "unclear", "not sure"],
    directorySpecialties: ["General physician", "Internal medicine"],
    directoryQuery: "general physician",
  },
  {
    specialty: "Cardiology",
    description: "Specialist care for conditions affecting the heart and circulation.",
    examples: ["Known heart condition follow-up", "Heart rhythm concerns", "High blood pressure review"],
    keywords: ["heart", "cardiology", "blood pressure", "bp", "palpitation", "rhythm", "circulation"],
    directorySpecialties: ["Cardiology", "Interventional cardiology", "Cardiac electrophysiology and pacemakers"],
    directoryQuery: "cardiology",
  },
  {
    specialty: "Dermatology",
    description: "Specialist care for skin, hair, and nail conditions.",
    examples: ["Acne", "Eczema or recurring rash", "Hair or nail concerns"],
    keywords: ["skin", "rash", "acne", "eczema", "hair", "nail", "dermatology", "dermatologist"],
  },
  {
    specialty: "Diabetology / endocrinology",
    description: "Care for diabetes and conditions involving hormones, thyroid, and metabolism.",
    examples: ["Diabetes care", "Thyroid conditions", "Hormone or metabolism concerns"],
    keywords: ["diabetes", "sugar", "thyroid", "hormone", "endocrine", "endocrinology", "diabetology", "metabolism"],
  },
  {
    specialty: "Gastroenterology",
    description: "Specialist care for the digestive system, including the stomach, intestines, and liver.",
    examples: ["Persistent digestive concerns", "Reflux or bowel conditions", "Liver-related follow-up"],
    keywords: ["stomach", "digestion", "digestive", "acidity", "reflux", "bowel", "intestine", "liver", "gastro", "gastroenterology"],
  },
  {
    specialty: "Neurology",
    description: "Specialist care for conditions affecting the brain, spinal cord, and nerves.",
    examples: ["Known seizure disorder", "Migraine or nerve-condition follow-up", "Movement or memory concerns"],
    keywords: ["brain", "nerve", "nerves", "seizure", "epilepsy", "migraine", "parkinson", "neurology", "neurologist", "memory"],
  },
  {
    specialty: "Orthopaedics",
    description: "Specialist care for bones, joints, muscles, and injuries affecting movement.",
    examples: ["Joint or bone concerns", "Back or knee pain review", "Injury follow-up"],
    keywords: ["bone", "joint", "back pain", "knee", "fracture", "injury", "orthopaedic", "orthopedic", "movement"],
    directorySpecialties: ["Orthopaedics", "Joint replacement"],
    directoryQuery: "orthopaedics",
  },
  {
    specialty: "Obstetrics and gynaecology",
    description: "Care related to pregnancy, menstrual health, and the reproductive system.",
    examples: ["Pregnancy care", "Menstrual health", "Reproductive health concerns"],
    keywords: ["pregnancy", "pregnant", "period", "menstrual", "women", "reproductive", "gynaecology", "gynecology", "obstetrics", "fertility"],
  },
  {
    specialty: "Paediatrics",
    description: "Medical care for babies, children, and adolescents.",
    examples: ["Child health review", "Growth and development questions", "Ongoing childhood conditions"],
    keywords: ["child", "children", "baby", "infant", "paediatric", "pediatric", "growth", "vaccination"],
  },
  {
    specialty: "Pulmonology / respiratory medicine",
    description: "Specialist care for lung and breathing conditions.",
    examples: ["Asthma follow-up", "COPD care", "Ongoing respiratory concerns"],
    keywords: ["lung", "breathing", "asthma", "copd", "respiratory", "pulmonology", "cough"],
  },
  {
    specialty: "Mental health",
    description: "A psychiatrist is a medical doctor; psychologists and counsellors provide other forms of mental health support.",
    examples: ["Anxiety or low mood support", "Psychiatric review", "Ongoing mental health care"],
    keywords: ["mental health", "anxiety", "depression", "mood", "psychiatry", "psychiatrist", "psychologist", "counselling", "counseling", "stress"],
  },
  {
    specialty: "Nephrology",
    description: "Specialist care for kidney conditions and kidney function.",
    examples: ["Known kidney condition", "Kidney function follow-up", "Specialist kidney care"],
    keywords: ["kidney", "renal", "nephrology", "nephrologist"],
  },
  {
    specialty: "Urology",
    description: "Specialist care for the urinary system and conditions involving the bladder or prostate.",
    examples: ["Bladder concerns", "Urinary symptoms", "Prostate-related care"],
    keywords: ["urinary", "urine", "bladder", "prostate", "urology", "urologist"],
    directorySpecialties: ["Urology", "Kidney transplant"],
    directoryQuery: "urology",
  },
  {
    specialty: "Ophthalmology",
    description: "Medical and surgical care for eye conditions and vision health.",
    examples: ["Eye condition review", "Vision changes", "Eye surgery consultation"],
    keywords: ["eye", "eyes", "vision", "ophthalmology", "ophthalmologist", "sight"],
  },
  {
    specialty: "ENT (ear, nose and throat)",
    description: "Specialist care for conditions affecting the ears, nose, throat, and related areas.",
    examples: ["Hearing concerns", "Recurring sinus problems", "Throat or voice concerns"],
    keywords: ["ear", "nose", "throat", "sinus", "hearing", "ent", "voice", "tonsil"],
  },
  {
    specialty: "Oncology",
    description: "Specialist care for cancer diagnosis, treatment planning, and follow-up.",
    examples: ["Cancer treatment consultation", "Second opinion", "Cancer follow-up care"],
    keywords: ["cancer", "tumour", "tumor", "oncology", "oncologist", "chemotherapy"],
  },
  {
    specialty: "Dentistry",
    description: "Dental professionals provide care for teeth, gums, and oral health.",
    examples: ["Tooth pain", "Gum concerns", "Routine dental care"],
    keywords: ["tooth", "teeth", "dental", "dentist", "gum", "oral"],
  },
];
