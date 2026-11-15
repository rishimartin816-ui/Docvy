import assert from "node:assert/strict";

// Run with Node's --env-file=.env.local; only an anonymous/publishable key.
const base = process.argv[2] ?? "http://localhost:3221";
const url = process.env.DOCVY_DIRECTORY_INTAKE_URL || process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.DOCVY_DIRECTORY_INTAKE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
assert.equal(url, "https://cxyscxjauxoizvvllmfu.supabase.co");
assert(key);
const headers = { apikey: key, "Content-Type": "application/json" };
const directory = await fetch(url + "/rest/v1/rpc/docvy_public_directory", { method: "POST", headers, body: "{}", signal: AbortSignal.timeout(15000) });
assert.equal(directory.status, 200);
const records = await directory.json();
assert(Array.isArray(records));
const verified = records.filter(row => row.live === true && row.profileStatus === "verified" && row.consentGiven === true && row.registrationNumber?.trim() && row.registrationCouncil?.trim() && Number.isFinite(Date.parse(row.verifiedAt)));
const slug = id => id.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const index = await fetch(base + "/sitemap.xml");
assert.equal(index.status, 200);
const indexXml = await index.text();
assert.equal(indexXml.includes("/sitemaps/doctor-profiles.xml"), verified.length > 0);
const child = await fetch(base + "/sitemaps/doctor-profiles.xml");
assert.equal(child.status, verified.length ? 200 : 404);
const xml = await child.text();
assert.equal([...xml.matchAll(/<url>/g)].length, verified.length);
const listing = await (await fetch(base + "/doctors")).text();
for (const row of verified) {
  const path = "/doctor/" + slug(row.id);
  assert(xml.includes("https://www.docvy.in" + path));
  assert(listing.includes('href="' + path + '"'));
}
for (const row of records.filter(row => !verified.includes(row))) {
  const path = "/doctor/" + slug(row.id);
  assert(!xml.includes("https://www.docvy.in" + path));
  const page = await fetch(base + path);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /<meta name="robots" content="noindex, follow"/);
}
const missing = await fetch(base + "/doctor/this-profile-does-not-exist-for-validation");
assert.equal(missing.status, 404);
assert.match(await missing.text(), /noindex/);
const privateTable = await fetch(url + "/rest/v1/docvy_directory_providers?select=provider_id&limit=1", { headers });
assert([401, 403].includes(privateTable.status), "Anonymous access must not expose provider base-table rows");
console.log(`PASS: public RPC ${records.length} visible profiles; ${verified.length} verified sitemap entries and internal links; ${records.length - verified.length} unverified profiles noindex; missing profile 404; anonymous base-table access denied`);
