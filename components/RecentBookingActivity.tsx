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
    className="mt-6 max-w-3xl rounded-2xl border border-line bg-porc px-4 py-3 sm:px-5">
    <div className="flex min-h-16 items-center gap-3" aria-live="off">
      <span className="flex min-w-20 shrink-0 flex-col items-center gap-1 rounded-xl border border-dashed border-line px-3 py-2 text-xs text-grey sm:min-w-24">
        <CalendarCheck size={18} strokeWidth={1.5} aria-hidden="true" />
        <span>{booking.minutesAgo + elapsedMinutes} min ago</span>
      </span>
      <p className="text-sm leading-6 text-ink">Someone booked an appointment for <span className="font-medium">{booking.specialty}</span> in <span className="font-medium">{booking.city}</span>.</p>
    </div>
  </aside>;
}
