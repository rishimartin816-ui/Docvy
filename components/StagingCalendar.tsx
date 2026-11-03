"use client";

import { useEffect, useRef, useState } from "react";

type Slot = { id: string; starts_at: string; ends_at: string; blocked?: boolean; booking_id?: string };
const dateLabel = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
const calendarDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" });

export default function StagingCalendar({ clinic = false, admin = false }: { clinic?: boolean; admin?: boolean }) {
  const [token, setToken] = useState("");
  const [session, setSession] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [day, setDay] = useState(calendarDay.format(new Date()));
  const [days, setDays] = useState(7);
  const keys = useRef(new Map<string, string>());

  async function refresh(access: string, signal?: AbortSignal) {
    if (clinic && !access) return;
    try {
      const response = await fetch("/api/crm" + (admin ? "?admin" : clinic ? "?clinic" : ""), {
        headers: access ? { Authorization: "Bearer " + access } : {},
        signal,
      });
      if (!response.ok) throw new Error(response.status === 403 ? "Staff access required." : "Calendar unavailable.");
      setSlots(await response.json());
    } catch (error) {
      if (signal?.aborted) return;
      setSlots([]);
      setMessage(error instanceof Error ? error.message : "Calendar unavailable.");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    void refresh(session, controller.signal);
    return () => controller.abort();
    // The page mode is fixed for the lifetime of this component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function change(slot: Slot) {
    setBusy(true);
    setMessage("");
    try {
      const key = keys.current.get(slot.id) ?? crypto.randomUUID();
      keys.current.set(slot.id, key);
      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(session ? { Authorization: "Bearer " + session } : {}) },
        body: JSON.stringify(clinic ? { slot: slot.id, blocked: !slot.blocked } : { slot: slot.id, key }),
      });
      const data = await response.json();
      setMessage(response.ok ? clinic ? "Availability updated." : "Test booking confirmed. Reference " + data.result : data.error);
    } catch {
      setMessage("Request interrupted. You can retry.");
    } finally {
      await refresh(session);
      setBusy(false);
    }
  }

  const end = new Date(day + "T00:00:00+05:30").getTime() + days * 86400000;
  const visible = clinic ? slots.filter((slot) => calendarDay.format(new Date(slot.starts_at)) >= day && Date.parse(slot.starts_at) < end) : slots;
  return <section className="mx-auto max-w-3xl space-y-4 p-8">
    <h1 className="text-3xl font-bold">{admin ? "DOCVY owner console" : clinic ? "DOCVY Test Hospital calendar" : "Book with DOCVY Test Doctor"}</h1>
    <p>Fictional staging clinic. Times shown in India Standard Time.</p>
    {clinic && !session && <form className="space-y-2" onSubmit={(event) => {
      event.preventDefault();
      setSession(token.trim());
      setToken("");
    }}>
      <label className="block">Staging staff access token <input className="border p-2" type="password" required value={token} onChange={(event) => setToken(event.target.value)} /></label>
      <button className="rounded border p-2">Open calendar</button>
    </form>}
    {clinic && session && <div className="flex flex-wrap gap-4">
      <label>Start date <input type="date" required value={day} onChange={(event) => setDay(event.target.value)} /></label>
      <label>View <select value={days} onChange={(event) => setDays(Number(event.target.value))}><option value={1}>Day</option><option value={7}>Week</option></select></label>
      <button onClick={() => { setSession(""); setSlots([]); setMessage(""); }} disabled={busy}>Close session</button>
    </div>}
    {(!clinic || session) && <button className="rounded border p-2" disabled={busy} onClick={() => void refresh(session)}>Refresh calendar</button>}
    <p role="status">{message}</p>
    <ul className="space-y-2">{visible.map((slot) => <li className="flex flex-wrap items-center justify-between gap-3 rounded border p-3" key={slot.id}>
      <span>{dateLabel.format(new Date(slot.starts_at))} – {dateLabel.format(new Date(slot.ends_at))}</span>
      {slot.booking_id ? <span>Booked · {slot.booking_id}</span> : <button className="rounded border p-2" disabled={busy} onClick={() => void change(slot)}>
        {clinic ? slot.blocked ? "Unblock" : "Block" : "Reserve test slot"}
      </button>}
    </li>)}</ul>
    {(!clinic || session) && visible.length === 0 && <p>No slots to show.</p>}
  </section>;
}
