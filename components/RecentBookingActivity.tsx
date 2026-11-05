"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, ChevronRight, Pause, Play, X } from "lucide-react";

const sampleBookings = [
  { city: "Gurgaon", minutesAgo: 2 },
  { city: "Delhi", minutesAgo: 10 },
  { city: "Mumbai", minutesAgo: 18 },
  { city: "Bengaluru", minutesAgo: 6 },
  { city: "Hyderabad", minutesAgo: 4 },
  { city: "Chennai", minutesAgo: 12 },
];

export default function RecentBookingActivity() {
  const [dismissed, setDismissed] = useState(false);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) setPaused(true);
    const update = () => { if (preference.matches) setPaused(true); };
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (dismissed || paused) return;
    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % sampleBookings.length);
    }, 8_000);
    return () => window.clearInterval(timer);
  }, [dismissed, paused]);

  useEffect(() => {
    if (dismissed) return;
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      setElapsedMinutes(Math.floor((Date.now() - startedAt) / 60_000));
    }, 30_000);
    return () => window.clearInterval(timer);
  }, [dismissed]);

  if (dismissed) return null;
  const booking = sampleBookings[current];

  return <aside aria-label="Demo appointment activity" className="mt-6 max-w-3xl rounded-2xl border border-line bg-white p-4 sm:px-5">
    <div className="flex flex-wrap items-center justify-between gap-x-3">
      <p className="text-xs font-medium text-grey">Demo activity · Sample bookings</p>
      <div className="-mr-2 flex items-center">
        <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume activity rotation" : "Pause activity rotation"} className="flex h-11 w-11 items-center justify-center rounded-full text-grey hover:bg-surface hover:text-ink">
          {paused ? <Play size={16} strokeWidth={1.5} aria-hidden="true" /> : <Pause size={16} strokeWidth={1.5} aria-hidden="true" />}
        </button>
        <button type="button" onClick={() => setCurrent((index) => (index + 1) % sampleBookings.length)} aria-label="Next sample booking" className="flex h-11 w-11 items-center justify-center rounded-full text-grey hover:bg-surface hover:text-ink">
          <ChevronRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss demo activity" className="flex h-11 w-11 items-center justify-center rounded-full text-grey hover:bg-surface hover:text-ink">
          <X size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
    <div className="flex min-h-20 items-center gap-3 border-t border-line py-3 sm:min-h-16" aria-live="off">
      <span className="flex min-w-20 shrink-0 flex-col items-center gap-1 rounded-xl border border-dashed border-line px-3 py-2 text-xs text-grey sm:min-w-24">
        <CalendarCheck size={18} strokeWidth={1.5} aria-hidden="true" />
        <span>{booking.minutesAgo + elapsedMinutes} min ago</span>
      </span>
      <p className="text-sm leading-6 text-ink">Someone in <span className="font-medium">{booking.city}</span> booked an appointment</p>
    </div>
  </aside>;
}
