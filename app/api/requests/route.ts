import { NextResponse } from "next/server";
import { db, makeRef } from "@/lib/store";
import { emit } from "@/lib/events";
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  const ok = b && ["work", "college", "other"].includes(b.purpose) && typeof b.name === "string" && b.name.trim().length >= 2
    && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email ?? "") && /^[6-9]\d{9}$/.test(b.mobile ?? "") && b.c1 && b.c2 && b.c3 && !b.urgent;
  if (!ok) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const ref = makeRef();
  // TODO: persist contact details in a real database with access control and audit trail. Never log them.
  db.set(ref, { ref, purpose: b.purpose, status: "awaiting_payment", createdAt: new Date().toISOString() });
  await emit("request_created", ref);
  return NextResponse.json({ ref });
}
