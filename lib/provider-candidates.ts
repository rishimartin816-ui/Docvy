export type ProviderCity = "Delhi" | "Gurugram" | "Noida";

export type ProviderLocation = {
  city: ProviderCity;
  locality?: string;
  facility: string;
  primary?: boolean;
};

export type ProviderCandidate = {
  id: string;
  name: string;
  specialties: string[];
  locations: ProviderLocation[];
  otherNcrLocations: string[];
  hospital: "Max Healthcare" | "Medanta" | "Fortis Healthcare";
  sourceUrl: string;
  sourceChecked: "2 Nov 2026";
};

/** Source-linked public hospital profiles; DOCVY has not independently verified credentials or availability. */
export const providerCandidates: ProviderCandidate[] = [
  {
    id: "balbir-singh", name: "Dr. Balbir Singh",
    specialties: ["Cardiology", "Interventional cardiology", "Cardiac electrophysiology and pacemakers"],
    locations: [{ city: "Delhi", locality: "Saket", facility: "Max Super Speciality Hospital, Saket", primary: true }],
    otherNcrLocations: [], hospital: "Max Healthcare", sourceUrl: "https://www.maxhealthcare.in/doctor/dr-balbir-singh", sourceChecked: "2 Nov 2026",
  },
  {
    id: "viveka-kumar", name: "Dr. Viveka Kumar",
    specialties: ["Cardiology", "Interventional cardiology", "Cardiac electrophysiology and pacemakers"],
    locations: [{ city: "Delhi", locality: "Saket", facility: "Max Super Speciality Hospital, Saket", primary: true }],
    otherNcrLocations: [], hospital: "Max Healthcare", sourceUrl: "https://www.maxhealthcare.in/doctor/dr-viveka-kumar", sourceChecked: "2 Nov 2026",
  },
  {
    id: "arvind-m-das", name: "Dr. Arvind M Das",
    specialties: ["Cardiology", "Interventional cardiology", "Cardiac electrophysiology and pacemakers"],
    locations: [
      { city: "Delhi", locality: "Saket", facility: "Max Super Speciality Hospital, Saket", primary: true },
      { city: "Gurugram", facility: "Max Hospital, Gurugram" },
    ],
    otherNcrLocations: ["Max Hospital, Gurugram (also listed as Gurgaon)"], hospital: "Max Healthcare", sourceUrl: "https://www.maxhealthcare.in/doctor/dr-arvind-m-das", sourceChecked: "2 Nov 2026",
  },
  {
    id: "anant-kumar", name: "Dr. Anant Kumar",
    specialties: ["Urology", "Kidney transplant", "Robotic surgery"],
    locations: [{ city: "Delhi", locality: "Saket", facility: "Max Super Speciality Hospital, Saket", primary: true }],
    otherNcrLocations: ["Max Hospital, Vaishali"], hospital: "Max Healthcare", sourceUrl: "https://www.maxhealthcare.in/doctor/dr-anant-kumar", sourceChecked: "2 Nov 2026",
  },
  {
    id: "praveen-chandra", name: "Dr. Praveen Chandra",
    specialties: ["Interventional cardiology"],
    locations: [
      { city: "Gurugram", locality: "Medicity", facility: "Medanta Gurugram", primary: true },
      { city: "Gurugram", locality: "Golf Course", facility: "Medanta Mediclinic, Golf Course" },
    ],
    otherNcrLocations: ["Medanta Mediclinic, Golf Course"], hospital: "Medanta", sourceUrl: "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-praveen-chandra", sourceChecked: "2 Nov 2026",
  },
  {
    id: "rajneesh-kapoor", name: "Dr. Rajneesh Kapoor",
    specialties: ["Interventional cardiology"],
    locations: [{ city: "Gurugram", locality: "Medicity", facility: "Medanta The Medicity, Gurugram", primary: true }],
    otherNcrLocations: [], hospital: "Medanta", sourceUrl: "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-rajneesh-kapoor", sourceChecked: "2 Nov 2026",
  },
  {
    id: "naresh-trehan", name: "Dr. Naresh Trehan",
    specialties: ["Cardiac surgery", "Cardiothoracic surgery"],
    locations: [
      { city: "Gurugram", facility: "Medanta Gurugram", primary: true },
      { city: "Delhi", locality: "Defence Colony", facility: "Medanta Mediclinic, Defence Colony" },
    ],
    otherNcrLocations: ["Medanta Mediclinic, Defence Colony"], hospital: "Medanta", sourceUrl: "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-naresh-trehan", sourceChecked: "2 Nov 2026",
  },
  {
    id: "anil-bhan", name: "Dr. Anil Bhan",
    specialties: ["Cardiac surgery", "Heart transplant"],
    locations: [{ city: "Gurugram", facility: "Medanta Gurugram", primary: true }],
    otherNcrLocations: [], hospital: "Medanta", sourceUrl: "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-anil-bhan", sourceChecked: "2 Nov 2026",
  },
  {
    id: "ajay-kaul", name: "Dr. Ajay Kaul",
    specialties: ["Cardiac sciences", "Cardiothoracic and vascular surgery", "Heart transplant", "Paediatric cardiothoracic and vascular surgery"],
    locations: [{ city: "Noida", facility: "Fortis Hospital, Noida", primary: true }],
    otherNcrLocations: [], hospital: "Fortis Healthcare", sourceUrl: "https://www.fortishealthcare.com/doctors/dr-ajay-kaul-6323", sourceChecked: "2 Nov 2026",
  },
  {
    id: "ajay-agarwal", name: "Dr. Ajay Agarwal",
    specialties: ["Internal medicine", "General physician"],
    locations: [{ city: "Noida", facility: "Fortis Hospital, Noida", primary: true }],
    otherNcrLocations: [], hospital: "Fortis Healthcare", sourceUrl: "https://www.fortishealthcare.com/doctors/dr-ajay-agarwal-2309", sourceChecked: "2 Nov 2026",
  },
  {
    id: "atul-mishra", name: "Dr. Atul Mishra",
    specialties: ["Orthopaedics", "Joint replacement"],
    locations: [{ city: "Noida", facility: "Fortis Hospital, Noida", primary: true }],
    otherNcrLocations: [], hospital: "Fortis Healthcare", sourceUrl: "https://www.fortishealthcare.com/doctors/dr-atul-mishra-309", sourceChecked: "2 Nov 2026",
  },
  {
    id: "vivek-vij", name: "Dr. Vivek Vij",
    specialties: ["Liver transplant", "Hepato-biliary sciences"],
    locations: [
      { city: "Noida", facility: "Fortis Hospital, Noida", primary: true },
      { city: "Delhi", locality: "Okhla", facility: "Fortis Okhla" },
      { city: "Gurugram", facility: "FMRI, Gurgaon" },
    ],
    otherNcrLocations: ["Fortis Okhla", "FMRI, Gurgaon"], hospital: "Fortis Healthcare", sourceUrl: "https://www.fortishealthcare.com/doctors/dr-vivek-vij-1016", sourceChecked: "2 Nov 2026",
  },
];

export const providerCities: ProviderCity[] = ["Delhi", "Gurugram", "Noida"];

export const providerSpecialties = Array.from(new Set(providerCandidates.flatMap((doctor) => doctor.specialties)))
  .sort((a, b) => a.localeCompare(b));
