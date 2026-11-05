"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, X } from "lucide-react";

const sampleBookings = [
  { city: "Gurgaon", minutesAgo: 2 },
  { city: "Delhi", minutesAgo: 10 },
  { city: "Mumbai", minutesAgo: 18 },
];

export default function RecentBookingActivity() {
  const [dismissed, setDismissed] = useState(false);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    if (dismissed) return;
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      setElapsedMinutes(Math.floor((Date.now() - startedAt) / 60_000));
    }, 30_000);
    return () => window.clearInterval(timer);
  }, [dismissed]);

  if (dismissed) return null;

  return <aside aria-label="Demo appointment activity" className="mt-6 max-w-3xl rounded-2xl border border-line bg-white p-4 sm:p-5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-grey">Demo activity</p>
        <h2 className="mt-1 !text-base !font-medium !leading-normal !tracking-normal">Recent appointments</h2>
        <p className="mt-1 text-sm text-grey">Sample bookings showing how activity will appear.</p>
      </div>
      <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss demo activity" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-grey hover:bg-surface hover:text-ink">
        <X size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
    <ul className="mt-3 divide-y divide-line">
      {sampleBookings.map(({ city, minutesAgo }) => <li key={city} className="flex items-center gap-3 py-3">
        <CalendarCheck size={20} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-ink" />
        <p className="min-w-0 flex-1 text-sm leading-6 text-ink">Someone in <span className="font-medium">{city}</span> booked an appointment</p>
        <span className="shrink-0 text-xs text-grey">{minutesAgo + elapsedMinutes} min ago</span>
      </li>)}
    </ul>
  </aside>;
}
