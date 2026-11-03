export const specialties = [
  { slug: "general-medicine", name: "General medicine", plain: "Check-ups and general concerns", description: "A general physician can review several concerns together and help you plan a next step.", prep: "Write down what has changed, when it began, and the medicines you take." },
  { slug: "cardiology", name: "Cardiology", plain: "Heart and circulation", description: "Cardiologists focus on the heart and circulation. The clinic can tell you whether to start with a general physician or a heart specialist.", prep: "Bring relevant reports and a list of your medicines." },
  { slug: "dermatology", name: "Dermatology", plain: "Skin, hair and nails", description: "Dermatologists see people with concerns involving the skin, scalp, hair and nails.", prep: "Make a note of when changes started and any products or medicines you have used." },
  { slug: "dentistry", name: "Dentistry", plain: "Teeth and gums", description: "Dentists assess concerns involving the teeth, gums and mouth and discuss options for care.", prep: "Mention discomfort, sensitivity, or recent dental work when you call." },
  { slug: "orthopaedics", name: "Orthopaedics", plain: "Bones, joints and movement", description: "Orthopaedic specialists look after problems involving bones, joints and movement, including injuries.", prep: "Note which movements are difficult and bring any relevant scans or reports." },
  { slug: "paediatrics", name: "Paediatrics", plain: "Children’s health", description: "Paediatricians care for infants, children and adolescents.", prep: "Bring any records the clinic requests and write down questions about your child’s health." },
  { slug: "gynaecology", name: "Gynaecology", plain: "Periods and reproductive health", description: "Gynaecologists focus on reproductive health. Ask the clinic which services are available at your chosen location.", prep: "Bring past reports if you have them and note the questions you want to discuss." },
  { slug: "ophthalmology", name: "Ophthalmology", plain: "Eyes and vision", description: "Ophthalmologists assess eye health and discuss options for eye conditions.", prep: "Ask whether to bring your glasses, current prescriptions, or earlier test results." },
  { slug: "ent", name: "ENT", plain: "Ear, nose and throat", description: "ENT specialists assess concerns involving hearing, the nose, and the throat.", prep: "Write down what you are experiencing and how long it has been happening." },
  { slug: "mental-health", name: "Mental health", plain: "Mood, stress and wellbeing", description: "Mental health services may include psychiatrists and clinical psychologists. Ask the clinic which service is right for your first conversation.", prep: "Think about what you want help with and whether you prefer to ask about an in-person visit." },
] as const;

export const surgeryGroups = [
  { name: "General surgery", specialty: "General surgery", procedures: ["Hernia repair", "Gallbladder removal", "Appendix removal", "Piles surgery", "Anal fistula surgery", "Pilonidal sinus surgery"] },
  { name: "Bones and joints", specialty: "Orthopaedics", procedures: ["Knee replacement", "Hip replacement", "ACL reconstruction", "Meniscus repair", "Carpal tunnel release", "Fracture fixation"] },
  { name: "Eyes and vision", specialty: "Ophthalmology", procedures: ["Cataract surgery", "Glaucoma surgery", "Retinal detachment repair", "Corneal transplant"] },
  { name: "Ear, nose and throat", specialty: "ENT", procedures: ["Tonsil removal", "Adenoid removal", "Septoplasty", "Endoscopic sinus surgery", "Eardrum repair"] },
  { name: "Reproductive health", specialty: "Gynaecology", procedures: ["Hysterectomy", "Fibroid removal", "Ovarian cyst removal", "Endometriosis surgery"] },
  { name: "Urinary health", specialty: "Urology", procedures: ["Kidney stone removal", "Prostate surgery", "Hydrocele repair", "Varicocele repair"] },
  { name: "Heart and circulation", specialty: "Cardiac surgery", procedures: ["Coronary artery bypass", "Heart valve repair or replacement", "Pacemaker implantation"] },
  { name: "Blood vessels", specialty: "Vascular surgery", procedures: ["Varicose vein procedures", "Peripheral artery bypass"] },
  { name: "Brain and spine", specialty: "Neurosurgery", procedures: ["Spinal decompression", "Brain tumour surgery"] },
  { name: "Teeth and jaw", specialty: "Oral surgery", procedures: ["Wisdom tooth removal", "Jaw surgery", "Dental implant placement"] },
] as const;

export const procedures = surgeryGroups.flatMap(({ specialty, procedures }) =>
  Array.from(procedures, (name) => ({ name, specialty })));
