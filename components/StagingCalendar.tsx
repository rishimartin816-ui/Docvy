"use client";

import { CalendarDays, CalendarCheck, CalendarX, Clock3, LayoutDashboard, LogOut, Mail, RefreshCw, ShieldCheck, Stethoscope, History } from "lucide-react";
import Image from "next/image";
import ClinicDoctorRoster from "@/components/ClinicDoctorRoster";
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
  reference?: string;
  fee_paise?: number | null;
  contact?: { enquiry_reference: string; name: string; mobile: string; email: string | null } | null;
  status: string;
  starts_at: string;
  events: { action: string; at: string; appointment_at: string | null }[];
};
const dateLabel = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });
const chartDay = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
const calendarDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" });

export default function StagingCalendar({ clinic = false, admin = false, clinicName = "DOCVY Test Hospital", staging = true }: { clinic?: boolean; admin?: boolean; clinicName?: string; staging?: boolean }) {
  const [session, setSession] = useState("");
  const [canManageDoctors, setCanManageDoctors] = useState(false);
  const [canSchedule, setCanSchedule] = useState(false);
  const [loadedPeriod, setLoadedPeriod] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [destinations, setDestinations] = useState<Slot[]>([]);
  const [history, setHistory] = useState<AppointmentHistory | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[] | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [day, setDay] = useState(calendarDay.format(new Date()));
  const [days, setDays] = useState(7);
  const historyHeading = useRef<HTMLHeadingElement>(null);
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
      setLoadedPeriod(day + ":" + days);
      setDestinations(upcomingRows);
    } catch (error) {
      if (signal?.aborted) return;
      setLoadedPeriod("");
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
      setCanSchedule(data.canSchedule === true);
      setCanManageDoctors(data.canManageDoctors === true);
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
  async function loadHistory(reference: string) {
    if (!reference || !session || !canSchedule || busy) return;
    historyHeading.current?.focus();
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
  async function saveBookingFee(event: FormEvent<HTMLFormElement>, appointment: AppointmentHistory) {
    event.preventDefault();
    if (!session || !canSchedule || busy || !appointment.reference || appointment.fee_paise === undefined) return;
    const amount = String(new FormData(event.currentTarget).get("fee") ?? "");
    if (!/^\d{1,6}(\.\d{1,2})?$/.test(amount)) return;
    const feePaise = Math.round(Number(amount) * 100);
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { Authorization: "Bearer " + session, "Content-Type": "application/json" },
        body: JSON.stringify({ action: "booking-fee", booking: appointment.reference, expectedFeePaise: appointment.fee_paise, feePaise }),
      });
      if (!response.ok) throw new Error((await response.json()).error);
      setHistory({ ...appointment, fee_paise: feePaise });
      setMessage("Booking fee saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Booking fee could not be saved.");
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
  const chartRows = day ? Array.from({ length: days }, (_, index) => {
    const date = new Date(end - (days - index) * 86400000);
    const dateKey = calendarDay.format(date);
    const dailySlots = visible.filter((slot) => calendarDay.format(new Date(slot.starts_at)) === dateKey);
    return {
      label: chartDay.format(date),
      booked: dailySlots.filter((slot) => slot.booking_id).length,
      open: dailySlots.filter(isAvailable).length,
      blocked: dailySlots.filter((slot) => slot.blocked && !slot.booking_id).length,
    };
  }) : [];
  const chartMax = Math.max(1, ...chartRows.map(({ booked, open, blocked }) => booked + open + blocked));
  const title = admin ? "Owner console" : "Clinic workspace";
  const field = "block w-full rounded-btn border border-line bg-white px-3 py-2 text-ink";
  const button = "inline-flex items-center justify-center gap-2 rounded-btn border border-line bg-white px-3 py-2 text-sm font-semibold hover:bg-lav disabled:opacity-50";

  const glass = "docvy-glass";

  if (clinic) return (
    <section className="mx-auto max-w-[1440px] px-3 py-5 sm:px-8 lg:py-10">
      <div className="overflow-hidden rounded-[32px] border border-white docvy-garden shadow-[0_25px_70px_rgba(23,58,55,0.12)] lg:grid lg:grid-cols-[222px_minmax(0,1fr)]">
        <aside className="border-b border-white/90 bg-white/60 px-4 py-5 text-plum backdrop-blur-2xl lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3 rounded-2xl border border-white/90 bg-white/65 p-3 shadow-sm">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e0efe5] text-[#245a46]"><ShieldCheck size={21} aria-hidden="true" /></span>
            <div><p className="font-head font-bold tracking-wide">DOCVY CRM</p><p className="text-xs text-grey">{clinicName}</p></div>
          </div>
          {session && <nav aria-label="Clinic workspace" className="mt-6 flex flex-wrap gap-2 lg:flex-col">
            <a className="flex items-center gap-2 rounded-btn bg-white/80 shadow-sm px-3 py-2 text-sm font-semibold" href="#crm-overview"><LayoutDashboard size={16} aria-hidden="true" /> Overview</a>
            <a className="flex items-center gap-2 rounded-btn px-3 py-2 text-sm hover:bg-white/85" href="#crm-calendar"><CalendarDays size={16} aria-hidden="true" /> Appointments</a>
            <a className="flex items-center gap-2 rounded-btn px-3 py-2 text-sm hover:bg-white/85" href="#crm-doctors"><Stethoscope size={16} aria-hidden="true" /> Doctor presence</a>
            {canSchedule && <a className="flex items-center gap-2 rounded-btn px-3 py-2 text-sm hover:bg-white/85" href="#crm-history"><History size={16} aria-hidden="true" /> Booking details</a>}
            {canSchedule && <a className="flex items-center gap-2 rounded-btn px-3 py-2 text-sm hover:bg-white/85" href="#crm-enquiries"><Mail size={16} aria-hidden="true" /> Enquiries</a>}
            <button className="flex items-center gap-2 rounded-btn px-3 py-2 text-left text-sm hover:bg-white/85 disabled:opacity-50"
              disabled={busy} onClick={() => { setSession(""); setCanSchedule(false); setCanManageDoctors(false); setLoadedPeriod(""); setSlots([]); setDestinations([]); setEnquiries(null); setHistory(null); setMessage(""); }}>
              <LogOut size={16} aria-hidden="true" /> Close session
            </button>
          </nav>}
        </aside>
        <div className="min-w-0 p-3 sm:p-6">
          <header id="crm-overview" className="relative isolate grid items-center overflow-hidden rounded-[28px] border border-white bg-[linear-gradient(120deg,#fcfdf8,#e0efe5_59%,#dce9cb)] px-5 pt-6 shadow-[0_14px_35px_rgba(29,81,84,0.10)] sm:grid-cols-[1.12fr_1fr] sm:gap-2 sm:px-8 sm:py-6 lg:px-10">
            <div className="relative z-10 py-2">
              <p className="inline-flex items-center gap-2 rounded-full border border-white bg-white/70 px-3 py-1 text-xs font-semibold text-[#41584d] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#245a46]" aria-hidden="true" />
                {clinicName}{staging ? " · Demo" : ""}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.055em] text-[#1e3028] lg:text-5xl">{title}</h1>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[#41584d] sm:text-base">Manage appointments, publish availability, and follow up on patient enquiries.</p>
            </div>
            <Image src="/images/crm-glass-calendar.svg" alt="" width={440} height={300} priority unoptimized
              className="mx-auto -mt-3 h-auto w-full max-w-[270px] sm:mt-0 sm:max-w-[390px]" />
          </header>

          {!session ? <form className={glass + " mt-5 max-w-md space-y-4 p-5 sm:p-7"} onSubmit={signIn}>
            <h2 className="text-xl font-bold">Staff sign-in</h2>
            <label className="block">Staff email <input className={field} type="email" name="email" autoComplete="username" required /></label>
            <label className="block">Password <input className={field} type="password" name="password" autoComplete="current-password" required /></label>
            <button className="rounded-btn bg-[#245a46] px-5 py-2 font-semibold text-white disabled:opacity-50" disabled={busy}>Sign in</button>
          </form> : <>
            <div className="my-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Booked appointments", count: appointments, icon: CalendarCheck },
                { label: "Available slots", count: available, icon: Clock3 },
                { label: "Blocked slots", count: blocked, icon: CalendarX },
              ].map(({ label, count, icon: Icon }) => (
                <div key={label} className={glass + " flex items-center gap-3 p-4"}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e0efe5] text-[#245a46]"><Icon size={21} aria-hidden="true" /></span>
                  <div><p className="text-sm text-grey">{label}</p><p className="text-2xl font-bold tabular-nums">{count}</p></div>
                </div>
              ))}
            </div>
            {loadedPeriod === day + ":" + days && <section className={glass + " mb-5 p-4 sm:p-6"} aria-labelledby="crm-volume-heading">
              <h2 id="crm-volume-heading" className="text-xl font-bold">Appointment volume</h2>
              <p className="mt-1 text-sm text-grey">Booked, open, and blocked slots by day for the selected calendar period.</p>
              <ul className="mt-4 space-y-3">
                {chartRows.map(({ label, booked, open, blocked }) => <li key={label} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:items-center">
                  <span className="text-sm font-semibold">{label}</span>
                  <div>
                    <div className="flex h-3 overflow-hidden rounded-full bg-sand" aria-hidden="true">
                      <span className="bg-mulb" style={{ width: (booked / chartMax * 100) + "%" }} />
                      <span className="bg-[#c59a46]" style={{ width: (open / chartMax * 100) + "%" }} />
                      <span className="bg-[#aa9989]" style={{ width: (blocked / chartMax * 100) + "%" }} />
                    </div>
                    <p className="mt-1 text-xs tabular-nums text-grey">{booked} booked · {open} open · {blocked} blocked</p>
                  </div>
                </li>)}
              </ul>
            </section>}
            <ClinicDoctorRoster session={session} canSchedule={canSchedule} canManage={canManageDoctors} />
            <section id="crm-calendar" className={glass + " p-4 sm:p-6"}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold"><CalendarDays size={22} aria-hidden="true" /> Appointments & availability</h2>
                  <p className="text-sm text-grey">Selected period · India Standard Time{canSchedule ? "" : " · View only"}</p>
                </div>
                <button className={button} disabled={busy} onClick={() => void refresh(session)}>
                  <RefreshCw size={16} aria-hidden="true" /> Refresh calendar
                </button>
              </div>
              <div className="my-4 flex flex-wrap gap-3 text-sm">
                <label>Start date <input className={field} type="date" required disabled={busy} value={day} onChange={(event) => setDay(event.target.value)} /></label>
                <label>View <select className={field} disabled={busy} value={days} onChange={(event) => setDays(Number(event.target.value))}><option value={1}>Day</option><option value={7}>Week</option></select></label>
              </div>
              {canSchedule && <details className="mb-4 rounded-btn border border-line bg-sand p-3">
                <summary className="cursor-pointer font-semibold">Add appointment slot</summary>
                <form className="mt-3 flex flex-wrap items-end gap-3 text-sm" onSubmit={createSlot}>
                  <label>Starts (IST)<input className={field} type="datetime-local" name="starts" required /></label>
                  <label>Ends (IST)<input className={field} type="datetime-local" name="ends" required /></label>
                  <button className={button} disabled={busy}>Add slot</button>
                </form>
              </details>}
              {visible.length === 0 ? <p className="rounded-btn bg-sand p-4 text-grey">No slots in this period.</p> :
                <ul className="divide-y divide-line">{visible.map((slot) => (
                  <li className="flex flex-wrap items-center justify-between gap-3 py-3" key={slot.id}>
                    <div>
                      <p className="font-semibold">{dateLabel.format(new Date(slot.starts_at))} – {dateLabel.format(new Date(slot.ends_at))}</p>
                      <p className="break-all text-sm text-grey">{slot.booking_id ? (slot.booking_status === "completed" ? "Completed" : slot.booking_status === "no_show" ? "No-show" : "Booked") + " · " + slot.booking_id : slot.blocked ? "Blocked" : Date.parse(slot.starts_at) <= Date.now() ? "Past slot" : "Available"}</p>
                    </div>
                    {canSchedule && slot.booking_id && <button type="button" className={button} disabled={busy} onClick={() => { if (slot.booking_id) void loadHistory(slot.booking_id); }}>View booking details</button>}
                    {canSchedule && slot.booking_id && slot.booking_status === "confirmed" && (
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
                    {canSchedule && !slot.booking_id && Date.parse(slot.starts_at) > Date.now() &&
                      <button className={button} disabled={busy} onClick={() => void change(slot)}>{slot.blocked ? "Unblock" : "Block"}</button>}
                  </li>
                ))}</ul>}
            </section>
            {canSchedule && <>
            <section id="crm-history" className={glass + " mt-5 scroll-mt-28 p-4 sm:p-6"}>
              <h2 ref={historyHeading} tabIndex={-1} className="scroll-mt-28 text-xl font-bold">Appointment history</h2>
              <form className="mt-3 flex flex-wrap items-end gap-2 text-sm" onSubmit={(event) => {
                event.preventDefault();
                const reference = String(new FormData(event.currentTarget).get("reference") ?? "").trim();
                void loadHistory(reference);
              }}>
                <label>Appointment reference <input className={field} name="reference" maxLength={36} required /></label>
                <button className={button} disabled={busy}>Find appointment</button>
              </form>
              {history && <div className="mt-4">
                <p className="font-semibold capitalize">{history.status.replace("_", " ")} · {dateLabel.format(new Date(history.starts_at))}</p>
                {history.reference && <p className="break-all text-sm text-grey">{history.reference}</p>}
                {history.reference && history.fee_paise !== undefined && <div className="mt-3 rounded-btn bg-sand p-3">
                  <p className="text-sm font-semibold">Booking fee {history.fee_paise === null ? "· Not set" : "· " + rupees.format(history.fee_paise / 100)}</p>
                  <p className="mt-1 text-xs text-grey">Quoted fee for the appointment. Payments are handled by the clinic.</p>
                  <form key={history.reference + ":" + history.fee_paise} className="mt-3 flex flex-wrap items-end gap-2 text-sm" onSubmit={(event) => void saveBookingFee(event, history)}>
                    <label>Amount (₹)<input className={field} name="fee" type="number" min="0" max="100000" step="0.01" required defaultValue={history.fee_paise === null ? "" : history.fee_paise / 100} /></label>
                    <button className={button} disabled={busy}>Save fee</button>
                  </form>
                </div>}
                {history.contact && <dl className="mt-3 rounded-btn bg-sand p-3 text-sm">
                  <dt className="font-semibold">Patient contact</dt>
                  <dd>{history.contact.name}</dd>
                  <dd className="break-words">{history.contact.mobile}{history.contact.email ? " · " + history.contact.email : ""}</dd>
                  <dd className="text-grey">Enquiry {history.contact.enquiry_reference}</dd>
                </dl>}
                <ol className="mt-2 divide-y divide-line">
                  {history.events.map((event) => <li key={event.at + event.action} className="py-2 text-sm">
                    <span className="capitalize">{event.action.replace("_", " ")}</span> · {dateLabel.format(new Date(event.at))}
                    {event.appointment_at && <span className="text-grey"> · Visit {dateLabel.format(new Date(event.appointment_at))}</span>}
                  </li>)}
                </ol>
              </div>}
            </section>
            <section id="crm-enquiries" className={glass + " mt-5 p-4 sm:p-6"}>
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
