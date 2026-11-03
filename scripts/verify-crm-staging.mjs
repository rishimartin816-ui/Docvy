import assert from "node:assert/strict";

const { DOCVY_STAGING_PREVIEW, DOCVY_STAGING_STAFF_EMAIL, DOCVY_STAGING_STAFF_PASSWORD,
  DOCVY_STAGING_VERCEL_BYPASS } = process.env;

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
  assert.ok(publicSlots.every((slot) => !("booking_id" in slot)), "Public slots must omit booking references");

  const anonymous = await request("/api/crm?enquiries");
  assert.equal(anonymous.status, 403, "Anonymous requests must not access enquiries");

  const signedIn = await request("/api/crm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "sign-in", email: DOCVY_STAGING_STAFF_EMAIL, password: DOCVY_STAGING_STAFF_PASSWORD,
    }),
  });
  assert.equal(signedIn.status, 200, "Staging scheduler sign-in failed");
  const { token } = await signedIn.json();
  assert.ok(typeof token === "string" && token.length > 0, "Sign-in must return an access token");
  const headers = { Authorization: "Bearer " + token };
  const day = new Date(Date.now() + 19800000).toISOString().slice(0, 10);
  for (const path of ["/api/crm?clinic&day=" + day + "&days=7", "/api/crm?clinic&upcoming", "/api/crm?enquiries"]) {
    const result = await request(path, { headers });
    assert.equal(result.status, 200, "Signed-in request failed for " + path);
    assert.equal(result.headers.get("cache-control"), "no-store", "Private response must not be cached");
    assert.ok(Array.isArray(await result.json()), "Signed-in request must return an array");
  }

  console.log("Staging sign-in, calendar, availability, and inbox checks passed.");
}

verify().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
