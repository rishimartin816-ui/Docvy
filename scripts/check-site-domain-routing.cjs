const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

function load(file) {
  const output = ts.transpileModule(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
  }).outputText;
  const exports = {};
  new Function("exports", output)(exports);
  return exports;
}

const { canonicalSiteRedirect } = load("lib/site-domain.ts");
const old = new URL("https://docvy-clinic-demo.vercel.app/crm/clinic?day=2026-11-10&days=7");
assert.equal(canonicalSiteRedirect(old, true).href, "https://www.docvy.in/crm/clinic?day=2026-11-10&days=7");
assert.equal(canonicalSiteRedirect(old, false), null, "Private previews must remain testable");
assert.equal(canonicalSiteRedirect(new URL("https://www.docvy.in/crm/admin"), true), null, "Canonical site must not loop");
assert.equal(canonicalSiteRedirect(new URL("https://docvy.in/crm/admin"), true), null, "Existing apex redirect remains authoritative");
assert.equal(canonicalSiteRedirect(new URL("https://unrelated.vercel.app.attacker.example/book"), true), null);
assert.equal(canonicalSiteRedirect(new URL("https://legacy.vercel.app//attacker.example/?next=https://attacker.example"), true).hostname, "www.docvy.in", "A path or filter must not change the destination host");

const original = { ...process.env };
const { clinicCrmConfig } = load("lib/clinic-crm-config.ts");
try {
  for (const key of Object.keys(process.env)) if (key.startsWith("DOCVY_CRM_")) delete process.env[key];
  Object.assign(process.env, {
    VERCEL_ENV: "production", DOCVY_CRM_STAGING: "true",
    DOCVY_CRM_STAGING_URL: "https://pmyzedtpogmhvcrurcau.supabase.co", DOCVY_CRM_STAGING_KEY: "unit-test-placeholder",
  });
  assert.equal(clinicCrmConfig(), null, "A demo requires explicit approval on the public domain");
  process.env.DOCVY_CRM_DEMO_ON_SITE = "true";
  assert.equal(clinicCrmConfig().staging, true);
  assert.equal(clinicCrmConfig().clinicId, "7dfbf055-2737-448c-921e-c074d84393d4");
  process.env.DOCVY_CRM_STAGING_URL = "https://attacker.example";
  assert.equal(clinicCrmConfig(), null, "Demo database must remain pinned");
  process.env.DOCVY_CRM_STAGING_URL = "https://pmyzedtpogmhvcrurcau.supabase.co";
  process.env.DOCVY_CRM_LIVE = "true";
  assert.equal(clinicCrmConfig(), null, "Incomplete live setup must not silently fall back to demo");
  Object.assign(process.env, {
    DOCVY_CRM_LIVE_URL: "https://cxyscxjauxoizvvllmfu.supabase.co", DOCVY_CRM_LIVE_KEY: "unit-test-placeholder",
    DOCVY_CRM_LIVE_CLINIC_ID: "00000000-0000-4000-8000-000000000001", DOCVY_CRM_LIVE_CLINIC_NAME: "Unit test only",
  });
  assert.equal(clinicCrmConfig().staging, false, "Configured live clinics take priority");
  process.env.DOCVY_CRM_LIVE_URL = process.env.DOCVY_CRM_STAGING_URL;
  assert.equal(clinicCrmConfig(), null, "Demo database cannot masquerade as live");
  process.env.VERCEL_ENV = "preview";
  assert.equal(clinicCrmConfig().staging, true, "Existing preview behavior remains isolated");
} finally {
  for (const key of Object.keys(process.env)) if (!(key in original)) delete process.env[key];
  Object.assign(process.env, original);
}
console.log("PASS: canonical redirect safety, query preservation, loop prevention and CRM demo/live isolation.");
