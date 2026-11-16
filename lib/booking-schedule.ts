/** Approved by DOCVY owner on 2026-11-16. This is a recurring rule, not activation. */
export const approvedDoctorSchedule = {
  timeZone: "Asia/Kolkata",
  weekdays: [1, 2, 3, 4, 5, 6],
  opensAt: "10:00",
  closesAt: "20:00",
  appointmentMinutes: 30,
  gapMinutes: 30,
} as const;

export const approvedProviderIds = [
  "dr-ummed-kumar-meena",
  "dr-ambika-rao-jhunjhunu-68798490",
  "dr-anil-kumar-physiotherapist-delhi",
  "dr-hassan-ishtiyaque-ali",
  "mr-sahil-kochale",
  "dr-basab-raj-ghosh",
] as const;

/** Latest owner instruction overrides the general window for Dr. Meena only. */
export const meenaPracticeWindows = [
  { city: "Keri", facility: "Shree Bhumika Clinic, Keri", address: "Opposite Govt High School Playground, Behrilwada", opensAt: "09:00", closesAt: "14:00" },
  { city: "Sankhalim", facility: "Sankhalim practice", address: "Shree Siddhi Vinayak Krupa Apartment, near Lions Club Hall, Desai Nagar", opensAt: "14:00", closesAt: "17:00" },
  { city: "Poriem", facility: "Shree Bhumika Clinic, Poriem", address: "Opposite Poriem Panchayat, Bhumika Hotel, first floor", opensAt: "17:00", closesAt: "21:00" },
] as const;

function parseDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Use an ISO calendar date");
  const timestamp = Date.parse(date + "T00:00:00Z");
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== date) throw new Error("Invalid calendar date");
  return timestamp;
}

/** Date range is IST calendar dates, start inclusive and end exclusive; max 90 days.
 * No clinic, fee or availability claim is inferred. Apply closures before activation.
 */
export function generateApprovedSlotCandidates(startDate: string, endDate: string) {
  const start = parseDate(startDate), end = parseDate(endDate);
  const dayMs = 86_400_000;
  if (end <= start || end - start > 90 * dayMs) throw new Error("Choose a range of 1–90 days");
  const slots: { provider_id: string; starts_at: string; ends_at: string; location?: { city: string; facility: string; address: string } }[] = [];
  for (let day = start; day < end; day += dayMs) {
    if (new Date(day).getUTCDay() === 0) continue;
    const date = new Date(day).toISOString().slice(0, 10);
    const rule = approvedDoctorSchedule;
    for (const provider_id of approvedProviderIds) {
      const windows = provider_id === "dr-ummed-kumar-meena" ? meenaPracticeWindows : provider_id === "mr-sahil-kochale" ? [{ ...rule, city: "Indore", facility: "Shuddhi De-addiction and Rehabilitation Centre", address: "" }] : [rule];
      for (const window of windows) {
        const firstStart = Date.parse(date + "T" + window.opensAt + ":00+05:30");
        const closing = Date.parse(date + "T" + window.closesAt + ":00+05:30");
        for (let slot = firstStart; slot + rule.appointmentMinutes * 60_000 <= closing; slot += (rule.appointmentMinutes + rule.gapMinutes) * 60_000) {
          slots.push({ provider_id, starts_at: new Date(slot).toISOString(), ends_at: new Date(slot + rule.appointmentMinutes * 60_000).toISOString(),
            ...("city" in window ? { location: { city: window.city, facility: window.facility, address: window.address } } : {}) });
        }
      }
    }
  }
  return slots;
}
