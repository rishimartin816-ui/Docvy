export const specialtyKey = (value: string) => value.trim().toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const definitions: [string, string, string[]][] = [
 ["physiotherapy","Physiotherapy",["Physical therapy"]], ["neuro-physiotherapy","Neuro physiotherapy",["Neurophysiotherapy"]],
 ["general-medicine","General medicine",["Internal Medicine","Internal Medicine (Evening Clinic)","General physician"]],
 ["cardiology","Cardiology",[]], ["dermatology","Dermatology",[]],
 ["orthopaedics","Orthopaedics",["Orthopedics","Orthopedic","Orthopedist","Orthopaedic Robotic Surgery"]],
 ["paediatrics","Paediatrics",["Pediatrics","Pediatrician","Paediatrician","Paediatric And Child Care"]],
 ["gynaecology","Gynaecology",["Gynecology","Gynecologist","Gynaecologist","Obstetrics and Gynaecology"]],
 ["ophthalmology","Ophthalmology",[]], ["ent","ENT",["Ear Nose Throat","Ear Nose and Throat"]],
 ["urology","Urology",[]], ["gastroenterology","Gastroenterology",["Gastrointestinal Science","Medical Gastro"]],
 ["dentistry","Dentistry",["Dental Medicine"]], ["mental-health","Psychiatry",["Mental health"]],
 ["oncology","Oncology",["Cancer Care/Oncology"]], ["neurology","Neurology",[]],
 ["endocrinology","Endocrinology",["Diabetes and Endocrinology","Diabetology"]],
 ["nephrology","Nephrology",["Renal Sciences"]], ["general-surgery","General surgery",[]],
 ["emergency-medicine","Emergency medicine",["Accident and Emergency Care"]],
 ["haematology","Haematology",["Hematology","Clinical Haematology"]],
 ["critical-care-medicine","Critical care medicine",["ICU and Critical Care","MICU"]],
 ["anaesthesiology","Anaesthesiology",["Anesthesiology"]], ["neonatology","Neonatology",["Neonatology & NICU"]],
 ["pain-medicine","Pain medicine",[]], ["medical-oncology","Medical oncology",[]],
 ["spine-care","Spine care",[]], ["neurosurgery","Neurosurgery",[]], ["geriatric-medicine","Geriatric medicine",[]],
 ["pulmonology","Pulmonology",["Pulmonary Medicine","Pulmonology (Respiratory and Sleep Medicine)","Respiratory medicine"]],
 ["cardiac-surgery","Cardiac surgery",[]],
 ["cardiothoracic-vascular-surgery","Cardiothoracic and vascular surgery",["Cardiothoracic Vascular Surgery"]],
 ["haemato-oncology","Haemato-oncology",["Hemato Oncology"]], ["radiology","Radiology",[]],
 ["laboratory-medicine","Laboratory medicine",[]], ["paediatric-orthopaedics","Paediatric orthopaedics",[]],
 ["minimal-access-surgery","Minimal access surgery",["Laparoscopic surgery"]],
 ["bariatric-surgery","Bariatric surgery",["Bariatric Surgery | Weight loss surgery"]],
 ["hepatobiliary-surgery","Hepatobiliary surgery",[]],
 ["gastrointestinal-surgery","Gastrointestinal surgery",["GI Surgery","Surgical Gastro"]],
 ["gi-hpb-surgery","Gastrointestinal and hepatobiliary surgery",["GI and HPB surgery"]],
 ["radiation-oncology","Radiation oncology",["Radiotherapy (Oncology Radiation)"]],
 ["oral-maxillofacial-surgery","Oral and maxillofacial surgery",["Oral Maxillo Facial Surgery","Oral surgery"]],
 ["paediatric-critical-care","Paediatric critical care",["Paediatric Intensive Care Unit"]],
 ["paediatric-surgery","Paediatric surgery",[]],
 ["plastic-surgery","Plastic surgery",["Plastic and Reconstructive Surgery","Plastic And Cosmetic Surgery"]],
 ["rheumatology","Rheumatology",[]], ["paediatric-neurology","Paediatric neurology",[]],
 ["surgical-oncology","Surgical oncology",[]], ["interventional-radiology","Interventional radiology",[]],
 ["fetal-medicine","Fetal medicine",[]], ["microbiology","Microbiology",[]],
 ["paediatric-immunology","Paediatric immunology",[]], ["paediatric-oncology","Paediatric oncology",["Paediatric Oncology and BMT"]], ["vascular-surgery","Vascular surgery",["Vascular and Endovascular Surgery"]],
 ["paediatric-endocrinology","Paediatric endocrinology",[]], ["andrology","Andrology",[]],
 ["clinical-genetics","Clinical genetics",["Genetics"]], ["nuclear-medicine","Nuclear medicine",[]],
 ["paediatric-cardiology","Paediatric cardiology",[]], ["paediatric-cardiac-surgery","Paediatric cardiac surgery",[]],
 ["hepatology","Hepatology",[]], ["cardiac-electrophysiology","Cardiac electrophysiology",[]],
 ["obstetrics","Obstetrics",[]], ["proctology","Proctology",[]], ["colorectal-surgery","Colorectal surgery",[]],
 ["transfusion-medicine","Transfusion medicine",[]],
 ["rehabilitation-medicine","Physical medicine and rehabilitation",["Physical Medicine and Rehabilitation"]],
 ["movement-disorders","Movement disorders",["Parkinson Disease and Movement Disorder"]],
 ["neurointervention","Neurointervention",["Neurointervention & Endovascular Surgery"]],
 ["podiatric-surgery","Podiatric surgery",[]], ["audiology","Audiology",[]],
 ["reproductive-medicine","Reproductive medicine",[]], ["infectious-diseases","Infectious diseases",["Infectious Disease"]],
 ["hand-upper-limb-surgery","Hand and upper limb surgery",["Hand and Upper Limb Surgery"]],
 ["gynaecological-oncology","Gynaecological oncology",["Gynaec Oncology"]],
 ["sports-medicine","Sports medicine",[]], ["paediatric-emergency-medicine","Paediatric emergency medicine",["Paediatrics Emergency"]],
];
export const specialtyRegistry = definitions.map(([slug,name,aliases]) => ({slug,name,aliases}));
const lookup = new Map(specialtyRegistry.flatMap(item => [item.slug,item.name,...item.aliases].map(value => [specialtyKey(value),item] as const)));
export function canonicalSpecialty(value: string) { return lookup.get(specialtyKey(value)); }
export const americanSpecialtyAliases: Record<string,string> = {
 orthopedics:"orthopaedics",orthopedic:"orthopaedics",orthopedist:"orthopaedics","orthopedic-doctor":"orthopaedics","orthopedic-surgeon":"orthopaedics",
 pediatrics:"paediatrics",pediatrician:"paediatrics",pediatricians:"paediatrics",
 gynecology:"gynaecology",gynecologist:"gynaecology",gynecologists:"gynaecology",
};
export function specialtyDoctorTitle(slug: string, name: string) {
 return ({orthopaedics:"Orthopedic doctors (orthopaedics)",paediatrics:"Pediatricians (paediatrics)",gynaecology:"Gynecologists (gynaecology)"} as Record<string,string>)[slug] ?? name + " doctors";
}
export function specialtyGuideTitle(slug: string, name: string) {
 return ({orthopaedics:"Orthopaedics: find an orthopedic doctor",paediatrics:"Paediatrics: find a pediatrician",gynaecology:"Gynaecology: find a gynecologist"} as Record<string,string>)[slug] ?? name;
}
