import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const cache = new Map();
// Load actual TypeScript modules without adding a test runtime dependency.
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const loadedModule = { exports: {} };
  cache.set(file, loadedModule);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const requireLocal = id => id === "server-only" ? {} : id === "react" ? { cache: fn => fn } : id.startsWith("@/") ? load(id.slice(2) + ".ts") : require(id);
  vm.runInThisContext("(function(require,module,exports){" + code + "\n})", { filename: file })(requireLocal, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const { paginateGroups, sitemapPages, renderUrlset, renderIndex, escapeXml } = load("lib/seo/segmented-sitemaps.ts");
assert.equal(escapeXml("<>&\"'"), "&lt;&gt;&amp;&quot;&apos;");
const inputs = Array.from({length: 20001}, (_, i) => "/item/" + String(i).padStart(5, "0"));
const pages = paginateGroups({ doctors: [...inputs].reverse(), empty: [] });
assert.deepEqual(Object.values(pages).map(p => p.length), [10000,10000,1]);
assert.deepEqual(Object.values(pages).flat(), inputs);
assert.deepEqual(paginateGroups({ doctors: inputs }), pages);
assert.throws(() => paginateGroups({a:["/about"], b:["/about"]}));
for (const invalid of ["https://evil.test", "//evil.test", "/a?b=c", "/a#b", "/a/../b", "/a b", "/a\\b"]) assert.throws(() => paginateGroups({a:[invalid]}));
assert.throws(() => renderUrlset([]));
assert.throws(() => renderUrlset(inputs));
assert.equal(paginateGroups({a:["/about","/about"]}).a.length, 1);
const all = Object.values(sitemapPages).flat();
assert.equal(new Set(all).size, all.length);
for (const excluded of ["/request", "/status", "/for-students", "/for-employees"]) assert(!all.includes(excluded));
assert(!fs.existsSync("app/sitemap.ts"));
assert(!fs.existsSync("public/sitemap.xml"));
assert(renderIndex(Object.keys(sitemapPages)).includes("<sitemapindex"));
for (const [name, paths] of Object.entries(sitemapPages)) {
  assert(renderUrlset(paths).includes("<urlset"));
  console.log(name + ": " + paths.length);
}
const child = load("app/sitemaps/[segment]/route.ts");
for (const name of ["unknown.xml", "__proto__.xml", "doctors", "doctors-1.xml", "doctors-2.xml", "doctors-02.xml"]) assert.equal((await child.GET(new Request("https://www.docvy.in/sitemaps/" + name), {params:{segment:name}})).status,404);
assert.equal((await child.GET(new Request("https://www.docvy.in/sitemaps/static.xml"), {params:{segment:"static.xml"}})).status,200);
console.log("Sitemap regression checks passed");

// Synthetic records below are test inputs only, never business data.
const { parsePublicDoctors, isVerified, doctorSlug } = load('lib/public-doctor-policy.ts');
const { doctorProfilePaths } = load('lib/seo/public-sitemaps.ts');
const fixture = { id: 'Test Doctor', live: true, name: 'Test doctor', specialties: ['Test specialty'], hospital: 'Test practice', locations: [{city:'Test city', facility:'Test practice'}], profileStatus:'verified', consentGiven:true, registrationNumber:'TEST-1', registrationCouncil:'Test council', verifiedAt:'2026-01-01T00:00:00Z', sourceUrl:'https://example.org', summary:'Test biography', privateField:'must not propagate' };
const parsed = parsePublicDoctors([fixture]);
assert(!('privateField' in parsed[0]));
assert.equal(doctorSlug(fixture.id),'test-doctor');
assert(isVerified(parsed[0]));
assert.deepEqual(doctorProfilePaths(parsed), ['/doctor/test-doctor']);
for (const patch of [{live:false},{consentGiven:false},{profileStatus:'claimed'},{profileStatus:'unclaimed'},{registrationNumber:''},{registrationCouncil:null},{verifiedAt:'invalid'}]) assert(!isVerified({...fixture,...patch}));
for (const bad of [null, {}, [{...fixture,locations:[]}], [{...fixture,live:false}], [{...fixture,summary:{bad:true}}], [fixture,{...fixture,id:'test-doctor'}]]) assert.throws(()=>parsePublicDoctors(bad));
const originalFetch = globalThis.fetch;
const priorEnv = {...process.env};
const envNames = ['DOCVY_DIRECTORY_INTAKE_ENABLED','DOCVY_DIRECTORY_INTAKE_URL','DOCVY_DIRECTORY_INTAKE_KEY','SUPABASE_URL','SUPABASE_PUBLISHABLE_KEY','NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY','SUPABASE_ANON_KEY'];
for (const name of envNames) delete process.env[name];
let calls = 0;
process.env.DOCVY_DIRECTORY_INTAKE_ENABLED='true';
process.env.DOCVY_DIRECTORY_INTAKE_URL='https://cxyscxjauxoizvvllmfu.supabase.co';
process.env.DOCVY_DIRECTORY_INTAKE_KEY='sb_publishable_test_only';
let responseBody = [fixture, {...fixture,id:'claimed-test',profileStatus:'claimed'}];
globalThis.fetch = async (url, options) => {
  calls++;
  assert.equal(new URL(url).pathname,'/rest/v1/rpc/docvy_public_directory');
  assert.equal(options.method,'POST');
  assert.equal(options.cache,'no-store');
  assert(!options.headers.Authorization);
  return Response.json(responseBody);
};
try {
  const index = load('app/sitemap.xml/route.ts');
  let response = await index.GET();
  assert.equal(response.status,200);
  assert((await response.text()).includes('/sitemaps/doctor-profiles.xml'));
  assert.equal(calls,1);
  response = await child.GET(new Request('https://www.docvy.in/sitemaps/doctor-profiles.xml'),{params:{segment:'doctor-profiles.xml'}});
  assert.equal(response.status,200);
  assert.equal(response.headers.get('Cache-Control'),'public, s-maxage=300, must-revalidate');
  const body = await response.text();
  assert(body.includes('/doctor/test-doctor'));
  assert(!body.includes('claimed-test'));
  responseBody = [];
  assert(!(await (await index.GET()).text()).includes('/sitemaps/doctor-profiles.xml'));
  assert.equal((await child.GET(new Request('https://www.docvy.in'),{params:{segment:'doctor-profiles.xml'}})).status,404);
  const before = calls;
  for (const segment of ['doctor-profiles-1.xml','doctor-profiles-02.xml','doctor-profiles-0.xml','doctor-profiles-evil.xml']) assert.equal((await child.GET(new Request('https://www.docvy.in'),{params:{segment}})).status,404);
  assert.equal(calls,before);
  responseBody = {bad:true};
  response = await index.GET();
  assert.equal(response.status,503);
  assert.equal(response.headers.get('Cache-Control'),'no-store');
  globalThis.fetch = async () => {throw new Error('synthetic outage')};
  assert.equal((await index.GET()).status,503);
  assert.equal((await child.GET(new Request('https://www.docvy.in'),{params:{segment:'doctor-profiles.xml'}})).status,503);
  assert.equal((await child.GET(new Request('https://www.docvy.in'),{params:{segment:'static.xml'}})).status,200);
  process.env.DOCVY_DIRECTORY_INTAKE_KEY='sb_secret_test_only';
  globalThis.fetch = async () => {throw new Error('must not fetch')};
  const { getDirectoryDoctors } = load('lib/public-directory.ts');
  await assert.rejects(getDirectoryDoctors,/publishable key/);
  process.env.DOCVY_DIRECTORY_INTAKE_KEY='x.'+Buffer.from(JSON.stringify({role:'service_role'})).toString('base64url')+'.x';
  await assert.rejects(getDirectoryDoctors,/publishable key/);
  delete process.env.DOCVY_DIRECTORY_INTAKE_KEY;
  assert.equal((await index.GET()).status,503);
  delete process.env.DOCVY_DIRECTORY_INTAKE_URL;
  delete process.env.DOCVY_DIRECTORY_INTAKE_ENABLED;
  process.env.SUPABASE_URL = 'https://cxyscxjauxoizvvllmfu.supabase.co';
  process.env.SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_test_only';
  globalThis.fetch = async () => Response.json([fixture]);
  assert.equal((await index.GET()).status,200);
  process.env.DOCVY_DIRECTORY_INTAKE_ENABLED = 'false';
  assert.equal((await index.GET()).status,503);
  delete process.env.DOCVY_DIRECTORY_INTAKE_ENABLED;
  process.env.SUPABASE_URL = 'https://different-project.supabase.co';
  assert.equal((await index.GET()).status,503);
} finally {
  globalThis.fetch = originalFetch;
  for (const name of envNames) {
    if (priorEnv[name] === undefined) delete process.env[name]; else process.env[name]=priorEnv[name];
  }
}
console.log('Public-directory integration and failure-mode checks passed');
