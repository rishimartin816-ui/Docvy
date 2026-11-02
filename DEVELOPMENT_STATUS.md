# DOCVY website design and discovery status

**Updated:** 3 November 2026 (Asia/Kolkata)  
**Scope:** Public website design, patient-facing explanations, and on-page SEO/AEO/GEO. This is not a completion score for the full DOCVY product.

## Estimated completion

**88% estimated completion.** The estimate is based on the weighted website deliverables below, not traffic, patient activity, or search rankings.

| Deliverable | Weight | Status | Evidence / remaining work |
|---|---:|---|---|
| Accurate product and availability messaging | 20% | Complete | Pan-India patient guide; directory accurately limited to Delhi NCR; booking and review status stated. |
| Patient discovery journey and working guide search | 20% | Complete | Patient journey, concern-to-specialty examples, guide search, directory links, and empty-match explanations are implemented. This pass makes homepage examples open a prefilled guide search. |
| Visual system, icons, and illustrations | 20% | In progress (65%) | Mint/teal/pine system and patient illustration are in production; this pass adds a provider workflow illustration. A DOCVY Figma source file was not located, and mobile visual review is still needed. |
| SEO/AEO/GEO page clarity | 20% | In progress (75%) | Route titles, descriptions, internal links, sitemap, direct answers, natural-language concern searches, and city names are maintained. Search Console query validation remains open. |
| Build, production publication, and live verification | 20% | In progress | Existing production commit `a5901cb` is READY. The new internal enquiry flow builds locally, but is not published and cannot accept submissions until the private sheet endpoint is configured. |

## Changes in this pass

- Corrected homepage title and description so the homepage describes healthcare discovery across India rather than only a patient guide.
- Added real guide-search links for the homepage’s common concern examples. Browser review caught an overly broad “joint pain” match; search now requires all meaningful terms, ignores common question words and generic “doctor/specialist” words, and tolerates punctuation.
- Added a direct explanation of what is available today: nationwide guide, limited Delhi NCR listings, and no DOCVY booking.
- Added a custom provider-workflow SVG to the clinic and hospital plans page; it is visibly labeled “planned · not live.”
- Added “Gurgaon” as a search-oriented alias in Gurugram page metadata.
- Updated care-guide titles to use plain-language search intent without implying diagnosis.
- Audited supporting-page title tags against Next.js 14 title-template behavior and removed repeated brand suffixes; shortened city title tags without dropping city names.
- Rewrote the paused request and appointment-status pages with direct patient instructions and links to source-listed doctor profiles; removed internal staff-access wording.
- Reviewed current Google Search Central guidance. No special AI-search markup or ranking outcome is claimed.
- Production builds passed with Next.js 14.2.35, linting, type validation, and all 26 static pages generated.
- Latest live deployment before the current pass is commit `a5901cb` (Vercel READY). Browser review confirmed `/care-guide?q=joint%20pain` shows one specialty match (Orthopaedics) and the question “what doctor should I see for diabetes?” returns one related specialty and explains that no matching DOCVY profile is listed.
- Current live deployment: commit `77a9d66` is Vercel READY. Live checks confirmed doctor cards route to `/request` inside DOCVY, and the selected doctor pre-fills correctly. The form stays disabled because the sheet endpoint is not configured.
- Live metadata checks after commit `80e4b5d` returned HTTP 200 and one DOCVY brand suffix for About, How it works, For doctors, FAQs, Contact, and Gurugram pages.
- Firecrawl live page checks returned HTTP 200 for `/`, `/care-guide?q=joint%20pain`, `/pricing`, and `/doctors/gurugram`; rendered titles and visible page updates were present.

## Outstanding work

1. Review mobile layout and keyboard interaction for homepage quick starts, care-guide search, and provider plans.
2. Locate the intended DOCVY Figma design file. The connected Figma account is available, but the repository and current project artifacts did not contain a DOCVY file/node URL; no Figma file was changed.
3. Use actual Search Console queries when access is available to prioritize future content. Do not infer keyword volume or rankings.
4. Add condition-specific guidance only after source review and qualified clinical review; avoid thin SEO pages or one-symptom/one-specialty claims.

## Guardrails

- No production database, authentication, SSO, or security-setting changes.
- No claims that listings are verified, complete, bookable, or available unless current evidence supports them.
- No fabricated rankings, traffic, search volume, analytics, or doctor credential checks.

## 3 November 2026 — appointment enquiry implementation

**Appointment workflow estimate: 55% complete.** The estimate counts user-visible form, server validation, data handling, consent, and live-sheet verification. It is not a measure of patient traffic or appointments.

- Added a DOCVY-hosted appointment enquiry form with selected doctor, facility, city, contact details, and optional requested date/time. It collects no symptoms, diagnosis, records, or payment data.
- Doctor cards now stay inside DOCVY and open the internal enquiry route. A request is described as an enquiry; provider confirmation is required before an appointment exists.
- Added a server-only Next.js route with same-origin checking, request-size limits, field validation against the local provider directory, honeypot handling, a 12-second upstream timeout, and a token-protected Apps Script handoff. Network fingerprints are HMAC-hashed and used only for short-lived throttling; raw IP addresses are not written to the sheet.
- Updated the privacy and terms copy to describe the planned sheet handling, user consent, provider sharing, and direct provider payment. DOCVY payment and provider email notifications are not implemented.
- Updated the private `Appointments` tab to 14 columns, including facility and consent records. Wrote and verified one clearly marked synthetic test row using the connected Google Sheets tool. This verifies direct sheet write/read access only; it does **not** verify the website-to-sheet path.
- `pnpm build` passed with Next.js 14.2.35 and 26 static pages. `pnpm lint` could not run because the repository's ESLint 8.57.1 install does not export `eslint/config`, which its flat-config file imports. No lint code output was produced.
- Commit `77a9d66` is published and Vercel READY. The live doctor page no longer sends visitors to hospital websites from its doctor cards. The live enquiry page clearly states that intake is disabled until the private sheet connection is finished.

### Required before enabling real enquiries

1. The production Vercel project has no `GOOGLE_SHEETS_WEBHOOK_URL` or `GOOGLE_SHEETS_WEBHOOK_TOKEN`; the form therefore remains disabled.
2. A Google Apps Script endpoint must be deployed with a private 32-character token in Script Properties, then the matching URL and token must be added as server-only Vercel variables. The browser session currently visible is a personal GoDaddy profile; the DOCVY Google Workspace profile is not available for deployment from this session.
3. To email providers, DOCVY still needs verified provider/clinic recipients and an approved notification workflow. The app must never tell a provider that an appointment is booked before the provider confirms it. Paid lead terms and billing are separate and not configured.
4. After connection, submit a synthetic request through the live website and verify its row and reference ID before enabling real submissions.
