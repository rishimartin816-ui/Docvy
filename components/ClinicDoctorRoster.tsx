"use client";

import { useEffect, useState, type FormEvent } from "react";

type Doctor = { id: string; name: string; specialty: string; present: boolean | null; changed_at: string | null };
const timestamp = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
const button = "rounded-btn border border-line bg-white px-3 py-2 text-sm font-semibold hover:bg-primary-tint disabled:opacity-50";

export default function ClinicDoctorRoster({ session, canSchedule, canManage }: { session: string; canSchedule: boolean; canManage: boolean }) {
  const [doctors, setDoctors] = useState<Doctor[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load(signal?: AbortSignal) {
    try {
      const response = await fetch("/api/crm?doctors", { headers: { Authorization: "Bearer " + session }, signal });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      if (!signal?.aborted) setDoctors(data);
    } catch (failure) {
      if (!signal?.aborted) setError(failure instanceof Error ? failure.message : "Doctor roster unavailable.");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function change(body: object, form?: HTMLFormElement) {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/crm", {
        method: "POST",
        headers: { Authorization: "Bearer " + session, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error((await response.json()).error);
      form?.reset();
      await load();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Doctor roster could not be updated.");
    } finally {
      setBusy(false);
    }
  }

  function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void change({ action: "add-doctor", name: data.get("name"), specialty: data.get("specialty") }, event.currentTarget);
  }

  return <section id="crm-doctors" aria-labelledby="crm-doctors-heading" className="docvy-glass mb-5 scroll-mt-28 p-4 sm:p-6">
    <h2 id="crm-doctors-heading" className="text-xl font-bold">Doctor presence</h2>
    <p className="mt-1 text-sm text-grey">Check who is at the clinic. Presence updates are separate from appointment availability.</p>
    {error && <p role="alert" className="mt-3 text-sm font-semibold">{error} <button className="underline" type="button" disabled={busy} onClick={() => { setError(""); void load(); }}>Refresh roster</button></p>}
    {doctors === null && !error && <p role="status" className="mt-3 text-sm text-grey">Loading doctor roster…</p>}
    {doctors?.length === 0 && <p className="mt-3 text-sm text-grey">No doctors have been added to this clinic.</p>}
    <ul className="mt-3 divide-y divide-line">
      {doctors?.map((doctor) => <li key={doctor.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
        <div>
          <p className="font-semibold">{doctor.name} <span className="ml-2 rounded-full bg-primary-tint px-2 py-1 text-xs text-primary">{doctor.present === null ? "Unknown" : doctor.present ? "In clinic" : "Out of clinic"}</span></p>
          <p className="mt-1 text-sm text-grey">{doctor.specialty}{doctor.changed_at ? " · Updated " + timestamp.format(new Date(doctor.changed_at)) : ""}</p>
        </div>
        {canSchedule && <div className="flex gap-2">
          {[true, false].map((present) => <button key={String(present)} type="button" disabled={busy || doctor.present === present} className={button} onClick={() => void change({ action: "doctor-presence", doctor: doctor.id, present })}>{present ? "Check in" : "Check out"}</button>)}
        </div>}
      </li>)}
    </ul>
    {canManage && doctors !== null && <form onSubmit={add} className="mt-4 flex flex-wrap items-end gap-3 rounded-btn bg-surface p-3 text-sm">
      <label>Doctor name<input name="name" required minLength={2} maxLength={100} className="block rounded-btn border border-line bg-white px-3 py-2" /></label>
      <label>Specialty<input name="specialty" required minLength={2} maxLength={80} className="block rounded-btn border border-line bg-white px-3 py-2" /></label>
      <button className={button} disabled={busy}>Add doctor</button>
    </form>}
  </section>;
}
