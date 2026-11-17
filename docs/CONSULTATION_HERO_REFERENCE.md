# Consultation hero reference — 17 November 2026

The user supplied desktop and mobile hero references featuring a generic consultation scene. This follow-up treats those references as the updated visual direction while retaining the earlier restriction against featuring an identified doctor profile in the hero.

The background depicts fictional people and is decorative: it is not a listed provider profile or a patient testimonial. It was generated from the supplied visual direction using the built-in image-generation tool, then saved as a 131,201-byte JPEG at public/images/docvy-consultation-hero-v2.jpg. No text, branding, doctor identity, verification badge or medical claim is embedded in the image.

Desktop copy is left-aligned over a pale gradient, with the clinician/patient scene on the right. Mobile crops the scene above centered copy and retains a two-column search dock. All text, links, search fields and geolocation controls remain actual interactive page elements. Next Image uses fill, responsive sizes and priority loading. The interactive homepage doctor filters, one footer emergency notice and existing booking infrastructure remain unchanged.

TypeScript, ESLint, production build and desktop/mobile browser review are required for release. No database migration or patient data change is included.

## Approved release

The user explicitly confirmed: Match these references, including the background. Released application commit 53aef01ad2d74be440b57d1a11d100b75fbbbb64 on deployment dpl_AJhGJD4d1ywgXe3fhMmTzsZRHLMe, assigned to www.docvy.in. The previous alias was dpl_Ha9HUopHz5o6KQCEGP9spqXetbdd.

TypeScript, ESLint, optimized local and Vercel production builds passed. The homepage discovery regression passed. Browser verification confirmed desktop composition, mobile image crop and legible copy, working mobile search to a matching doctor result, and no horizontal overflow (469px document within a measured 488px viewport). The production photograph rendered successfully. Live home and asset returned 200, one emergency call link remained, the interactive doctor controls were present and authenticated booking health was healthy. The first request during alias propagation briefly served the previous page; subsequent HTTP and browser checks confirmed the released hero.

Actual live screenshots are in docs/release-screenshots/consultation-reference-desktop.jpg and consultation-reference-mobile.jpg. No production data or schema was modified. Main is unchanged and no pull request was merged.
