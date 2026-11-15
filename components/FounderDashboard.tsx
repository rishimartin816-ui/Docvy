"use client";
import { useState, type FormEvent } from "react";
type Dashboard = {
    enquiries: {
        clinic_id: string;
        status: string;
        booking_id: string | null;
    }[];
    notifications: {
        event: string;
        status: string;
        attempts: number;
    }[];
    limit: number;
};
export default function FounderDashboard() {
    const [token, setToken] = useState(""), [data, setData] = useState<Dashboard | null>(null), [message, setMessage] = useState(""), [busy, setBusy] = useState(false);
    async function load(session = token) { const r = await fetch("/api/booking?dashboard", { headers: { Authorization: "Bearer " + session } }); const d = await r.json(); if (!r.ok)
        throw Error(d.error); setData(d); }
    async function login(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const f = new FormData(e.currentTarget); setBusy(true); try {
        const r = await fetch("/api/crm", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "sign-in", admin: true, email: f.get("email"), password: f.get("password") }) });
        const d = await r.json();
        if (!r.ok)
            throw Error(d.error);
        await load(d.token);
        setToken(d.token);
    }
    catch (e) {
        setMessage(e instanceof Error ? e.message : "Sign-in failed");
    }
    finally {
        setBusy(false);
    } }
    async function mock() { setBusy(true); try {
        const r = await fetch("/api/booking", { method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: JSON.stringify({ action: "mock-notifications" }) });
        const d = await r.json();
        if (!r.ok)
            throw Error(d.error);
        setMessage("Mock processed: " + d.processed + ". No external messages sent.");
        await load();
    }
    catch (e) {
        setMessage(e instanceof Error ? e.message : "Outbox failed");
    }
    finally {
        setBusy(false);
    } }
    return <section className="mx-auto max-w-3xl p-6"><h1 className="text-3xl font-bold">DOCVY founder dashboard</h1><p className="my-4">Staging only. Founder allowlist and clinic-owner sign-in required. No patient contact details are shown here.</p>{!token ? <form className="grid gap-4" onSubmit={login}><label>Email<input type="email" name="email" required className="block border p-3"/></label><label>Password<input type="password" name="password" required className="block border p-3"/></label><button disabled={busy}>Sign in</button></form> : <><button onClick={() => { setToken(""); setData(null); }}>Clear dashboard session</button><button className="ml-5" disabled={busy} onClick={() => void mock()}>Run mock notifications</button>{data && <dl className="mt-6 grid gap-3"><dt>Requests (up to {data.limit})</dt><dd>{data.enquiries.length}</dd><dt>Clinic-approved bookings</dt><dd>{data.enquiries.filter(e => e.booking_id).length}</dd><dt>Pending notifications</dt><dd>{data.notifications.filter(n => n.status === "pending").length}</dd><dt>Mock deliveries</dt><dd>{data.notifications.filter(n => n.status === "mock_delivered").length}</dd></dl>}</>}<p role="status" className="mt-4">{message}</p></section>;
}
