# DOCVY Website Design Review

**Reviewed:** 2 November 2026  
**Scope:** Public DOCVY website, desktop first viewport and page content  
**Status:** Review and implementation brief. Shared color and type aliases were aligned and published in commit `23e5d60`; this document itself makes no production changes.

## Live pages reviewed

- [Homepage](https://www.docvy.in/) — split patient-first hero, illustration, guide and directory calls to action, patient journey, concern examples, provider area and repeated booking status.
- [Patient guide](https://www.docvy.in/care-guide) — concern/specialty search, 17 specialty cards, safety guidance, explanation of DOCVY status and sources.
- [Doctor directory](https://www.docvy.in/doctors) — source-linked listings, filters, city groupings and disclosure about independent verification and appointment availability.
- [Clinic and hospital plans](https://www.docvy.in/pricing) — three planned offer cards and contact calls to action; no online checkout.
- Shared navigation and footer were inspected on these pages. Source structure for `/for-doctors`, `/how-it-works`, `/about`, `/faqs`, `/contact`, `/status`, `/request`, `/grievance` and legal routes was reviewed.

Live screenshots were visually inspected through the in-app browser at a 1280 × 720 desktop viewport for `/`, `/care-guide`, `/doctors` and `/pricing`; `/grievance` was checked after the shared token update. A fresh homepage scrape provided page copy and extracted branding. Mobile layouts and interaction states were not visually captured in this review.

## What is working

- The homepage headline quickly explains the patient benefit. The two main actions—find a specialty and browse doctors—are easy to distinguish.
- The mint hero, teal buttons, deep green text and warm coral detail make the site feel approachable and healthcare-focused. The illustration supports the patient journey without using a stock clinical photograph.
- The live directory is transparent about its sources and review status, links back to hospital pages, and separates results by Delhi, Gurugram and Noida.
- Provider plans and contact pages make clear that plan pricing is discussed directly and that online checkout is not available.
- Patient-facing health guidance includes non-diagnosis language, urgent-care direction and links to public medical references.

## Site-wide design findings

1. **The shared tokens are now aligned.** Commit `23e5d60` maps the legacy Tailwind color aliases to the live mint, teal and green palette (`#F6FAF8`, `#087F83`, `#173A37`) and sets body and headings to the loaded DM Sans stack with a system fallback. A post-deploy support-page capture confirmed the old plum headings now use the same deep green. Follow-up work can retire misleading legacy alias names when components are refactored.
2. **Typography now has one explicit stack.** DM Sans is loaded and used for both headings and body copy with a system fallback. The screenshot extraction inferred Inter for body text, but the source does not load Inter; do not claim it is in use. Confirm text wrapping and legibility at mobile widths during the next responsive pass.
3. **Page shells vary.** Several core pages use the mint gradient hero, while plans/contact/about and older status/request pages use white or legacy sand/plum components. Establish a small set of reusable page patterns: patient discovery, directory/search, provider information, and support/legal.
4. **Availability language is repeated.** The homepage mentions booking status in its hero, summary strip, patient-journey section, lower banner and footer. State the current availability once near the main action, then use a consistent concise status label elsewhere.
5. **Navigation mixes audiences.** Patients and providers share the same compact navigation and “Contact now” action. Keep patient tasks prominent and make provider links and their contact path distinct, especially on mobile.

## Page content and experience priorities

### 1. Homepage: make today's next action unmistakable

Keep the patient-first hero and illustration. Shorten the paragraph so it says what works now: search a concern in the guide or browse source-linked doctor profiles by city and specialty. Put “Browse doctors” and “Find a specialty” first; show a small, consistent notice that booking and DOCVY credential review are not live. Present provider software in a separate, clearly labelled area below the patient tasks.

Reduce repeated planned-journey copy. Use one compact section to explain current capabilities and one separate section to explain what is planned. Avoid presenting future appointment steps as available product functionality.

### 2. Patient guide: reduce first-visit overload

The guide currently returns all 17 specialties before the patient searches, so a user lands on a long grid directly beneath the search. Begin with clickable popular concerns and a short set of broad starting points. Show focused matches after a search, with an optional “Browse all specialties” control. Make the example chips activate the search instead of serving as decoration.

Build a reviewed concern-to-specialty library for useful, common searches. Each entry should use plain language, explain that it is a general association rather than diagnosis, link to its source/review date, and offer a route to relevant directory categories where those listings exist. Start with a small set of high-intent concerns and expand only after source and clinical review. Do not create thin pages for every keyword.

### 3. Doctor directory: make scale and trust easy to understand

The current dataset represents 12 unique doctor profiles across 16 city placements (Delhi 6, Gurugram 6, Noida 4); a profile can appear under multiple cities. State the unique-profile count separately from location listings. Keep hospital source, city/locality, specialty, source check date and DOCVY review status visible. Use confirmed, public location detail only and continue linking to the official hospital source for current availability.

Next directory improvements should be driven by a repeatable profile record and a human review step. Add locality landing pages only where there is enough current, source-backed information to make them useful to patients.

### 4. Provider pages: give each audience a concrete next step

Keep doctor profile correction and provider onboarding as manual contact flows. For clinic and hospital plans, explain the intended workflows in plain terms: provider/location information, enquiry routing, staff roles and appointment coordination. Label every capability that is not live. Replace repeated “Discuss pricing” cards with clearly differentiated fit and planned capability summaries, then one “Contact DOCVY” action. Do not imply that a dashboard, booking queue or subscription is currently available.

### 5. Supporting pages: align and remove stale paths

Review `/how-it-works`, `/about`, `/request` and `/status` together. Make request-paused messaging consistent and point each page to the live guide, directory or provider contact. Check whether `/for-employees` and `/for-students` are still intended public pages; retain them only if they serve a clear audience and match the current product. Keep legal, privacy and grievance information accessible and visually aligned with the shared system.

## Recommended visual system

These are implementation recommendations based on the live design; except where exact hex values are shown, spacing and scale are visual estimates rather than measured design specifications.

| Role | Current evidence | Direction |
|---|---|---|
| Main action | Teal `#087F83` buttons and links | Keep as the sole primary action color; use a darker hover state |
| Main text | Deep green `#173A37`; supporting text `#526D66` | Keep, with stronger contrast for small helper text |
| Page background | Mint `#F6FAF8`, gradient stops `#D5F0E8` / `#EAF5F1` | Keep mint for patient discovery; white sections for breathing room |
| Status accent | Warm gold on pending/paused notices; coral detail in hero | Use gold only for caution/pending status and coral sparingly for illustration/detail |
| Headings | DM Sans in source; headings vary between green and plum | Standardize on DM Sans and one deep-green heading color |
| Body text | System fallback in source despite Inter being inferred by capture | Define an explicit body font stack and consistent readable line lengths |
| Components | Rounded cards, thin mint borders, subtle shadows | Standardize one card radius, one border, button heights, spacing and alert treatments |

## SEO, local discovery and answer-ready content

- Write one clear page title and answer-first introduction for each actual audience and task.
- Add useful city and specialty pages only when there is enough verified, distinct directory information. Avoid doorway pages that only swap place names.
- Use structured data that reflects verified organization, pages and genuine provider data; do not add rating, availability or verification claims that DOCVY cannot substantiate.
- Keep source links, profile review state, location wording and last-checked date consistent between page copy and the underlying provider records.
- Make FAQs answer real patient questions and link to the guide or directory. Revisit them whenever booking or verification status changes.
- Track page and search performance only through connected analytics after its implementation and privacy handling are documented; do not report fabricated metrics.

## Recommended sequence

1. **Design foundation — started and published:** shared colors and type aliases are aligned. Still unify page containers, header/footer, buttons, cards, alerts and mobile spacing.
2. **Patient journey:** refine homepage hierarchy and patient-guide search, clickable examples, focused results and reviewed concern content.
3. **Directory trust:** clarify unique profiles versus city placements; standardize source and review information; improve city/locality navigation based on verified coverage.
4. **Provider conversion:** clarify doctor correction/onboarding and differentiate clinic/hospital plan information, while marking future tools as planned.
5. **Supporting pages and SEO:** reconcile stale/legacy pages, improve titles and internal links, then publish only pages with substantial verified value.

**Recommended next implementation:** finish the shared shell review across responsive breakpoints, then simplify the patient guide's first-visit state. This will establish consistent navigation and make the most important patient task easier to find.

## Evidence and limits

- Source website: [https://www.docvy.in](https://www.docvy.in), reviewed 2 November 2026.
- Source pages: `/`, `/care-guide`, `/doctors`, `/pricing` (visual review); page-source review also covered provider, support, FAQ and legal routes.
- Source repository: DOCVY Next.js application (`app/`, `components/`, `lib/`).
- The screenshot review was desktop only. Mobile navigation, keyboard interactions, and real analytics were not measured here.
- This review does not verify provider credentials, health guidance, domain ranking, or conversion performance. Counts are from the current source data and directory page, not traffic analytics.
