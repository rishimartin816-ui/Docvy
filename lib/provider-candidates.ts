

export type ProviderCity = "Delhi" | "Gurgaon" | "Gurugram" | "Noida" | "Ghaziabad" | "Faridabad";

export type ProviderLocation = {
  city: ProviderCity;
  locality?: string;
  facility: string;
  primary?: boolean;
  address?: string;
  practicePhone?: string;
  mapsUrl?: string;
  mapsPlaceId?: string;
  mapsSourceUrl?: string;
  kind?: "clinic" | "hospital";
};

export type ProviderCandidate = {
  id: string;
  profileStatus: "unclaimed" | "claimed" | "verified";
  consentGiven: boolean;
  consentDate: string | null;
  consentMethod: "email" | "form" | null;
  registrationNumber: string | null;
  registrationCouncil: string | null;
  verifiedAt: string | null;
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
  qualifications?: string;
  publishedConsultingHours?: string;
  procedureSourceUrl?: string;
  photoUrl?: string | null;
  experienceLabel?: string;
  profileDetailsChecked?: string;
  sourceUrl: string;
  sourceChecked: string;
};


/** Source catalogue only. Public pages read the publication registry, never this snapshot. */
export const providerCandidates: ProviderCandidate[] = [
  {
    "id": "dr-naresh-trehan",
    "live": true,
    "name": "Dr. Naresh Trehan",
    "specialties": [
      "Cardiac surgery"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Medanta – The Medicity",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Medanta – The Medicity",
    "sourceUrl": "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiac-surgery/doctor/dr-naresh-trehan",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-praveen-chandra",
    "live": true,
    "name": "Dr. Praveen Chandra",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Medanta – The Medicity",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Medanta – The Medicity",
    "sourceUrl": "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/cardiology/doctor/dr-praveen-chandra",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-randeep-guleria",
    "live": true,
    "name": "Dr. Randeep Guleria",
    "specialties": [
      "Pulmonology",
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Medanta – The Medicity",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Medanta – The Medicity",
    "sourceUrl": "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/internal-medicine/doctor/dr-randeep-guleria",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rajesh-puri",
    "live": true,
    "name": "Dr. Rajesh Puri",
    "specialties": [
      "Gastroenterology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Medanta – The Medicity",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Medanta – The Medicity",
    "sourceUrl": "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/digestive-and-hepatobiliary/doctor/dr-rajesh-puri",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ashok-kumar-vaid",
    "live": true,
    "name": "Dr. Ashok Kumar Vaid",
    "specialties": [
      "Medical oncology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Medanta – The Medicity",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Medanta – The Medicity",
    "sourceUrl": "https://www.medanta.org/hospitals-near-me/gurugram-hospital/speciality/oncology/doctor/dr-ashok-kumar-vaid",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-aditya-gupta",
    "live": true,
    "name": "Dr. Aditya Gupta",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/aditya-gupta",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-i-p-s-oberoi",
    "live": true,
    "name": "Dr. I P S Oberoi",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/i-p-s-oberoi",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-nidhi-rawal",
    "live": true,
    "name": "Dr. Nidhi Rawal",
    "specialties": [
      "Paediatric cardiology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/nidhi-rawal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-giriraj-bora",
    "live": true,
    "name": "Dr. Giriraj Bora",
    "specialties": [
      "GI and HPB surgery",
      "Liver transplant"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/giriraj-bora",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anjali-kumar",
    "live": true,
    "name": "Dr. Anjali Kumar",
    "specialties": [
      "Gynaecology",
      "Obstetrics"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "CK Birla Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "CK Birla Hospital",
    "sourceUrl": "https://www.ckbhospital.com/dr-anjali-kumar-1",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-pradeep-chowbey-delhi",
    "live": true,
    "name": "Dr. Pradeep Chowbey",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery",
      "Bariatric surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-pradeep-chowbey",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-randeep-wadhawan-delhi",
    "live": true,
    "name": "Dr. Randeep Wadhawan",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery",
      "Bariatric surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Dwarka",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-randeep-wadhawan",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rajesh-khullar-delhi",
    "live": true,
    "name": "Dr. Rajesh Khullar",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery",
      "Bariatric surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-rajesh-khullar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-prof-atul-n-c-peters-delhi",
    "live": true,
    "name": "Dr (Prof) Atul N.C. Peters",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery",
      "Bariatric surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Smart Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Smart Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-prof-atul-n-c-peters",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anil-sharma-delhi",
    "live": true,
    "name": "Dr. Anil Sharma",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery",
      "Bariatric surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-anil-sharma",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vandana-soni-delhi",
    "live": true,
    "name": "Dr. Vandana Soni",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery",
      "Bariatric surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-vandana-soni",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-manish-baijal-delhi",
    "live": true,
    "name": "Dr. Manish Baijal",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery",
      "Bariatric surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-manish-baijal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-bachan-singh-barthwal-delhi",
    "live": true,
    "name": "Dr. Bachan Singh Barthwal",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Patparganj",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Patparganj",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-bachan-singh-barthwal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-harmeet-singh-kapoor-delhi",
    "live": true,
    "name": "Dr. Harmeet Singh Kapoor",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "BLK-Max Super Speciality Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "BLK-Max Super Speciality Hospital",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-harmeet-singh-kapoor",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rajan-madan-delhi",
    "live": true,
    "name": "Dr. Rajan Madan",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "BLK-Max Super Speciality Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "BLK-Max Super Speciality Hospital",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-rajan-madan",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ajay-agarwal-noida",
    "live": true,
    "name": "Dr. Ajay Agarwal",
    "specialties": [
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Fortis Hospital, Noida",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Fortis Hospital, Noida",
    "sourceUrl": "https://www.fortishealthcare.com/doctors/dr-ajay-agarwal-2309",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ajay-kaul-noida",
    "live": true,
    "name": "Dr. Ajay Kaul",
    "specialties": [
      "Cardiac surgery"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Fortis Hospital, Noida",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Fortis Hospital, Noida",
    "sourceUrl": "https://www.fortishealthcare.com/doctors/dr-ajay-kaul-6323",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-atul-mishra-noida",
    "live": true,
    "name": "Dr. Atul Mishra",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Fortis Hospital, Noida",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Fortis Hospital, Noida",
    "sourceUrl": "https://www.fortishealthcare.com/doctors/dr-atul-mishra-309",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vivek-vij-noida",
    "live": true,
    "name": "Dr. Vivek Vij",
    "specialties": [
      "Liver transplant",
      "GI and HPB surgery"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Fortis Hospital, Noida",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Fortis Hospital, Noida",
    "sourceUrl": "https://www.fortishealthcare.com/doctors/dr-vivek-vij-1016",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rahul-gupta-noida",
    "live": true,
    "name": "Dr. Rahul Gupta",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Fortis Hospital, Noida",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Fortis Hospital, Noida",
    "sourceUrl": "https://www.fortishealthcare.com/doctors/dr-rahul-gupta-neurosurgery-2127",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sanjeev-gera-noida",
    "live": true,
    "name": "Dr. Sanjeev Gera",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Fortis Hospital, Noida",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Fortis Hospital, Noida",
    "sourceUrl": "https://www.fortishealthcare.com/doctors/dr-sanjeev-gera-6572",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anita-malik-noida",
    "live": true,
    "name": "Dr. Anita Malik",
    "specialties": [
      "Radiation oncology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Fortis Hospital, Noida",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Fortis Hospital, Noida",
    "sourceUrl": "https://www.fortishealthcare.com/doctors/dr-anita-malik-oncology-11173",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anjana-singh-noida",
    "live": true,
    "name": "Dr. Anjana Singh",
    "specialties": [
      "Gynaecology",
      "Obstetrics"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Fortis Hospital, Noida",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Fortis Hospital, Noida",
    "sourceUrl": "https://www.fortishealthcare.com/doctors/dr-anjana-singh-2222",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-nitin-jha-noida",
    "live": true,
    "name": "Dr. Nitin Jha",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery",
      "Colorectal surgery"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Fortis Hospital, Noida",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Fortis Hospital, Noida",
    "sourceUrl": "https://www.fortishealthcare.com/doctors/dr-nitin-jha-1099",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-v-s-chauhan-noida",
    "live": true,
    "name": "Dr. V S Chauhan",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Fortis Hospital, Noida",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Fortis Hospital, Noida",
    "sourceUrl": "https://www.fortishealthcare.com/doctors/dr-v-s-chauhan-7635",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ajay-panwar-ghaziabad",
    "live": true,
    "name": "Dr. Ajay Panwar",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/ajay-panwar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-brig-chetan-sood-ghaziabad",
    "live": true,
    "name": "Dr. (Brig.) Chetan Sood",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Chetan-Sood",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vipin-tyagi-ghaziabad",
    "live": true,
    "name": "Dr. Vipin Tyagi",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/dr-vipin-tyagi",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-alok-sehgal-ghaziabad",
    "live": true,
    "name": "Dr. Alok Sehgal",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/alok-sehgal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-kapil-minocha-ghaziabad",
    "live": true,
    "name": "Dr. Kapil Minocha",
    "specialties": [
      "Cardiac surgery",
      "Vascular surgery"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Kapil-Minocha",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-manish-mittal-ghaziabad",
    "live": true,
    "name": "Dr. Manish Mittal",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/dr-manish-mittal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-tek-chand-yadav-ghaziabad",
    "live": true,
    "name": "Dr. Tek Chand Yadav",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Tek-Chand-Yadav",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rahul-kakran-ghaziabad",
    "live": true,
    "name": "Dr. Rahul Kakran",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/rahul-kakran",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-wg-cdr-s-s-dagur-ghaziabad",
    "live": true,
    "name": "Dr. (Wg Cdr.) S.S. Dagur",
    "specialties": [
      "General surgery"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/ss-dagur",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-arun-kumar-singh-ghaziabad",
    "live": true,
    "name": "Dr. Arun Kumar Singh",
    "specialties": [
      "General surgery",
      "GI and HPB surgery",
      "Laparoscopic surgery"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/arun-kumar-singh",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-nitin-kumar-gupta-faridabad",
    "live": true,
    "name": "Dr. Nitin Kumar Gupta",
    "specialties": [
      "Cardiac surgery",
      "Vascular surgery"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-nitin-kumar-gupta/",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ashok-kr-dhar-faridabad",
    "live": true,
    "name": "Dr. Ashok Kr. Dhar",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-ashok-kr-dhar/",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-midur-kumar-sharma-faridabad",
    "live": true,
    "name": "Dr. Midur Kumar Sharma",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery",
      "Bariatric surgery"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-midur-kumar-sharma/",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vijender-gupta-faridabad",
    "live": true,
    "name": "Dr. Vijender Gupta",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery",
      "Bariatric surgery"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-vijender-gupta-best-laparoscopic-surgeon-in-faridabad/",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-arun-pandey-faridabad",
    "live": true,
    "name": "Dr. Arun Pandey",
    "specialties": [
      "Surgical oncology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-arun-pandey/",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-niti-chadha-negi-faridabad",
    "live": true,
    "name": "Dr. Niti Chadha Negi",
    "specialties": [
      "Cardiology",
      "Cardiac electrophysiology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-niti-chadha-negi/",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-kaveshwar-ghura-faridabad",
    "live": true,
    "name": "Dr. Kaveshwar Ghura",
    "specialties": [
      "Plastic surgery"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-kaveshwar-ghura/",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ankit-gupta-faridabad",
    "live": true,
    "name": "Dr. Ankit Gupta",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-ankit-gupta/",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-himanshu-arora-faridabad",
    "live": true,
    "name": "Dr. Himanshu Arora",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-himanshu-arora-best-spine-surgeon-in-faridabad/",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-kinjal-banerjee-faridabad",
    "live": true,
    "name": "Dr. Kinjal Banerjee",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-kinjal-banerjee/",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-mir-asif-rehman-gurgaon",
    "live": true,
    "name": "Dr. Mir Asif Rehman",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery",
      "Proctology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Mirascare Multispeciality Clinic",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Mirascare Multispeciality Clinic",
    "sourceUrl": "https://www.mirascare.com/dr-mir-asif-rehman",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-a-b-dey-gurgaon",
    "live": true,
    "name": "Dr. A.B. Dey",
    "specialties": [
      "Geriatric medicine"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-a-b-dey",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-aanchal-sablok-gurgaon",
    "live": true,
    "name": "Dr. Aanchal Sablok",
    "specialties": [
      "Fetal medicine"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-aanchal-sablok",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-abhinandan-mukhopadhyay-gurgaon",
    "live": true,
    "name": "Dr. Abhinandan Mukhopadhyay",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-abhinandan-mukhopadhyay",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ajit-singh-baghela-gurgaon",
    "live": true,
    "name": "Dr. Ajit Singh Baghela",
    "specialties": [
      "Paediatric neurology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/ajit-singh-baghela",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-amit-kumar-chaurasia-gurgaon",
    "live": true,
    "name": "Dr. Amit Kumar Chaurasia",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/amit-kumar-chaurasia",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anjana-satyajit-gurgaon",
    "live": true,
    "name": "Dr. Anjana Satyajit",
    "specialties": [
      "Dentistry"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/anjana-satyajit",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ankit-goel-gurgaon",
    "live": true,
    "name": "Dr. Ankit Goel",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-ankit-goyal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ankur-bhatia-gurgaon",
    "live": true,
    "name": "Dr. Ankur Bhatia",
    "specialties": [
      "Plastic surgery"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-ankur-bhatia",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anuradha-khurana-gurgaon",
    "live": true,
    "name": "Dr. Anuradha Khurana",
    "specialties": [
      "Gynaecology",
      "Obstetrics"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-anuradha-khurana",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anuvrat-sinha-gurgaon",
    "live": true,
    "name": "Dr. Anuvrat Sinha",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-anuvrat-sinha",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-arpit-jain-gurgaon",
    "live": true,
    "name": "Dr. Arpit Jain",
    "specialties": [
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/arpit-jain",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-arun-singh-danewa-gurgaon",
    "live": true,
    "name": "Dr. Arun Singh Danewa",
    "specialties": [
      "Paediatrics",
      "Oncology",
      "Haematology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-arun-singh-danewa",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-aseem-r-srivastava-gurgaon",
    "live": true,
    "name": "Dr. Aseem R. Srivastava",
    "specialties": [
      "Paediatric cardiac surgery"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/aseem-r-srivastava",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-asgar-ali-gurgaon",
    "live": true,
    "name": "Dr. Asgar Ali",
    "specialties": [
      "Orthopaedics",
      "Paediatrics"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-asgar-ali",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ashish-baweja-gurgaon",
    "live": true,
    "name": "Dr. Ashish Baweja",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-ashish-baweja",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ashu-kumar-jain-gurgaon",
    "live": true,
    "name": "Dr. Ashu Kumar Jain",
    "specialties": [
      "Pain medicine"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/ashu-kumar-jain",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ashutosh-gupta-gurgaon",
    "live": true,
    "name": "Dr. Ashutosh Gupta",
    "specialties": [
      "Fetal medicine",
      "Clinical genetics"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/ashutosh-gupta",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ashwani-kumar-gurgaon",
    "live": true,
    "name": "Dr. Ashwani Kumar",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-ashwani-kumar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-atul-sharma-gurgaon",
    "live": true,
    "name": "Dr. Atul Sharma",
    "specialties": [
      "Gastroenterology",
      "Hepatology",
      "Liver transplant"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-atul-sharma",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-col-balbir-kalra-gurgaon",
    "live": true,
    "name": "Dr. (Col) Balbir Kalra",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/balbir-kalra",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-bimal-kumar-sahu-gurgaon",
    "live": true,
    "name": "Dr. Bimal Kumar Sahu",
    "specialties": [
      "Gastroenterology",
      "Hepatology",
      "Liver transplant"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-bimal-kumar-sahu",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-biswarup-purkayastha-gurgaon",
    "live": true,
    "name": "Dr. Biswarup Purkayastha",
    "specialties": [
      "Cardiac surgery",
      "Vascular surgery"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-biswarup-purkayastha",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-d-k-jhamb-gurgaon",
    "live": true,
    "name": "Dr. D.K. Jhamb",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-d-k-jhamb",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-deepak-jha-gurgaon",
    "live": true,
    "name": "Dr. Deepak Jha",
    "specialties": [
      "Oncology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/deepak-jha",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-deepika-aggarwal-gurgaon",
    "live": true,
    "name": "Dr. Deepika Aggarwal",
    "specialties": [
      "Gynaecology",
      "Obstetrics"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-deepika-aggarwal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-devendra-singh-solanki-gurgaon",
    "live": true,
    "name": "Dr. Devendra Singh Solanki",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/devendra-singh-solanki",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-devendra-yadav-gurgaon",
    "live": true,
    "name": "Dr. Devendra Yadav",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/devendra-yadav",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-dheeraj-batheja-gurgaon",
    "live": true,
    "name": "Dr. Dheeraj Batheja",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dr-dheeraj-batheja",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-dheeraj-kapoor-gurgaon",
    "live": true,
    "name": "Dr. Dheeraj Kapoor",
    "specialties": [
      "Endocrinology",
      "Diabetology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Artemis Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Artemis Hospitals",
    "sourceUrl": "https://www.artemishospitals.com/doctor/profile/dheeraj-kapoor",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sandeep-budhiraja-delhi",
    "live": true,
    "name": "Dr. Sandeep Budhiraja",
    "specialties": [
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-sandeep-budhiraja",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-dinesh-khullar-delhi",
    "live": true,
    "name": "Dr. Dinesh Khullar",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-dinesh-khullar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ambrish-mithal-delhi",
    "live": true,
    "name": "Dr. Ambrish Mithal",
    "specialties": [
      "Endocrinology",
      "Diabetology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-ambrish-mithal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-balbir-singh-delhi",
    "live": true,
    "name": "Dr. Balbir Singh",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-balbir-singh",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anupam-bhargava-delhi",
    "live": true,
    "name": "Dr. Anupam Bhargava",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Smart Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Smart Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-anupam-bhargava",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sujoy-bhattacharjee-delhi",
    "live": true,
    "name": "Dr Sujoy Bhattacharjee",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-sujoy-bhattacharjee",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sunil-choudhary-delhi",
    "live": true,
    "name": "Dr. Sunil Choudhary",
    "specialties": [
      "Plastic surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-sunil-choudhary",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-kulbhushan-singh-dagar-delhi",
    "live": true,
    "name": "Dr. Kulbhushan Singh Dagar",
    "specialties": [
      "Paediatric cardiac surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-kulbhushan-singh-dagar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-prof-svs-deo-delhi",
    "live": true,
    "name": "Dr (Prof) SVS Deo",
    "specialties": [
      "Surgical oncology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Smart Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Smart Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-svs-deo",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anurag-krishna-delhi",
    "live": true,
    "name": "Dr. Anurag Krishna",
    "specialties": [
      "Urology",
      "Paediatric surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Smart Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Smart Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-anurag-krishna",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-viveka-kumar-delhi",
    "live": true,
    "name": "Dr. Viveka Kumar",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-viveka-kumar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anant-kumar-delhi",
    "live": true,
    "name": "Dr. Anant Kumar",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-anant-kumar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ramneek-mahajan-delhi",
    "live": true,
    "name": "Dr. Ramneek Mahajan",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-ramneek-mahajan",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rajneesh-malhotra-delhi",
    "live": true,
    "name": "Dr. Rajneesh Malhotra",
    "specialties": [
      "Cardiac surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-rajneesh-malhotra",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ganesh-kumar-mani-delhi",
    "live": true,
    "name": "Dr. Ganesh Kumar Mani",
    "specialties": [
      "Cardiac surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-ganesh-kumar-mani",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-col-joy-dev-mukherji-delhi",
    "live": true,
    "name": "Dr. (Col) Joy Dev Mukherji",
    "specialties": [
      "Neurology",
      "Urology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-col-joy-dev-mukherji",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sanjay-sachdeva-delhi",
    "live": true,
    "name": "Dr. Sanjay Sachdeva",
    "specialties": [
      "ENT"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-sanjay-sachdeva",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sameer-shrivastava-delhi",
    "live": true,
    "name": "Dr. Sameer Shrivastava",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-sameer-shrivastava",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vikas-singla-delhi",
    "live": true,
    "name": "Dr. Vikas Singla",
    "specialties": [
      "Gastroenterology",
      "Hepatology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-vikas-singla",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-puneet-agarwal-delhi",
    "live": true,
    "name": "Dr. Puneet Agarwal",
    "specialties": [
      "Neurology",
      "Urology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-puneet-agarwal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rajiv-agarwal-delhi",
    "live": true,
    "name": "Dr. Rajiv Agarwal",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-rajiv-agarwal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rayaz-ahmed-delhi",
    "live": true,
    "name": "Dr. Rayaz Ahmed",
    "specialties": [
      "Oncology",
      "Haematology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Smart Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Smart Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-rayaz-ahmed",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-devavrat-arya-delhi",
    "live": true,
    "name": "Dr. Devavrat Arya",
    "specialties": [
      "Clinical genetics",
      "Urology",
      "Gastroenterology",
      "Gynaecology",
      "General surgery",
      "Laparoscopic surgery",
      "Medical oncology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-devavrat-arya",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sandeep-batra-delhi",
    "live": true,
    "name": "Dr. Sandeep Batra",
    "specialties": [
      "Clinical genetics",
      "Urology",
      "Gastroenterology",
      "Gynaecology",
      "Medical oncology",
      "Haematology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-sandeep-batra",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-mano-bhadauria-delhi",
    "live": true,
    "name": "Dr Mano Bhadauria",
    "specialties": [
      "Radiation oncology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-mano-bhadauria",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-arvind-m-das-delhi",
    "live": true,
    "name": "Dr. Arvind M Das",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-arvind-m-das",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-p-k-das-delhi",
    "live": true,
    "name": "Dr P K Das",
    "specialties": [
      "Medical oncology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Smart Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Smart Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-p-k-das",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-charu-garg-delhi",
    "live": true,
    "name": "Dr. Charu Garg",
    "specialties": [
      "Urology",
      "Gastroenterology",
      "Gynaecology",
      "Paediatrics",
      "Radiation oncology",
      "Medical oncology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-charu-garg",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ripen-gupta-delhi",
    "live": true,
    "name": "Dr. Ripen Gupta",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Smart Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Smart Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-ripen-gupta",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-pramod-kumar-julka-delhi",
    "live": true,
    "name": "Dr. Pramod Kumar Julka",
    "specialties": [
      "Urology",
      "Gynaecology",
      "Paediatrics",
      "Medical oncology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Max Smart Super Speciality Hospital, Saket",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Max Smart Super Speciality Hospital, Saket",
    "sourceUrl": "https://www.maxhealthcare.in/doctor/dr-pramod-kumar-julka",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-d-k-gupta-noida",
    "live": true,
    "name": "Dr. D.K Gupta",
    "specialties": [
      "Paediatrics",
      "Neonatology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-dk-gupta",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rashmi-gupta-noida",
    "live": true,
    "name": "Dr. Rashmi Gupta",
    "specialties": [
      "Paediatrics",
      "Neonatology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-rashmi-gupta",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rahul-arora-noida",
    "live": true,
    "name": "Dr. Rahul Arora",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-rahul-arora",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-aditi-narad-noida",
    "live": true,
    "name": "Dr. Aditi Narad",
    "specialties": [
      "Dentistry"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-aditi-narad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-arvinder-pal-singh-noida",
    "live": true,
    "name": "Dr. Arvinder Pal Singh",
    "specialties": [
      "ENT"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-arvinder-pal-singh",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ritesh-agarwal-noida",
    "live": true,
    "name": "Dr. Ritesh Agarwal",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-ritesh-agarwal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sumit-sharma-noida",
    "live": true,
    "name": "Dr. Sumit Sharma",
    "specialties": [
      "Neurology",
      "Urology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-sumit-sharma",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-charu-yadav-noida",
    "live": true,
    "name": "Dr. Charu Yadav",
    "specialties": [
      "Gynaecology",
      "Obstetrics"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-charu-yadav",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-keshav-goel-noida",
    "live": true,
    "name": "Dr. Keshav Goel",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-keshav-goel",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-piyush-kumar-singh-noida",
    "live": true,
    "name": "Dr. Piyush Kumar Singh",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-piyush-kumar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-niraj-kumar-noida",
    "live": true,
    "name": "Dr. Niraj Kumar",
    "specialties": [
      "Paediatrics",
      "Neonatology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-niraj-kumar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-prabhat-kumar-noida",
    "live": true,
    "name": "Dr. Prabhat Kumar",
    "specialties": [
      "Paediatrics",
      "Neonatology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-prabhat-kumar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ashima-ranjan-noida",
    "live": true,
    "name": "Dr. Ashima Ranjan",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-ashima-ranjan",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-priyadarshi-jitendra-kumar-noida",
    "live": true,
    "name": "Dr. Priyadarshi Jitendra Kumar",
    "specialties": [
      "Pulmonology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-priyadarshi-jitendra-kumar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-kiran-seth-noida",
    "live": true,
    "name": "Dr. Kiran Seth",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-kiran-seth",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vimal-gupta-noida",
    "live": true,
    "name": "Dr. Vimal Gupta",
    "specialties": [
      "Endocrinology",
      "Diabetology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-vimal-gupta",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-shweta-garg-noida",
    "live": true,
    "name": "Dr. Shweta Garg",
    "specialties": [
      "Pain medicine"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-shweta-garg",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anshumala-sinha-noida",
    "live": true,
    "name": "Dr. Anshumala Sinha",
    "specialties": [
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-anshumala-sinha",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-mohmad-uzair-zakai-noida",
    "live": true,
    "name": "Dr. Mohmad Uzair Zakai",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-mohmad-uzair-zakai",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ravi-sharma-noida",
    "live": true,
    "name": "Dr. Ravi Sharma",
    "specialties": [
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-ravi-sharma",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sonia-kuruvilla-noida",
    "live": true,
    "name": "Dr. Sonia Kuruvilla",
    "specialties": [
      "Gynaecology",
      "Obstetrics"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-sonia-kuruvilla",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "col-dr-jaideep-gambhir-noida",
    "live": true,
    "name": "Col (Dr) Jaideep Gambhir",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-jaideep-gambhir",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-bhanwar-lal-barkesiya-noida",
    "live": true,
    "name": "Dr. Bhanwar Lal Barkesiya",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-bhanwar-lal-barkesiya",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-shinja-dixit-noida",
    "live": true,
    "name": "Dr. Shinja Dixit",
    "specialties": [
      "Dentistry"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-shinja-dixit",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-aditi-sharma-noida",
    "live": true,
    "name": "Dr. Aditi Sharma",
    "specialties": [
      "Dentistry"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-aditi-sharma",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-tarun-gupta-noida",
    "live": true,
    "name": "Dr. Tarun Gupta",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-tarun-gupta",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-udit-gupta-noida",
    "live": true,
    "name": "Dr. Udit Gupta",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-udit-gupta",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-navin-kumar-narayan-jha-noida",
    "live": true,
    "name": "Dr. Navin Kumar Narayan Jha",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-navin-jha",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-abhijit-kotabagi-noida",
    "live": true,
    "name": "Dr. Abhijit Kotabagi",
    "specialties": [
      "Oncology"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-Abhijit-Kotabagi",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-maya-singh-noida",
    "live": true,
    "name": "Dr. Maya Singh",
    "specialties": [
      "ENT"
    ],
    "locations": [
      {
        "city": "Noida",
        "facility": "Felix Hospital",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Felix Hospital",
    "sourceUrl": "https://www.felixhospital.com/doctor/dr-maya-singh",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ankita-goel-ghaziabad",
    "live": true,
    "name": "Dr. Ankita Goel",
    "specialties": [
      "Gastroenterology",
      "Hepatology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Ankita-Goel",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-bhavjit-singh-ghaziabad",
    "live": true,
    "name": "Dr. Bhavjit Singh",
    "specialties": [
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Bhavjit-Singh",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-chaitanya-reddy-kanumuru-ghaziabad",
    "live": true,
    "name": "Dr. Chaitanya Reddy Kanumuru",
    "specialties": [
      "Vascular surgery"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Chaitanya-Reddy-Kanumuru",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-himanshu-shakya-ghaziabad",
    "live": true,
    "name": "Dr. Himanshu Shakya",
    "specialties": [
      "Neurology",
      "Urology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Himanshu-Shakya",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-jivitesh-satija-ghaziabad",
    "live": true,
    "name": "Dr. Jivitesh Satija",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Jivitesh-Satija",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-lt-col-smita-s-mansingh-ghaziabad",
    "live": true,
    "name": "Dr. Lt Col Smita S. Mansingh",
    "specialties": [
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Smita-Mansingh",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-megha-saxena-ghaziabad",
    "live": true,
    "name": "Dr. Megha Saxena",
    "specialties": [
      "Surgical oncology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Megha-Saxena",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-shailendra-kumar-ghaziabad",
    "live": true,
    "name": "Dr. Shailendra Kumar",
    "specialties": [
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Shailendra-Kumar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-shobhit-pachauri-ghaziabad",
    "live": true,
    "name": "Dr. Shobhit Pachauri",
    "specialties": [
      "Dentistry"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Shobhit-Pachauri",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-siddharth-badola-ghaziabad",
    "live": true,
    "name": "Dr. Siddharth Badola",
    "specialties": [
      "Gastroenterology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Siddharth-Badola",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vishal-singh-chauhan-ghaziabad",
    "live": true,
    "name": "Dr. Vishal Singh Chauhan",
    "specialties": [
      "Gastroenterology",
      "Hepatology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Vishal-Singh-Chauhan",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-col-mohammed-alam-parwaz-ghaziabad",
    "live": true,
    "name": "Dr. (Col.) Mohammed Alam Parwaz",
    "specialties": [
      "Plastic surgery"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/col-mohammed-alam-parwaz",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vikas-kumar-bansal-ghaziabad",
    "live": true,
    "name": "Dr. Vikas Kumar Bansal",
    "specialties": [
      "Urology",
      "Oncology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/vikas-kumar-bansal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rekha-arya-ghaziabad",
    "live": true,
    "name": "Dr. Rekha Arya",
    "specialties": [
      "Radiation oncology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/dr-rekha-arya",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-surg-lt-cdr-anushree-vartak-ghaziabad",
    "live": true,
    "name": "Dr. (Surg Lt Cdr) Anushree Vartak",
    "specialties": [
      "Surgical oncology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/anushree-vartak",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-divya-prakash-ghaziabad",
    "live": true,
    "name": "Dr. Divya Prakash",
    "specialties": [
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Divya-Prakash",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sushil-fotedar-ghaziabad",
    "live": true,
    "name": "Dr. Sushil Fotedar",
    "specialties": [
      "General surgery",
      "Laparoscopic surgery"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/sushil-fotedar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-pradeep-prakash-ghaziabad",
    "live": true,
    "name": "Dr. Pradeep Prakash",
    "specialties": [
      "Urology",
      "Oncology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/pradeep-prakash",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-brig-arvind-kumar-tyagi-ghaziabad",
    "live": true,
    "name": "Dr. (Brig.) Arvind Kumar Tyagi",
    "specialties": [
      "Surgical oncology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/brig-arvind-kumar-tyagi",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-manish-c-kak-ghaziabad",
    "live": true,
    "name": "Dr. Manish C Kak",
    "specialties": [
      "Gastroenterology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital, Sanjay Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital, Sanjay Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/manish-c-kak",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-jalaj-dixit-ghaziabad",
    "live": true,
    "name": "Dr. Jalaj Dixit",
    "specialties": [
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/jalaj-dixit",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-nripen-vishnoi-ghaziabad",
    "live": true,
    "name": "Dr. Nripen Vishnoi",
    "specialties": [
      "ENT"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/nripen-vishnoi",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-mayank-goyal-ghaziabad",
    "live": true,
    "name": "Dr. Mayank Goyal",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Mayank-Goyal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-anuj-jain-ghaziabad",
    "live": true,
    "name": "Dr. Anuj Jain",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Anuj-Jain",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-lt-col-abhishek-mahato-ghaziabad",
    "live": true,
    "name": "Dr. (Lt Col) Abhishek Mahato",
    "specialties": [
      "Nuclear medicine"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Abhishek-Mahato",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-manish-kumar-sharma-ghaziabad",
    "live": true,
    "name": "Dr. Manish Kumar Sharma",
    "specialties": [
      "Medical oncology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Manish-Kumar-Sharma",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-lt-col-ravi-roy-ghaziabad",
    "live": true,
    "name": "Dr. (Lt. Col.) Ravi Roy",
    "specialties": [
      "ENT"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/ravi-roy",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-c-deva-rahul-ghaziabad",
    "live": true,
    "name": "Dr. C. Deva Rahul",
    "specialties": [
      "Pulmonology",
      "Critical care medicine"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-C-Deva-Rahul",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-divyansh-singh-ghaziabad",
    "live": true,
    "name": "Dr. Divyansh Singh",
    "specialties": [
      "Anaesthesiology",
      "Pain medicine"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Divyansh-Singh",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-k-naveen-kumar-ghaziabad",
    "live": true,
    "name": "Dr. K. Naveen Kumar",
    "specialties": [
      "Vascular surgery",
      "Radiology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Yashoda Hospital & Research Centre, Nehru Nagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospital & Research Centre, Nehru Nagar",
    "sourceUrl": "https://www.yashodahealthcare.com/doctor/Dr-Naveen-Kumar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-prof-purshotam-lal-faridabad",
    "live": true,
    "name": "Dr. (Prof.) Purshotam Lal",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-purshotam-lal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-deepak-talwar-faridabad",
    "live": true,
    "name": "Dr. Deepak Talwar",
    "specialties": [
      "Pulmonology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-deepak-talwar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-neeraj-jain-faridabad",
    "live": true,
    "name": "Dr. Neeraj Jain",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-neeraj-jain",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sumant-gupta-faridabad",
    "live": true,
    "name": "Dr. Sumant Gupta",
    "specialties": [
      "Oncology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-sumant-gupta-best-oncologist-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-praveen-kumar-bansal-faridabad",
    "live": true,
    "name": "Dr. Praveen Kumar Bansal",
    "specialties": [
      "Oncology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-praveen-kumar-bansal-medical-oncologist",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sumit-bansal-faridabad",
    "live": true,
    "name": "Dr. Sumit Bansal",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-sumit-bansal-best-urologist-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vikash-kumar-faridabad",
    "live": true,
    "name": "Dr. Vikash Kumar",
    "specialties": [
      "Radiation oncology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-vikash-kumar-best-radiation-oncologist-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-puneet-nagpal-faridabad",
    "live": true,
    "name": "Dr. Puneet Nagpal",
    "specialties": [
      "Radiation oncology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-puneet-nagpal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rajender-singla-faridabad",
    "live": true,
    "name": "Dr. Rajender Singla",
    "specialties": [
      "Neurology",
      "Urology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-rajender-singla-best-neurologist-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-shivam-vatsal-agarwal-faridabad",
    "live": true,
    "name": "Dr. Shivam Vatsal Agarwal",
    "specialties": [
      "Surgical oncology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-shivam-vatsal-agarwal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-hemant-goel-faridabad",
    "live": true,
    "name": "Dr. Hemant Goel",
    "specialties": [
      "Pulmonology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-hemant-goel",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-arun-kumar-c-singh-faridabad",
    "live": true,
    "name": "Dr. Arun Kumar C. Singh",
    "specialties": [
      "Endocrinology",
      "Diabetology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-arun-kumar-c-singh",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vishal-khurana-faridabad",
    "live": true,
    "name": "Dr. Vishal Khurana",
    "specialties": [
      "Gastroenterology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-vishal-khurana-best-gastroenterologist-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-tejendra-singh-chauhan-faridabad",
    "live": true,
    "name": "Dr. Tejendra Singh Chauhan",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-tejendrasingh-chauhan-best-nephrologist-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-mradul-garg-faridabad",
    "live": true,
    "name": "Dr. Mradul Garg",
    "specialties": [
      "General surgery",
      "Bariatric surgery"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-mradul-garg",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-neeraj-dhar-faridabad",
    "live": true,
    "name": "Dr. Neeraj Dhar",
    "specialties": [
      "Gastroenterology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-neeraj-dhar",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-rahul-kumar-faridabad",
    "live": true,
    "name": "Dr. Rahul Kumar",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-rahul-kumar-best-neurosurgeon-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-sandeep-singhal-faridabad",
    "live": true,
    "name": "Dr. Sandeep Singhal",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-sandeep-singhal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ajay-pathak-faridabad",
    "live": true,
    "name": "Dr. Ajay Pathak",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-ajay-pathak-best-ophthalmologist-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-komal-meena-faridabad",
    "live": true,
    "name": "Dr. Komal Meena",
    "specialties": [
      "Dentistry"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-komal-meena",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-lucky-kharbanda-faridabad",
    "live": true,
    "name": "Dr. Lucky Kharbanda",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-lucky-kharbanda-best-eye-specialist-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-loveleen-mangla-faridabad",
    "live": true,
    "name": "Dr. Loveleen Mangla",
    "specialties": [
      "Pulmonology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-loveleen-mangla",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-pavan-kharbanda-faridabad",
    "live": true,
    "name": "Dr. Pavan Kharbanda",
    "specialties": [
      "Internal medicine"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-pavan-kharbanda",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-prateek-kaushik-faridabad",
    "live": true,
    "name": "Dr. Prateek Kaushik",
    "specialties": [
      "Nuclear medicine"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-prateek-kaushik",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-ravinder-kaur-khurana-faridabad",
    "live": true,
    "name": "Dr. Ravinder Kaur Khurana",
    "specialties": [
      "Gynaecology",
      "Obstetrics"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-ravinder-kaur-khurana-best-gynecologist-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vaibhav-jain-faridabad",
    "live": true,
    "name": "Dr. Vaibhav Jain",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-vaibhav-jain-best-orthopedic-doctor-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vineeta-kharb-faridabad",
    "live": true,
    "name": "Dr. Vineeta Kharb",
    "specialties": [
      "Gynaecology",
      "Obstetrics"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-vineeta-kharb-best-infertility-doctor-in-faridabad",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-vipasha-brajpuriya-faridabad",
    "live": true,
    "name": "Dr. Vipasha Brajpuriya",
    "specialties": [
      "ENT"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-vipasha-brajpuriya",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-arvind-singhal-faridabad",
    "live": true,
    "name": "Dr. Arvind Singhal",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-arvind-singhal",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  },
  {
    "id": "dr-k-k-kapoor-faridabad",
    "live": true,
    "name": "Dr. K.K. Kapoor",
    "specialties": [
      "ENT"
    ],
    "locations": [
      {
        "city": "Faridabad",
        "facility": "Metro Heart Institute with Multispeciality",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Metro Heart Institute with Multispeciality",
    "sourceUrl": "https://metrohospitalfaridabad.com/doctor/dr-k-k-kapoor",
    "sourceChecked": "2026-11-09",
    "profileStatus": "unclaimed",
    "consentGiven": false,
    "consentDate": null,
    "consentMethod": null,
    "registrationNumber": null,
    "registrationCouncil": null,
    "verifiedAt": null,
    "photoUrl": null
  }
];
