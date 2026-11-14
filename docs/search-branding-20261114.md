# DOCVY search branding release

Branch: `feat/search-branding-20261114`. Source: the approved **DOCVY Exact Wordmark Logo Kit**, not a new symbol. The existing favicon already used the official DOCVY mark; a generic Google result alone does not establish that the live favicon was wrong.

## Files and behavior

- `public/icons/favicon-48.png`, `favicon-96.png`: resized from the approved 512px symbol.
- `public/icons/icon-192.png`, `icon-512.png`: original approved kit assets. Removed automatic `app/icon.png` to avoid competing generic icon declarations.
- `app/favicon.ico`, `app/apple-icon.png`: checked against the original approved ICO and 180px kit asset; existing files were identical and retained.
- `app/layout.tsx`: explicit PNG icon sizes, manifest link, mobile viewport and brand theme color. Next.js supplies the root ICO and Apple icon links.
- `app/manifest.ts`: standalone app metadata and 192/512px icons; no unsupported maskable claim or offline-functionality claim.
- `app/page.tsx`: patient-facing homepage description.
- `app/doctors/[city]/page.tsx`, `app/doctors/[city]/[specialty]/page.tsx`: location/specialty-specific descriptions. Kept the three-live-doctor indexability threshold.
- `lib/doctor-profile.ts`, `app/doctor/[slug]/page.tsx`: doctor-specific description and specialty/city title.
- `app/clinics/page.tsx`: removed inaccurate Delhi NCR-only scope.
- `app/partner-with-us/page.tsx`: explicit doctor registration title and application/WhatsApp description.
- `app/sitemap.ts`: release date updated. Existing exclusion rules retained.
- `scripts/check-search-branding.cjs`: live HTTP/HTML metadata and icon verification.

## Before / after examples

| Page | Before | After |
|---|---|---|
| Home description | Find doctors by specialty, hospital or city. Explore health and surgery guides… | Find doctors across India by specialty, city and clinic. Compare practice details, read health guides and request a visit with participating doctors on DOCVY. |
| City description | First sentence of a long city introduction plus a repeated guide suffix | Find doctors in Mumbai by specialty and practice location. Review clinic addresses, consultation details and appointment-request options on DOCVY. |
| City + specialty | Explore pulmonology care in Mumbai, see available DOCVY listings… | Find pulmonology doctors in Mumbai. Review practice locations and profile details, then request a visit where the doctor has opted in. |
| Doctor title | Doctor name only | Doctor name, primary specialty and city, with DOCVY suffix |
| Clinics description | Outpatient locations across Delhi NCR | Clinic and outpatient practice locations across India, with associated doctors and request options |
| Registration title | Partner with DOCVY — add your doctor profile | Doctor Registration — List Your Practice on DOCVY |

Specialty guides already have individual descriptions, titles and self-referencing canonicals; these were preserved. There are no separate clinic-profile routes in this repository: clinic details and MedicalClinic nodes belong to eligible doctor profiles, with `/clinics` as the directory. This release does not invent standalone clinic pages or verification claims.

Organization and WebSite JSON-LD, breadcrumb schemas, and consent/verification-gated doctor schema remain in place. Production indexing still requires `VERCEL_ENV=production` and `DOCVY_INDEXING_ENABLED=true`. Preview pages remain noindex. Robots allows public files and excludes `/api/`; it references the production sitemap. No medical disclaimer was removed.

## Search Console checklist

1. Select the verified `docvy.in` domain property or `https://www.docvy.in/` URL-prefix property.
2. Inspect the homepage, run **Test live URL**, check the canonical, and request indexing once.
3. Submit or recheck `https://www.docvy.in/sitemap.xml` and review processing errors.
4. Inspect priority doctor profiles, specialty guides and registration page. Request indexing only where indexable; low-inventory city pages intentionally remain noindex.
5. Use Google's Rich Results Test for applicable structured data and review Search Console enhancement errors. Valid schema does not guarantee a rich result.
6. Allow time for Google's favicon/homepage recrawl. Keep icon URLs stable. Google may take days or weeks and does not guarantee favicon display.

No Search Console indexing submission or Google-selected canonical was verified in this release; account access is required. See Google's favicon guidance: https://developers.google.com/search/docs/appearance/favicon-in-search

## Release verification results

Production deployment `dpl_Bsxh36qvqLVSeY3kQPxFa1u9BRy9` is READY and assigned to www.docvy.in. Clean Next.js production compilation, lint and type checks passed on Vercel; local TypeScript passed. Local standalone ESLint was blocked by a missing installed react-hooks plugin. Live checks passed for eight representative routes, all required icon sizes and content types, manifest, canonical URLs, unique descriptions, Organization/WebSite/BreadcrumbList JSON parsing, social/mobile metadata, robots and sitemap exclusions. Doctor schema eligibility remains controlled by existing profile policy; Rich Results Test and Google Search Console remain external follow-up checks. The root canonical without a written trailing slash normalizes to the same homepage URL. Raw results: docs/verification/search-branding-20261114.json.
