export type ProviderCity = "Delhi" | "Gurgaon" | "Gurugram" | "Noida";

export type ProviderLocation = {
  city: ProviderCity;
  locality?: string;
  facility: string;
  primary?: boolean;
};

export type ProviderCandidate = {
  id: string;
  live?: boolean;
  manuallyVerified?: boolean;
  nmcRegistrationNumber?: string;
  name: string;
  specialties: string[];
  procedures?: readonly string[];
  locations: ProviderLocation[];
  otherNcrLocations: string[];
  hospital: string;
  summary?: string;
  sourceUrl: string;
  sourceChecked: string;
};

export const providerCandidates: ProviderCandidate[] = [
  {
    "id": "dr-naresh-trehan",
    "live": true,
    "name": "Dr. Naresh Trehan",
    "specialties": [
      "Cardiac surgery"
    ],
    "procedures": [
      "Coronary artery bypass",
      "Heart valve repair or replacement"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "locality": "Sector 38",
        "facility": "Medanta – The Medicity",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Medanta – The Medicity",
    "summary": "Cardiac surgeon with a practice focused on heart and cardiovascular surgery.",
    "sourceUrl": "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiac-surgery/doctor/dr-naresh-trehan",
    "sourceChecked": "2026-11-09"
  },
  {
    "id": "dr-praveen-chandra",
    "live": true,
    "name": "Dr. Praveen Chandra",
    "specialties": [
      "Cardiology"
    ],
    "procedures": [],
    "locations": [
      {
        "city": "Gurgaon",
        "locality": "Sector 38",
        "facility": "Medanta – The Medicity",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Medanta – The Medicity",
    "summary": "Interventional cardiologist whose published areas include coronary and structural heart procedures.",
    "sourceUrl": "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-praveen-chandra",
    "sourceChecked": "2026-11-09"
  },
  {
    "id": "dr-randeep-guleria",
    "live": true,
    "name": "Dr. Randeep Guleria",
    "specialties": [
      "Pulmonology",
      "Internal medicine"
    ],
    "procedures": [],
    "locations": [
      {
        "city": "Gurgaon",
        "locality": "Sector 38",
        "facility": "Medanta – The Medicity",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Medanta – The Medicity",
    "summary": "Respiratory and internal medicine specialist with a focus on lung and sleep-related conditions.",
    "sourceUrl": "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/internal-medicine/doctor/dr-randeep-guleria",
    "sourceChecked": "2026-11-09"
  },
  {
    "id": "dr-rajesh-puri",
    "live": true,
    "name": "Dr. Rajesh Puri",
    "specialties": [
      "Gastroenterology"
    ],
    "procedures": [],
    "locations": [
      {
        "city": "Gurgaon",
        "locality": "Sector 38",
        "facility": "Medanta – The Medicity",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Medanta – The Medicity",
    "summary": "Gastroenterologist whose published practice includes diagnostic and therapeutic endoscopy.",
    "sourceUrl": "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/digestive-and-hepatobiliary/doctor/dr-rajesh-puri",
    "sourceChecked": "2026-11-09"
  },
  {
    "id": "dr-ashok-kumar-vaid",
    "live": true,
    "name": "Dr. Ashok Kumar Vaid",
    "specialties": [
      "Medical oncology"
    ],
    "procedures": [],
    "locations": [
      {
        "city": "Gurgaon",
        "locality": "Sector 38",
        "facility": "Medanta – The Medicity",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Medanta – The Medicity",
    "summary": "Medical oncologist with published interests in cancer treatment, haematology and stem cell transplantation.",
    "sourceUrl": "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/oncology/doctor/dr-ashok-kumar-vaid",
    "sourceChecked": "2026-11-09"
  },
  {
    "id": "dr-aditya-gupta",
    "live": true,
    "name": "Dr. Aditya Gupta",
    "specialties": [
      "Neurosurgery"
    ],
    "procedures": [
      "Brain tumour surgery"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "locality": "Sector 51",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "summary": "Neurosurgeon whose hospital profile covers brain tumour surgery and CNS radiosurgery.",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/aditya-gupta",
    "sourceChecked": "2026-11-09"
  },
  {
    "id": "dr-i-p-s-oberoi",
    "live": true,
    "name": "Dr. I P S Oberoi",
    "specialties": [
      "Orthopaedics"
    ],
    "procedures": [
      "Knee replacement",
      "Hip replacement"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "locality": "Sector 51",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "summary": "Orthopaedic surgeon with published expertise in joint replacement and arthroscopy.",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/i-p-s-oberoi",
    "sourceChecked": "2026-11-09"
  },
  {
    "id": "dr-nidhi-rawal",
    "live": true,
    "name": "Dr. Nidhi Rawal",
    "specialties": [
      "Paediatric cardiology"
    ],
    "procedures": [],
    "locations": [
      {
        "city": "Gurgaon",
        "locality": "Sector 51",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "summary": "Paediatric cardiologist with a published focus on heart assessment and interventions for children.",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/nidhi-rawal",
    "sourceChecked": "2026-11-09"
  },
  {
    "id": "dr-giriraj-bora",
    "live": true,
    "name": "Dr. Giriraj Bora",
    "specialties": [
      "GI and HPB surgery",
      "Liver transplant"
    ],
    "procedures": [],
    "locations": [
      {
        "city": "Gurgaon",
        "locality": "Sector 51",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "summary": "Surgeon whose hospital profile covers liver transplantation and gastrointestinal and hepatobiliary surgery.",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/giriraj-bora",
    "sourceChecked": "2026-11-09"
  },
  {
    "id": "dr-anjali-kumar",
    "live": true,
    "name": "Dr. Anjali Kumar",
    "specialties": [
      "Gynaecology",
      "Obstetrics"
    ],
    "procedures": [
      "Hysterectomy",
      "Fibroid removal",
      "Ovarian cyst removal",
      "Endometriosis surgery"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "locality": "Mayfield Garden, Sector 51",
        "facility": "CK Birla Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "CK Birla Hospital",
    "summary": "Obstetrician and gynaecologist with published interests in pregnancy care and minimally invasive surgery.",
    "sourceUrl": "https://www.ckbhospital.com/dr-anjali-kumar-1",
    "sourceChecked": "2026-11-09"
  }
];

export const providerCities: ProviderCity[] = ["Delhi", "Gurgaon", "Noida"];

export const providerProfileCount = providerCandidates.filter((doctor) => doctor.live === true).length;
export const providerCityListLabel = providerCities.length < 2
  ? providerCities[0] ?? "no cities yet"
  : `${providerCities.slice(0, -1).join(", ")} and ${providerCities[providerCities.length - 1]}`;

export const providerSpecialties = Array.from(new Set(providerCandidates.flatMap((doctor) => doctor.specialties)))
  .sort((a, b) => a.localeCompare(b));
