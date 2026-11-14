"use client";

import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";

const sampleBookings = [
  { specialty: "Cardiology", city: "Gurgaon", minutesAgo: 2 },
  { specialty: "Dermatology", city: "Delhi", minutesAgo: 10 },
  { specialty: "Orthopaedics", city: "Mumbai", minutesAgo: 18 },
  { specialty: "General medicine", city: "Bengaluru", minutesAgo: 6 },
  { specialty: "Paediatrics", city: "Hyderabad", minutesAgo: 4 },
  { specialty: "Gynaecology", city: "Chennai", minutesAgo: 12 },
];

export default function RecentBookingActivity() {
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (hovered || focused) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (!preference.matches) setCurrent((index) => (index + 1) % sampleBookings.length);
    }, 8_000);
    return () => window.clearInterval(timer);
  }, [hovered, focused]);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      setElapsedMinutes(Math.floor((Date.now() - startedAt) / 60_000));
    }, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const booking = sampleBookings[current];
  return <aside aria-label="Fictional appointment activity" tabIndex={0}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    title="Hover or focus to pause activity"
    className="booking-activity">
    <div className="flex items-center gap-3 sm:gap-4" aria-live="off">
      <span className="activity-icon"><CalendarCheck size={21} strokeWidth={1.5} aria-hidden="true" /></span>
      <p className="min-w-0 text-sm leading-7 text-ink">Someone booked an appointment for <span className="activity-specialty">{booking.specialty}</span> in <span className="activity-city">{booking.city}</span>. <span className="activity-time">{booking.minutesAgo + elapsedMinutes} min ago</span></p>
    </div>
  </aside>;
}
