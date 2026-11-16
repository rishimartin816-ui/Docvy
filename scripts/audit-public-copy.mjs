import fs from 'node:fs';
const root='https://www.docvy.in';
const xml=await(await fetch(root+'/sitemap.xml')).text();
const urls=[...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]).concat(['/request','/for-clinics','/book','/clinic','/status'].map(p=>root+p)))];
const results=[];let cursor=0;
await Promise.all(Array.from({length:5},async()=>{while(cursor<urls.length){const url=urls[cursor++];try{const r=await fetch(url,{signal:AbortSignal.timeout(20000)});const h=await r.text();const plain=h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');results.push({url,status:r.status,canonical:h.match(/rel="canonical" href="([^"]+)"/)?.[1],robots:h.match(/name="robots" content="([^"]+)"/)?.[1],description:h.match(/name="description" content="([^"]+)"/)?.[1],outdated:plain.match(/.{0,55}(?:under development|coming soon|not operational|paused|not live|unavailable|demo).{0,100}/gi)??[]});}catch(e){results.push({url,error:e.message})}}}));
results.sort((a,b)=>a.url.localeCompare(b.url));fs.writeFileSync('docs/public-route-audit.json',JSON.stringify({date:'2026-11-16',scope:'All URLs returned by the live sitemap plus explicit booking/workspace/status routes; not every possible query permutation',results},null,2)+'\n');
const probe=await fetch(root+'/api/appointment-request',{method:'POST',headers:{Origin:root,'Content-Type':'application/json'},body:'{}'});console.log('Routes audited:',results.length,'invalid empty enquiry:',probe.status,await probe.text());
