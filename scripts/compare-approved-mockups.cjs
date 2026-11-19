// Offline visual-review artifact builder. Images are never used as website backgrounds.
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.resolve(__dirname, '../../crm-browser-check/package'));
const root = path.resolve(__dirname, '../docs/visual-review');
const verification = JSON.parse(fs.readFileSync(path.join(root, 'actual/verification.json')));
const notes = {
  homepage: ['Matched section order, search geometry, mint tiles, three doctor cards and compact footer; replaced baked article captions with clean supplied crops.', 'Height 1711px vs 1536px reference. Official lowercase logo, actual profiles/counts, honest feedback and web-access band differ. Original high-resolution hero/article photos and app artwork are missing.'],
  'for-doctors': ['Adjusted hero crop, outlined CTA, benefit tiles, onboarding steps and accordion FAQs.', 'Source doctor is a screenshot crop. Unsubstantiated testimonial replaced; official logo and real copy differ.'],
  'for-clinics': ['Matched clinic hero, paired CTAs, benefit rows, four-step panel, clinic cards and FAQs.', 'Hero requires masking baked screenshot text. Original facility photographs and consented success stories are missing.'],
  provider: ['Removed extra FAQs and final CTA not present in this combined-page reference. Restored inline listing CTA and support row.', 'Doctor/clinic images are screenshot crops. Typography, official logo and real claims differ.'],
  'how-it-works': ['Built two four-step sequences, benefit row and closing appointment/listing CTA.', 'Real request-confirmation workflow replaces instant booking claims; photo resolution and section geometry differ.'],
  pricing: ['Implemented audience toggle, three cards, comparison table, FAQs and closing CTA. Corrected outline border.', 'Reference prices are visibly design-only, not purchasable plans. Actual pricing/checkout approval is missing.'],
  partner: ['Extracted exact hospital and handshake regions from attachment 7. Built partner categories, benefits, inline CTA and expandable existing form.', 'Original high-resolution photographs missing. Existing application form is retained beyond the flattened reference.'],
  'care-guide': ['Compact initial search, topic tiles, featured/trending article cards, health-tool links and newsletter CTA.', 'Tools use existing guide links; no invented calculator/subscription backend. Original article photographs and reviewed editorial content are missing.'],
  'surgery-guide': ['Matched surgeon hero, search, category tiles, four procedure cards, resource cards and closing CTA. All existing procedure links retained in expandable categories.', 'Crops need masking baked UI; no invented hospital counts or slot availability. Originals missing.'],
  about: ['Built story, mission/value cards, founder section and closing action band.', 'Founder portrait intentionally neutral until an authentic approved photograph is supplied. Draft reference quotation needs owner review.'],
  contact: ['Re-cropped exact support-agent image to remove black phone edge. Built contact channels, form and support panel.', 'Form opens the visitor’s email client; it does not claim server delivery. Photo original and a dedicated contact-submission endpoint are missing.'],
  faqs: ['Re-cropped exact FAQ portrait. Added searchable categories and collapsible answers.', 'Answers reflect actual service behavior; number and length differ. Original portrait missing.'],
  specialties: ['Built five-column icon grid; corrected global heading override causing oversized labels.', 'Existing approved repository SVGs reused because ZIPs contain no SVG source icons. Source grid is standalone; implementation includes site shell.'],
  'doctor-profile': ['Built profile overview, booking CTA, tab anchors, qualification/services sections, practice cards, FAQs and related profiles.', 'Real Dr. Ummed data, three practices and actual fee replace fictional reference. Facility photos, patient reviews and live slot inventory absent; placeholders used.'],
  footer: ['Built expanded two-column mobile footer, operator/address, legal links and disclaimer.', 'Real logo retained. Social symbols have no invented account links; reference device/status frame excluded.']
};
const esc = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
(async()=>{
  const browser = await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  try {
    const page = await browser.newPage();
    const result = await page.evaluate(async ({reference,actual})=>{
      const load=src=>new Promise(resolve=>{const i=new Image();i.onload=()=>resolve(i);i.src=src;});
      const [a,b]=await Promise.all([load(reference),load(actual)]);
      const w=Math.max(a.width,b.width),h=Math.max(a.height,b.height);
      const canvas=()=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='white';x.fillRect(0,0,w,h);return [c,x];};
      const [ac,ax]=canvas(),[bc,bx]=canvas(),[dc,dx]=canvas(),[oc,ox]=canvas();
      ax.drawImage(a,0,0);bx.drawImage(b,0,0);const ad=ax.getImageData(0,0,w,h),bd=bx.getImageData(0,0,w,h),dd=dx.createImageData(w,h);let error=0;
      for(let i=0;i<ad.data.length;i+=4){for(let j=0;j<3;j++){const d=Math.abs(ad.data[i+j]-bd.data[i+j]);error+=d;dd.data[i+j]=d;}dd.data[i+3]=255;}
      dx.putImageData(dd,0,0);ox.drawImage(ac,0,0);ox.globalAlpha=.5;ox.drawImage(bc,0,0);
      return {reference:{width:a.width,height:a.height},actual:{width:b.width,height:b.height},meanAbsoluteChannelError:error/(w*h*3),method:'Top-left registration, original dimensions, white padding to common extent. No scaling, warping or content alignment. Diagnostic only; not a fidelity pass.',diff:dc.toDataURL(),overlay:oc.toDataURL()};
    },{reference:'data:image/jpeg;base64,'+fs.readFileSync(path.join(root,'reference/homepage.jpg')).toString('base64'),actual:'data:image/png;base64,'+fs.readFileSync(path.join(root,'actual/homepage.png')).toString('base64')});
    for(const key of ['diff','overlay']) {fs.writeFileSync(path.join(root,'actual/homepage-'+key+'.png'),Buffer.from(result[key].split(',')[1],'base64'));delete result[key];}
    fs.writeFileSync(path.join(root,'actual/homepage-comparison.json'),JSON.stringify(result,null,2));
    const cards=verification.results.map(r=>{const id=r.id;const n=notes[id]||['Layout implemented.','Visual sign-off pending.'];return `<article id="${esc(id)}"><h2>${esc(id)} — reviewed, sign-off pending</h2><p>${esc(n[0])}</p><p><b>Differences / missing:</b> ${esc(n[1])}</p><p>Checks: HTTP 200; one h1; canonical present; no broken images or horizontal page overflow at capture width ${r.width}px.</p><div class="pair"><figure><figcaption>Approved reference</figcaption><a href="reference/${esc(r.reference)}"><img loading="lazy" src="reference/${esc(r.reference)}"></a></figure><figure><figcaption>Actual implementation</figcaption><a href="actual/${esc(id)}.png"><img loading="lazy" src="actual/${esc(id)}.png"></a></figure></div></article>`;}).join('');
    fs.writeFileSync(path.join(root,'index.html'),`<!doctype html><html lang="en"><meta charset="utf-8"><title>DOCVY visual review</title><style>body{font:16px/1.6 system-ui;max-width:1200px;margin:30px auto;padding:20px;color:#20352c;background:#f6faf8}article{border-top:1px solid #bbc9c0;padding:24px 0}.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}figure{margin:0}img{width:100%;height:auto;vertical-align:top}a{color:#07673a}nav a{margin-right:15px}figcaption{font-weight:bold} @media(max-width:600px){.pair{gap:8px}}</style><h1>DOCVY approved-mockup review</h1><p>Feature branch only. No production deployment. Screenshots are review evidence, not website backgrounds. All layouts have been inspected; none is signed off as pixel-perfect.</p><p>References may contain phone frames/status bars, unavailable source fonts, synthetic people and unsupported business claims. Official logo and real medical data take precedence over inventing credentials or reviews.</p><nav>${verification.results.map(r=>`<a href="#${esc(r.id)}">${esc(r.id)}</a>`).join('')}</nav><p>Homepage diagnostic: <a href="actual/homepage-overlay.png">50% overlay</a> · <a href="actual/homepage-diff.png">absolute difference</a> · <a href="actual/homepage-comparison.json">comparison method and metric</a>. Other raw pixel scores omitted where device frames and incompatible viewports make them misleading.</p>${cards}<h2>Doctor practice panel</h2><div class="pair"><img src="reference/doctor-profile-locations.jpg"><img src="actual/doctor-profile-locations.png"></div><p>Desktop responsive behavior was checked at 1440px. The separate desktop-home concept has not received a matching-viewport visual sign-off.</p></html>`);
    console.log(JSON.stringify(result));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
