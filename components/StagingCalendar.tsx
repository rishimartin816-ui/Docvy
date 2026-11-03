"use client";

import { CalendarDays, CalendarCheck, CalendarX, Clock3, LogOut, RefreshCw } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

type Slot = { id: string; starts_at: string; ends_at: string; blocked?: boolean; booking_id?: string; booking_status?: "confirmed" | "completed" | "no_show" };
type Enquiry = {
  reference: string;
  patient_name: string;
  mobile: string;
  email: string | null;
  facility: string;
  status: "new" | "contacted" | "closed";
  booking_id?: string | null;
};
type AppointmentHistory = {
  status: string;
  starts_at: string;
  events: { action: string; at: string; appointment_at: string | null }[];
};
const dateLabel = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
const calendarDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" });

export default function StagingCalendar({ clinic = false, admin = false, clinicName = "DOCVY Test Hospital", staging = true }: { clinic?: boolean; admin?: boolean; clinicName?: string; staging?: boolean }) {
  const [session, setSession] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [destinations, setDestinations] = useState<Slot[]>([]);
  const [history, setHistory] = useState<AppointmentHistory | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[] | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [day, setDay] = useState(calendarDay.format(new Date()));
  const [days, setDays] = useState(7);
  const keys = useRef(new Map<string, string>());

  async function refresh(access: string, signal?: AbortSignal) {
    if (clinic && (!access || !day)) return;
    try {
      const options: RequestInit = { headers: access ? { Authorization: "Bearer " + access } : undefined, signal };
      const path = "/api/crm" + (admin ? "?admin" : clinic ? "?clinic" : "");
      const calendar = clinic ? path + "&day=" + encodeURIComponent(day) + "&days=" + days : path;
      const [response, upcoming] = await Promise.all([
        fetch(calendar, options),
        clinic ? fetch(path + "&upcoming", options) : null,
      ]);
      if (!response.ok) throw new Error(response.status === 403 ? "Staff access required." : "Calendar unavailable.");
      const [rows, upcomingRows] = await Promise.all([response.json(), upcoming?.ok ? upcoming.json() : []]);
      if (signal?.aborted) return;
      setSlots(rows);
      setDestinations(upcomingRows);
    } catch (error) {
      if (signal?.aborted) return;
      setSlots([]);
      setDestinations([]);
      setMessage(error instanceof Error ? error.message : "Calendar unavailable.");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    void refresh(session, controller.signal);
    return () => controller.abort();
    // The page mode is fixed for the lifetime of this component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, day, days]);
  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sign-in",
          email: fields.get("email"),
          password: fields.get("password"),
          admin,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setSession(data.token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Sign-in unavailable.");
    } finally {
      form.reset();
      setBusy(false);
    }
  }
  async function createSlot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + session },
        body: JSON.stringify({ action: "create-slot", starts: fields.get("starts"), ends: fields.get("ends"), admin }),
      });
      if (!response.ok) throw new Error((await response.json()).error);
      form.reset();
      setMessage("Slot added.");
      await refresh(session);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Slot could not be saved.");
    } finally {
      setBusy(false);
    }
  }
  async function loadHistory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reference = String(new FormData(event.currentTarget).get("reference") ?? "").trim();
    if (!reference) return;
    setBusy(true);
    setHistory(null);
    setMessage("");
    try {
      const path = "/api/crm?history=" + encodeURIComponent(reference) + (admin ? "&admin" : "");
      const response = await fetch(path, { headers: { Authorization: "Bearer " + session } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setHistory(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Appointment history unavailable.");
    } finally {
      setBusy(false);
    }
  }
  async function loadEnquiries() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/crm?enquiries" + (admin ? "&admin" : ""), {
        headers: { Authorization: "Bearer " + session },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setEnquiries(data);
    } catch (error) {
      setEnquiries(null);
      setMessage(error instanceof Error ? error.message : "Enquiries unavailable.");
    } finally {
      setBusy(false);
    }
  }

  async function bookEnquiry(event: FormEvent<HTMLFormElement>, item: Enquiry) {
    event.preventDefault();
    const slot = new FormData(event.currentTarget).get("slot");
    if (typeof slot !== "string" || !slot) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + session },
        body: JSON.stringify({ action: "book-enquiry", reference: item.reference, slot, admin }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setEnquiries((current) => current?.map((entry) =>
        entry.reference === item.reference ? { ...entry, status: "closed", booking_id: data.bookingId } : entry) ?? null);
      setMessage("Appointment confirmed.");
      await refresh(session);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Enquiry booking unavailable.");
    } finally {
      setBusy(false);
    }
  }
  async function updateEnquiry(item: Enquiry, status: "contacted" | "closed") {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + session },
        body: JSON.stringify({ action: "enquiry-status", reference: item.reference, expected: item.status, status, admin }),
      });
      if (!response.ok) throw new Error((await response.json()).error);
      setEnquiries((current) => current?.map((entry) =>
        entry.reference === item.reference ? { ...entry, status } : entry) ?? null);
      setMessage("Enquiry updated.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Enquiry update unavailable.");
    } finally {
      setBusy(false);
    }
  }
  async function change(slot: Slot, status?: "cancelled" | "completed" | "no_show", destination?: string) {
    if (status === "cancelled" && !window.confirm("Cancel this appointment and release its slot?")) return;
    setBusy(true);
    setMessage("");
    try {
      const key = keys.current.get(slot.id) ?? crypto.randomUUID();
      keys.current.set(slot.id, key);
      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(session ? { Authorization: "Bearer " + session } : {}) },
        body: JSON.stringify(destination ? { action: "reschedule", booking: slot.booking_id, source: slot.id, destination } : status ? { action: "booking-status", booking: slot.booking_id, status } : clinic ? { slot: slot.id, blocked: !slot.blocked } : { slot: slot.id, key }),
      });
      const data = await response.json();
      setMessage(response.ok ? status || destination ? "Appointment updated." : clinic ? "Availability updated." : "Test booking confirmed. Reference " + data.result : data.error);
    } catch {
      setMessage("Request interrupted. You can retry.");
    } finally {
      await refresh(session);
      setBusy(false);
    }
  }

  const end = new Date(day + "T00:00:00+05:30").getTime() + days * 86400000;
  const visible = clinic ? slots.filter((slot) => calendarDay.format(new Date(slot.starts_at)) >= day && Date.parse(slot.starts_at) < end) : slots;
  const appointments = visible.filter((slot) => slot.booking_id).length;
  const blocked = visible.filter((slot) => slot.blocked && !slot.booking_id).length;
  const isAvailable = (slot: Slot) => !slot.booking_id && !slot.blocked && Date.parse(slot.starts_at) > Date.now();
  const available = visible.filter(isAvailable).length;
  const title = admin ? "Owner console" : "Clinic workspace";
  const field = "block w-full rounded-btn border border-line bg-white px-3 py-2 text-ink";
  const button = "inline-flex items-center justify-center gap-2 rounded-btn border border-line bg-white px-3 py-2 text-sm font-semibold hover:bg-lav disabled:opacity-50";

  if (clinic) return (
    <section className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 lg:py-10">
      <div className="overflow-hidden rounded-[24px] border border-line bg-white shadow-sm lg:grid lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="bg-plum px-6 py-6 text-white">
          <p className="font-head text-xl font-bold">DOCVY CRM</p>
          <p className="text-sm text-lav">{clinicName}</p>
          {session && <nav aria-label="Clinic workspace" className="mt-6 flex flex-wrap gap-2 lg:flex-col">
            <a className="rounded-btn px-3 py-2 text-sm hover:bg-white/10" href="#crm-overview">Overview</a>
            <a className="rounded-btn px-3 py-2 text-sm hover:bg-white/10" href="#crm-calendar">Appointments & availability</a>
            <a className="rounded-btn px-3 py-2 text-sm hover:bg-white/10" href="#crm-enquiries">Enquiries</a>
            <button className="flex items-center gap-2 rounded-btn px-3 py-2 text-left text-sm hover:bg-white/10 disabled:opacity-50"
              disabled={busy} onClick={() => { setSession(""); setSlots([]); setDestinations([]); setEnquiries(null); setHistory(null); setMessage(""); }}>
              <LogOut size={16} aria-hidden="true" /> Close session
            </button>
          </nav>}
        </aside>
        <div className="min-w-0 bg-sand p-4 sm:p-7">
          <header id="crm-overview" className="rounded-card bg-lav p-6 sm:p-8">
            <p className="text-sm font-semibold text-grey">{clinicName}{staging ? " · Staging" : ""}</p>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{title}</h1>
            <p className="mt-2 text-grey">Manage appointments and control which slots patients can book.</p>
          </header>
          {!session ? <form className="mt-5 max-w-md space-y-4 rounded-card border border-line bg-white p-6" onSubmit={signIn}>
            <h2 className="text-xl font-bold">Staff sign-in</h2>
            <label className="block">Staff email <input className={field} type="email" name="email" autoComplete="username" required /></label>
            <label className="block">Password <input className={field} type="password" name="password" autoComplete="current-password" required /></label>
            <button className="rounded-btn bg-plum px-5 py-2 font-semibold text-white disabled:opacity-50" disabled={busy}>Sign in</button>
          </form> : <>
            <div className="my-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Booked appointments", count: appointments, icon: CalendarCheck },
                { label: "Available slots", count: available, icon: Clock3 },
                { label: "Blocked slots", count: blocked, icon: CalendarX },
              ].map(({ label, count, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 rounded-card border border-line bg-white p-4">
                  <Icon size={22} aria-hidden="true" className="shrink-0 text-mulb" />
                  <div><p className="text-sm text-grey">{label}</p><p className="text-2xl font-bold tabular-nums">{count}</p></div>
                </div>
              ))}
            </div>
            <section id="crm-calendar" className="rounded-card border border-line bg-white p-4 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold"><CalendarDays size={22} aria-hidden="true" /> Appointments & availability</h2>
                  <p className="text-sm text-grey">Selected period · India Standard Time</p>
                </div>
                <button className={button} disabled={busy} onClick={() => void refresh(session)}>
                  <RefreshCw size={16} aria-hidden="true" /> Refresh calendar
                </button>
              </div>
              <div className="my-4 flex flex-wrap gap-3 text-sm">
                <label>Start date <input className={field} type="date" required disabled={busy} value={day} onChange={(event) => setDay(event.target.value)} /></label>
                <label>View <select className={field} disabled={busy} value={days} onChange={(event) => setDays(Number(event.target.value))}><option value={1}>Day</option><option value={7}>Week</option></select></label>
              </div>
              <details className="mb-4 rounded-btn border border-line bg-sand p-3">
                <summary className="cursor-pointer font-semibold">Add appointment slot</summary>
                <form className="mt-3 flex flex-wrap items-end gap-3 text-sm" onSubmit={createSlot}>
                  <label>Starts (IST)<input className={field} type="datetime-local" name="starts" required /></label>
                  <label>Ends (IST)<input className={field} type="datetime-local" name="ends" required /></label>
                  <button className={button} disabled={busy}>Add slot</button>
                </form>
              </details>
              {visible.length === 0 ? <p className="rounded-btn bg-sand p-4 text-grey">No slots in this period.</p> :
                <ul className="divide-y divide-line">{visible.map((slot) => (
                  <li className="flex flex-wrap items-center justify-between gap-3 py-3" key={slot.id}>
                    <div>
                      <p className="font-semibold">{dateLabel.format(new Date(slot.starts_at))} – {dateLabel.format(new Date(slot.ends_at))}</p>
                      <p className="break-all text-sm text-grey">{slot.booking_id ? (slot.booking_status === "completed" ? "Completed" : slot.booking_status === "no_show" ? "No-show" : "Booked") + " · " + slot.booking_id : slot.blocked ? "Blocked" : Date.parse(slot.starts_at) <= Date.now() ? "Past slot" : "Available"}</p>
                    </div>
                    {slot.booking_id && slot.booking_status === "confirmed" && (
                      <div className="flex flex-wrap gap-2">
                        {Date.parse(slot.starts_at) <= Date.now() ? <>
                          <button className={button} disabled={busy} onClick={() => void change(slot, "completed")}>Complete</button>
                          <button className={button} disabled={busy} onClick={() => void change(slot, "no_show")}>Mark no-show</button>
                        </> : <>
                          {destinations.length > 0 && <form className="flex flex-wrap items-center gap-2" onSubmit={(event) => {
                            event.preventDefault();
                            const destination = new FormData(event.currentTarget).get("destination");
                            if (typeof destination === "string" && destination) void change(slot, undefined, destination);
                          }}>
                            <select aria-label="New appointment time" name="destination" className={button} defaultValue="" required disabled={busy}>
                              <option value="">Choose a new time</option>
                              {destinations.map((target) => <option key={target.id} value={target.id}>{dateLabel.format(new Date(target.starts_at))}</option>)}
                            </select>
                            <button className={button} disabled={busy}>Reschedule</button>
                          </form>}
                          <button className={button} disabled={busy} onClick={() => void change(slot, "cancelled")}>Cancel appointment</button>
                        </>}
                      </div>
                    )}
                    {!slot.booking_id && Date.parse(slot.starts_at) > Date.now() &&
                      <button className={button} disabled={busy} onClick={() => void change(slot)}>{slot.blocked ? "Unblock" : "Block"}</button>}
                  </li>
                ))}</ul>}
            </section>
            <section className="mt-5 rounded-card border border-line bg-white p-4 sm:p-6">
              <h2 className="text-xl font-bold">Appointment history</h2>
              <form className="mt-3 flex flex-wrap items-end gap-2 text-sm" onSubmit={loadHistory}>
                <label>Appointment reference <input className={field} name="reference" maxLength={36} required /></label>
                <button className={button} disabled={busy}>Find appointment</button>
              </form>
              {history && <div className="mt-4">
                <p className="font-semibold capitalize">{history.status.replace("_", " ")} · {dateLabel.format(new Date(history.starts_at))}</p>
                <ol className="mt-2 divide-y divide-line">
                  {history.events.map((event) => <li key={event.at + event.action} className="py-2 text-sm">
                    <span className="capitalize">{event.action.replace("_", " ")}</span> · {dateLabel.format(new Date(event.at))}
                    {event.appointment_at && <span className="text-grey"> · Visit {dateLabel.format(new Date(event.appointment_at))}</span>}
                  </li>)}
                </ol>
              </div>}
            </section>
            <section id="crm-enquiries" className="mt-5 rounded-card border border-line bg-white p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Appointment enquiries</h2>
                <button className={button} disabled={busy} onClick={() => void loadEnquiries()}>Load enquiries</button>
              </div>
              {enquiries?.length === 0 && <p className="mt-3 text-sm text-grey">No enquiries for this clinic.</p>}
              {enquiries && <ul className="divide-y divide-line">
                {enquiries.map((item) => <li key={item.reference} className="break-words py-3">
                  <p className="font-semibold">{item.patient_name} · {item.reference}</p>
                  <p className="text-sm text-grey">{item.facility} · {item.status}</p>
                  <p className="text-sm">{item.mobile}{item.email ? " · " + item.email : ""}</p>
                  {item.booking_id && <p className="text-sm text-grey">Appointment reference {item.booking_id}</p>}
                  {item.status !== "closed" && destinations.length > 0 &&
                    <form className="mt-2 flex flex-wrap items-center gap-2" onSubmit={(event) => void bookEnquiry(event, item)}>
                      <select aria-label="Appointment time" name="slot" className={button} defaultValue="" required disabled={busy}>
                        <option value="">Choose an appointment time</option>
                        {destinations.map((slot) => <option key={slot.id} value={slot.id}>{dateLabel.format(new Date(slot.starts_at))}</option>)}
                      </select>
                      <button className={button} disabled={busy}>Confirm appointment</button>
                    </form>}
                  {item.status !== "closed" && <div className="mt-2 flex flex-wrap gap-2">
                    {item.status === "new" && <button className={button} disabled={busy} onClick={() => void updateEnquiry(item, "contacted")}>Mark contacted</button>}
                    <button className={button} disabled={busy} onClick={() => void updateEnquiry(item, "closed")}>Close enquiry</button>
                  </div>}
                </li>)}
              </ul>}
            </section>
          </>}
          <p role="status" className="mt-3 text-sm text-grey">{message}</p>
        </div>
      </div>
    </section>
  );

  return <section className="mx-auto max-w-3xl space-y-4 p-8">
    <h1 className="text-3xl font-bold">Book with DOCVY Test Doctor</h1>
    <p>Fictional staging clinic. Times shown in India Standard Time.</p>
    <button className={button} disabled={busy} onClick={() => void refresh(session)}>Refresh calendar</button>
    <p role="status">{message}</p>
    <ul className="space-y-2">{slots.map((slot) => <li className="flex flex-wrap items-center justify-between gap-3 rounded border p-3" key={slot.id}>
      <span>{dateLabel.format(new Date(slot.starts_at))} – {dateLabel.format(new Date(slot.ends_at))}</span>
      <button className={button} disabled={busy} onClick={() => void change(slot)}>Reserve test slot</button>
    </li>)}</ul>
    {slots.length === 0 && <p>No slots to show.</p>}
  </section>;
}
