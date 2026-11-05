"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function CityWaitlist({ city, specialty, enabled }: { city: string; specialty?: string; enabled: boolean }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, specialty, contact: data.get("contact"), consent: data.get("consent") === "on" }),
      });
      setMessage(response.ok ? "You’re on the list for directory updates." : (await response.json()).error);
      if (response.ok) form.reset();
    } catch {
      setMessage("Could not submit your request. Please try again later.");
    } finally { setBusy(false); }
  }

  return <form onSubmit={submit} className="mt-5 max-w-md space-y-3">
    <label className="block text-sm font-semibold">Email or Indian mobile number
      <input name="contact" disabled={!enabled} autoComplete="off" maxLength={254} required className="docvy-select mt-1" />
    </label>
    <label className="flex items-start gap-2 text-sm"><input className="mt-1" type="checkbox" name="consent" required disabled={!enabled} />
      <span>I agree to receive directory updates for this location. See our <Link href="/legal/privacy" className="underline">Privacy Policy</Link>.</span>
    </label>
    <button disabled={!enabled || busy} className="docvy-pill docvy-pill-primary">Notify me</button>
    {!enabled && <p className="text-sm">Notifications are currently unavailable.</p>}
    {message && <p role="status" className="text-sm">{message}</p>}
  </form>;
}
