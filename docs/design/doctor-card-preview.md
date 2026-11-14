# Doctor discovery design preview

This branch is a design review, not a live release. DOCVY's existing green palette, logo and typography are retained.

## Reference and evidence

- Requested Practo reference: https://www.practo.com/delhi/general-physician. Direct retrieval returned HTTP 403 and the browser showed a challenge page. Its visual design was not claimed as inspected.
- Inspected alternative: https://www.lybrate.com/delhi/general-physician, captured at 1440 × 1000 on 9 November 2026. The screenshot showed a photo/name/specialty hierarchy, practice location underneath, separate action areas and a vertical results list. The reference includes ratings, prices and availability; those fields are not added to DOCVY because corresponding verified data is unavailable.
- Firecrawl's allowance was already exhausted, so reference text and screenshots were retrieved with browser/web tools.

## Proposed implementation

- Homepage remains search-led. Individual doctor listings and the repeated discovery feature block are removed. Specialty navigation, procedures and health guides remain.
- The hero now uses the plain headline “Find a doctor for the care you need.” The earlier single-word highlight was removed following review.
- Result cards use horizontal identity/location groups on desktop, a stacked action area on mobile, and subtle translucent white over the existing mist surface. There are no fabricated portraits, ratings, fees, experience figures, availability or verification badges.
- Proposed card measurements: 22px radius, 26px desktop padding, 18px mobile radius, 16px mobile side padding, minimum 44px actions. These are implementation choices rather than measured reference values.
- “View profile” is a quiet patient action. Unclaimed entries have a highlighted “Claim profile” provider CTA and keep their explicit partnership status. Claimed entries retain their consent-gated appointment action.
- Visible official-source links are removed from cards and profile sections as requested. Source URLs remain in the underlying data and profile provenance metadata; no claims or verification state are changed.

## Files

`components/ReferenceHome.tsx`, `components/DoctorCard.tsx`, `components/DirectoryPage.tsx`, `components/DoctorPortrait.tsx`, `app/doctor/[slug]/page.tsx`, `app/globals.css`.

The design is available locally and in a shared read-only preview deployment. No production deployment, live alias change or database mutation is part of this branch.

## Preview checks

Desktop (1440px) and mobile (390px) browser checks passed: homepage, directory and profile returned HTTP 200, each with one h1 and no horizontal overflow or page errors. There are no individual doctor-profile links on the homepage and no visible official-source buttons on cards or profile pages. Claim buttons open the claim form with the correct doctor selected. No forms were submitted and no database records were changed. TypeScript validation passed.

Local preview: http://localhost:3130 — directory: http://localhost:3130/doctors?location=gurgaon. The dev server is separate from the production checkout. A separate nonproduction preview was subsequently created for phone access; the production aliases were not changed.

## Shared preview

Deployment `dpl_Hb6bTQWE5cNcafBeZCh6WVA6pbtv` serves commit `af41e687d3c20f73b795abb3d1303cd9c1225e31` from `preview/doctor-glass-claim`. A temporary Vercel share link permits review without a Vercel account. The link token is not stored in this repository.

Fresh mobile and desktop browser sessions both passed: homepage and cards rendered; hero highlight and prominent claim actions appeared; source buttons and homepage doctor listings were absent; claim links preselected the correct doctor; no page errors or horizontal overflow occurred. The preview is noindex, and POST submissions return HTTP 409 without saving anything.

## Patient-content revision

The first headline treatment was rejected in review. The replacement is “Find a doctor for the care you need.” with plain, consistent typography and no boxed or coloured word. The introduction now states the actual tasks: search doctors, check practice details and read health guides.

The homepage has six sections: search and starting points; eight specialties; practical visit preparation; six surgery discussion guides; four health guides; appointment/profile FAQs. A separate provider band links to profile claims. Repeated illustrated marketing blocks and vague slogans were removed. Doctor cards and their consent controls remain unchanged.

Search labels, the directory introduction, metadata and footer copy were rewritten. The new diabetes topic link exposed a missing search alias; Endocrinology and Diabetology now map to the existing diabetes guide terms. No clinical advice, provider credentials, source data or consent state was changed.

Browser checks passed at 320, 390, 768 and 1440 pixels: one h1, six homepage sections, no word highlight, no homepage doctor-profile links, no required search fields, no horizontal overflow or page errors. All four concern links returned actual directory matches, and the primary search form reached the expected results. TypeScript passed. This remains preview-only pending review.

Latest content preview: deployment `dpl_21Y8BRqhUBjikAjxz1nQjExbXmEX`, commit `452390e198fff5db6d5632a9f52e64381b4f4ee1`. The shared branch alias now serves this content revision. Fresh phone and desktop sessions passed the headline, six-section layout, search, noindex and read-only checks. The production website remained unchanged.
