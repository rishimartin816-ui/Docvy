import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Temporarily disabled for the public website launch.
// Keep the endpoint fail-closed so direct API calls cannot collect personal data.
export async function POST() {
  return NextResponse.json(
    { error: "New submissions are temporarily paused. Please check back soon." },
    { status: 503 }
  );
}
