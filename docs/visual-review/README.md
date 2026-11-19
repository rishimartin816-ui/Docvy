# DOCVY approved mockups — implementation review

Branch: `feat/approved-mockups-20261119`. Production and main are unchanged. No deployment or database migration was performed.

Open [the side-by-side review gallery](index.html) for every implemented layout: approved screenshot, implementation screenshot, corrections, outstanding differences and test results. The images are evidence only; pages are real React/HTML interfaces.

## Review status

Implemented and visually inspected: homepage, specialties, real doctor profile and location panel, combined doctors/clinics page, individual doctor and clinic landing pages, how it works, pricing, partner registration, care guide, surgery guide, about, contact, FAQs and detailed footer.

**No page is marked visually complete or pixel-perfect.** The homepage is 512×1711 against a 512×1536 reference. Its section order, search geometry, green/mint cards and footer are implemented, but data, source imagery, typography and height differ. The requested homepage fidelity gate has therefore not passed; the remaining layouts are implementation drafts, not approved releases. The supplied separate desktop-home concept still needs a dedicated visual pass; responsive behavior at 1440px alone is not desktop visual approval.

The homepage [overlay](actual/homepage-overlay.png), [absolute difference](actual/homepage-diff.png) and [comparison data](actual/homepage-comparison.json) use original dimensions and top-left registration, padding the shorter image with white. No stretching or warping. The raw mean channel error is a diagnostic, not a completion score. Other references contain device frames and incompatible viewport sizes, so raw cross-page pixel scores would mislead.

## Missing sources / intentional differences

- Both ZIP packs contain screenshot crops, not production-quality original photography. This is stated in their supplied manifests/READMEs. Exact supplied crops were reused, with baked UI cropped or masked where possible. Some remain soft at larger sizes.
- No new source SVG icon library or font specification was supplied. Existing repository specialty SVGs are reused; other controls use Lucide. Reference typography is approximated with scoped Arial and a serif homepage headline; existing application fonts remain installed.
- The existing approved lowercase DOCVY wordmark is retained exactly. The mockups’ cross-and-uppercase lockup is a conflicting logo variant and was not recreated.
- Authentic founder portrait, doctor-authorized facility photographs, verified patient reviews, social account URLs, app artwork/store listings and live slot inventory are absent. Neutral placeholders or existing meaningful links replace these; no fabricated reviews, credentials, counters, account links or availability were added.
- Real doctors, registration/consent states, fees and locations replace fictional reference profiles. Real practice counts differ from the mockup’s unsupported 50,000/10,000/10-lakh numbers.
- Pricing figures are visibly reference-only; checkout is not enabled. Contact form opens the user’s email application and does not claim server delivery. Newsletter/tools use available contact/guide flows; missing new product backends are not simulated.

## Files changed

| Files | Change |
|---|---|
| `components/mockups/MockupHome.tsx` | Homepage, real search, real profile cards, supplied crop assets, steps, guides and closing band. |
| `components/mockups/MockupHeader.tsx`, `MockupFooter.tsx`, `MockupDetailedFooter.tsx` | Reference-style navigation and footer variants; real routes and current company details. |
| `components/mockups/MockupPages.tsx` | Reusable hero, benefit/callout patterns and all informational-page layouts. |
| `components/mockups/MockupDoctor.tsx` | Existing profile data, publication/consent/verification guards, locations and booking-link parameters in reference geometry. |
| `components/mockups/MockupFaqs.tsx`, `MockupPricing.tsx`, `MockupContactForm.tsx`, `MockupSpecialties.tsx` | Working filters/toggle, honest email handoff and specialty SVG grid. |
| `components/SiteFrame.tsx`, `app/layout.tsx` | Scoped public shell; CRM bypass retained; existing global metadata and icons retained. |
| `components/CareGuideSearch.tsx` | Optional compact initial state, preserving existing search matching/default behavior. |
| `app/page.tsx`, `app/{about,care-guide,contact,faqs,for-clinics,for-doctors,how-it-works,partner-with-us,pricing,specialties,surgery-guide}/page.tsx`, `app/doctor/[slug]/page.tsx` | Render new interfaces while preserving metadata and data lookup/not-found behavior. |
| `app/for-doctors-and-clinics/page.tsx`, `app/design-review/footer/page.tsx` | Additional reference-layout review routes, excluded from indexing. |
| `app/approved-mockups.css` | Isolated responsive geometry, colors, image placement, focus states and reduced-motion handling. |
| `public/approved-mockups/*` | Supplied screenshot-derived asset crops, plus clean exact crop extractions; no unrelated stock. |
| `scripts/verify-approved-mockups.cjs`, `scripts/compare-approved-mockups.cjs` | Local-only capture/regression and offline comparison tooling. |
| `docs/visual-review/*` | Approved references, actual captures, machine-readable checks and comparison gallery. |

No API routes, Supabase policy/schema, directory taxonomy, booking backend or environment credentials were changed. Existing doctor and directory URLs remain intact.

## Verification

- Optimized Next.js build: passed compilation, project lint/type validation and generation of all 2,453 static paths. Built with preview indexing safeguards.
- TypeScript: `node node_modules/typescript/bin/tsc --noEmit` passed.
- Targeted ESLint for new components, shell and care-guide search passed. The local pnpm layout requires `NODE_PATH` pointing to the parent of `eslint-config-next`; no dependency manifest was changed to work around this.
- Browser suite: 15 layout captures return HTTP 200; one h1 each; no broken images, horizontal page overflow or browser exceptions. Canonical presence is checked on public content routes; the footer-only review route is noindex.
- Responsive overflow: home, pricing, partner and doctor profile at 320, 390 and 1440px.
- Interactions: FAQ text/category filtering, pricing audience toggle, opening the existing partner application and homepage Ummed search reaching the real directory result.
- No partner form, booking, email or payment submission was performed. This suite does not claim delivery or booking-completion verification.
- Detailed machine output: [verification.json](actual/verification.json).

## Local review

This Windows environment has pnpm and Node; npm is unavailable. Use `pnpm dev --port 3112`, then visit `http://localhost:3112`. No claim is made that the unavailable npm executable was tested. The equivalent package script is unchanged.

Before production approval: supply missing originals, resolve the logo/reference conflict, agree accurate commercial and testimonial content, complete the mobile-homepage fidelity gate, review each remaining page/desktop variant, then perform release checks. Do not deploy this draft automatically.
