import assert from 'node:assert/strict';
const base=process.argv[2]??'http://localhost:3230';
const root='https://www.docvy.in';
const sitemap=await(await fetch(base+'/sitemap.xml')).text();
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert(urls.length>0);
for(const path of ['/request','/book','/clinic','/status','/for-clinics'])assert(!urls.includes(root+path));
const changed=['/','/about','/faqs','/contact','/how-it-works','/for-doctors','/pricing','/patient-guides/pcos-pcod','/patient-guides/cataract','/patient-guides/asthma'];
for(const path of changed){const r=await fetch(base+path);assert.equal(r.status,200,path);const html=await r.text();assert(!html.includes('Real appointments are currently unavailable'),path);assert(html.includes('rel="canonical"'),path);assert(html.includes('property="og:description"'),path);if(['/','/about','/faqs'].includes(path))assert(html.includes('Providers confirm availability, timing and fees.'),path);assert(!html.includes('| DOCVY | DOCVY'),path);}
for(const path of ['/request','/book','/clinic','/for-clinics']){const r=await fetch(base+path);const h=await r.text();assert(h.includes('noindex'),path);}
const home=await(await fetch(base)).text();const schemas=[...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
for(const type of ['Organization','WebSite']){const schema=schemas.find(s=>s['@type']===type);assert(schema,type);assert(schema.description.includes('appointment enquiries'));assert(schema.url.startsWith(root));}
assert((await(await fetch(base+'/robots.txt')).text()).includes(root+'/sitemap.xml'));
console.log('PASS: changed-route copy, canonical/social metadata, Organization/WebSite JSON-LD, noindex boundaries, sitemap exclusions and robots discovery');
