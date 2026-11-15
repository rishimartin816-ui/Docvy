const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().replace(/[\r\n\t]+/g, " ").replace(/[<>\u0000-\u001f]/g, "").slice(0, max) : "";
const phone = (value: unknown) => {
  const number = clean(value, 24).replace(/[\s()-]/g, "");
  return /^\d{10}$/.test(number) ? "+91" + number : number;
};
export function partnerPayload(body: Record<string, unknown>) {
  const role = clean(body.role, 30);
  const experience = clean(body.experienceYears, 8);
  const fee = clean(body.consultationFee, 8);
  const payload = {
    profileVersion: 2, role, doctorName: clean(body.doctorName, 120), specialty: clean(body.specialty, 100),
    qualifications: clean(body.qualifications, 300), experienceYears: Number(experience),
    registrationNumber: clean(body.registrationNumber, 100), registrationCouncil: clean(body.registrationCouncil, 150),
    facility: clean(body.facility, 160), city: clean(body.city, 60), state: clean(body.state, 60),
    postalCode: clean(body.postalCode, 12), locality: clean(body.locality, 100), address: clean(body.address, 400),
    consultationFee: Number(fee), workingDays: clean(body.workingDays, 80), consultingHours: clean(body.consultingHours, 100),
    practicePhone: phone(body.practicePhone), languages: clean(body.languages, 150), mapsUrl: clean(body.mapsUrl, 500),
    services: clean(body.services, 500), email: clean(body.email, 254).toLowerCase(), phone: phone(body.phone),
    sourceUrl: clean(body.sourceUrl, 500), bio: clean(body.bio, 2000),
    details: role === "doctor" ? "I am this doctor and authorise submission of this profile." : "I am an authorised clinic or hospital representative submitting this doctor's profile.",
    consent: body.consent === true, hasPhoto: true,
  };
  if (!["doctor", "clinic"].includes(role) || payload.doctorName.length < 2 || payload.specialty.length < 2 || payload.qualifications.length < 2 || payload.registrationNumber.length < 2 || payload.registrationCouncil.length < 2) throw new Error("Enter the doctor's name, specialty, qualifications and registration details.");
  if (!/^\d{1,2}(\.\d{1,2})?$/.test(experience) || payload.experienceYears > 80) throw new Error("Enter experience between 0 and 80 years.");
  if (!/^\d{1,6}$/.test(fee) || payload.consultationFee > 100000) throw new Error("Enter the consultation fee in rupees, or 0 for a free consultation.");
  if ((role === "clinic" && payload.facility.length < 2) || payload.address.length < 10 || payload.city.length < 2 || payload.state.length < 2 || !/^[1-9]\d{5}$/.test(payload.postalCode)) throw new Error("Enter the clinic address, city, state and six-digit PIN code.");
  if (payload.workingDays.length < 2 || payload.consultingHours.length < 2) throw new Error("Enter the clinic's working days and consultation timings.");
  if (!/^\+91[1-9]\d{9}$/.test(payload.practicePhone) || !/^\+91[6-9]\d{9}$/.test(payload.phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) throw new Error("Enter a valid appointment number, private work mobile and email.");
  if (!payload.consent) throw new Error("Confirm your authority and consent to submit this profile.");
  if (payload.sourceUrl) { const url = new URL(payload.sourceUrl); if (url.protocol !== "https:" || url.username || url.password) throw new Error("Use an HTTPS professional website without embedded credentials."); }
  if (payload.mapsUrl && !/^https:\/\/(www\.google\.com|maps\.google\.com|share\.google|maps\.app\.goo\.gl)\//.test(payload.mapsUrl)) throw new Error("Use a Google Maps link, or leave it blank.");
  if (!payload.mapsUrl) payload.mapsUrl="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent([payload.facility,payload.address,payload.city,payload.state,payload.postalCode].filter(Boolean).join(", "));
  return payload;
}
