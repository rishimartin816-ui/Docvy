import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  const ok = b && ["work", "college", "other"].includes(b.purpose)
    && typeof b.name === "string" && b.name.trim().length >= 2
    && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email ?? "")
    && /^[6-9]\d{9}$/.test(b.mobile ?? "")
    && b.c1 === true && b.c2 === true && b.c3 === true && b.urgent !== true;
  if (!ok) return NextResponse.json({ error: "Please check the details and consent boxes." }, { status: 400 });

  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!sheetsUrl) {
    return NextResponse.json({ error: "The form is not connected to Google Sheets yet. Please try again later." }, { status: 503 });
  }

  const ref = "DVY-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const record = {
    ref,
    purpose: b.purpose,
    name: b.name.trim().slice(0, 120),
    email: b.email.trim().slice(0, 254),
    mobile: b.mobile.trim(),
    privacyConsent: true,
    termsConsent: true,
    certificateDisclaimerAccepted: true,
    submittedAt: new Date().toISOString(),
    status: "New"
  };

  try {
    const response = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      cache: "no-store"
    });
    if (!response.ok) throw new Error("Google Sheets endpoint rejected the request");
    const result = await response.json().catch(() => null);
    if (!result || result.ok !== true) throw new Error("Google Sheets did not confirm saving the request");
    return NextResponse.json({ ref });
  } catch {
    return NextResponse.json({ error: "We could not save your details. Please try again later." }, { status: 502 });
  }
}
