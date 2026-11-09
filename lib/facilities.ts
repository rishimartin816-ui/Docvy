import { liveDoctors } from "./directory";

export const facilities = Array.from(new Set(liveDoctors.flatMap((doctor) => doctor.locations.map((location) => location.facility))))
  .map((name) => {
    const doctors = liveDoctors.filter((doctor) => doctor.locations.some((location) => location.facility === name));
    const location = doctors[0].locations.find((item) => item.facility === name)!;
    return { name, location, doctors, specialties: Array.from(new Set(doctors.flatMap((doctor) => doctor.specialties))) };
  });
