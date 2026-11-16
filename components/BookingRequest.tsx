"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
type Slot = {
    id: string;
    provider_id: string;
    starts_at: string;
    ends_at: string;
    fee_paise: number | null;
};
export default function BookingRequest() {
    const [slots, setSlots] = useState<Slot[]>([]), [message, setMessage] = useState(""), [busy, setBusy] = useState(false), [saved, setSaved] = useState(false);
    const key = useRef("");
    useEffect(() => { fetch("/api/booking").then(async (r) => { if (!r.ok)
        throw Error("Availability could not be loaded"); setSlots(await r.json()); }).catch(e => setMessage(e.message)); }, []);
    async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setBusy(true); const data = new FormData(e.currentTarget); key.current ||= crypto.randomUUID(); try {
        const r = await fetch("/api/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ requestId: key.current, slot: data.get("slot"), name: data.get("name"), phone: data.get("phone"), email: data.get("email"), consent: data.get("consent") === "on" }) });
        const v = await r.json();
        if (!r.ok)
            throw Error(v.error);
        setSaved(true);
        setMessage("Request saved: " + v.reference + ". Awaiting clinic approval. This is not a confirmed appointment.");
    }
    catch (e) {
        setMessage(e instanceof Error ? e.message : "Please retry with the same details");
    }
    finally {
        setBusy(false);
    } }
    return <section className="mx-auto max-w-xl p-6"><h1 className="text-3xl font-bold">Request a clinic appointment</h1><p className="my-4">Staging only: fictional schedules and test contact details. A request does not hold a slot. Clinic staff must approve it before it becomes a booking. Do not enter patient health information.</p><form className="grid gap-4" onSubmit={submit} onChange={() => { key.current = ""; setSaved(false); }}><label>Doctor and requested time<select name="slot" required className="block w-full border p-3"><option value="">Choose a time</option>{slots.map(s => <option value={s.id} key={s.id}>{s.provider_id} · {new Date(s.starts_at).toISOString()} · {s.fee_paise == null ? "Confirm fee with clinic" : "INR " + s.fee_paise / 100}</option>)}</select></label><label>Name<input name="name" required maxLength={100} className="block w-full border p-3"/></label><label>Mobile (+91)<input name="phone" required pattern="\+91[6-9][0-9]{9}" className="block w-full border p-3"/></label><label>Email (optional)<input name="email" type="email" maxLength={254} className="block w-full border p-3"/></label><label><input type="checkbox" name="consent" required/> I consent to sharing these contact details with the clinic for this request.</label><button disabled={busy || saved || !slots.length} className="docvy-pill docvy-pill-primary">{busy ? "Saving request…" : "Request clinic approval"}</button></form><p role="status" className="mt-4">{message}</p></section>;
}
