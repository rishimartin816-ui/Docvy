import assert from "node:assert/strict";

const { DOCVY_STAGING_PREVIEW, DOCVY_STAGING_STAFF_EMAIL, DOCVY_STAGING_STAFF_PASSWORD,
  DOCVY_STAGING_VERCEL_BYPASS, DOCVY_STAGING_BOOKING_REFERENCE } = process.env;

function configuration() {
  if (!DOCVY_STAGING_PREVIEW || !DOCVY_STAGING_STAFF_EMAIL || !DOCVY_STAGING_STAFF_PASSWORD) {
    throw new Error("Set the staging preview, staff email, and staff password in your local environment.");
  }
  const preview = new URL(DOCVY_STAGING_PREVIEW);
  if (preview.protocol !== "https:" || !/^docvy-crm-staging-[a-z0-9-]+\.vercel\.app$/.test(preview.hostname) ||
      preview.username || preview.password || preview.port) {
    throw new Error("Use an isolated docvy-crm-staging Vercel preview URL.");
  }
  return preview.origin;
}

async function verify() {
  const origin = configuration();
  const booking = DOCVY_STAGING_BOOKING_REFERENCE;
  if (booking && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(booking)) {
    throw new Error("Provide a synthetic booking UUID for the staging history check.");
  }
  const protection = DOCVY_STAGING_VERCEL_BYPASS
    ? { "x-vercel-protection-bypass": DOCVY_STAGING_VERCEL_BYPASS } : {};
  const request = (path, options = {}) => fetch(new URL(path, origin), {
    ...options,
    headers: { ...protection, ...options.headers },
    redirect: "error",
    signal: AbortSignal.timeout(12000),
  });

  const available = await request("/api/crm");
  assert.equal(available.status, 200, "Staging preview must expose the synthetic booking API");
  const publicSlots = await available.json();
  assert.ok(Array.isArray(publicSlots), "Public availability must be an array");
  assert.ok(publicSlots.every((slot) => Object.keys(slot).sort().join(",") === "ends_at,id,starts_at"),
    "Public slots must expose only the slot ID and times");

  for (const path of ["/api/crm?enquiries", "/api/crm?admin", "/api/crm?doctors", "/api/crm?history=" + (booking ?? "00000000-0000-4000-8000-000000000000")]) {
    const anonymous = await request(path);
    assert.equal(anonymous.status, 403, "Signed-out requests must be denied for " + path.split("=")[0]);
    assert.equal(anonymous.headers.get("cache-control"), "no-store");
  }

  const signedIn = await request("/api/crm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "sign-in", email: DOCVY_STAGING_STAFF_EMAIL, password: DOCVY_STAGING_STAFF_PASSWORD,
    }),
  });
  assert.equal(signedIn.status, 200, "Staging scheduler sign-in failed");
  const { token, canSchedule } = await signedIn.json();
  assert.equal(canSchedule, true, "The staging fixture account must have scheduling access");
  assert.ok(typeof token === "string" && token.length > 0, "Sign-in must return an access token");
  const headers = { Authorization: "Bearer " + token };
  const day = new Date(Date.now() + 19800000).toISOString().slice(0, 10);
  for (const path of ["/api/crm?clinic&day=" + day + "&days=7", "/api/crm?clinic&upcoming", "/api/crm?enquiries", "/api/crm?doctors"]) {
    const result = await request(path, { headers });
    assert.equal(result.status, 200, "Signed-in request failed for " + path);
    assert.equal(result.headers.get("cache-control"), "no-store", "Private response must not be cached");
    assert.ok(Array.isArray(await result.json()), "Signed-in request must return an array");
  }

  if (booking) {
    const response = await request("/api/crm?history=" + booking, { headers });
    assert.equal(response.status, 200, "Signed-in booking history lookup failed");
    assert.equal(response.headers.get("cache-control"), "no-store");
    const history = await response.json();
    assert.equal(history.reference, booking, "History must match the requested booking");
    assert.ok(history.fee_paise === null || Number.isInteger(history.fee_paise), "Booking fee must be null or in whole paise");
    assert.ok(Array.isArray(history.events) && history.events.length > 0, "Booking history must contain events");
    console.log("Synthetic booking history and fee readback passed.");
  }

  console.log("Staging sign-in, calendar, public slot privacy, enquiries, and doctor roster checks passed.");
}

verify().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
