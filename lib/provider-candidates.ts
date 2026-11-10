

export type ProviderCity = string;

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
  profileSlug?: string;
  centres?: string[];
  serviceTitle?: string;
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
        "facility": "Yashoda Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospitals",
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
        "facility": "Yashoda Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospitals",
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
        "facility": "Yashoda Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospitals",
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
        "facility": "Yashoda Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Yashoda Hospitals",
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
  },
  {
    "id": "col-dr-avnish-seth-vsm-delhi",
    "live": true,
    "name": "(Col) Dr. Avnish Seth VSM",
    "specialties": [
      "Gastrointestinal Science",
      "Organ Transplant",
      "Liver Clinic"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-colonel-avnish-seth-vsm-consultant-gasteronology-hepatology-and-organ-transplant/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-col-rajeev-sood-gurgaon",
    "live": true,
    "name": "Dr. (Col) Rajeev Sood",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amita-shah-gurgaon",
    "live": true,
    "name": "Dr. Amita Shah",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anoop-amarnath-bengaluru",
    "live": true,
    "name": "Dr. Anoop Amarnath",
    "specialties": [
      "Geriatric Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-charu-goel-sachdeva-delhi",
    "live": true,
    "name": "Dr. Charu Goel Sachdeva",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-puneet-khanna-delhi",
    "live": true,
    "name": "Dr. Puneet Khanna",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajeev-verma-delhi",
    "live": true,
    "name": "Dr. Rajeev Verma",
    "specialties": [
      "Orthopaedics",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-rajeev-verma-hod-joint-replacement-and-orthopaedics/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-s-vidyadhara-bengaluru",
    "live": true,
    "name": "Dr. S Vidyadhara",
    "specialties": [
      "Spine Care",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-vidyadhara-s-hod-and-consultant-spine-surgery/",
    "sourceChecked": "2026-11-10",
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
    "id": "lt-col-dr-leena-n-sreedhar-delhi",
    "live": true,
    "name": "(Lt Col) Dr. Leena N Sreedhar",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/3/",
    "sourceChecked": "2026-11-10",
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
    "id": "lt-gen-dr-cs-narayanan-vsm-delhi",
    "live": true,
    "name": "(Lt Gen) Dr. CS Narayanan, VSM",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/3/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prof-sampath-chandra-prasad-rao-bengaluru",
    "live": true,
    "name": "Dr. (Prof) Sampath Chandra Prasad Rao",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/3/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-a-sivagnanam-bengaluru",
    "live": true,
    "name": "Dr. A Sivagnanam",
    "specialties": [
      "Accident and Emergency Care",
      "Paediatric And Child Care",
      "Children’s Airway & Swallowing Centre",
      "Angioedema Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-a-sivagnanam-consultant-accident-emergency-care-paediatrics/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abdul-majeed-bengaluru",
    "live": true,
    "name": "Dr. Abdul Majeed",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/3/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhijit-joshi-pune",
    "live": true,
    "name": "Dr. Abhijit Joshi",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/3/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhishek-gupta-gurgaon",
    "live": true,
    "name": "Dr. Abhishek Gupta",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/3/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anjana-ravindranath-bengaluru",
    "live": true,
    "name": "Dr. Anjana Ravindranath",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/5/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anurag-saxena-delhi",
    "live": true,
    "name": "Dr. Anurag Saxena",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/5/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-atanu-kumar-jana-kolkata",
    "live": true,
    "name": "Dr. Atanu Kumar Jana",
    "specialties": [
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/5/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ayush-dhingra-gurgaon",
    "live": true,
    "name": "Dr. Ayush Dhingra",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/5/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-b-p-s-tyagi-ghaziabad",
    "live": true,
    "name": "Dr. B P S Tyagi",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/5/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bandana-mishra-gurgaon",
    "live": true,
    "name": "Dr. Bandana Mishra",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/5/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-davinder-kundra-delhi",
    "live": true,
    "name": "Dr. Davinder Kundra",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/7/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepak-dubey-bengaluru",
    "live": true,
    "name": "Dr. Deepak Dubey",
    "specialties": [
      "Urology",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-deepak-dubey-hod-and-consultant-surgical-urology/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-devananda-n-s-bengaluru",
    "live": true,
    "name": "Dr. Devananda N S",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/7/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dheeraj-gupta-gurgaon",
    "live": true,
    "name": "Dr. Dheeraj Gupta",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/7/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dibyendu-kumar-ray-kolkata",
    "live": true,
    "name": "Dr. Dibyendu Kumar Ray",
    "specialties": [
      "Spine Care",
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/broadway/doctors/dr-dibyendu-kumar-ray-neurosurgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-divya-bansal-delhi",
    "live": true,
    "name": "Dr. Divya Bansal",
    "specialties": [
      "Cancer Care/Oncology",
      "Bone Marrow Transplantation"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-divya-bansal-consultant-hematology/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ejaz-ahmad-bari-kolkata",
    "live": true,
    "name": "Dr. Ejaz Ahmad Bari",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/7/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jyoti-shetty-bengaluru",
    "live": true,
    "name": "Dr. Jyoti Shetty",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/9/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-k-hemanth-kumar-bengaluru",
    "live": true,
    "name": "Dr. K Hemanth Kumar",
    "specialties": [
      "Gastrointestinal Science",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-k-hemanth-kumar-consultant-surgical-gastroenterology/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kapil-kanade-pune",
    "live": true,
    "name": "Dr. Kapil Kanade",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/9/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-khushbu-goel-delhi",
    "live": true,
    "name": "Dr. Khushbu Goel",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/9/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lalitaditya-malik-jaipur",
    "live": true,
    "name": "Dr. Lalitaditya Malik",
    "specialties": [
      "Cardiothoracic Vascular Surgery",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/jaipur/doctors/dr-lalitaditya-malik-cardiothoracic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mabel-vasnaik-bengaluru",
    "live": true,
    "name": "Dr. Mabel Vasnaik",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/9/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nidhi-nayyar-delhi",
    "live": true,
    "name": "Dr. Nidhi Nayyar",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/11/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nikhil-jayprakash-jillawar-pune",
    "live": true,
    "name": "Dr. Nikhil Jayprakash Jillawar",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/11/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nikhil-prasun-kolkata",
    "live": true,
    "name": "Dr. Nikhil Prasun",
    "specialties": [
      "Neurology",
      "Parkinson Disease and Movement Disorder"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/broadway/doctors/dr-nikhil-prasun-neurologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nikhil-yadav-delhi",
    "live": true,
    "name": "Dr. Nikhil Yadav",
    "specialties": [
      "General Surgery",
      "Robotic Assisted Surgery",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-nikhil-yadav-minimal-access-and-robotic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pankaj-singhai-bengaluru",
    "live": true,
    "name": "Dr. Pankaj Singhai",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/11/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prakash-kumar-hazra-kolkata",
    "live": true,
    "name": "Dr. Prakash Kumar Hazra",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/11/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rashmi-chand-kolkata",
    "live": true,
    "name": "Dr. Rashmi Chand",
    "specialties": [
      "Radiotherapy (Oncology Radiation)"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/13/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-reddi-prasad-yadavali-bengaluru",
    "live": true,
    "name": "Dr. Reddi Prasad Yadavali",
    "specialties": [
      "Interventional Radiology",
      "Fibroid Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-reddi-prasad-yadavalli-consultant-interventional-radiology/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-reetesh-ranjan-delhi",
    "live": true,
    "name": "Dr. Reetesh Ranjan",
    "specialties": [
      "Cancer Care/Oncology",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-reetesh-ranjan-head-and-neck-surgical-oncology-and-robotic-surgery/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ritika-malhotra-gurgaon",
    "live": true,
    "name": "Dr. Ritika Malhotra",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/13/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rohit-kumar-sengar-ranchi",
    "live": true,
    "name": "Dr. Rohit Kumar Sengar",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/13/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-romi-singh-gurgaon",
    "live": true,
    "name": "Dr. Romi Singh",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/13/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sahil-bansal-delhi",
    "live": true,
    "name": "Dr. Sahil Bansal",
    "specialties": [
      "Interventional Radiology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/13/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sajal-ajmani-delhi",
    "live": true,
    "name": "Dr. Sajal Ajmani",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/13/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shiva-kumar-r-bengaluru",
    "live": true,
    "name": "DR. SHIVA KUMAR R",
    "specialties": [
      "Neurology",
      "Stroke Care Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/sarjapurroad/doctors/dr-shiva-kumar-r-neurologist-and-epileptologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shivakumar-shamarao-bengaluru",
    "live": true,
    "name": "Dr. Shivakumar Shamarao",
    "specialties": [
      "Paediatric Intensive Care Unit",
      "Paediatrics Emergency",
      "Children’s Airway & Swallowing Centre",
      "Epilepsy Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-shivakumar-shamarao-consultant-paediatric-critical-care-emergency-medicine/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shrawan-kumar-chaudhary-jaipur",
    "live": true,
    "name": "Dr. Shrawan Kumar Chaudhary",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/15/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-smita-mishra-delhi",
    "live": true,
    "name": "Dr. Smita Mishra",
    "specialties": [
      "Cardiology",
      "Paediatric And Child Care",
      "Heart Care Clinic",
      "Paediatric Cardiology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-smita-mishra-consultant-and-hod-paediatrics-cardiology/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sudarshan-rawat-bengaluru",
    "live": true,
    "name": "Dr. Sudarshan Rawat",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/15/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sufla-saxena-delhi",
    "live": true,
    "name": "Dr. Sufla Saxena",
    "specialties": [
      "Paediatric And Child Care",
      "Gastrointestinal Science",
      "Liver Clinic"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-sufla-saxena-hod-and-consultant-paediatric-gastroenterologist-and-hepatologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-swati-maheshwari-delhi",
    "live": true,
    "name": "Dr. Swati Maheshwari",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/17/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sweta-singla-delhi",
    "live": true,
    "name": "Dr. Sweta Singla",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/17/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tarun-jeloka-pune",
    "live": true,
    "name": "Dr. Tarun Jeloka",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/17/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tejveer-singh-ranchi",
    "live": true,
    "name": "Dr. Tejveer Singh",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/17/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-thichen-kalden-lama-delhi",
    "live": true,
    "name": "Dr. Thichen Kalden Lama",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/17/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-v-dharmendra-kumar-vijayawada",
    "live": true,
    "name": "Dr. V Dharmendra Kumar",
    "specialties": [
      "Cancer Care/Oncology",
      "Robotic Assisted Surgery",
      "Breast Cancer Clinic"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/vijayawada/doctors/dr-v-dharmendrakumar-surgical-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vadhiraja-b-m-bengaluru",
    "live": true,
    "name": "Dr. Vadhiraja B M",
    "specialties": [
      "Radiotherapy (Oncology Radiation)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/17/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vanitha-rajagopalan-delhi",
    "live": true,
    "name": "Dr. Vanitha Rajagopalan",
    "specialties": [
      "Neurology",
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-vanitha-rajagopalan-neuroanaesthesiologist-and-neurointensivist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-venkatesh-reddy-bengaluru",
    "live": true,
    "name": "Dr. Venkatesh Reddy",
    "specialties": [
      "Vascular and Endovascular Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/17/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vijay-yadav-jaipur",
    "live": true,
    "name": "Dr. Vijay Yadav",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/17/",
    "sourceChecked": "2026-11-10",
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
    "id": "col-dr-monik-mehta-gurgaon",
    "live": true,
    "name": "(Col) Dr. Monik Mehta",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/19/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jyothi-mariam-idiculla-bengaluru",
    "live": true,
    "name": "Dr. Jyothi Mariam Idiculla",
    "specialties": [
      "Diabetes and Endocrinology",
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/sarjapurroad/doctors/dr-jyothi-mariam-idiculla-internal-medicine-specialist-and-diabetologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-air-cmde-vikas-kulshrestha-bengaluru",
    "live": true,
    "name": "Dr. (Air Cmde) Vikas Kulshrestha",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/19/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-col-r-d-holla-bengaluru",
    "live": true,
    "name": "Dr. (COL) R D Holla",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/19/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gp-capt-ashish-chauhan-bengaluru",
    "live": true,
    "name": "Dr. (Gp Capt) Ashish Chauhan",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/19/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-a-yogishwar-veerappa-bengaluru",
    "live": true,
    "name": "Dr. A Yogishwar Veerappa",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/21/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-a-rajasekar-salem",
    "live": true,
    "name": "Dr. A.Rajasekar",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/21/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aadhar-khera-gurgaon",
    "live": true,
    "name": "Dr. Aadhar Khera",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/21/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aadil-adnan-kolkata",
    "live": true,
    "name": "Dr. Aadil Adnan",
    "specialties": [
      "Cancer Care/Oncology",
      "Nuclear Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/em-bypass/doctors/dr-aadil-adnan-nuclear-medicine-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aakash-chaudhary-pune",
    "live": true,
    "name": "Dr. Aakash Chaudhary",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Clinic, Dhanori",
        "locality": "Dhanori",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Dhanori",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/21/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aakriti-sharma-patiala",
    "live": true,
    "name": "Dr. Aakriti Sharma",
    "specialties": [
      "Anesthesiology",
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/patiala/doctors/dr-aakriti-sharma-anaesthesiologist-and-critical-care-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aamil-rashid-delhi",
    "live": true,
    "name": "Dr. Aamil Rashid",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/21/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhay-taranath-kamath-mangaluru",
    "live": true,
    "name": "Dr. Abhay Taranath Kamath",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/23/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhaya-kumar-sm-bengaluru",
    "live": true,
    "name": "Dr. Abhaya kumar SM",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/23/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abheek-sil-kolkata",
    "live": true,
    "name": "Dr. Abheek Sil",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/23/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhigna-panda-bengaluru",
    "live": true,
    "name": "Dr. Abhigna Panda",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/23/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhijeet-dash-bhubaneswar",
    "live": true,
    "name": "Dr. Abhijeet Dash",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/23/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhijeet-sharan-siliguri",
    "live": true,
    "name": "Dr. Abhijeet Sharan",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/23/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhijit-agashe-pune",
    "live": true,
    "name": "Dr. Abhijit Agashe",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/23/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhijit-chanda-kolkata",
    "live": true,
    "name": "Dr. Abhijit Chanda",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/23/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhijit-giram-pune",
    "live": true,
    "name": "Dr. Abhijit Giram",
    "specialties": [
      "Bone Marrow Transplantation"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/23/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhirup-nayak-kolkata",
    "live": true,
    "name": "Dr. Abhirup Nayak",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/25/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhishek-das-kolkata",
    "live": true,
    "name": "Dr. Abhishek Das",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/25/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhishek-hajela-jaipur",
    "live": true,
    "name": "Dr. Abhishek Hajela",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/25/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhishek-krishna-mangaluru",
    "live": true,
    "name": "Dr. Abhishek Krishna",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/25/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhishek-m-bengaluru",
    "live": true,
    "name": "Dr. Abhishek M",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/25/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-abhishek-m-u-bengaluru",
    "live": true,
    "name": "Dr. Abhishek M.U",
    "specialties": [
      "Orthopaedics",
      "Joint Replacement and Sports Medicine Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/malleshwaram/doctors/dr-abhishek-m-u-orthopaedic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aditya-g-hegde-bengaluru",
    "live": true,
    "name": "Dr. Aditya G Hegde",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/27/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aditya-girish-borawake-pune",
    "live": true,
    "name": "Dr. Aditya Girish Borawake",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/27/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aditya-j-mise-bengaluru",
    "live": true,
    "name": "Dr. Aditya J Mise",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/27/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aditya-kulkarni-pune",
    "live": true,
    "name": "Dr. Aditya Kulkarni",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/27/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aditya-kulkarni-bengaluru",
    "live": true,
    "name": "Dr. Aditya Kulkarni",
    "specialties": [
      "Neurology",
      "Stroke Care Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/sarjapurroad/doctors/dr-aditya-kulkarni-neurologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aditya-nayan-gurgaon",
    "live": true,
    "name": "Dr. Aditya Nayan",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/27/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ajay-simha-bengaluru",
    "live": true,
    "name": "Dr. Ajay Simha",
    "specialties": [
      "Gynaec Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/29/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ajeya-b-n-bengaluru",
    "live": true,
    "name": "Dr. Ajeya B N",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/29/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ajit-kumar-roy-bengaluru",
    "live": true,
    "name": "Dr. Ajit Kumar Roy",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/29/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ajit-kumar-singh-siliguri",
    "live": true,
    "name": "Dr. Ajit Kumar Singh",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/29/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ajita-kendre-pune",
    "live": true,
    "name": "Dr. Ajita Kendre",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/29/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ajitabh-mishra-kolkata",
    "live": true,
    "name": "Dr. Ajitabh Mishra",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/29/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-akila-r-bengaluru",
    "live": true,
    "name": "Dr. Akila R",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/31/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-akila-venkatkrishnan-bengaluru",
    "live": true,
    "name": "Dr. Akila Venkatkrishnan",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/31/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-akshata-g-kamath-mangaluru",
    "live": true,
    "name": "Dr. Akshata G Kamath",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/31/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-akshatha-hegde-bengaluru",
    "live": true,
    "name": "Dr. Akshatha hegde",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/31/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-akshatha-nayak-u-bengaluru",
    "live": true,
    "name": "Dr. Akshatha Nayak U",
    "specialties": [
      "Cancer Care/Oncology",
      "Clinical Haematology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-akshatha-nayak-u-haemato-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-akshay-athreya-bengaluru",
    "live": true,
    "name": "Dr. Akshay Athreya",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/31/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-akshay-ballal-bengaluru",
    "live": true,
    "name": "Dr. Akshay Ballal",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/31/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-akshay-desale-pune",
    "live": true,
    "name": "Dr. Akshay Desale",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/31/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-akshay-dhanda-bengaluru",
    "live": true,
    "name": "Dr. Akshay Dhanda",
    "specialties": [
      "Orthopaedics",
      "Sports Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/jayanagar/doctors/dr-akshay-dhanda-orthopaedician-sports-medicine-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-alok-kumar-roy-kolkata",
    "live": true,
    "name": "Dr. Alok Kumar Roy",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/33/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-alok-sharma-ghaziabad",
    "live": true,
    "name": "Dr. Alok Sharma",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/33/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-althea-pinto-bengaluru",
    "live": true,
    "name": "Dr. Althea Pinto",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/33/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amal-kumar-sinha-kolkata",
    "live": true,
    "name": "Dr. Amal Kumar Sinha",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/33/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amala-deepthi-degala-bengaluru",
    "live": true,
    "name": "Dr. Amala Deepthi Degala",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/33/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aman-sainky-ranchi",
    "live": true,
    "name": "Dr. Aman Sainky",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/33/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amar-prem-ranchi",
    "live": true,
    "name": "Dr. Amar Prem",
    "specialties": [
      "Surgical Oncology"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/33/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amit-bikram-das-kolkata",
    "live": true,
    "name": "Dr. Amit Bikram Das",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/35/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amit-c-kamath-bengaluru",
    "live": true,
    "name": "Dr. Amit C Kamath",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/35/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amit-dutt-dwary-kolkata",
    "live": true,
    "name": "Dr. Amit Dutt Dwary",
    "specialties": [
      "Medical Oncology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/35/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amit-gupta-delhi",
    "live": true,
    "name": "Dr. Amit Gupta",
    "specialties": [
      "Cardiology",
      "Heart Care Clinic"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-amit-gupta-cardiologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amit-jaiswal-bhubaneswar",
    "live": true,
    "name": "Dr. Amit Jaiswal",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/35/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amit-kumar-ranchi",
    "live": true,
    "name": "Dr. Amit Kumar",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/35/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amit-lal-bengaluru",
    "live": true,
    "name": "Dr. Amit Lal",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/35/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amit-prakash-chandra-ranchi",
    "live": true,
    "name": "Dr. Amit Prakash Chandra",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/35/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amit-ray-kolkata",
    "live": true,
    "name": "Dr. Amit Ray",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/35/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amoolya-k-seth-ghaziabad",
    "live": true,
    "name": "Dr. Amoolya K Seth",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/37/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amrit-kumar-gupta-delhi",
    "live": true,
    "name": "Dr. AMRIT KUMAR GUPTA",
    "specialties": [
      "Gastrointestinal Science",
      "Bariatric Surgery | Weight loss surgery",
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-amrit-kumar-gupta-bariatric-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amrita-rao-bengaluru",
    "live": true,
    "name": "Dr. Amrita Rao",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/37/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amruth-kh-mysuru",
    "live": true,
    "name": "Dr. Amruth KH",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/37/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-amulya-k-g-mysuru",
    "live": true,
    "name": "Dr. Amulya K G",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/37/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anamika-rai-bengaluru",
    "live": true,
    "name": "Dr. Anamika Rai",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Begur",
        "locality": "Begur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Begur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/37/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anand-patil-bengaluru",
    "live": true,
    "name": "Dr. Anand Patil",
    "specialties": [
      "Paediatric And Child Care",
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/varthurroad/doctors/dr-anand-patil-consultant-paediatrics/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anand-r-shenoy-bengaluru",
    "live": true,
    "name": "Dr. Anand R Shenoy",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/39/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anand-t-galagali-bengaluru",
    "live": true,
    "name": "Dr. Anand T Galagali",
    "specialties": [
      "Orthopaedics",
      "Joint Replacement and Sports Medicine Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/malleshwaram/doctors/dr-anand-t-galagali-consultant-orthopedics/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ananda-mohan-chakraborty-siliguri",
    "live": true,
    "name": "Dr. Ananda Mohan Chakraborty",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/39/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ananda-murthy-k-v-bengaluru",
    "live": true,
    "name": "Dr. Ananda Murthy K V",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/39/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anant-vir-jain-ghaziabad",
    "live": true,
    "name": "Dr. Anant Vir Jain",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/39/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anantha-padmanaban-bengaluru",
    "live": true,
    "name": "Dr. Anantha Padmanaban",
    "specialties": [
      "Pain Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/39/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ananya-chowdhary-siliguri",
    "live": true,
    "name": "Dr. Ananya Chowdhary",
    "specialties": [
      "Clinical Haematology"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/39/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anil-kumar-patiala",
    "live": true,
    "name": "Dr. Anil Kumar",
    "specialties": [
      "Pulmonary Medicine"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/41/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anil-kumar-singhi-kolkata",
    "live": true,
    "name": "Dr. Anil Kumar Singhi",
    "specialties": [
      "Paediatric Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/41/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anilkumar-y-c-mysuru",
    "live": true,
    "name": "Dr. Anilkumar Y C",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/41/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anindya-sarkar-kolkata",
    "live": true,
    "name": "Dr. Anindya Sarkar",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/41/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anindya-sengupta-kolkata",
    "live": true,
    "name": "Dr. Anindya Sengupta",
    "specialties": [
      "General Medicine",
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/mukundapur/doctors/dr-anindya-sengupta-internal-medicine-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anirban-banerjee-kolkata",
    "live": true,
    "name": "Dr. Anirban Banerjee",
    "specialties": [
      "General Surgery",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/broadway/doctors/dr-anirban-banerjee-general-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anirban-bose-kolkata",
    "live": true,
    "name": "Dr. Anirban Bose",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/41/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anirvan-jaiswal-kolkata",
    "live": true,
    "name": "Dr. Anirvan Jaiswal",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/43/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anisha-umashankar-bengaluru",
    "live": true,
    "name": "Dr. Anisha Umashankar",
    "specialties": [
      "Medical Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/43/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anita-maria-dias-bengaluru",
    "live": true,
    "name": "Dr. Anita Maria Dias",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/43/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anita-pramod-bengaluru",
    "live": true,
    "name": "Dr. Anita Pramod",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/43/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anitha-h-g-bengaluru",
    "live": true,
    "name": "Dr. Anitha H G",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Budigere",
        "locality": "Budigere",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Budigere",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/43/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anjali-n-bengaluru",
    "live": true,
    "name": "Dr. Anjali N",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/43/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ankit-khanna-pune",
    "live": true,
    "name": "Dr. Ankit Khanna",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/45/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ankita-tiwari-bhubaneswar",
    "live": true,
    "name": "Dr. Ankita Tiwari",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/45/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ankur-mittal-delhi",
    "live": true,
    "name": "Dr. Ankur Mittal",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/45/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ankush-bansal-kolkata",
    "live": true,
    "name": "Dr. Ankush Bansal",
    "specialties": [
      "Oral Maxillo Facial Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/45/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anmol-nagaraj-bengaluru",
    "live": true,
    "name": "Dr. Anmol Nagaraj",
    "specialties": [
      "Spine Care",
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/yeshwanthpur/doctors/dr-anmol-nagaraj-neurosurgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anna-lakshmi-s-bengaluru",
    "live": true,
    "name": "Dr. Anna Lakshmi S",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/45/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anubhav-gulati-gurgaon",
    "live": true,
    "name": "Dr. Anubhav Gulati",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/47/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anudeep-talagavadi-channaiah-mysuru",
    "live": true,
    "name": "Dr. Anudeep Talagavadi Channaiah",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/47/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anuj-kumar-goel-ghaziabad",
    "live": true,
    "name": "Dr. Anuj Kumar Goel",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/47/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anuja-lakra-delhi",
    "live": true,
    "name": "Dr. Anuja Lakra",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/47/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anup-tamhankar-pune",
    "live": true,
    "name": "Dr. Anup Tamhankar",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/47/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-anupam-prakash-bengaluru",
    "live": true,
    "name": "Dr. Anupam Prakash",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/47/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aparna-arya-tyagi-ghaziabad",
    "live": true,
    "name": "Dr. Aparna Arya Tyagi",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/49/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-apurva-sharma-gurgaon",
    "live": true,
    "name": "Dr. Apurva Sharma",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/49/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aquib-suheil-pasha-bengaluru",
    "live": true,
    "name": "Dr. Aquib Suheil Pasha",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/49/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arathi-karat-bengaluru",
    "live": true,
    "name": "Dr. Arathi Karat",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/49/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arathy-g-s-delhi",
    "live": true,
    "name": "Dr. Arathy G S",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/49/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aravind-j-d-bengaluru",
    "live": true,
    "name": "Dr. Aravind J D",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Indiranagar",
        "locality": "Indiranagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Indiranagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/49/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aravind-k-bengaluru",
    "live": true,
    "name": "Dr. Aravind K",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/49/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aravind-s-kapali-bengaluru",
    "live": true,
    "name": "Dr. Aravind S. Kapali",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/49/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arghya-mukherjee-kolkata",
    "live": true,
    "name": "Dr. Arghya Mukherjee",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/51/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arif-akhtar-gurgaon",
    "live": true,
    "name": "Dr. Arif Akhtar",
    "specialties": [
      "Urology",
      "Renal Sciences"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/gurugram/doctors/dr-arif-akhtar-urologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arijit-chattopadhyay-kolkata",
    "live": true,
    "name": "Dr. Arijit Chattopadhyay",
    "specialties": [
      "Paediatric Neurology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/51/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arijit-datta-kolkata",
    "live": true,
    "name": "Dr. Arijit Datta",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/51/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arijit-dutta-chowdhury-kolkata",
    "live": true,
    "name": "Dr. Arijit Dutta Chowdhury",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/51/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arijit-singha-mahapatra-kolkata",
    "live": true,
    "name": "Dr. Arijit Singha Mahapatra",
    "specialties": [
      "Surgical Gastro"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/51/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arindam-das-kolkata",
    "live": true,
    "name": "Dr. Arindam Das",
    "specialties": [
      "Medical Gastro"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/51/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arkoprovo-halder-rangapani",
    "live": true,
    "name": "Dr. Arkoprovo Halder",
    "specialties": [
      "Medical Oncology"
    ],
    "locations": [
      {
        "city": "Rangapani",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/53/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arnab-ghosh-hajra-kolkata",
    "live": true,
    "name": "Dr. Arnab Ghosh Hajra",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/53/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arnab-nag-kolkata",
    "live": true,
    "name": "Dr. Arnab Nag",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/53/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arnab-roy-kolkata",
    "live": true,
    "name": "Dr. Arnab Roy",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/53/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arnab-roy-ranchi",
    "live": true,
    "name": "Dr. Arnab Roy",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/53/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arpan-dev-bhattacharya-bengaluru",
    "live": true,
    "name": "Dr. Arpan Dev Bhattacharya",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/53/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arpita-shrivastava-mangaluru",
    "live": true,
    "name": "Dr. Arpita Shrivastava",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/53/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arun-suradkar-pune",
    "live": true,
    "name": "Dr. Arun Suradkar",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/55/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arun-v-bengaluru",
    "live": true,
    "name": "Dr. Arun V",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/55/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aruna-jain-jaipur",
    "live": true,
    "name": "Dr. Aruna Jain",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/55/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aruna-kumar-bengaluru",
    "live": true,
    "name": "Dr. Aruna Kumar",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/55/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arunangsu-bhattacharya-kolkata",
    "live": true,
    "name": "Dr. Arunangsu Bhattacharya",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/55/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-arup-ratan-mondal-kolkata",
    "live": true,
    "name": "DR. ARUP RATAN MONDAL",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/55/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ashish-dagar-gurgaon",
    "live": true,
    "name": "Dr. Ashish Dagar",
    "specialties": [
      "Spine Care"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/57/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ashish-dixit-bengaluru",
    "live": true,
    "name": "Dr. Ashish Dixit",
    "specialties": [
      "Cancer Care/Oncology",
      "Bone Marrow Transplantation",
      "Hemato Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-ashish-dixit-consultant-bone-marrow-transplantation-cancer-care-oncology/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ashish-pathak-pune",
    "live": true,
    "name": "Dr. Ashish Pathak",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/57/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ashish-sharma-ghaziabad",
    "live": true,
    "name": "Dr. Ashish Sharma",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/57/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ashish-singh-gurgaon",
    "live": true,
    "name": "Dr. Ashish Singh",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/57/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ashish-tyagi-ghaziabad",
    "live": true,
    "name": "Dr. Ashish Tyagi",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/57/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ashish-vashishth-delhi",
    "live": true,
    "name": "Dr. Ashish Vashishth",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/57/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ashok-bhat-mangaluru",
    "live": true,
    "name": "Dr. Ashok Bhat",
    "specialties": [
      "Nephrology",
      "Dialysis OP",
      "Dialysis"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/mangalore/doctors/dr-ashok-bhat-consultant-nephrology/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ashok-kumar-gupta-delhi",
    "live": true,
    "name": "Dr. Ashok Kumar Gupta",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/57/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ashwini-k-c-bengaluru",
    "live": true,
    "name": "Dr. Ashwini K C",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/59/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-asis-kumar-sinha-kolkata",
    "live": true,
    "name": "Dr. Asis Kumar Sinha",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/59/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-asmita-ghosh-kolkata",
    "live": true,
    "name": "Dr. Asmita Ghosh",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/59/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-astha-sharma-delhi",
    "live": true,
    "name": "Dr. Astha Sharma",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/59/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-aswini-rana-kolkata",
    "live": true,
    "name": "Dr. Aswini Rana",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/59/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-atindriya-biswas-kolkata",
    "live": true,
    "name": "Dr. Atindriya Biswas",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/59/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-avinash-g-kamath-mangaluru",
    "live": true,
    "name": "Dr. Avinash G Kamath",
    "specialties": [
      "Paediatric And Child Care",
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/mangalore/doctors/dr-avinash-g-kamath-child-psychiatrist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-avinash-krishna-mangaluru",
    "live": true,
    "name": "Dr. Avinash Krishna",
    "specialties": [
      "General Surgery",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/mangalore/doctors/dr-avinash-krishna-general-and-laparoscopic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-avinash-s-bengaluru",
    "live": true,
    "name": "Dr. Avinash S",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/61/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-avishek-chatterjee-bhubaneswar",
    "live": true,
    "name": "Dr. Avishek Chatterjee",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/61/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-avishek-saha-kolkata",
    "live": true,
    "name": "Dr. Avishek Saha",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/61/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ayesha-firdos-bengaluru",
    "live": true,
    "name": "Dr. Ayesha Firdos",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Indiranagar",
        "locality": "Indiranagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Indiranagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/61/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ayush-goel-kolkata",
    "live": true,
    "name": "Dr. Ayush Goel",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/61/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ayush-shukla-siliguri",
    "live": true,
    "name": "Dr. Ayush Shukla",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/61/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-b-uday-kiran-vijayawada",
    "live": true,
    "name": "Dr. B Uday Kiran",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/63/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-b-y-t-arya-bengaluru",
    "live": true,
    "name": "Dr. B Y T Arya",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/63/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-b-r-mahesh-kumar-bengaluru",
    "live": true,
    "name": "Dr. B. R. Mahesh Kumar",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/63/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bachan-lal-bharadwaj-patiala",
    "live": true,
    "name": "Dr. Bachan Lal Bharadwaj",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/63/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-badal-das-kolkata",
    "live": true,
    "name": "Dr. Badal Das",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/63/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-baikuntha-narayan-mishra-bhubaneswar",
    "live": true,
    "name": "Dr. Baikuntha Narayan Mishra",
    "specialties": [
      "Paediatric Surgery"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/63/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bailuru-vishwanath-tantry-mangaluru",
    "live": true,
    "name": "Dr. Bailuru Vishwanath Tantry",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/63/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-balaji-laxminarayanshetty-bengaluru",
    "live": true,
    "name": "Dr. Balaji Laxminarayanshetty",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/63/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-barin-kumar-roy-chaudhuri-kolkata",
    "live": true,
    "name": "Dr. Barin Kumar Roy Chaudhuri",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/65/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-barun-chakrabarti-kolkata",
    "live": true,
    "name": "Dr. Barun Chakrabarti",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/65/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-basarath-nadeem-bengaluru",
    "live": true,
    "name": "Dr. Basarath Nadeem",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/65/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-basavaprabhu-achappa-mangaluru",
    "live": true,
    "name": "Dr. Basavaprabhu Achappa",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/65/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-basavaraj-kuntoji-bengaluru",
    "live": true,
    "name": "Dr. Basavaraj Kuntoji",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/65/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-basil-s-mathew-bengaluru",
    "live": true,
    "name": "Dr. Basil S Mathew",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/65/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-basila-ameer-ali-mangaluru",
    "live": true,
    "name": "Dr. Basila Ameer Ali",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/65/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bastab-ghosh-kolkata",
    "live": true,
    "name": "Dr. Bastab Ghosh",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/65/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bharat-bhushan-bassan-ghaziabad",
    "live": true,
    "name": "Dr. Bharat Bhushan Bassan",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/67/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bharat-bhushan-chauhan-delhi",
    "live": true,
    "name": "Dr. Bharat Bhushan Chauhan",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/67/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bharat-k-subramanya-bengaluru",
    "live": true,
    "name": "Dr. Bharat K Subramanya",
    "specialties": [
      "Spine Care",
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/electronicscity/doctors/dr-bharat-k-subramanya-neurosurgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bharath-b-bengaluru",
    "live": true,
    "name": "Dr. Bharath B",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/67/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bharath-chhabria-bengaluru",
    "live": true,
    "name": "Dr. Bharath Chhabria",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/67/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bhavana-mangal-pune",
    "live": true,
    "name": "Dr. Bhavana Mangal",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/69/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bhavani-m-vijayawada",
    "live": true,
    "name": "Dr. Bhavani M",
    "specialties": [
      "Cancer Care/Oncology",
      "Hemato Oncology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/vijayawada/doctors/dr-bhavani-m-hemato-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bhoopat-singh-bhati-pune",
    "live": true,
    "name": "Dr. Bhoopat Singh Bhati",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/69/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bhuban-mohan-pal-kolkata",
    "live": true,
    "name": "Dr. Bhuban Mohan Pal",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/69/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bhupendra-singh-ghaziabad",
    "live": true,
    "name": "Dr. Bhupendra Singh",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/69/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bhushan-joshi-pune",
    "live": true,
    "name": "Dr. Bhushan Joshi",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/69/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bhuvaneshwar-us-mysuru",
    "live": true,
    "name": "Dr. Bhuvaneshwar US",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/69/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-binduraj-r-bengaluru",
    "live": true,
    "name": "Dr. Binduraj R",
    "specialties": [
      "Internal Medicine (Evening Clinic)",
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/millersroad/doctors/dr-binduraj-r-internal-medicine-physician/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-biplab-deb-kolkata",
    "live": true,
    "name": "Dr. Biplab Deb",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/71/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bishal-bhagat-kolkata",
    "live": true,
    "name": "Dr. Bishal Bhagat",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/71/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-biswajeet-mohapatra-bhubaneswar",
    "live": true,
    "name": "Dr. Biswajeet Mohapatra",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/71/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-biswajit-mishra-bhubaneswar",
    "live": true,
    "name": "Dr. Biswajit Mishra",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/71/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-biswajit-paul-kolkata",
    "live": true,
    "name": "Dr. Biswajit Paul",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/71/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-bopanna-i-c-bengaluru",
    "live": true,
    "name": "Dr. Bopanna I.C",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/71/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chaithra-rajanna-bengaluru",
    "live": true,
    "name": "Dr. Chaithra Rajanna",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/73/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chaitra-d-bengaluru",
    "live": true,
    "name": "Dr. Chaitra D",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/73/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chaitra-l-bengaluru",
    "live": true,
    "name": "Dr. Chaitra L",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Manipal Indira Clinic",
        "locality": "Manipal Indira Clinic",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Manipal Indira Clinic",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/73/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chakrapani-b-s-bengaluru",
    "live": true,
    "name": "Dr. Chakrapani B S",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/73/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chakrapani-m-mangaluru",
    "live": true,
    "name": "Dr. Chakrapani M",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/73/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chamundeswari-t-vijayawada",
    "live": true,
    "name": "Dr. Chamundeswari T",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/73/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chanchal-kumar-bhar-kolkata",
    "live": true,
    "name": "Dr. Chanchal Kumar Bhar",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/73/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chanchal-verma-delhi",
    "live": true,
    "name": "Dr. CHANCHAL VERMA",
    "specialties": [
      "Gastrointestinal Science",
      "Bariatric Surgery | Weight loss surgery",
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-chanchal-verma-bariatric-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chandrima-dasgupta-kolkata",
    "live": true,
    "name": "Dr. Chandrima Dasgupta",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/75/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-charanjeet-singh-gill-patiala",
    "live": true,
    "name": "Dr. Charanjeet Singh Gill",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/75/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-charit-bhograj-bengaluru",
    "live": true,
    "name": "Dr. Charit Bhograj",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/75/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chetan-dugad-delhi",
    "live": true,
    "name": "Dr. Chetan Dugad",
    "specialties": [
      "Paediatric And Child Care",
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-chetan-dugad-neonatologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chirag-thonse-bengaluru",
    "live": true,
    "name": "Dr. Chirag Thonse",
    "specialties": [
      "Orthopaedics",
      "Orthopaedic Robotic Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/millersroad/doctors/dr-chirag-thonse-consultant-orthopedics-joint-replacement-and-arthroscopy-surgery/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chitralekha-n-dambekodi-bengaluru",
    "live": true,
    "name": "Dr. Chitralekha N Dambekodi",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/77/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-chumkai-dey-ghaziabad",
    "live": true,
    "name": "Dr. Chumkai Dey",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/77/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-codanda-belliappa-poovaiay-bengaluru",
    "live": true,
    "name": "Dr. Codanda Belliappa Poovaiay",
    "specialties": [
      "Orthopaedics",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/sarjapurroad/doctors/dr-codanda-belliappa-poovaiay-consultant-orthopaedics/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-col-prof-subroto-kumar-datta-delhi",
    "live": true,
    "name": "Dr. Col (Prof) Subroto Kumar Datta",
    "specialties": [
      "Cardiology",
      "Heart Care Clinic"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-subroto-kumar-datta-interventional-cardiologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-darshan-b-s-bengaluru",
    "live": true,
    "name": "Dr. Darshan B S",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/77/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-debabrata-bose-kolkata",
    "live": true,
    "name": "Dr. Debabrata Bose",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/79/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-debajyoti-mandal-bengaluru",
    "live": true,
    "name": "Dr. Debajyoti Mandal",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/79/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-debapriyo-saha-delhi",
    "live": true,
    "name": "Dr. Debapriyo Saha",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/79/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-debarati-bhar-kolkata",
    "live": true,
    "name": "Dr. Debarati Bhar",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/79/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-debarghya-chattopadhyay-kolkata",
    "live": true,
    "name": "Dr. Debarghya Chattopadhyay",
    "specialties": [
      "Physical Medicine and Rehabilitation"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/79/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-debasis-saha-kolkata",
    "live": true,
    "name": "Dr. Debasis Saha",
    "specialties": [
      "Diabetes and Endocrinology",
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/broadway/doctors/dr-debasis-saha-internal-medicine-and-diabetologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-debasish-datta-majumder-bengaluru",
    "live": true,
    "name": "Dr. Debasish Datta Majumder",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/79/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepak-jain-ghaziabad",
    "live": true,
    "name": "Dr. Deepak Jain",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/81/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepak-kumar-ranchi",
    "live": true,
    "name": "Dr. Deepak Kumar",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/81/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepak-madi-mangaluru",
    "live": true,
    "name": "Dr. Deepak Madi",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/81/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepak-mangla-delhi",
    "live": true,
    "name": "Dr. Deepak Mangla",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/81/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepak-mohan-rohella-bhubaneswar",
    "live": true,
    "name": "Dr. Deepak Mohan Rohella",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/81/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepak-n-bengaluru",
    "live": true,
    "name": "Dr. Deepak N",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/81/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepika-c-a-bengaluru",
    "live": true,
    "name": "Dr. Deepika C A",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/83/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepika-gulati-dumeer-delhi",
    "live": true,
    "name": "Dr. Deepika Gulati Dumeer",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/83/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepika-pai-mangaluru",
    "live": true,
    "name": "Dr. Deepika Pai",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/83/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepika-ponnuru-v-a-vijayawada",
    "live": true,
    "name": "Dr. Deepika Ponnuru V A",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/83/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-deepti-d-souza-mangaluru",
    "live": true,
    "name": "Dr. Deepti D'souza",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/83/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dev-anand-galagali-bengaluru",
    "live": true,
    "name": "Dr. Dev Anand Galagali",
    "specialties": [
      "Orthopaedics",
      "Joint Replacement and Sports Medicine Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/malleshwaram/doctors/dr-dev-anand-galagali-orthopaedic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dheeraj-karanth-c-bengaluru",
    "live": true,
    "name": "Dr. Dheeraj Karanth C",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/85/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dhiman-banerjee-kolkata",
    "live": true,
    "name": "Dr. Dhiman Banerjee",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/85/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dhiman-sen-kolkata",
    "live": true,
    "name": "Dr. Dhiman Sen",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/85/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dhivya-bharathi-n-bengaluru",
    "live": true,
    "name": "Dr. Dhivya Bharathi N",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/85/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dhritabrata-das-kolkata",
    "live": true,
    "name": "Dr. Dhritabrata Das",
    "specialties": [
      "Paediatric Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/85/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dinesh-v-kamath-bengaluru",
    "live": true,
    "name": "Dr. Dinesh V Kamath",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/87/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dinkar-sood-patiala",
    "live": true,
    "name": "DR. DINKAR SOOD",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/87/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dipali-patel-pune",
    "live": true,
    "name": "Dr. Dipali Patel",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/87/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dipanjan-chakraborty-kolkata",
    "live": true,
    "name": "Dr. Dipanjan Chakraborty",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/87/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dipanjan-chatterjee-kolkata",
    "live": true,
    "name": "Dr. Dipanjan Chatterjee",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/87/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dipanjana-datta-kolkata",
    "live": true,
    "name": "Dr. Dipanjana Datta",
    "specialties": [
      "Genetics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/87/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dipankar-datta-kolkata",
    "live": true,
    "name": "Dr. Dipankar Datta",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/87/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-disha-r-shetty-bengaluru",
    "live": true,
    "name": "Dr. Disha R Shetty",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/89/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-dishitha-shetty-mangaluru",
    "live": true,
    "name": "Dr. Dishitha Shetty",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/89/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-divya-bhadoo-jaipur",
    "live": true,
    "name": "Dr. Divya Bhadoo",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/89/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-divya-chaudhary-pune",
    "live": true,
    "name": "Dr. Divya Chaudhary",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/89/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-divya-gupta-bengaluru",
    "live": true,
    "name": "Dr. Divya Gupta",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/89/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-divya-idamakanti-bengaluru",
    "live": true,
    "name": "Dr. Divya Idamakanti",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/89/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-divyadeep-sandhu-kolkata",
    "live": true,
    "name": "Dr. Divyadeep Sandhu",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/89/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-divyatha-shekar-bengaluru",
    "live": true,
    "name": "Dr. Divyatha Shekar",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/89/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-farzana-shaikh-pune",
    "live": true,
    "name": "Dr. Farzana Shaikh",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/91/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-firdos-saba-bengaluru",
    "live": true,
    "name": "Dr. Firdos Saba",
    "specialties": [
      "Laboratory Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/91/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-g-s-nagaraja-prabhakar-bengaluru",
    "live": true,
    "name": "Dr. G S Nagaraja Prabhakar",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/91/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-g-srinivasa-rao-kolkata",
    "live": true,
    "name": "Dr. G Srinivasa Rao",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/91/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-g-v-reddy-vijayawada",
    "live": true,
    "name": "Dr. G V Reddy",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/91/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-g-rama-mohan-reddy-bengaluru",
    "live": true,
    "name": "Dr. G. Rama Mohan Reddy",
    "specialties": [
      "Cancer Care/Oncology",
      "Medical Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/yelahanka/doctors/dr-g-rama-mohan-reddy-nuclear-medicine-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gaurav-raghunath-suralkar-pune",
    "live": true,
    "name": "Dr. Gaurav Raghunath Suralkar",
    "specialties": [
      "Cancer Care/Oncology",
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/baner/doctors/dr-gaurav-raghunath-suralkar-gynaec-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gaurav-sen-bengaluru",
    "live": true,
    "name": "Dr. Gaurav sen",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/93/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gaurav-sharma-patiala",
    "live": true,
    "name": "Dr. Gaurav Sharma",
    "specialties": [
      "Spine Care"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/93/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gautam-bhaumik-kolkata",
    "live": true,
    "name": "Dr. Gautam Bhaumik",
    "specialties": [
      "General Surgery",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/saltlake/doctors/dr-gautam-bhaumik-consultant-general-laparoscopic-surgery/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gautam-chandra-ranchi",
    "live": true,
    "name": "Dr. Gautam Chandra",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/93/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gayatri-sasikumar-bengaluru",
    "live": true,
    "name": "Dr. Gayatri Sasikumar",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/93/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-geeta-n-shapur-bengaluru",
    "live": true,
    "name": "Dr. Geeta N Shapur",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/93/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-geeta-patil-bengaluru",
    "live": true,
    "name": "Dr. Geeta Patil",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/93/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-geetanjali-ingaale-pune",
    "live": true,
    "name": "Dr. Geetanjali Ingaale",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/93/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-girish-kumar-a-m-bengaluru",
    "live": true,
    "name": "Dr. Girish Kumar A M",
    "specialties": [
      "Paediatric And Child Care",
      "Paediatric Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/yelahanka/doctors/dr-girish-kumar-a-m-paediatric-orthopaedic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-girish-p-v-bengaluru",
    "live": true,
    "name": "Dr. Girish P.V.",
    "specialties": [
      "Medical Gastro"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/95/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-girish-rai-bengaluru",
    "live": true,
    "name": "Dr. Girish Rai",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/95/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-girish-ram-kamat-bengaluru",
    "live": true,
    "name": "Dr. Girish Ram Kamat",
    "specialties": [
      "General Surgery",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/jayanagar/doctors/dr-girish-ram-kamat-consultant-laparoscopic-and-general-surgery/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-girish-s-p-bengaluru",
    "live": true,
    "name": "Dr. Girish S P",
    "specialties": [
      "Gastrointestinal Science",
      "Bariatric Surgery | Weight loss surgery",
      "Hepatobiliary Surgery",
      "GI Surgery",
      "Surgical Gastro",
      "Minimal Access Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-girish-s-p-general-and-gastro-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-girish-s-prabhakar-bengaluru",
    "live": true,
    "name": "Dr. Girish S Prabhakar",
    "specialties": [
      "Cancer Care/Oncology",
      "Radiotherapy (Oncology Radiation)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/electronicscity/doctors/dr-girish-s-prabhakar-radiation-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-girish-s-rao-bengaluru",
    "live": true,
    "name": "DR. GIRISH S RAO",
    "specialties": [
      "Oral Maxillo Facial Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/95/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-girish-sadam-prabhakar-bengaluru",
    "live": true,
    "name": "Dr. Girish Sadam Prabhakar",
    "specialties": [
      "Cancer Care/Oncology",
      "Radiotherapy (Oncology Radiation)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-girish-sadam-prabhakar-radiation-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-girisha-b-a-bengaluru",
    "live": true,
    "name": "Dr. Girisha B A",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/95/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gourav-sannyasi-kolkata",
    "live": true,
    "name": "Dr. Gourav Sannyasi",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/97/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-goutam-das-kolkata",
    "live": true,
    "name": "Dr. Goutam Das",
    "specialties": [
      "Medical Gastro"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/97/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-goutam-dutta-sarma-kolkata",
    "live": true,
    "name": "Dr. Goutam Dutta Sarma",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/97/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-goutam-saha-kolkata",
    "live": true,
    "name": "Dr. Goutam Saha",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/97/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-goutham-srinivas-bengaluru",
    "live": true,
    "name": "Dr. Goutham Srinivas",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Begur",
        "locality": "Begur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Begur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/97/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-govind-prasad-dubey-jaipur",
    "live": true,
    "name": "Dr. Govind Prasad Dubey",
    "specialties": [
      "Vascular and Endovascular Surgery"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/97/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gowtham-b-c-bengaluru",
    "live": true,
    "name": "Dr. Gowtham B C",
    "specialties": [
      "Paediatric Intensive Care Unit"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/97/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gowthami-k-l-bengaluru",
    "live": true,
    "name": "Dr. Gowthami K L",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/97/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gude-anupama-vijayawada",
    "live": true,
    "name": "Dr. Gude Anupama",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/97/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-guru-ravitheja-yerrabathina-bengaluru",
    "live": true,
    "name": "Dr. Guru Ravitheja Yerrabathina",
    "specialties": [
      "Paediatric Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/99/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gururaj-biradar-bengaluru",
    "live": true,
    "name": "Dr. Gururaj Biradar",
    "specialties": [
      "Paediatric And Child Care",
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/whitefield/doctors/dr-gururaj-biradar-consultant-pediatrics-picu-and-neonatology/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gurusangappa-s-mudagall-bengaluru",
    "live": true,
    "name": "Dr. Gurusangappa S. Mudagall",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/99/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gutta-lokesh-vijayawada",
    "live": true,
    "name": "Dr. Gutta Lokesh",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/99/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-gyanranjan-rout-bhubaneswar",
    "live": true,
    "name": "Dr. Gyanranjan Rout",
    "specialties": [
      "Gastrointestinal Science",
      "Medical Gastro"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/bhubaneswar/doctors/dr-gyanranjan-rout-gastroenterologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-h-shivananda-prabhu-mangaluru",
    "live": true,
    "name": "Dr. H Shivananda Prabhu",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/99/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harish-kv-bengaluru",
    "live": true,
    "name": "Dr. Harish KV",
    "specialties": [
      "Geriatric Medicine",
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/millersroad/doctors/dr-harish-k-v-consultant-physician-diabetologist-clinical-cardiologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harish-nayak-bengaluru",
    "live": true,
    "name": "Dr. Harish Nayak",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/101/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harish-raghavan-mangaluru",
    "live": true,
    "name": "Dr. Harish Raghavan",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/101/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harish-talreja-jaipur",
    "live": true,
    "name": "Dr. Harish Talreja",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/101/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harisha-p-n-bengaluru",
    "live": true,
    "name": "DR. HARISHA P N",
    "specialties": [
      "Spine Care",
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/yeshwanthpur/doctors/dr-harisha-p-n-consultant-neurosurgery/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harkunwar-singh-sidhu-bengaluru",
    "live": true,
    "name": "Dr. Harkunwar Singh Sidhu",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/101/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harneet-kaur-kohli-patiala",
    "live": true,
    "name": "Dr. Harneet Kaur Kohli",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/101/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-haroon-h-mangaluru",
    "live": true,
    "name": "Dr. Haroon H",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/101/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harpreet-kaur-bhubaneswar",
    "live": true,
    "name": "Dr. Harpreet Kaur",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/101/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harshavardhan-bengaluru",
    "live": true,
    "name": "Dr. Harshavardhan",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/103/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harshini-t-reddy-bengaluru",
    "live": true,
    "name": "Dr. Harshini T Reddy",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Indiranagar",
        "locality": "Indiranagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Indiranagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/103/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harshith-rao-bengaluru",
    "live": true,
    "name": "Dr. Harshith Rao",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/103/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harshitha-boyareddigari-bengaluru",
    "live": true,
    "name": "Dr. Harshitha Boyareddigari",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/103/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-harshitha-sridhar-bengaluru",
    "live": true,
    "name": "Dr. Harshitha Sridhar",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/103/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-hemant-k-kalyan-bengaluru",
    "live": true,
    "name": "Dr. Hemant K Kalyan",
    "specialties": [
      "Orthopaedics",
      "Robotic Assisted Surgery",
      "Sports Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-hemant-k-kalyan-consultant-orthopaedic-surgery/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-hemant-pandey-delhi",
    "live": true,
    "name": "Dr. Hemant Pandey",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/103/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-himanshu-gupta-jaipur",
    "live": true,
    "name": "Dr. Himanshu Gupta",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/105/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-hirak-suvra-majumdar-kolkata",
    "live": true,
    "name": "Dr. Hirak Suvra Majumdar",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/105/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-hirennappa-b-udnur-bengaluru",
    "live": true,
    "name": "Dr. Hirennappa B Udnur",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/105/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-hitendra-sharma-ghaziabad",
    "live": true,
    "name": "Dr. Hitendra Sharma",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/105/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-hitesh-hans-baweja-delhi",
    "live": true,
    "name": "Dr. Hitesh Hans Baweja",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/105/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-hm-madhukara-bengaluru",
    "live": true,
    "name": "Dr. HM Madhukara",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/105/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-hridish-narayan-chakravarti-kolkata",
    "live": true,
    "name": "Dr. Hridish Narayan Chakravarti",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/105/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-hrishikesh-vemula-bengaluru",
    "live": true,
    "name": "Dr. Hrishikesh Vemula",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/105/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-hrushikesh-mehata-pune",
    "live": true,
    "name": "Dr. Hrushikesh Mehata",
    "specialties": [
      "Orthopaedics",
      "Spine Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/kharadi/doctors/dr-hrushikesh-mehata-orthopaedic-spine-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-indranil-mukherjee-kolkata",
    "live": true,
    "name": "Dr. Indranil Mukherjee",
    "specialties": [
      "Paediatric And Child Care",
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/mukundapur/doctors/dr-indranil-mukherjee-neonatologist-and-pediatrician/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ipsita-batra-bengaluru",
    "live": true,
    "name": "Dr. Ipsita Batra",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/107/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-iresh-shetty-mangaluru",
    "live": true,
    "name": "Dr. Iresh Shetty",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/107/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-irina-dey-kolkata",
    "live": true,
    "name": "Dr. Irina Dey",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/107/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ishwar-keerthi-mangaluru",
    "live": true,
    "name": "Dr. Ishwar Keerthi",
    "specialties": [
      "Spine Care"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/107/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-itee-chowdhury-gurgaon",
    "live": true,
    "name": "Dr. Itee Chowdhury",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/107/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-j-jhansi-bengaluru",
    "live": true,
    "name": "Dr. J Jhansi",
    "specialties": [
      "Hematology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/107/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-j-jayabaskar-salem",
    "live": true,
    "name": "Dr. J. Jayabaskar",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/107/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-j-praveen-singh-peter-salem",
    "live": true,
    "name": "Dr. J. Praveen Singh Peter",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/107/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jalaja-k-r-bengaluru",
    "live": true,
    "name": "Dr. Jalaja K R",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/109/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jalpa-d-vashi-bengaluru",
    "live": true,
    "name": "Dr. Jalpa D Vashi",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/109/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jalpa-vashi-bengaluru",
    "live": true,
    "name": "Dr. Jalpa Vashi",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/109/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-janaki-ballava-pradhan-bhubaneswar",
    "live": true,
    "name": "Dr. Janaki Ballava Pradhan",
    "specialties": [
      "Paediatric And Child Care",
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/bhubaneswar/doctors/dr-janaki-ballava-pradhan-pediatrician-and-neonatologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-janardhana-t-bengaluru",
    "live": true,
    "name": "Dr. Janardhana T",
    "specialties": [
      "General Surgery",
      "Minimal Access Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-janardhana-t-surgical-gastroenterologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jasashwi-chakraborty-kolkata",
    "live": true,
    "name": "Dr. Jasashwi Chakraborty",
    "specialties": [
      "Hematology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/109/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jaskaran-singh-patiala",
    "live": true,
    "name": "DR. JASKARAN SINGH",
    "specialties": [
      "Spine Care",
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/patiala/doctors/dr-jaskaran-singh-senior-consultant-neurosurgery/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jayanta-kumar-saha-kolkata",
    "live": true,
    "name": "Dr. Jayanta Kumar Saha",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/111/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jayanth-sundar-sampath-bengaluru",
    "live": true,
    "name": "Dr. Jayanth Sundar Sampath",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/111/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jayanthi-t-v-bengaluru",
    "live": true,
    "name": "Dr. Jayanthi T V",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/111/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jayanti-v-mysuru",
    "live": true,
    "name": "Dr. Jayanti V",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/111/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jayaprakash-r-k-bengaluru",
    "live": true,
    "name": "Dr. Jayaprakash R K",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Brookefield",
        "locality": "Brookefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Brookefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/111/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jayaram-bn-mysuru",
    "live": true,
    "name": "Dr. Jayaram BN",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/111/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jayaraman-r-n-salem",
    "live": true,
    "name": "Dr. Jayaraman.R.N",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/111/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jayashankar-c-a-bengaluru",
    "live": true,
    "name": "Dr. Jayashankar C A",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/111/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jayashree-k-mangaluru",
    "live": true,
    "name": "Dr. Jayashree K",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/111/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jayita-chakrabarti-kolkata",
    "live": true,
    "name": "Dr. Jayita Chakrabarti",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/113/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jayjeet-lokhande-pune",
    "live": true,
    "name": "Dr. Jayjeet Lokhande",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/113/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jeedhu-radhakrishnan-mangaluru",
    "live": true,
    "name": "Dr. Jeedhu Radhakrishnan",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/113/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jemsy-jose-kolkata",
    "live": true,
    "name": "Dr. Jemsy Jose",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/113/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jisha-k-bengaluru",
    "live": true,
    "name": "Dr. Jisha K",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/113/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jishnu-banerjee-kolkata",
    "live": true,
    "name": "Dr. Jishnu Banerjee",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/113/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-joel-prasad-gl-bengaluru",
    "live": true,
    "name": "Dr. Joel Prasad GL",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/113/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-johan-sunny-mangaluru",
    "live": true,
    "name": "Dr. Johan Sunny",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/113/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jyoti-deb-kolkata",
    "live": true,
    "name": "Dr. Jyoti Deb",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/115/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jyoti-more-dhage-pune",
    "live": true,
    "name": "Dr. Jyoti More Dhage",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/115/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-jyoti-sharma-gurgaon",
    "live": true,
    "name": "Dr. Jyoti Sharma",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/115/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-k-m-k-varma-bengaluru",
    "live": true,
    "name": "Dr. K M K Varma",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/115/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-k-n-k-shetty-bengaluru",
    "live": true,
    "name": "Dr. K N K Shetty",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/115/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-k-n-sanman-mangaluru",
    "live": true,
    "name": "Dr. K N Sanman",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/115/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kajal-ganguly-kolkata",
    "live": true,
    "name": "Dr. Kajal Ganguly",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/117/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kalaichelvi-gopal-kolkata",
    "live": true,
    "name": "Dr. Kalaichelvi Gopal",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/117/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kallappa-baligeri-bengaluru",
    "live": true,
    "name": "Dr. Kallappa Baligeri",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/117/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kalpajit-banik-bengaluru",
    "live": true,
    "name": "Dr. Kalpajit Banik",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/117/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kamal-bhalla-bengaluru",
    "live": true,
    "name": "Dr. Kamal Bhalla",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/117/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kamal-goyal-delhi",
    "live": true,
    "name": "Dr. Kamal Goyal",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/117/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kamalakshi-g-bhat-mangaluru",
    "live": true,
    "name": "Dr. Kamalakshi G Bhat",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/117/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kamaldeep-singh-jaipur",
    "live": true,
    "name": "Dr. Kamaldeep Singh",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/117/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kamalesh-t-n-bengaluru",
    "live": true,
    "name": "Dr. Kamalesh T N",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/117/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-karan-annapur-kumarswamy-bengaluru",
    "live": true,
    "name": "Dr. Karan Annapur Kumarswamy",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/119/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-karan-b-karkera-bengaluru",
    "live": true,
    "name": "Dr. Karan B Karkera",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/119/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-karan-kukreja-bengaluru",
    "live": true,
    "name": "Dr. Karan Kukreja",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/119/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-karthick-ks-bengaluru",
    "live": true,
    "name": "Dr. Karthick KS",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/119/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-karthik-arigela-bengaluru",
    "live": true,
    "name": "Dr. Karthik Arigela",
    "specialties": [
      "Paediatric Intensive Care Unit"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/119/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-karthik-d-bengaluru",
    "live": true,
    "name": "Dr. Karthik D",
    "specialties": [
      "Orthopaedics",
      "Sports Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/sarjapurroad/doctors/dr-karthik-d-orthopaedic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-karthik-k-s-mangaluru",
    "live": true,
    "name": "Dr. Karthik K S",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/119/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-karthik-r-bengaluru",
    "live": true,
    "name": "Dr. Karthik R",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/119/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-karthik-vasudevan-bengaluru",
    "live": true,
    "name": "Dr. Karthik Vasudevan",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/119/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kaushic-a-bengaluru",
    "live": true,
    "name": "Dr. Kaushic A",
    "specialties": [
      "Anesthesiology",
      "Pain Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-kaushic-a-anaesthesia-and-pain-medicine-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kaushik-biswas-kolkata",
    "live": true,
    "name": "Dr. Kaushik Biswas",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/121/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kaushik-chandra-mallick-kolkata",
    "live": true,
    "name": "Dr. Kaushik Chandra Mallick",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/121/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kaushik-das-kolkata",
    "live": true,
    "name": "Dr. Kaushik Das",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/121/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kaushik-sinha-kolkata",
    "live": true,
    "name": "Dr. Kaushik Sinha",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/121/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kaustav-debnath-kolkata",
    "live": true,
    "name": "Dr. Kaustav Debnath",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/121/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kavana-k-c-bengaluru",
    "live": true,
    "name": "Dr. Kavana K C",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/121/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-keerthi-s-bengaluru",
    "live": true,
    "name": "Dr. Keerthi S",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Budigere",
        "locality": "Budigere",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Budigere",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/123/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-keerthiraj-b-mangaluru",
    "live": true,
    "name": "Dr. Keerthiraj B",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/123/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kelini-nitin-saolapurkar-bengaluru",
    "live": true,
    "name": "Dr. Kelini Nitin Saolapurkar",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/123/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-keshav-agarwal-ghaziabad",
    "live": true,
    "name": "Dr. Keshav Agarwal",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/123/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-keshav-das-sadhwani-ghaziabad",
    "live": true,
    "name": "Dr. Keshav Das Sadhwani",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/123/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-keshav-pai-mangaluru",
    "live": true,
    "name": "Dr. Keshav Pai",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/123/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-keshavamurthy-cb-mysuru",
    "live": true,
    "name": "Dr. Keshavamurthy CB",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/123/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-khushal-dhirajlal-shah-bengaluru",
    "live": true,
    "name": "Dr. Khushal Dhirajlal Shah",
    "specialties": [
      "Paediatric And Child Care",
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/yeshwanthpur/doctors/dr-khushal-dhirajlal-shah-consultant-neonatology-and-paediatrics/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kiran-s-khanapure-bengaluru",
    "live": true,
    "name": "Dr. Kiran. S. Khanapure",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/125/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kiranmoy-sarangi-delhi",
    "live": true,
    "name": "Dr. Kiranmoy Sarangi",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/125/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kirti-k-pradhan-bhubaneswar",
    "live": true,
    "name": "Dr. Kirti K Pradhan",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/125/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kisalay-saurav-jha-bengaluru",
    "live": true,
    "name": "DR. KISALAY SAURAV JHA",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/125/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kishan-panicker-g-bengaluru",
    "live": true,
    "name": "Dr. Kishan Panicker G",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/125/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kishore-gopal-das-bengaluru",
    "live": true,
    "name": "DR. KISHORE GOPAL DAS",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/125/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-krishnan-srinivasan-bengaluru",
    "live": true,
    "name": "Dr. Krishnan Srinivasan",
    "specialties": [
      "Plastic and Reconstructive Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/127/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-krishnasree-sasikumar-bengaluru",
    "live": true,
    "name": "Dr. Krishnasree Sasikumar",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/127/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-krithi-subhas-chandra-bengaluru",
    "live": true,
    "name": "Dr. Krithi Subhas Chandra",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/127/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-krithika-jagadish-bengaluru",
    "live": true,
    "name": "Dr. Krithika Jagadish",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/127/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-krithishree-s-s-mangaluru",
    "live": true,
    "name": "Dr. Krithishree S S",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/127/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kritika-agarwal-bengaluru",
    "live": true,
    "name": "Dr. Kritika Agarwal",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/127/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kritilaxmi-jha-bengaluru",
    "live": true,
    "name": "Dr. Kritilaxmi Jha",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/127/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kruthika-sridharan-bengaluru",
    "live": true,
    "name": "Dr. Kruthika Sridharan",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Indiranagar",
        "locality": "Indiranagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Indiranagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/127/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kshama-turankar-pune",
    "live": true,
    "name": "Dr. Kshama Turankar",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/127/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-kss-bhat-bengaluru",
    "live": true,
    "name": "Dr. KSS Bhat",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/127/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-l-sreenivasa-murthy-bengaluru",
    "live": true,
    "name": "Dr. L Sreenivasa Murthy",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/129/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lakhan-kashyap-pune",
    "live": true,
    "name": "Dr. Lakhan Kashyap",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/129/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lakshay-goel-ghaziabad",
    "live": true,
    "name": "Dr. Lakshay Goel",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/129/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lakshman-i-k-bengaluru",
    "live": true,
    "name": "Dr. Lakshman I K",
    "specialties": [
      "Spine Care",
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/yeshwanthpur/doctors/dr-lakshman-i-k-neurosurgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lakshmanan-c-bengaluru",
    "live": true,
    "name": "Dr. Lakshmanan C",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/129/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lakshmi-h-k-bengaluru",
    "live": true,
    "name": "Dr. Lakshmi H K",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/129/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lakshmi-narasimhan-r-mysuru",
    "live": true,
    "name": "Dr. Lakshmi Narasimhan R",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/129/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lalit-nemichand-bafna-delhi",
    "live": true,
    "name": "Dr. Lalit Nemichand Bafna",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/131/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lalit-sharma-jaipur",
    "live": true,
    "name": "Dr. Lalit Sharma",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/131/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-laxmi-narayan-sahoo-bhubaneswar",
    "live": true,
    "name": "Dr. Laxmi Narayan Sahoo",
    "specialties": [
      "Fetal Medicine"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/131/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-laxmidhar-parhi-bhubaneswar",
    "live": true,
    "name": "Dr. Laxmidhar Parhi",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/131/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-laxminarayan-tripathy-kolkata",
    "live": true,
    "name": "Dr. Laxminarayan Tripathy",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/131/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-leslie-ravi-kumar-bengaluru",
    "live": true,
    "name": "Dr. Leslie Ravi Kumar",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/131/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lingaraj-nath-bhubaneswar",
    "live": true,
    "name": "Dr. Lingaraj Nath",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/131/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lingaraju-a-p-bengaluru",
    "live": true,
    "name": "Dr. Lingaraju A. P.",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/131/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-lohith-s-bengaluru",
    "live": true,
    "name": "Dr. Lohith S",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/131/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-m-s-prasad-bengaluru",
    "live": true,
    "name": "Dr. M S Prasad",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/133/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-m-kabilan-salem",
    "live": true,
    "name": "Dr. M. Kabilan",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/133/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-m-l-sujatha-bengaluru",
    "live": true,
    "name": "Dr. M. L. Sujatha",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/133/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-m-prashanth-vijayawada",
    "live": true,
    "name": "Dr. M. Prashanth",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/133/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-m-subhasini-salem",
    "live": true,
    "name": "Dr. M. Subhasini",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/133/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-m-panduranga-kamath-mangaluru",
    "live": true,
    "name": "Dr. M.Panduranga Kamath",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/133/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-madamsetty-sri-divya-vijayawada",
    "live": true,
    "name": "Dr. Madamsetty Sri Divya",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/133/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-madhav-h-hande-bengaluru",
    "live": true,
    "name": "Dr. Madhav H Hande",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/133/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-madhav-kamath-m-mangaluru",
    "live": true,
    "name": "Dr. Madhav Kamath M",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/133/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-magesh-balakrishnan-bengaluru",
    "live": true,
    "name": "Dr. Magesh Balakrishnan",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/135/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mahesh-bagaria-jaipur",
    "live": true,
    "name": "Dr. Mahesh Bagaria",
    "specialties": [
      "Urology",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/jaipur/doctors/dr-mahesh-bagaria-urologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mahesh-m-bengaluru",
    "live": true,
    "name": "Dr. Mahesh M",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/135/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mahesh-prasad-agrawala-bhubaneswar",
    "live": true,
    "name": "Dr. Mahesh Prasad Agrawala",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/135/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mahesha-padyana-bengaluru",
    "live": true,
    "name": "Dr. Mahesha Padyana",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/135/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manas-chakrabarti-kolkata",
    "live": true,
    "name": "Dr. Manas Chakrabarti",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/137/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manas-kumar-mandal-kolkata",
    "live": true,
    "name": "Dr. Manas Kumar Mandal",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/137/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manas-ranjan-pradhan-bhubaneswar",
    "live": true,
    "name": "DR. MANAS RANJAN PRADHAN",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/137/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manas-ranjan-tripathy-bengaluru",
    "live": true,
    "name": "Dr. Manas Ranjan Tripathy",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/137/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manasa-hegde-bengaluru",
    "live": true,
    "name": "Dr. Manasa Hegde",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/137/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manikanda-prabhu-s-salem",
    "live": true,
    "name": "Dr. Manikanda Prabhu S",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/139/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manish-dutt-delhi",
    "live": true,
    "name": "Dr. Manish Dutt",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/139/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manish-goswami-rangapani",
    "live": true,
    "name": "Dr. Manish Goswami",
    "specialties": [
      "Surgical Oncology"
    ],
    "locations": [
      {
        "city": "Rangapani",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/139/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manish-madhav-siliguri",
    "live": true,
    "name": "Dr. Manish Madhav",
    "specialties": [
      "Paediatric Surgery"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/139/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manish-mukul-ghosh-kolkata",
    "live": true,
    "name": "Dr. Manish Mukul Ghosh",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/139/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manish-sharma-delhi",
    "live": true,
    "name": "Dr. Manish Sharma",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/139/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manisha-gupta-jaipur",
    "live": true,
    "name": "Dr. Manisha Gupta",
    "specialties": [
      "Obstetrics and Gynaecology",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/jaipur/doctors/dr-manisha-gupta-gynecologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manohar-pai-mangaluru",
    "live": true,
    "name": "Dr. Manohar Pai",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/141/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manohar-sakhare-pune",
    "live": true,
    "name": "Dr. Manohar Sakhare",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/141/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manoharan-b-bengaluru",
    "live": true,
    "name": "Dr. Manoharan B",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/141/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manoj-kolhe-pune",
    "live": true,
    "name": "Dr. Manoj Kolhe",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/141/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-manoj-kumar-a-n-bengaluru",
    "live": true,
    "name": "Dr. Manoj Kumar A N",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/141/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-marie-shalini-chico-bengaluru",
    "live": true,
    "name": "Dr. Marie Shalini Chico",
    "specialties": [
      "Paediatric And Child Care",
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/millersroad/doctors/dr-marie-shalini-chico-paediatrician-and-neonatologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mary-joseph-bengaluru",
    "live": true,
    "name": "Dr. Mary Joseph",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/143/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-matam-sri-anusha-bengaluru",
    "live": true,
    "name": "Dr. Matam Sri Anusha",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/143/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mayank-baid-kolkata",
    "live": true,
    "name": "Dr. Mayank Baid",
    "specialties": [
      "Urology",
      "Andrology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/broadway/doctors/dr-mayank-baid-urologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mayank-pathak-pune",
    "live": true,
    "name": "Dr. Mayank Pathak",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/143/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mayoor-vasant-prabhu-mangaluru",
    "live": true,
    "name": "Dr. Mayoor Vasant Prabhu",
    "specialties": [
      "Nephrology",
      "Dialysis OP",
      "Dialysis"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/mangalore/doctors/dr-mayoor-vasant-prabhu-consultant-nephrology/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mayukh-guha-siliguri",
    "live": true,
    "name": "Dr. Mayukh Guha",
    "specialties": [
      "Spine Care"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/143/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mayur-kamath-v-mangaluru",
    "live": true,
    "name": "Dr. Mayur Kamath V",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/143/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-menakaa-mohan-bengaluru",
    "live": true,
    "name": "Dr. Menakaa Mohan",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/145/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mervin-jonathan-israel-pune",
    "live": true,
    "name": "Dr. Mervin Jonathan Israel",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/145/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-merwin-samuel-a-salem",
    "live": true,
    "name": "Dr. Merwin Samuel A",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/145/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mimi-sarah-kuriakose-bengaluru",
    "live": true,
    "name": "Dr. Mimi Sarah Kuriakose",
    "specialties": [
      "Paediatric Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/145/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-minal-mohit-vohra-jaipur",
    "live": true,
    "name": "Dr. Minal Mohit Vohra",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/145/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mini-garg-bengaluru",
    "live": true,
    "name": "Dr. Mini Garg",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/145/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mohammad-abbas-bengaluru",
    "live": true,
    "name": "Dr. Mohammad Abbas",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/147/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mohammed-attaullah-khan-s-bengaluru",
    "live": true,
    "name": "DR. MOHAMMED ATTAULLAH KHAN S",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/147/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mohammed-fahad-khan-bengaluru",
    "live": true,
    "name": "Dr. Mohammed Fahad Khan",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/147/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mohammed-sadiq-bengaluru",
    "live": true,
    "name": "Dr. Mohammed Sadiq",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/147/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mohammed-shahid-ali-bengaluru",
    "live": true,
    "name": "Dr. Mohammed Shahid Ali",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/147/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-monideepa-dutta-kolkata",
    "live": true,
    "name": "Dr. Monideepa Dutta",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/149/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-monika-gupta-jaipur",
    "live": true,
    "name": "Dr. Monika Gupta",
    "specialties": [
      "Gastrointestinal Science",
      "Transfusion Medicine"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/jaipur/doctors/dr-monika-gupta-consultant-gastroenterologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-monika-pansari-bengaluru",
    "live": true,
    "name": "Dr. Monika Pansari",
    "specialties": [
      "Cancer Care/Oncology",
      "Gynaec Oncology",
      "Surgical Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-monika-pansari-surgical-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-monish-v-bengaluru",
    "live": true,
    "name": "Dr. Monish V",
    "specialties": [
      "Interventional Radiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/149/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mou-chatterjee-kolkata",
    "live": true,
    "name": "Dr. Mou Chatterjee",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/149/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-moumita-chatterjee-kolkata",
    "live": true,
    "name": "Dr. Moumita Chatterjee",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/149/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mounica-sri-bhavani-bengaluru",
    "live": true,
    "name": "Dr. Mounica Sri Bhavani",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Budigere",
        "locality": "Budigere",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Budigere",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/149/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-moupia-chakraborty-kolkata",
    "live": true,
    "name": "Dr. Moupia Chakraborty",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/149/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mridul-malhotra-delhi",
    "live": true,
    "name": "Dr. Mridul Malhotra",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/149/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mugdha-lakhotia-bengaluru",
    "live": true,
    "name": "Dr. Mugdha Lakhotia",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/151/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mugdha-shahi-bengaluru",
    "live": true,
    "name": "Dr. Mugdha Shahi",
    "specialties": [
      "Fetal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/151/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mukesh-chand-daderwal-jaipur",
    "live": true,
    "name": "Dr. Mukesh Chand Daderwal",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/151/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mukesh-ramnane-bengaluru",
    "live": true,
    "name": "Dr. Mukesh Ramnane",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/151/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mukesh-vijay-kolkata",
    "live": true,
    "name": "Dr. Mukesh Vijay",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/151/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mukta-agarwal-ghaziabad",
    "live": true,
    "name": "Dr. Mukta agarwal",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/151/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mukta-sachdev-bengaluru",
    "live": true,
    "name": "Dr. Mukta Sachdev",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/151/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mukta-shrivastava-bengaluru",
    "live": true,
    "name": "Dr. Mukta Shrivastava",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/151/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mukul-kumar-saha-kolkata",
    "live": true,
    "name": "Dr. Mukul Kumar Saha",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/151/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-mummadireddy-n-v-k-reddy-bengaluru",
    "live": true,
    "name": "Dr. Mummadireddy N V K Reddy",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/151/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-n-sandeep-vijayawada",
    "live": true,
    "name": "Dr. N. Sandeep",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/153/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-n-sreeprathi-salem",
    "live": true,
    "name": "Dr. N. Sreeprathi",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/153/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-n-gnana-sanker-salem",
    "live": true,
    "name": "Dr. N.Gnana Sanker",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/153/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nabankur-ghosh-kolkata",
    "live": true,
    "name": "Dr. Nabankur Ghosh",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/153/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nagaraj-a-r-bengaluru",
    "live": true,
    "name": "Dr. Nagaraj A. R.",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/153/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nagarjun-maulyavantham-nagaraj-bengaluru",
    "live": true,
    "name": "Dr. Nagarjun Maulyavantham Nagaraj",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/153/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nagendra-k-bengaluru",
    "live": true,
    "name": "Dr. Nagendra K",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/153/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nagesh-dhadge-pune",
    "live": true,
    "name": "Dr. Nagesh Dhadge",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/153/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nandini-a-s-bengaluru",
    "live": true,
    "name": "Dr. Nandini A. S",
    "specialties": [
      "Dermatology",
      "Onco-Dermatology Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-nandini-a-s-dermatologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nandini-biswas-kolkata",
    "live": true,
    "name": "Dr. Nandini Biswas",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/155/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nandini-devi-bengaluru",
    "live": true,
    "name": "Dr. Nandini Devi",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Manipal Indira Clinic",
        "locality": "Manipal Indira Clinic",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Manipal Indira Clinic",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/155/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nandish-h-s-bengaluru",
    "live": true,
    "name": "DR. NANDISH H S",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/155/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nanditha-rathinam-bengaluru",
    "live": true,
    "name": "Dr. Nanditha Rathinam",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/155/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nandu-nair-bengaluru",
    "live": true,
    "name": "Dr. Nandu Nair",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/155/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-navdeep-kaur-patiala",
    "live": true,
    "name": "Dr. Navdeep Kaur",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/157/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-naveen-kumar-gupta-kolkata",
    "live": true,
    "name": "Dr. Naveen Kumar Gupta",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/157/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-naveen-kumar-naik-bengaluru",
    "live": true,
    "name": "Dr. Naveen Kumar Naik",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/157/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-naveen-kumar-s-bengaluru",
    "live": true,
    "name": "Dr. Naveen Kumar S",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/157/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-naveen-m-nayak-bengaluru",
    "live": true,
    "name": "Dr. Naveen M Nayak",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/157/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-neeraj-agarwal-ghaziabad",
    "live": true,
    "name": "DR. NEERAJ AGARWAL",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/159/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-neeraj-agarwal-kolkata",
    "live": true,
    "name": "Dr. Neeraj Agarwal",
    "specialties": [
      "Cancer Care/Oncology",
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/em-bypass/doctors/dr-neeraj-agarwal-uro-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-neeraj-arora-patiala",
    "live": true,
    "name": "DR. NEERAJ ARORA",
    "specialties": [
      "Paediatric And Child Care",
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/patiala/doctors/dr-neeraj-arora-senior-consultant-paediatrics-neonatology/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-neha-ghaziabad",
    "live": true,
    "name": "Dr. Neha",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/159/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-neha-bhargava-bengaluru",
    "live": true,
    "name": "Dr. Neha Bhargava",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/159/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nihal-r-rai-bengaluru",
    "live": true,
    "name": "Dr. Nihal R Rai",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/161/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-niket-arora-kolkata",
    "live": true,
    "name": "Dr. Niket Arora",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/161/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nikheel-pansare-pune",
    "live": true,
    "name": "Dr. Nikheel Pansare",
    "specialties": [
      "Orthopaedics",
      "Orthopaedic Robotic Surgery"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/kharadi/doctors/dr-nikheel-pansare-consultant-orthopedics/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nikhil-c-bengaluru",
    "live": true,
    "name": "Dr. Nikhil C",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/161/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nikhil-jain-delhi",
    "live": true,
    "name": "Dr. Nikhil Jain",
    "specialties": [
      "Spine Care"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/161/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nikhil-patil-bengaluru",
    "live": true,
    "name": "Dr. Nikhil Patil",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/161/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nikhil-prasad-delhi",
    "live": true,
    "name": "Dr. Nikhil Prasad",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/161/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-niranjan-jayasheela-bengaluru",
    "live": true,
    "name": "Dr. Niranjan Jayasheela",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/163/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nirmalya-deb-kolkata",
    "live": true,
    "name": "Dr. Nirmalya Deb",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/163/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nirup-datta-kolkata",
    "live": true,
    "name": "Dr. Nirup Datta",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/163/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nischay-r-mysuru",
    "live": true,
    "name": "Dr. Nischay R",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/163/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nischith-d-s-bengaluru",
    "live": true,
    "name": "Dr. Nischith D S",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/163/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nisha-shetty-bengaluru",
    "live": true,
    "name": "Dr. Nisha Shetty",
    "specialties": [
      "Oral Maxillo Facial Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/163/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nishana-paul-rangapani",
    "live": true,
    "name": "Dr. Nishana Paul",
    "specialties": [
      "Medical Oncology"
    ],
    "locations": [
      {
        "city": "Rangapani",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/163/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nitin-s-shetty-bengaluru",
    "live": true,
    "name": "Dr. Nitin S Shetty",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/165/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nitin-swami-pune",
    "live": true,
    "name": "Dr. Nitin Swami",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/165/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nitish-kumar-das-siliguri",
    "live": true,
    "name": "Dr. Nitish Kumar Das",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/165/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nitish-ranjan-acharya-bhubaneswar",
    "live": true,
    "name": "Dr. Nitish Ranjan Acharya",
    "specialties": [
      "Surgical Oncology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/165/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nitti-kapoor-kaushal-patiala",
    "live": true,
    "name": "Dr. Nitti Kapoor Kaushal",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/165/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-nivedita-shetty-mysuru",
    "live": true,
    "name": "Dr. Nivedita Shetty",
    "specialties": [
      "Reproductive Medicine"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/165/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-niveditha-damodharan-bengaluru",
    "live": true,
    "name": "Dr. Niveditha Damodharan",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/165/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-p-padmakumar-bengaluru",
    "live": true,
    "name": "Dr. P. Padmakumar",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/167/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-p-ranganath-nayak-bengaluru",
    "live": true,
    "name": "Dr. P. Ranganath Nayak",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/167/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-p-sreenivasa-rao-bengaluru",
    "live": true,
    "name": "Dr. P. Sreenivasa Rao",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Indiranagar",
        "locality": "Indiranagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Indiranagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/167/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-padma-krishnan-bengaluru",
    "live": true,
    "name": "Dr. Padma Krishnan",
    "specialties": [
      "Paediatric And Child Care",
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/whitefield/doctors/dr-padma-krishnan-paediatrician-and-neonatologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-padmanabh-kamath-mangaluru",
    "live": true,
    "name": "Dr. Padmanabh Kamath",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/167/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pallab-chatterjee-kolkata",
    "live": true,
    "name": "Dr. Pallab Chatterjee",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/167/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pallavi-j-dhanapal-bengaluru",
    "live": true,
    "name": "Dr. Pallavi J Dhanapal",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Begur",
        "locality": "Begur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Begur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/167/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pallavi-joshi-bengaluru",
    "live": true,
    "name": "Dr. Pallavi Joshi",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/167/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-parijat-deb-choudhury-kolkata",
    "live": true,
    "name": "Dr. Parijat Deb Choudhury",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/169/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-paritosh-pandey-bengaluru",
    "live": true,
    "name": "Dr. Paritosh Pandey",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/169/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-paritosha-thakar-dalal-pune",
    "live": true,
    "name": "Dr. Paritosha Thakar Dalal",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/169/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-parmender-shokeen-delhi",
    "live": true,
    "name": "Dr. Parmender Shokeen",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/169/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-paromita-kanjilal-chakraborty-kolkata",
    "live": true,
    "name": "Dr. Paromita Kanjilal Chakraborty",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/169/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-paromita-roy-kolkata",
    "live": true,
    "name": "Dr. Paromita Roy",
    "specialties": [
      "Gynaec Oncology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/169/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-paromita-roy-chandra-kolkata",
    "live": true,
    "name": "Dr. Paromita Roy Chandra",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/169/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-paurav-dabas-gurgaon",
    "live": true,
    "name": "Dr. Paurav Dabas",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/171/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pavan-b-tambakad-bengaluru",
    "live": true,
    "name": "Dr. Pavan B Tambakad",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/171/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pavan-m-r-mangaluru",
    "live": true,
    "name": "Dr. Pavan M R",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/171/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pavan-n-vijayawada",
    "live": true,
    "name": "Dr. Pavan N",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/171/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pavan-sugoor-bengaluru",
    "live": true,
    "name": "Dr. Pavan Sugoor",
    "specialties": [
      "Cancer Care/Oncology",
      "Robotic Assisted Surgery",
      "Gynaec Oncology",
      "Surgical Oncology",
      "GI Surgery",
      "Minimal Access Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-pavan-sugoor-surgical-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pavankumar-p-rasalkar-bengaluru",
    "live": true,
    "name": "Dr. Pavankumar P Rasalkar",
    "specialties": [
      "Cardiology",
      "Heart Failure Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-pavankumar-p-rasalkar-interventional-cardiologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pavith-janardhan-t-bengaluru",
    "live": true,
    "name": "Dr. Pavith Janardhan T",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/171/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pavithra-r-bengaluru",
    "live": true,
    "name": "Dr. Pavithra R",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/171/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-piyali-chatterjee-kolkata",
    "live": true,
    "name": "Dr. Piyali Chatterjee",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/173/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-polly-chatterjee-kolkata",
    "live": true,
    "name": "Dr. Polly Chatterjee",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/173/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pooja-bajaj-bengaluru",
    "live": true,
    "name": "Dr. Pooja Bajaj",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/173/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pooja-gire-pune",
    "live": true,
    "name": "Dr. Pooja Gire",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/173/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pooja-jindal-bengaluru",
    "live": true,
    "name": "Dr. Pooja Jindal",
    "specialties": [
      "Paediatric And Child Care",
      "Paediatric Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-pooja-jindal-paediatric-neurologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pooja-u-k-bengaluru",
    "live": true,
    "name": "Dr. Pooja U K",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/173/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-poonam-patil-bengaluru",
    "live": true,
    "name": "Dr. Poonam Patil",
    "specialties": [
      "Cancer Care/Oncology",
      "Onco Wellness Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-poonam-patil-consultant-medical-oncology/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-poonam-santhosh-mangaluru",
    "live": true,
    "name": "Dr. Poonam Santhosh",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/173/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pradeep-kumar-dash-bhubaneswar",
    "live": true,
    "name": "Dr. Pradeep Kumar Dash",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/175/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pradeep-narayan-sahoo-bhubaneswar",
    "live": true,
    "name": "Dr. Pradeep Narayan Sahoo",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/175/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pradeep-s-salem",
    "live": true,
    "name": "Dr. Pradeep S",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/175/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pradeepkumar-jadhav-pune",
    "live": true,
    "name": "Dr. Pradeepkumar Jadhav",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/175/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pradeepta-kumar-sethy-kolkata",
    "live": true,
    "name": "Dr. Pradeepta Kumar Sethy",
    "specialties": [
      "Medical Gastro"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/175/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prakash-mahadevappa-veerappa-bengaluru",
    "live": true,
    "name": "DR. PRAKASH MAHADEVAPPA VEERAPPA",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/177/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prakruthi-n-bengaluru",
    "live": true,
    "name": "Dr. Prakruthi N",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/177/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pramod-bengaluru",
    "live": true,
    "name": "Dr. Pramod",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/177/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pramod-bhanudas-narkhede-pune",
    "live": true,
    "name": "Dr. Pramod Bhanudas Narkhede",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/177/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pramod-kumar-mangaluru",
    "live": true,
    "name": "Dr. Pramod Kumar",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/177/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pramod-kumar-delhi",
    "live": true,
    "name": "Dr. Pramod Kumar",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/177/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pramod-v-satya-bengaluru",
    "live": true,
    "name": "Dr. Pramod V. Satya",
    "specialties": [
      "Geriatric Medicine",
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/millersroad/doctors/dr-pramod-v-satya-consultant-internal-medicine/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prasenjit-sarkar-kolkata",
    "live": true,
    "name": "Dr. Prasenjit Sarkar",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/179/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prashant-bhatt-patiala",
    "live": true,
    "name": "Dr. Prashant Bhatt",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/179/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prashant-garg-jaipur",
    "live": true,
    "name": "Dr. Prashant Garg",
    "specialties": [
      "General Surgery",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/jaipur/doctors/dr-prashant-garg-consultant-general-surgery/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prashant-gite-pune",
    "live": true,
    "name": "Dr. Prashant Gite",
    "specialties": [
      "Interventional Radiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/179/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prashant-kumar-kolkata",
    "live": true,
    "name": "Dr. Prashant Kumar",
    "specialties": [
      "Medical Gastro"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/179/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prashanth-inna-bengaluru",
    "live": true,
    "name": "Dr. Prashanth Inna",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/179/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prashanth-k-k-bengaluru",
    "live": true,
    "name": "Dr. Prashanth K K",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/179/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prashanth-kalale-bengaluru",
    "live": true,
    "name": "Dr. Prashanth Kalale",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Begur",
        "locality": "Begur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Begur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/179/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pratibha-walde-pune",
    "live": true,
    "name": "Dr. Pratibha Walde",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/181/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pratik-agarwal-siliguri",
    "live": true,
    "name": "Dr. Pratik Agarwal",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/181/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pratima-raj-bengaluru",
    "live": true,
    "name": "Dr. Pratima Raj",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/181/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pratyush-miglani-bengaluru",
    "live": true,
    "name": "Dr. Pratyush Miglani",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/181/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-praveen-bharadwaj-bengaluru",
    "live": true,
    "name": "Dr. Praveen Bharadwaj",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/181/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-praveen-c-r-bengaluru",
    "live": true,
    "name": "Dr. Praveen C R",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/181/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-praveen-chandra-nayak-mangaluru",
    "live": true,
    "name": "Dr. Praveen Chandra Nayak",
    "specialties": [
      "Podiatric Surgery"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/181/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-praveen-kumar-a-v-bengaluru",
    "live": true,
    "name": "Dr. Praveen Kumar A V",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/181/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-preetham-r-acharya-mangaluru",
    "live": true,
    "name": "Dr. Preetham R Acharya",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/183/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-preethi-kumar-bengaluru",
    "live": true,
    "name": "Dr. Preethi Kumar",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/183/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-preeti-manmohan-galagali-bengaluru",
    "live": true,
    "name": "Dr. Preeti Manmohan Galagali",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/183/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-preksha-vijay-bengaluru",
    "live": true,
    "name": "Dr. Preksha Vijay",
    "specialties": [
      "Paediatric And Child Care",
      "Paediatric Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/yelahanka/doctors/dr-preksha-vijay-paediatric-orthopaedic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prem-kotian-mangaluru",
    "live": true,
    "name": "Dr. Prem Kotian",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/183/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prem-s-pais-bengaluru",
    "live": true,
    "name": "Dr. Prem S Pais",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/183/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-prerna-goenka-kolkata",
    "live": true,
    "name": "Dr. Prerna Goenka",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/183/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-priya-nair-bengaluru",
    "live": true,
    "name": "Dr. Priya Nair",
    "specialties": [
      "Anesthesiology",
      "Pain Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/hebbal/doctors/dr-priya-nair-anesthesiologist-and-chronic-pain-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-priya-rathi-pune",
    "live": true,
    "name": "Dr. Priya Rathi",
    "specialties": [
      "Pain Medicine"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/185/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-priya-s-bengaluru",
    "live": true,
    "name": "Dr. Priya s",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/185/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-priyabrata-adhikari-kolkata",
    "live": true,
    "name": "Dr. Priyabrata Adhikari",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/185/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-priyadarshan-k-bengaluru",
    "live": true,
    "name": "Dr. Priyadarshan K",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/185/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-priyadarshini-m-bengaluru",
    "live": true,
    "name": "DR. PRIYADARSHINI M",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/185/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-priyadharshini-k-bengaluru",
    "live": true,
    "name": "Dr. Priyadharshini K",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Indiranagar",
        "locality": "Indiranagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Indiranagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/185/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-priyamvadha-k-bengaluru",
    "live": true,
    "name": "Dr. Priyamvadha K",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/185/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-priyanka-chaudhary-gurgaon",
    "live": true,
    "name": "Dr. Priyanka Chaudhary",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/185/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pulakesh-sinha-kolkata",
    "live": true,
    "name": "Dr. Pulakesh Sinha",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/187/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-pundalik-baliga-mangaluru",
    "live": true,
    "name": "Dr. Pundalik Baliga",
    "specialties": [
      "Fetal Medicine"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/187/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-puneet-bansal-delhi",
    "live": true,
    "name": "Dr. Puneet Bansal",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/187/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-puneeth-b-s-bengaluru",
    "live": true,
    "name": "Dr. Puneeth B S",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/187/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-puneeth-kt-bengaluru",
    "live": true,
    "name": "Dr. Puneeth KT",
    "specialties": [
      "Interventional Radiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/187/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-puneeth-r-bengaluru",
    "live": true,
    "name": "Dr. Puneeth R",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/187/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-punith-k-gowda-bengaluru",
    "live": true,
    "name": "Dr. Punith K. Gowda",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/187/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rachita-chengappa-kolkata",
    "live": true,
    "name": "Dr. Rachita Chengappa",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/189/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-radha-s-rao-bengaluru",
    "live": true,
    "name": "Dr. Radha S Rao",
    "specialties": [
      "Obstetrics and Gynaecology",
      "Adolescent & Teen Health Clinic (Physical, Emotional, and Social Well-being)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-radha-s-rao-obstetrician-and-gyneacologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-radhakrishna-bhat-bengaluru",
    "live": true,
    "name": "Dr. Radhakrishna Bhat",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/189/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-radhakrishna-nayak-s-mangaluru",
    "live": true,
    "name": "Dr. Radhakrishna Nayak S",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/189/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-radhika-manohar-bengaluru",
    "live": true,
    "name": "Dr. Radhika Manohar",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/189/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-radhika-thappeta-bengaluru",
    "live": true,
    "name": "Dr. Radhika Thappeta",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/189/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-raeesa-tanveer-mysuru",
    "live": true,
    "name": "Dr. Raeesa Tanveer",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/189/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-raghavendra-b-goudar-bengaluru",
    "live": true,
    "name": "Dr. Raghavendra B Goudar",
    "specialties": [
      "MICU",
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-raghavendra-b-goudar-consultant-icu-critical-care-medicine/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-raghuveer-rao-bengaluru",
    "live": true,
    "name": "Dr. Raghuveer Rao",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/191/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rahiul-islam-kolkata",
    "live": true,
    "name": "Dr. Rahiul Islam",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/191/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rahul-chakraborty-kolkata",
    "live": true,
    "name": "Dr. Rahul Chakraborty",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/191/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rahul-chauhan-ghaziabad",
    "live": true,
    "name": "DR. RAHUL CHAUHAN",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/191/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rahul-dalal-pune",
    "live": true,
    "name": "Dr. Rahul Dalal",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/191/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rahul-jain-delhi",
    "live": true,
    "name": "Dr. Rahul Jain",
    "specialties": [
      "General Surgery",
      "Robotic Assisted Surgery",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-rahul-jain-minimal-access-and-robotic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rahul-naskar-kolkata",
    "live": true,
    "name": "Dr. Rahul Naskar",
    "specialties": [
      "General Surgery",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/em-bypass/doctors/dr-rahul-naskar-general-and-robotic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajarshi-roy-kolkata",
    "live": true,
    "name": "Dr. Rajarshi Roy",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/193/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajasekar-m-salem",
    "live": true,
    "name": "Dr. Rajasekar M",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/193/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajath-pejaver-bengaluru",
    "live": true,
    "name": "Dr. Rajath Pejaver",
    "specialties": [
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/193/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajavardhan-r-bengaluru",
    "live": true,
    "name": "Dr. Rajavardhan R",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/193/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajeev-pullagura-bengaluru",
    "live": true,
    "name": "Dr. Rajeev Pullagura",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/193/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajeev-raman-kolkata",
    "live": true,
    "name": "Dr. Rajeev Raman",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/193/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajendra-a-mangaluru",
    "live": true,
    "name": "Dr. Rajendra A",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/193/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajesh-kr-goel-kolkata",
    "live": true,
    "name": "Dr. Rajesh Kr. Goel",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/195/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajesh-kumar-kanoji-jaipur",
    "live": true,
    "name": "Dr. Rajesh Kumar Kanoji",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/195/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajesh-kumar-more-kolkata",
    "live": true,
    "name": "Dr. Rajesh Kumar More",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/195/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajesh-kumar-singh-ranchi",
    "live": true,
    "name": "Dr. Rajesh Kumar Singh",
    "specialties": [
      "ICU and Critical Care",
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/ranchi/doctors/dr-rajesh-kumar-singh-critical-care-medicine-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajesh-srinivas-bengaluru",
    "live": true,
    "name": "Dr. Rajesh Srinivas",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/195/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajeshwari-janakiraman-bengaluru",
    "live": true,
    "name": "Dr. Rajeshwari Janakiraman",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/195/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rajib-basu-kolkata",
    "live": true,
    "name": "Dr. Rajib Basu",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/195/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rakesh-khan-kolkata",
    "live": true,
    "name": "Dr. Rakesh Khan",
    "specialties": [
      "General Surgery",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/broadway/doctors/dr-rakesh-khan-general-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rakesh-kumar-thakur-ranchi",
    "live": true,
    "name": "Dr. Rakesh Kumar Thakur",
    "specialties": [
      "Transfusion Medicine"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/197/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rakesh-ranjan-pune",
    "live": true,
    "name": "Dr. Rakesh Ranjan",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/197/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rakhi-jha-ranchi",
    "live": true,
    "name": "Dr. Rakhi Jha",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/197/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ramakrishna-vangara-vijayawada",
    "live": true,
    "name": "Dr. RamaKrishna Vangara",
    "specialties": [
      "Cancer Care/Oncology",
      "Breast Cancer Clinic"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/vijayawada/doctors/dr-ramakrishna-vangara-radiation-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ramakrishnaiah-manjunath-bengaluru",
    "live": true,
    "name": "Dr. Ramakrishnaiah Manjunath",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/197/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ramesh-jois-bengaluru",
    "live": true,
    "name": "DR. RAMESH JOIS",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/197/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ranjan-kumar-das-kolkata",
    "live": true,
    "name": "Dr. Ranjan Kumar Das",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/199/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ranjan-sarkar-kolkata",
    "live": true,
    "name": "Dr. Ranjan Sarkar",
    "specialties": [
      "Nephrology",
      "Dialysis"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/broadway/doctors/dr-ranjan-sarkar-nephrologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ranjana-becon-ghaziabad",
    "live": true,
    "name": "Dr. Ranjana Becon",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/199/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ranjana-tibrewal-kolkata",
    "live": true,
    "name": "Dr. Ranjana Tibrewal",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/199/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ranjeet-bondar-pune",
    "live": true,
    "name": "Dr. Ranjeet Bondar",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/199/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ranjeeta-adhikary-bengaluru",
    "live": true,
    "name": "Dr. Ranjeeta Adhikary",
    "specialties": [
      "Laboratory Medicine",
      "Microbiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-ranjeeta-adhikary-microbiologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ranjit-shetty-mangaluru",
    "live": true,
    "name": "Dr. Ranjit Shetty",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/199/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ranjitha-ns-bengaluru",
    "live": true,
    "name": "Dr. Ranjitha NS",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Begur",
        "locality": "Begur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Begur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/199/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rashika-reddy-bengaluru",
    "live": true,
    "name": "Dr. Rashika Reddy",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/199/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rashmi-bhamare-pune",
    "live": true,
    "name": "Dr. Rashmi Bhamare",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/199/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rashmi-t-n-bengaluru",
    "live": true,
    "name": "Dr. Rashmi T. N.",
    "specialties": [
      "Obstetrics and Gynaecology",
      "Adolescent & Teen Health Clinic (Physical, Emotional, and Social Well-being)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-rashmi-t-n-obstetrician-and-gynaecologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ratnavalli-subbarao-bengaluru",
    "live": true,
    "name": "Dr. Ratnavalli Subbarao",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/201/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ratti-dilip-kumar-vijayawada",
    "live": true,
    "name": "Dr. Ratti Dilip Kumar",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/201/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ravi-d-vijayawada",
    "live": true,
    "name": "Dr. Ravi D",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/201/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ravi-kiran-c-s-bengaluru",
    "live": true,
    "name": "Dr. Ravi Kiran C S",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/201/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ravikiran-h-g-mysuru",
    "live": true,
    "name": "Dr. Ravikiran H G",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/203/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ravikumar-h-bengaluru",
    "live": true,
    "name": "Dr. Ravikumar H",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/203/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ravikumar-v-n-bengaluru",
    "live": true,
    "name": "Dr. Ravikumar V N",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/203/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ravinder-vurakaranam-bengaluru",
    "live": true,
    "name": "Dr. Ravinder Vurakaranam",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/203/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ravindra-mukkunda-bengaluru",
    "live": true,
    "name": "Dr. Ravindra Mukkunda",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/203/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ravitej-s-bengaluru",
    "live": true,
    "name": "Dr. Ravitej S",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/203/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ravneet-joshi-bengaluru",
    "live": true,
    "name": "Dr. Ravneet Joshi",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/203/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-reba-roy-siliguri",
    "live": true,
    "name": "Dr. Reba Roy",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/203/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ria-emmanuel-bengaluru",
    "live": true,
    "name": "Dr. Ria Emmanuel",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/205/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-richa-singh-bengaluru",
    "live": true,
    "name": "Dr. Richa Singh",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/205/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-richard-narjinary-siliguri",
    "live": true,
    "name": "Dr. Richard Narjinary",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/205/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rishab-sharma-jaipur",
    "live": true,
    "name": "Dr. Rishab Sharma",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/205/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rishabh-gothi-bengaluru",
    "live": true,
    "name": "Dr. Rishabh Gothi",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/205/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rishu-mishra-gurgaon",
    "live": true,
    "name": "Dr. Rishu Mishra",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/205/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rita-dash-bhubaneswar",
    "live": true,
    "name": "Dr. Rita Dash",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/205/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rita-mukherjee-bengaluru",
    "live": true,
    "name": "Dr. Rita Mukherjee",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/205/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rituparna-biswas-kolkata",
    "live": true,
    "name": "Dr. Rituparna Biswas",
    "specialties": [
      "Radiotherapy (Oncology Radiation)"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/207/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rituparna-das-kolkata",
    "live": true,
    "name": "Dr. Rituparna Das",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/207/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ritwik-ganguli-kolkata",
    "live": true,
    "name": "Dr. Ritwik Ganguli",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/207/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rockey-katheria-bengaluru",
    "live": true,
    "name": "Dr. Rockey Katheria",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/207/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rohan-chougule-pune",
    "live": true,
    "name": "Dr. Rohan Chougule",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/207/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rohan-nambiar-bengaluru",
    "live": true,
    "name": "Dr. Rohan Nambiar",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/207/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rohani-malhotra-patiala",
    "live": true,
    "name": "Dr. Rohani Malhotra",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/207/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-roopa-murgod-bengaluru",
    "live": true,
    "name": "Dr. Roopa Murgod",
    "specialties": [
      "Laboratory Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/209/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-roopa-vernekar-bengaluru",
    "live": true,
    "name": "Dr. Roopa Vernekar",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/209/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-roopesh-narayanachary-mysuru",
    "live": true,
    "name": "Dr. Roopesh Narayanachary",
    "specialties": [
      "Gynaec Oncology"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/209/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rucha-karad-pune",
    "live": true,
    "name": "Dr. Rucha Karad",
    "specialties": [
      "Infectious Disease"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/209/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ruchira-beri-khanna-pune",
    "live": true,
    "name": "Dr. Ruchira Beri Khanna",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/209/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-rudresha-ah-bengaluru",
    "live": true,
    "name": "Dr. Rudresha AH",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/209/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-s-k-moinuddin-chisty-vijayawada",
    "live": true,
    "name": "Dr. S K Moinuddin Chisty",
    "specialties": [
      "Paediatric Cardiology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/211/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-s-kishore-babu-bengaluru",
    "live": true,
    "name": "Dr. S Kishore Babu",
    "specialties": [
      "Dialysis",
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-kishore-s-babu-senior-consultant-nephrology-transplant-physician/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-s-l-sagar-reddy-bengaluru",
    "live": true,
    "name": "Dr. S L Sagar Reddy",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/211/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-s-maryam-ahmad-rangapani",
    "live": true,
    "name": "Dr. S Maryam Ahmad",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Rangapani",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/211/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-s-murali-bengaluru",
    "live": true,
    "name": "Dr. S Murali",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/211/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-s-vijay-salem",
    "live": true,
    "name": "Dr. S Vijay",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/211/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-s-sivaraj-salem",
    "live": true,
    "name": "Dr. S. Sivaraj",
    "specialties": [
      "Spine Care"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/211/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-s-k-mandal-kolkata",
    "live": true,
    "name": "Dr. S.K. Mandal",
    "specialties": [
      "Radiotherapy (Oncology Radiation)"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/211/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sachin-reddy-bengaluru",
    "live": true,
    "name": "Dr. Sachin Reddy",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/213/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sachin-subbaraya-bengaluru",
    "live": true,
    "name": "Dr. Sachin Subbaraya",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/213/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sadajit-banerjee-kolkata",
    "live": true,
    "name": "Dr. Sadajit Banerjee",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/213/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sadasivan-s-iyer-bengaluru",
    "live": true,
    "name": "Dr. Sadasivan S Iyer",
    "specialties": [
      "Anesthesiology",
      "Pain Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-sadasivan-s-iyer-consultant-anaesthesia-and-pain-management/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sagar-bhattad-bengaluru",
    "live": true,
    "name": "Dr. Sagar Bhattad",
    "specialties": [
      "Paediatric And Child Care",
      "Paediatric Oncology and BMT",
      "Paediatric Immunology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/yelahanka/doctors/dr-sagar-bhattad-paediatric-immunologist-and-rheumatologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sagar-daiv-pune",
    "live": true,
    "name": "Dr. Sagar Daiv",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/213/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sagar-sen-kolkata",
    "live": true,
    "name": "Dr. Sagar Sen",
    "specialties": [
      "Surgical Oncology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/213/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sagar-tyagi-delhi",
    "live": true,
    "name": "Dr. Sagar Tyagi",
    "specialties": [
      "Interventional Radiology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/213/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-saiprasad-sahoo-bhubaneswar",
    "live": true,
    "name": "Dr. Saiprasad Sahoo",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/215/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sajjan-shenoy-mangaluru",
    "live": true,
    "name": "Dr. Sajjan Shenoy",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/215/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-saleena-vaidya-pune",
    "live": true,
    "name": "Dr. Saleena Vaidya",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/215/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-salil-yadav-gurgaon",
    "live": true,
    "name": "Dr. Salil Yadav",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/215/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-salman-qutub-khan-bengaluru",
    "live": true,
    "name": "Dr. Salman Qutub Khan",
    "specialties": [
      "Vascular and Endovascular Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/215/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-samarasimha-reddy-d-vijayawada",
    "live": true,
    "name": "Dr. Samarasimha Reddy D",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/215/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-samit-parua-siliguri",
    "live": true,
    "name": "Dr. Samit Parua",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/217/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sampat-kumar-shettigar-bengaluru",
    "live": true,
    "name": "Dr. Sampat Kumar Shettigar",
    "specialties": [
      "Paediatric And Child Care",
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/whitefield/doctors/dr-sampat-kumar-shettigar-paediatrician-and-neonatologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sampath-kumar-m-n-bengaluru",
    "live": true,
    "name": "Dr. Sampath Kumar M N",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/217/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-samreen-yusuf-bengaluru",
    "live": true,
    "name": "Dr. Samreen Yusuf",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/217/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sana-althaf-hussain-bengaluru",
    "live": true,
    "name": "Dr. Sana Althaf Hussain",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/217/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sanandam-sarkar-kolkata",
    "live": true,
    "name": "Dr. Sanandam Sarkar",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/217/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sanchila-talukdar-kolkata",
    "live": true,
    "name": "Dr. Sanchila Talukdar",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/217/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sandeep-thakkar-patiala",
    "live": true,
    "name": "DR. SANDEEP THAKKAR",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/217/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sandeep-chakraborty-kolkata",
    "live": true,
    "name": "Dr. Sandeep Chakraborty",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/217/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sandeep-dixit-bengaluru",
    "live": true,
    "name": "Dr. Sandeep Dixit",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/217/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sandhya-a-bengaluru",
    "live": true,
    "name": "Dr. Sandhya A",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/219/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sandhya-balasubramanyan-bengaluru",
    "live": true,
    "name": "DR. Sandhya Balasubramanyan",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/219/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sandhya-nayak-bengaluru",
    "live": true,
    "name": "Dr. Sandhya Nayak",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/219/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sandip-kumar-manna-kolkata",
    "live": true,
    "name": "Dr. Sandip Kumar Manna",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/219/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sandip-sardar-kolkata",
    "live": true,
    "name": "Dr. Sandip Sardar",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/219/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sandip-sen-siliguri",
    "live": true,
    "name": "Dr. Sandip Sen",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/219/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sandipta-ray-kolkata",
    "live": true,
    "name": "Dr. Sandipta Ray",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/219/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sanjay-garg-ghaziabad",
    "live": true,
    "name": "DR. SANJAY GARG",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/221/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sanjay-kapoor-gurgaon",
    "live": true,
    "name": "Dr. Sanjay Kapoor",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/221/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sanjay-maitra-kolkata",
    "live": true,
    "name": "Dr. Sanjay Maitra",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/221/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sanjay-rao-bengaluru",
    "live": true,
    "name": "Dr. Sanjay Rao",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/221/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sanjay-sharma-jaipur",
    "live": true,
    "name": "Dr. Sanjay Sharma",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/221/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sanjeet-s-b-bengaluru",
    "live": true,
    "name": "DR. SANJEET S B",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/221/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sanjeev-kumar-jain-ghaziabad",
    "live": true,
    "name": "Dr. Sanjeev Kumar Jain",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/221/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-santhoshkumar-bandegudda-bengaluru",
    "live": true,
    "name": "Dr. Santhoshkumar Bandegudda",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/223/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-santi-brata-ray-kolkata",
    "live": true,
    "name": "Dr. Santi Brata Ray",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/223/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-santosh-atmanand-revankar-bengaluru",
    "live": true,
    "name": "DR. SANTOSH ATMANAND REVANKAR",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/223/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-santosh-kumar-bengaluru",
    "live": true,
    "name": "Dr. Santosh Kumar",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/223/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-santosh-n-bengaluru",
    "live": true,
    "name": "Dr. Santosh N",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/223/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sariya-m-j-bengaluru",
    "live": true,
    "name": "Dr. Sariya M J",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/225/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sarmishtha-chakrabarti-kolkata",
    "live": true,
    "name": "Dr. Sarmishtha Chakrabarti",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/225/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sarmistha-sinha-kolkata",
    "live": true,
    "name": "Dr. Sarmistha Sinha",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/225/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sarthak-patnaik-bhubaneswar",
    "live": true,
    "name": "Dr. Sarthak Patnaik",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/225/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sasi-kumar-k-k-salem",
    "live": true,
    "name": "Dr. Sasi Kumar K K",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/225/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sasirekha-d-mysuru",
    "live": true,
    "name": "Dr. Sasirekha D",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/225/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sasmitha-k-bengaluru",
    "live": true,
    "name": "Dr. Sasmitha K",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/225/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-satish-kumar-m-g-mysuru",
    "live": true,
    "name": "Dr. Satish Kumar M.G",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/227/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-satish-mane-pune",
    "live": true,
    "name": "Dr. Satish Mane",
    "specialties": [
      "Orthopaedics",
      "Hand and Upper Limb Surgery"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/baner/doctors/dr-satish-mane-hand-and-upper-limb-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-satish-rao-kalanje-bengaluru",
    "live": true,
    "name": "DR. SATISH RAO KALANJE",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/227/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-satish-sawant-pune",
    "live": true,
    "name": "Dr. Satish Sawant",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/227/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-satish-sharma-ranchi",
    "live": true,
    "name": "Dr. Satish Sharma",
    "specialties": [
      "Medical Oncology"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/227/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-satish-t-bengaluru",
    "live": true,
    "name": "Dr. Satish T",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/227/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-satwant-sachdeva-patiala",
    "live": true,
    "name": "Dr. Satwant Sachdeva",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/227/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-satya-narayana-mandalapu-vijayawada",
    "live": true,
    "name": "Dr. Satya Narayana Mandalapu",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/227/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-saurabh-arora-delhi",
    "live": true,
    "name": "Dr. Saurabh Arora",
    "specialties": [
      "Nuclear Medicine"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/229/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-saurabh-gupta-ghaziabad",
    "live": true,
    "name": "Dr. Saurabh Gupta",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/229/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-saurabh-khiste-pune",
    "live": true,
    "name": "Dr. Saurabh Khiste",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/229/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-saurabh-r-pendhari-pune",
    "live": true,
    "name": "Dr. Saurabh R. Pendhari",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/229/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-saurabh-sharma-gurgaon",
    "live": true,
    "name": "Dr. Saurabh Sharma",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/229/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-saurabh-toppo-ranchi",
    "live": true,
    "name": "Dr. Saurabh Toppo",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/229/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-saurajit-patnaik-bhubaneswar",
    "live": true,
    "name": "Dr. Saurajit Patnaik",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/229/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-saurav-das-kolkata",
    "live": true,
    "name": "Dr. Saurav Das",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/229/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-saurav-singh-delhi",
    "live": true,
    "name": "Dr. Saurav Singh",
    "specialties": [
      "Neurology",
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-saurav-singh-neuroanaesthesiologist-and-neurointensivist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shaheen-akhtar-mysuru",
    "live": true,
    "name": "Dr. Shaheen Akhtar",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/231/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shaik-javed-hussain-bengaluru",
    "live": true,
    "name": "Dr. Shaik Javed Hussain",
    "specialties": [
      "Bariatric Surgery | Weight loss surgery",
      "General Surgery",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/electronicscity/doctors/dr-shaik-javed-hussain-robotic-and-laparoscopic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shaila-shamanur-bhattacharyya-bengaluru",
    "live": true,
    "name": "Dr. Shaila Shamanur Bhattacharyya",
    "specialties": [
      "Paediatric And Child Care",
      "Paediatric Endocrinology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-shaila-shamanur-bhattacharyya-general-paediatrics-child-care/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shailaja-n-bengaluru",
    "live": true,
    "name": "Dr. Shailaja N",
    "specialties": [
      "Obstetrics and Gynaecology",
      "Uro-Gynaecology Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-shailaja-n-obg-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shailendra-mohan-shukla-ranchi",
    "live": true,
    "name": "Dr. Shailendra Mohan Shukla",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/231/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shakeb-hasan-kolkata",
    "live": true,
    "name": "Dr. Shakeb Hasan",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/231/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shaktirupa-chakrabarty-kolkata",
    "live": true,
    "name": "Dr. Shaktirupa Chakrabarty",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/231/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shankar-desai-bengaluru",
    "live": true,
    "name": "Dr. Shankar Desai",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/233/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shankar-kumar-bengaluru",
    "live": true,
    "name": "Dr. Shankar Kumar",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/233/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shankar-kurpad-bengaluru",
    "live": true,
    "name": "Dr. Shankar Kurpad",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/233/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shankar-rao-u-vijayawada",
    "live": true,
    "name": "Dr. Shankar Rao U",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/233/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shankar-v-bengaluru",
    "live": true,
    "name": "Dr. Shankar V",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/233/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shankarappa-kabber-bengaluru",
    "live": true,
    "name": "Dr. Shankarappa Kabber",
    "specialties": [
      "Internal Medicine",
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/malleshwaram/doctors/dr-shankarappa-kabber-consultant-intensivist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shankha-shubhra-chaudhuri-kolkata",
    "live": true,
    "name": "Dr. Shankha Shubhra Chaudhuri",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/233/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shankhneel-singh-ranchi",
    "live": true,
    "name": "Dr. Shankhneel Singh",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/233/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shashanka-dhanuka-kolkata",
    "live": true,
    "name": "Dr. Shashanka Dhanuka",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/235/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shashi-vadhan-bengaluru",
    "live": true,
    "name": "Dr. Shashi Vadhan",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/235/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shashidhar-b-bengaluru",
    "live": true,
    "name": "Dr. Shashidhar B",
    "specialties": [
      "Andrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/235/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shashidhar-vishwanath-bengaluru",
    "live": true,
    "name": "Dr. Shashidhar Vishwanath",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/235/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shashidhara-g-matta-bengaluru",
    "live": true,
    "name": "Dr. Shashidhara G Matta",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/235/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shashikala-hande-bengaluru",
    "live": true,
    "name": "Dr. Shashikala Hande",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/235/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shashikala-ksheerasagar-bengaluru",
    "live": true,
    "name": "Dr. Shashikala Ksheerasagar",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/235/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shashikant-apte-pune",
    "live": true,
    "name": "Dr. Shashikant Apte",
    "specialties": [
      "Bone Marrow Transplantation"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/235/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shashikiran-r-bengaluru",
    "live": true,
    "name": "Dr. Shashikiran R",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/235/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shaswati-sengupta-datta-kolkata",
    "live": true,
    "name": "Dr. Shaswati Sengupta Datta",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/235/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shibani-devi-bhubaneswar",
    "live": true,
    "name": "Dr. Shibani Devi",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/237/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shibsankar-sarkar-kolkata",
    "live": true,
    "name": "Dr. Shibsankar Sarkar",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/237/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shilpa-h-bengaluru",
    "live": true,
    "name": "Dr. Shilpa H",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/237/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shilpa-shetty-bengaluru",
    "live": true,
    "name": "Dr. Shilpa Shetty",
    "specialties": [
      "Dialysis",
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-shilpa-shetty-consultant-nephrologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shipra-kunwar-pune",
    "live": true,
    "name": "Dr. Shipra Kunwar",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/237/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shivananda-pai-mangaluru",
    "live": true,
    "name": "Dr. Shivananda Pai",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/239/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shivangi-mishra-bengaluru",
    "live": true,
    "name": "Dr. Shivangi Mishra",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/239/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shivangi-negi-delhi",
    "live": true,
    "name": "Dr. Shivangi Negi",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/239/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shivani-jha-bengaluru",
    "live": true,
    "name": "Dr. Shivani Jha",
    "specialties": [
      "Kidney Transplant"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Sarjapur",
        "locality": "Sarjapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Sarjapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/239/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shivaprasad-g-s-bengaluru",
    "live": true,
    "name": "Dr. Shivaprasad G S",
    "specialties": [
      "General Surgery",
      "Robotic Assisted Surgery",
      "Minimal Access Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-shivaprasad-g-s-gastro-and-general-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shivashankar-r-bengaluru",
    "live": true,
    "name": "Dr. Shivashankar R",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/239/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shreya-michelle-rasquinha-bengaluru",
    "live": true,
    "name": "Dr. Shreya Michelle Rasquinha",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Indiranagar",
        "locality": "Indiranagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Indiranagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/241/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shreyas-umesh-akki-bengaluru",
    "live": true,
    "name": "Dr. Shreyas Umesh Akki",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/241/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shrinath-p-shetty-mangaluru",
    "live": true,
    "name": "Dr. Shrinath P Shetty",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/241/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shriniwas-kulkarni-pune",
    "live": true,
    "name": "Dr. Shriniwas Kulkarni",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/241/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shruthi-p-bengaluru",
    "live": true,
    "name": "Dr. Shruthi P",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/241/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shruti-gupta-bengaluru",
    "live": true,
    "name": "Dr. Shruti Gupta",
    "specialties": [
      "Laboratory Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/241/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shyam-behari-shrivastava-gurgaon",
    "live": true,
    "name": "Dr. Shyam Behari Shrivastava",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/243/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shyam-duvuru-bengaluru",
    "live": true,
    "name": "Dr. Shyam Duvuru",
    "specialties": [
      "Spine Care",
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/electronicscity/doctors/dr-shyam-duvuru-neurosurgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shyam-sunder-nowal-jaipur",
    "live": true,
    "name": "Dr. Shyam Sunder Nowal",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/243/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shyamal-chowdhury-kolkata",
    "live": true,
    "name": "Dr. Shyamal Chowdhury",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/243/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-shyamala-n-bengaluru",
    "live": true,
    "name": "Dr. Shyamala. N",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/243/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-siddharth-jai-singh-siliguri",
    "live": true,
    "name": "Dr. Siddharth Jai Singh",
    "specialties": [
      "Urology",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/siliguri/doctors/dr-siddharth-jai-singh-urologist-andrologist-laparoscopic-and-renal-transplant-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sindhu-m-v-bengaluru",
    "live": true,
    "name": "Dr. Sindhu M V",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/245/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sindhu-v-bengaluru",
    "live": true,
    "name": "Dr. Sindhu V",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/245/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-siri-ganesh-mangaluru",
    "live": true,
    "name": "DR. SIRI GANESH",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/245/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sita-rajan-bengaluru",
    "live": true,
    "name": "Dr. Sita Rajan",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/245/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sk-hammadur-rahaman-kolkata",
    "live": true,
    "name": "Dr. Sk Hammadur Rahaman",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/245/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sk-majarul-islam-kolkata",
    "live": true,
    "name": "Dr. Sk Majarul Islam",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/245/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sk-md-amanur-rahaman-kolkata",
    "live": true,
    "name": "Dr. SK MD Amanur Rahaman",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/245/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sohini-chakrabarti-bengaluru",
    "live": true,
    "name": "Dr. Sohini Chakrabarti",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/247/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-somanna-bengaluru",
    "live": true,
    "name": "Dr. Somanna",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/247/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-somashekara-h-s-mangaluru",
    "live": true,
    "name": "Dr. Somashekara H. S",
    "specialties": [
      "Audiology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/247/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-somnath-dey-kolkata",
    "live": true,
    "name": "Dr. Somnath Dey",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/247/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-somnath-ghosh-kolkata",
    "live": true,
    "name": "Dr. Somnath Ghosh",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/247/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-somnath-mitra-bengaluru",
    "live": true,
    "name": "Dr. Somnath Mitra",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/247/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-somnath-mukhopadhay-kolkata",
    "live": true,
    "name": "Dr. Somnath Mukhopadhay",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/247/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-somsubhra-pal-siliguri",
    "live": true,
    "name": "Dr. Somsubhra Pal",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/247/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sonali-dey-kolkata",
    "live": true,
    "name": "DR. SONALI DEY",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/247/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-soumya-kanti-datta-kolkata",
    "live": true,
    "name": "Dr. Soumya Kanti Datta",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/249/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-soumya-kanti-dutta-kolkata",
    "live": true,
    "name": "Dr. Soumya Kanti Dutta",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/249/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-soundarya-mangaluru",
    "live": true,
    "name": "Dr. Soundarya",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/249/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-souptik-gangopadhyay-kolkata",
    "live": true,
    "name": "Dr. Souptik Gangopadhyay",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/249/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-soura-sekhar-saha-kolkata",
    "live": true,
    "name": "Dr. Soura Sekhar Saha",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/249/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sourabh-dutta-kolkata",
    "live": true,
    "name": "Dr. Sourabh Dutta",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/249/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sowmya-m-bengaluru",
    "live": true,
    "name": "Dr. Sowmya M",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/251/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-spurthi-k-mysuru",
    "live": true,
    "name": "Dr. Spurthi K",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/251/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-spurthy-p-bengaluru",
    "live": true,
    "name": "Dr. Spurthy P",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Indiranagar",
        "locality": "Indiranagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Indiranagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/251/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sravan-kumar-bodepudi-vijayawada",
    "live": true,
    "name": "Dr. Sravan Kumar Bodepudi",
    "specialties": [
      "Cancer Care/Oncology",
      "Organ Transplant",
      "Paediatric Surgery",
      "Breast Cancer Clinic"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/vijayawada/doctors/dr-sravan-kumar-bodepudi-associate-consultant-medical-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sravani-atchuta-kotamsetti-bengaluru",
    "live": true,
    "name": "Dr. Sravani Atchuta Kotamsetti",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Brookefield",
        "locality": "Brookefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Brookefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/251/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sravya-c-tipirneni-bengaluru",
    "live": true,
    "name": "Dr. Sravya C Tipirneni",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/251/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sree-raksha-k-n-bengaluru",
    "live": true,
    "name": "Dr. Sree Raksha K.N",
    "specialties": [
      "Nephrology",
      "Organ Transplant"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/electronicscity/doctors/dr-sree-raksha-k-n-nephrologist-and-renal-transplant-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-srijoy-gupta-kolkata",
    "live": true,
    "name": "Dr. Srijoy Gupta",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/253/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-srikanth-kasturi-bengaluru",
    "live": true,
    "name": "Dr. Srikanth Kasturi",
    "specialties": [
      "Cardiothoracic Vascular Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/253/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-srikanth-madikattu-pune",
    "live": true,
    "name": "Dr. Srikanth Madikattu",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/253/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-srikanth-v-bengaluru",
    "live": true,
    "name": "Dr. Srikanth V",
    "specialties": [
      "Plastic And Cosmetic Surgery",
      "Hair Transplantation Clinic",
      "Vitiligo Clinic",
      "Lymphedema Clinic",
      "Aesthetic and Hair Restoration Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-srikanth-v-consultant-plastic-cosmetic-surgery/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-srimukhi-anumolu-vijayawada",
    "live": true,
    "name": "Dr. Srimukhi Anumolu",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/253/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-srinivas-k-bengaluru",
    "live": true,
    "name": "Dr. Srinivas K",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/253/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-srujan-topale-pune",
    "live": true,
    "name": "Dr. Srujan Topale",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/255/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subashini-balaji-bengaluru",
    "live": true,
    "name": "Dr. Subashini Balaji",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Indiranagar",
        "locality": "Indiranagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Indiranagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/255/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subhadeep-banerjee-kolkata",
    "live": true,
    "name": "Dr. Subhadeep Banerjee",
    "specialties": [
      "Neurology",
      "Urgent Neuro Care Clinic"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/mukundapur/doctors/dr-subhadeep-banerjee-neurologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subhajit-gantait-kolkata",
    "live": true,
    "name": "Dr. Subhajit Gantait",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/255/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subhajit-pal-kolkata",
    "live": true,
    "name": "Dr. Subhajit Pal",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/255/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subham-kejriwal-kolkata",
    "live": true,
    "name": "DR. SUBHAM KEJRIWAL",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/255/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subhango-chakraborty-kolkata",
    "live": true,
    "name": "Dr. Subhango Chakraborty",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/255/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subhankar-bandyopadhyay-kolkata",
    "live": true,
    "name": "Dr. Subhankar Bandyopadhyay",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/255/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subhasish-deb-kolkata",
    "live": true,
    "name": "Dr. Subhasish Deb",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/257/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subhro-sekhar-chakraborty-kolkata",
    "live": true,
    "name": "Dr. Subhro Sekhar Chakraborty",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/257/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subinita-hazra-kolkata",
    "live": true,
    "name": "Dr. Subinita Hazra",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/257/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subir-gangopadhyay-kolkata",
    "live": true,
    "name": "Dr. Subir Gangopadhyay",
    "specialties": [
      "Cancer Care/Oncology",
      "Radiotherapy (Oncology Radiation)"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/em-bypass/doctors/dr-subir-gangopadhyay-radiation-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subodh-das-bhubaneswar",
    "live": true,
    "name": "Dr. Subodh Das",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Bhubaneswar",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/257/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subrahmanya-murti-velamakanni-bengaluru",
    "live": true,
    "name": "Dr. Subrahmanya Murti Velamakanni",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/257/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-subrata-saha-kolkata",
    "live": true,
    "name": "Dr. Subrata Saha",
    "specialties": [
      "Radiotherapy (Oncology Radiation)"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/257/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sudheer-kumar-g-vijayawada",
    "live": true,
    "name": "Dr. Sudheer Kumar .G",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/259/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sudhindra-m-rao-bengaluru",
    "live": true,
    "name": "Dr. Sudhindra M Rao",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/259/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sudipta-bandyopadhyay-kolkata",
    "live": true,
    "name": "Dr. Sudipta Bandyopadhyay",
    "specialties": [
      "Paediatric Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/259/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sudipto-roy-kolkata",
    "live": true,
    "name": "Dr. Sudipto Roy",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/259/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-suhas-h-s-bengaluru",
    "live": true,
    "name": "Dr. Suhas H S",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/259/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sujoy-das-thakur-kolkata",
    "live": true,
    "name": "Dr. Sujoy Das Thakur",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/261/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sujoy-maitra-kolkata",
    "live": true,
    "name": "Dr. Sujoy Maitra",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/261/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sujoy-panchadhyayee-kolkata",
    "live": true,
    "name": "Dr. Sujoy Panchadhyayee",
    "specialties": [
      "General Medicine",
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/mukundapur/doctors/dr-sujoy-panchadhyayee-general-medicine-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sukalyan-purkayastha-kolkata",
    "live": true,
    "name": "Dr. Sukalyan Purkayastha",
    "specialties": [
      "Neurointervention & Endovascular Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/261/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sukanya-saha-kolkata",
    "live": true,
    "name": "Dr. Sukanya Saha",
    "specialties": [
      "Medical Oncology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/261/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sukesh-m-s-bengaluru",
    "live": true,
    "name": "Dr. Sukesh M S",
    "specialties": [
      "Dermatology",
      "Aesthetic and Hair Restoration Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-sukesh-m-s-aesthetic-dermatologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-suma-sriramanan-bengaluru",
    "live": true,
    "name": "Dr. Suma Sriramanan",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/261/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sumeet-kumar-jhingan-patiala",
    "live": true,
    "name": "Dr. Sumeet Kumar Jhingan",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/263/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sumit-agrawal-siliguri",
    "live": true,
    "name": "Dr. Sumit Agrawal",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/263/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sumit-gupta-ghaziabad",
    "live": true,
    "name": "DR. SUMIT GUPTA",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/263/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sumit-kumar-delhi",
    "live": true,
    "name": "Dr. Sumit Kumar",
    "specialties": [
      "General Surgery",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-sumit-kumar-minimal-access-laparoscopic-and-robotic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sumit-mitra-kolkata",
    "live": true,
    "name": "Dr. Sumit Mitra",
    "specialties": [
      "Hematology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/263/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sumit-sen-kolkata",
    "live": true,
    "name": "DR. SUMIT SEN",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/263/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sunandan-basu-kolkata",
    "live": true,
    "name": "Dr. Sunandan Basu",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/263/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sunil-shekade-pune",
    "live": true,
    "name": "Dr. Sunil Shekade",
    "specialties": [
      "Fetal Medicine"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/265/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sunil-subhash-joshi-bengaluru",
    "live": true,
    "name": "Dr. Sunil Subhash Joshi",
    "specialties": [
      "Vascular and Endovascular Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/265/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sunilkumar-alur-bengaluru",
    "live": true,
    "name": "Dr. Sunilkumar Alur",
    "specialties": [
      "Bariatric Surgery | Weight loss surgery",
      "General Surgery",
      "Robotic Assisted Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/electronicscity/doctors/dr-sunilkumar-alur-laparoscopic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sunitha-madhavan-bengaluru",
    "live": true,
    "name": "Dr. Sunitha Madhavan",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Indiranagar",
        "locality": "Indiranagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Indiranagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/265/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-supraja-vasu-bengaluru",
    "live": true,
    "name": "Dr. Supraja vasu",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/265/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-supratim-ghosh-kolkata",
    "live": true,
    "name": "Dr. Supratim Ghosh",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/265/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-supratip-kundu-kolkata",
    "live": true,
    "name": "Dr. Supratip Kundu",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/265/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-surendra-u-kamath-mangaluru",
    "live": true,
    "name": "Dr. Surendra U Kamath",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/267/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-suresh-babu-d-bengaluru",
    "live": true,
    "name": "Dr. Suresh Babu D",
    "specialties": [
      "Gastrointestinal Science",
      "Bariatric Surgery | Weight loss surgery",
      "Robotic Assisted Surgery",
      "Surgical Gastro"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/yelahanka/doctors/dr-suresh-babu-d-gastrointestinal-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-suresh-g-bengaluru",
    "live": true,
    "name": "Dr. Suresh G",
    "specialties": [
      "Anesthesiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/267/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-suresh-k-g-bengaluru",
    "live": true,
    "name": "Dr. Suresh K G",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/267/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-suresh-shenoy-mangaluru",
    "live": true,
    "name": "Dr. Suresh Shenoy",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/267/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-surinder-singh-patiala",
    "live": true,
    "name": "Dr. Surinder Singh",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/267/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sushmitha-s-bengaluru",
    "live": true,
    "name": "Dr. Sushmitha S",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Budigere",
        "locality": "Budigere",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Budigere",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/269/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-sutanu-hazra-kolkata",
    "live": true,
    "name": "Dr. Sutanu Hazra",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/269/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-suvarna-bhale-pune",
    "live": true,
    "name": "Dr. Suvarna Bhale",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/269/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-suvarna-biradar-bengaluru",
    "live": true,
    "name": "Dr. Suvarna Biradar",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/269/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-suvradip-dutta-kolkata",
    "live": true,
    "name": "Dr. Suvradip Dutta",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/269/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-swaminathan-ravi-pune",
    "live": true,
    "name": "Dr. Swaminathan Ravi",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/269/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-swathi-rao-mangaluru",
    "live": true,
    "name": "Dr. Swathi Rao",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/271/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-swathi-y-bengaluru",
    "live": true,
    "name": "Dr. Swathi Y",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Budigere",
        "locality": "Budigere",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Budigere",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/271/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-swathy-surendran-nair-bengaluru",
    "live": true,
    "name": "Dr. Swathy Surendran Nair",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/271/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-swati-n-patil-bengaluru",
    "live": true,
    "name": "Dr. Swati N Patil",
    "specialties": [
      "Neurology",
      "Stroke Care Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/sarjapurroad/doctors/dr-swati-n-patil-neurologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-swati-pai-bengaluru",
    "live": true,
    "name": "Dr. Swati Pai",
    "specialties": [
      "Laboratory Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/271/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-swati-suradkar-pune",
    "live": true,
    "name": "Dr. Swati Suradkar",
    "specialties": [
      "General Surgery"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/271/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-syed-ahmed-bengaluru",
    "live": true,
    "name": "Dr. Syed Ahmed",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/271/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tanmai-yermal-jain-pune",
    "live": true,
    "name": "Dr. Tanmai Yermal (Jain)",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/273/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tanmay-banerjee-kolkata",
    "live": true,
    "name": "Dr. Tanmay Banerjee",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/273/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tanmay-kulkarni-pune",
    "live": true,
    "name": "Dr. Tanmay Kulkarni",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/273/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tanmay-mukherjee-kolkata",
    "live": true,
    "name": "Dr. Tanmay Mukherjee",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Broadway",
        "locality": "Broadway",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Broadway",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/273/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tanuja-mishra-bengaluru",
    "live": true,
    "name": "Dr. Tanuja Mishra",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/273/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tanveer-santosh-tholar-mangaluru",
    "live": true,
    "name": "Dr. Tanveer Santosh Tholar",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/273/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-teena-mendonca-mangaluru",
    "live": true,
    "name": "Dr. Teena Mendonca",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/275/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tejasvi-singh-randhawa-delhi",
    "live": true,
    "name": "Dr. Tejasvi Singh Randhawa",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/275/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tejaswi-v-bengaluru",
    "live": true,
    "name": "Dr. Tejaswi V",
    "specialties": [
      "Diabetes and Endocrinology",
      "Thyroid Management Centre/Clinic",
      "Cholesterol Management Clinic",
      "Metabolic Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-tejaswi-v-endocrinologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tejaswini-acharya-bengaluru",
    "live": true,
    "name": "Dr. Tejaswini Acharya",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/275/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tejesh-shavi-bengaluru",
    "live": true,
    "name": "Dr. Tejesh Shavi",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/275/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tejus-c-bengaluru",
    "live": true,
    "name": "Dr. Tejus C",
    "specialties": [
      "Cancer Care/Oncology",
      "Urology",
      "Robotic Assisted Surgery",
      "Surgical Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/yelahanka/doctors/dr-tejus-c-urologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-thankam-s-bengaluru",
    "live": true,
    "name": "Dr. Thankam S",
    "specialties": [
      "Fetal Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/275/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-thimmaiah-k-a-mysuru",
    "live": true,
    "name": "Dr. Thimmaiah K A",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/275/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-trisha-nandy-bengaluru",
    "live": true,
    "name": "Dr. Trisha Nandy",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/277/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-trishala-m-b-bengaluru",
    "live": true,
    "name": "Dr. Trishala M B",
    "specialties": [
      "Ophthalmology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/277/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-triveni-dhaka-jaipur",
    "live": true,
    "name": "Dr. Triveni Dhaka",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/277/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-tushar-j-deore-pune",
    "live": true,
    "name": "Dr. Tushar J. Deore",
    "specialties": [
      "Orthopaedics",
      "Spine Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/baner/doctors/dr-tushar-j-deore-orthopaedic-spine-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-u-anand-kini-mangaluru",
    "live": true,
    "name": "Dr. U Anand Kini",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/277/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-u-vasudeva-rao-bengaluru",
    "live": true,
    "name": "Dr. U Vasudeva Rao",
    "specialties": [
      "Vascular and Endovascular Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/277/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-uday-damodar-patil-bengaluru",
    "live": true,
    "name": "Dr. Uday Damodar Patil",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/277/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-uddhavesh-m-paithankar-gurgaon",
    "live": true,
    "name": "Dr. Uddhavesh M Paithankar",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/279/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ujjwalla-keskar-pune",
    "live": true,
    "name": "Dr. Ujjwalla Keskar",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/279/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ujwala-patil-pune",
    "live": true,
    "name": "Dr. Ujwala Patil",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/279/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ullas-v-acharya-bengaluru",
    "live": true,
    "name": "Dr. Ullas V Acharya",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/279/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-uma-eswara-bengaluru",
    "live": true,
    "name": "Dr. Uma Eswara",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/279/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-uma-karjigi-bengaluru",
    "live": true,
    "name": "Dr. Uma Karjigi",
    "specialties": [
      "Rheumatology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/279/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-umang-mann-gurgaon",
    "live": true,
    "name": "Dr. Umang Mann",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/279/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-umasankar-mukherjee-kolkata",
    "live": true,
    "name": "Dr. Umasankar Mukherjee",
    "specialties": [
      "General Surgery",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Salt Lake",
        "locality": "Salt Lake",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Salt Lake",
    "sourceUrl": "https://www.manipalhospitals.com/saltlake/doctors/dr-umasankar-mukherjee-general-and-laparoscopic-surgery/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-uttio-gupta-kolkata",
    "live": true,
    "name": "Dr. Uttio Gupta",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, EM Bypass",
        "locality": "EM Bypass",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, EM Bypass",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/281/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-v-b-praveen-naidu-vijayawada",
    "live": true,
    "name": "Dr. V B Praveen Naidu",
    "specialties": [
      "Diabetes and Endocrinology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/281/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-v-balasundaram-delhi",
    "live": true,
    "name": "Dr. V Balasundaram",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/281/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-v-dinesh-kumar-gontla-vijayawada",
    "live": true,
    "name": "Dr. V Dinesh Kumar Gontla",
    "specialties": [
      "ICU and Critical Care"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/281/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-v-h-ashwath-venkataramana-bengaluru",
    "live": true,
    "name": "Dr. V H Ashwath Venkataramana",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/281/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-v-hari-babu-bengaluru",
    "live": true,
    "name": "Dr. V Hari Babu",
    "specialties": [
      "Orthopaedics",
      "Joint Replacement and Sports Medicine Clinic"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/malleshwaram/doctors/dr-v-hari-babu-orthopaedic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vaibhav-pandharkar-pune",
    "live": true,
    "name": "Dr. Vaibhav Pandharkar",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/283/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vaiyali-ramu-salem",
    "live": true,
    "name": "Dr. Vaiyali Ramu",
    "specialties": [
      "Accident and Emergency Care"
    ],
    "locations": [
      {
        "city": "Salem",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/283/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vamsi-chalasani-vijayawada",
    "live": true,
    "name": "Dr. Vamsi Chalasani",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/283/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vamsi-krishna-i-y-bengaluru",
    "live": true,
    "name": "Dr. Vamsi Krishna I Y",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/283/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vandana-daga-kolkata",
    "live": true,
    "name": "Dr. Vandana Daga",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/283/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vandana-pandey-delhi",
    "live": true,
    "name": "Dr. Vandana Pandey",
    "specialties": [
      "Paediatric And Child Care",
      "Neonatology & NICU"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-vandana-pandey-paediatrician-and-neonatologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vanishree-bn-bengaluru",
    "live": true,
    "name": "Dr. Vanishree BN",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Sarjapur Road",
        "locality": "Sarjapur Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Sarjapur Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/283/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vasudeva-pai-h-mysuru",
    "live": true,
    "name": "Dr. Vasudeva Pai H",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/285/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vasunethra-kasargod-bengaluru",
    "live": true,
    "name": "Dr. Vasunethra Kasargod",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/285/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-veekshith-shetty-bengaluru",
    "live": true,
    "name": "Dr. Veekshith Shetty",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/285/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-veena-vedartham-bengaluru",
    "live": true,
    "name": "Dr. Veena Vedartham",
    "specialties": [
      "Neuromuscular Clinic",
      "Neurology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/oldairportroad/doctors/dr-veena-vedartham-neurologist-and-neuromuscular-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-veena-yagna-bengaluru",
    "live": true,
    "name": "Dr. Veena Yagna",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/285/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-veera-reddy-jayar-bengaluru",
    "live": true,
    "name": "Dr. Veera Reddy Jayar",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Whitefield",
        "locality": "Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/285/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-veerendra-sandur-bengaluru",
    "live": true,
    "name": "Dr. Veerendra Sandur",
    "specialties": [
      "Gastrointestinal Science",
      "Medical Gastro"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/kanakapuraroad/doctors/dr-veerendra-sandur-gastroenterologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vidhyavathi-m-bengaluru",
    "live": true,
    "name": "Dr. Vidhyavathi M",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Malleshwaram",
        "locality": "Malleshwaram",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Malleshwaram",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/287/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vidya-bhat-mangaluru",
    "live": true,
    "name": "Dr. Vidya Bhat",
    "specialties": [
      "Gastrointestinal Science"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/287/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vidya-b-u-bengaluru",
    "live": true,
    "name": "Dr. Vidya B U",
    "specialties": [
      "Paediatric And Child Care",
      "Lactation"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Hebbal",
        "locality": "Hebbal",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Hebbal",
    "sourceUrl": "https://www.manipalhospitals.com/hebbal/doctors/dr-vidya-b-u-paediatric-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vidya-desai-bengaluru",
    "live": true,
    "name": "Dr. Vidya Desai",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/287/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vidyachandra-gandhi-pune",
    "live": true,
    "name": "Dr. Vidyachandra Gandhi",
    "specialties": [
      "Gastrointestinal Science",
      "General Surgery",
      "Hepatobiliary Surgery"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Kharadi",
        "locality": "Kharadi",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kharadi",
    "sourceUrl": "https://www.manipalhospitals.com/kharadi/doctors/dr-vidyachandra-gandhi-surgical-gastroenterologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vidyasagar-k-bengaluru",
    "live": true,
    "name": "Dr. Vidyasagar K",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/287/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vidyasagar-ramappa-bengaluru",
    "live": true,
    "name": "Dr. Vidyasagar Ramappa",
    "specialties": [
      "Medical Gastro"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yeshwanthpur",
        "locality": "Yeshwanthpur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yeshwanthpur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/287/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vidyashri-kamath-c-mangaluru",
    "live": true,
    "name": "Dr. Vidyashri Kamath C",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/287/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vignesh-jayakumar-bengaluru",
    "live": true,
    "name": "Dr. Vignesh Jayakumar",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/287/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vijay-shankar-sharma-kolkata",
    "live": true,
    "name": "Dr. Vijay Shankar Sharma",
    "specialties": [
      "Cardiology"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/289/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vijayakumar-d-r-bengaluru",
    "live": true,
    "name": "Dr. Vijayakumar D R",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/289/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vijayakumar-g-b-mysuru",
    "live": true,
    "name": "Dr. Vijayakumar G B",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/289/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vijender-kumar-saini-jaipur",
    "live": true,
    "name": "Dr. Vijender Kumar Saini",
    "specialties": [
      "Dermatology"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/289/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vijendra-chaturvedi-bengaluru",
    "live": true,
    "name": "Dr. Vijendra Chaturvedi",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Clinic, Brookefield",
        "locality": "Brookefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Clinic, Brookefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/289/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vijendra-shenoy-s-mangaluru",
    "live": true,
    "name": "Dr. Vijendra Shenoy S",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/289/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vikas-pilaniya-jaipur",
    "live": true,
    "name": "Dr. Vikas Pilaniya",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/289/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vikas-shukla-delhi",
    "live": true,
    "name": "Dr. Vikas Shukla",
    "specialties": [
      "Urology"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/289/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vikram-maiya-bengaluru",
    "live": true,
    "name": "Dr. Vikram Maiya",
    "specialties": [
      "Cancer Care/Oncology",
      "Radiotherapy (Oncology Radiation)"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Yelahanka",
        "locality": "Yelahanka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Yelahanka",
    "sourceUrl": "https://www.manipalhospitals.com/yelahanka/doctors/dr-vikram-maiya-radiation-oncologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vikram-singh-ranchi",
    "live": true,
    "name": "Dr. Vikram Singh",
    "specialties": [
      "Neurosurgery"
    ],
    "locations": [
      {
        "city": "Ranchi",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/291/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vikrant-sinha-roy-kolkata",
    "live": true,
    "name": "Dr. Vikrant Sinha Roy",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/291/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vinay-kumar-verma-gurgaon",
    "live": true,
    "name": "Dr. Vinay Kumar Verma",
    "specialties": [
      "Cancer Care/Oncology"
    ],
    "locations": [
      {
        "city": "Gurgaon",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/291/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vinaya-babu-s-bengaluru",
    "live": true,
    "name": "Dr. Vinaya Babu S",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Doddaballapur",
        "locality": "Doddaballapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Doddaballapur",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/291/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vinayak-ghanate-pune",
    "live": true,
    "name": "Dr. Vinayak Ghanate",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/291/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vinu-n-bengaluru",
    "live": true,
    "name": "Dr. Vinu N",
    "specialties": [
      "Genetics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/293/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vipin-kaverappa-p-t-mysuru",
    "live": true,
    "name": "Dr. Vipin Kaverappa P T",
    "specialties": [
      "Nephrology"
    ],
    "locations": [
      {
        "city": "Mysuru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/293/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vipin-kumar-jain-jaipur",
    "live": true,
    "name": "Dr. Vipin Kumar Jain",
    "specialties": [
      "HC Service",
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Jaipur",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/jaipur/doctors/dr-vipin-kumar-jain-consultant-internal-medicine/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vipin-saigal-ghaziabad",
    "live": true,
    "name": "Dr. Vipin Saigal",
    "specialties": [
      "Plastic And Cosmetic Surgery"
    ],
    "locations": [
      {
        "city": "Ghaziabad",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/293/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-virbhan-balai-delhi",
    "live": true,
    "name": "Dr. Virbhan Balai",
    "specialties": [
      "Cardiology",
      "Heart Care Clinic"
    ],
    "locations": [
      {
        "city": "Delhi",
        "facility": "Manipal Hospitals, Dwarka",
        "locality": "Dwarka",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dwarka",
    "sourceUrl": "https://www.manipalhospitals.com/delhi/doctors/dr-virbhan-balai-interventional-cardiologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vishak-acharya-k-mangaluru",
    "live": true,
    "name": "Dr. Vishak Acharya K",
    "specialties": [
      "Pulmonology (Respiratory and Sleep Medicine)"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/293/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vishakha-choudhary-bengaluru",
    "live": true,
    "name": "Dr. Vishakha Choudhary",
    "specialties": [
      "Dental Medicine"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Varthur Road - Whitefield",
        "locality": "Varthur Road - Whitefield",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Varthur Road - Whitefield",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/293/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vishal-sharma-patiala",
    "live": true,
    "name": "Dr. Vishal Sharma",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/293/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vishwanath-m-s-bengaluru",
    "live": true,
    "name": "Dr. Vishwanath M S",
    "specialties": [
      "Orthopaedics"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/295/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vishwanath-reddy-ch-bengaluru",
    "live": true,
    "name": "Dr. Vishwanath Reddy CH",
    "specialties": [
      "Gastrointestinal Science",
      "Bariatric Surgery | Weight loss surgery",
      "Robotic Assisted Surgery",
      "Surgical Gastro"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Electronics City",
        "locality": "Electronics City",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Electronics City",
    "sourceUrl": "https://www.manipalhospitals.com/electronicscity/doctors/dr-vishwanath-reddy-ch-surgical-gastroenterologist/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vivaan-dutt-bengaluru",
    "live": true,
    "name": "Dr. Vivaan Dutt",
    "specialties": [
      "Surgical Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/295/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vivek-shejole-pune",
    "live": true,
    "name": "Dr. Vivek Shejole",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Pune",
        "facility": "Manipal Hospitals, Baner",
        "locality": "Baner",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Baner",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/295/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vivekanand-m-kustagi-bengaluru",
    "live": true,
    "name": "Dr. Vivekanand M Kustagi",
    "specialties": [
      "Paediatric And Child Care"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/295/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-vuppu-ravikanth-vijayawada",
    "live": true,
    "name": "Dr. Vuppu Ravikanth",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/295/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-wasim-m-dar-bengaluru",
    "live": true,
    "name": "Dr. Wasim M Dar",
    "specialties": [
      "Bariatric Surgery | Weight loss surgery",
      "General Surgery",
      "Laparoscopic Surgery"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Jayanagar",
        "locality": "Jayanagar",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Jayanagar",
    "sourceUrl": "https://www.manipalhospitals.com/jayanagar/doctors/dr-wasim-m-dar-general-and-laparoscopic-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-yogeshwar-c-bengaluru",
    "live": true,
    "name": "Dr. Yogeshwar C",
    "specialties": [
      "Ear Nose Throat"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Kanakapura Road",
        "locality": "Kanakapura Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Kanakapura Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/297/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-yoseph-bhagwant-kale-patiala",
    "live": true,
    "name": "DR. YOSEPH BHAGWANT KALE",
    "specialties": [
      "Psychiatry"
    ],
    "locations": [
      {
        "city": "Patiala",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/297/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-yugal-goyal-siliguri",
    "live": true,
    "name": "Dr. Yugal Goyal",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/297/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-yugal-kumar-goyal-siliguri",
    "live": true,
    "name": "Dr. Yugal Kumar Goyal",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/297/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-ziaul-mustafa-siliguri",
    "live": true,
    "name": "Dr. Ziaul Mustafa",
    "specialties": [
      "Radiology"
    ],
    "locations": [
      {
        "city": "Siliguri",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/297/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-zubair-ahmed-bengaluru",
    "live": true,
    "name": "Dr. Zubair Ahmed",
    "specialties": [
      "Surgical Oncology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Millers Road",
        "locality": "Millers Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Millers Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/297/",
    "sourceChecked": "2026-11-10",
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
    "id": "dr-zulkifli-misri-mangaluru",
    "live": true,
    "name": "Dr. Zulkifli Misri",
    "specialties": [
      "Neurology"
    ],
    "locations": [
      {
        "city": "Mangaluru",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/297/",
    "sourceChecked": "2026-11-10",
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
    "id": "prof-dr-rishad-ahmed-kolkata",
    "live": true,
    "name": "Prof. Dr. Rishad Ahmed",
    "specialties": [
      "General Medicine",
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Mukundapur",
        "locality": "Mukundapur",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Mukundapur",
    "sourceUrl": "https://www.manipalhospitals.com/mukundapur/doctors/dr-rishad-ahmed-internal-medicine-specialist/",
    "sourceChecked": "2026-11-10",
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
    "id": "prof-dr-satyendra-nath-barman-kolkata",
    "live": true,
    "name": "Prof. Dr. Satyendra Nath Barman",
    "specialties": [
      "Internal Medicine"
    ],
    "locations": [
      {
        "city": "Kolkata",
        "facility": "Manipal Hospitals, Dhakuria",
        "locality": "Dhakuria",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Dhakuria",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/305/",
    "sourceChecked": "2026-11-10",
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
    "id": "prof-dr-tom-cherian-vijayawada",
    "live": true,
    "name": "Prof. Dr. Tom Cherian",
    "specialties": [
      "Organ Transplant",
      "Liver Clinic"
    ],
    "locations": [
      {
        "city": "Vijayawada",
        "facility": "Manipal Hospitals",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals",
    "sourceUrl": "https://www.manipalhospitals.com/vijayawada/doctors/prof-dr-tom-cherian-liver-transplant-surgeon/",
    "sourceChecked": "2026-11-10",
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
    "id": "sqn-ldr-dr-surjeet-kaur-sharma-bengaluru",
    "live": true,
    "name": "Sqn Ldr Dr. Surjeet Kaur Sharma",
    "specialties": [
      "Obstetrics and Gynaecology"
    ],
    "locations": [
      {
        "city": "Bengaluru",
        "facility": "Manipal Hospitals, Old Airport Road",
        "locality": "Old Airport Road",
        "primary": true
      }
    ],
    "otherNcrLocations": [],
    "hospital": "Manipal Hospitals, Old Airport Road",
    "sourceUrl": "https://www.manipalhospitals.com/doctors-list/305/",
    "sourceChecked": "2026-11-10",
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
