# DOCVY Website Design Review

**Reviewed:** 3 November 2026
**Scope:** Public DOCVY website, desktop first viewport and page content  
**Status:** Figma-aligned homepage and shared typography updates are published in production as commit `a332187`; live site delivery and sitemap pages are verified.

## Live pages reviewed

- [Homepage](https://www.docvy.in/) — patient-first hero, concern search, India-wide guide and Delhi NCR directory disclosure, patient journey, concern examples and provider area.
- [Patient guide](https://www.docvy.in/care-guide) — concern/specialty search, 17 specialty cards, safety guidance, explanation of DOCVY status and sources.
- [Doctor directory](https://www.docvy.in/doctors) — source-linked listings, filters, city groupings and disclosure about independent verification and appointment availability.
- [Clinic and hospital plans](https://www.docvy.in/pricing) — three planned offer cards and contact calls to action; no online checkout.
- Shared navigation and footer were inspected on these pages. Source structure for `/for-doctors`, `/how-it-works`, `/about`, `/faqs`, `/contact`, `/status`, `/request`, `/grievance` and legal routes was reviewed.

Live screenshots were visually inspected through the in-app browser at a 1280 × 720 desktop viewport for `/`, `/care-guide`, `/doctors` and `/pricing`; `/grievance` was checked after the shared token update. A fresh homepage scrape provided page copy and extracted branding. Mobile layouts and interaction states were not visually captured in this review.

## What is working

- The homepage headline quickly explains the patient benefit. The two main actions—find a specialty and browse doctors—are easy to distinguish.
- The mint hero, teal buttons, deep green text and warm coral detail make the site feel approachable and healthcare-focused. The new care-team illustration supports the patient journey and is an illustration, not a claim of a DOCVY provider or patient.
- The live directory is transparent about its sources and review status, links back to hospital pages, and separates results by Delhi, Gurugram and Noida.
- Provider plans and contact pages make clear that plan pricing is discussed directly and that online checkout is not available.
- Patient-facing health guidance includes non-diagnosis language, urgent-care direction and links to public medical references.

## Site-wide design findings

1. **The shared tokens are now aligned.** Commit `23e5d60` maps the legacy Tailwind color aliases to the live mint, teal and green palette (`#F6FAF8`, `#087F83`, `#173A37`) and sets body and headings to the loaded DM Sans stack with a system fallback. A post-deploy support-page capture confirmed the old plum headings now use the same deep green. Follow-up work can retire misleading legacy alias names when components are refactored.
2. **Typography uses a two-font stack.** DM Sans is loaded for headings and Inter for body copy, each with a system fallback. Confirm text wrapping and legibility at mobile widths during the next responsive pass.
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

### 3. Doctor directory: make scale, trust and growth easy to understand

The current dataset represents 12 unique doctor profiles across 16 profile-city placements (Delhi 6, Gurugram 6, Noida 4) and 17 hospital-listed facility locations. A profile can appear under multiple cities or facilities. State the unique-profile count separately from both measures. Keep hospital source, city/locality, specialty, source check date and DOCVY review status visible. Use confirmed, public location detail only and continue linking to the official hospital source for current availability.

DOCVY is a pan-India product; the guide and product purpose should speak to people and care teams nationwide. The live doctor directory is currently limited to Delhi NCR. Add a city only as source-linked provider coverage grows enough to make its listings useful and clear to patients. Keep locality pages limited to current, source-backed information, and never suggest nationwide listings before they exist.

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

## Proposed richer visual direction

Keep the recognizable DOCVY teal, but make the interface feel more like a polished care-navigation product than a simple brochure:

- **Core palette:** deep pine `#123B38` for strong headings and dark sections; teal `#087F83` for primary actions; pale mint `#EAF5F1` for patient-search surfaces; cool white `#FFFFFF` for cards; readable secondary green `#526D66` for body copy. Keep coral `#F39B72` and warm gold for small illustration details and pending notices, respectively.
- **Use color by meaning:** primary teal means “continue/search”; mint groups patient-facing information; deep pine marks important explanatory sections; gold indicates “pending/not yet available.” Avoid using gold or red for ordinary navigation or decoration.
- **Illustration system:** build a small set of friendly, flat-vector scenes with rounded shapes and consistent stroke weight: (1) patient choosing a starting point, (2) location search/map pin, (3) doctor/hospital profile, and (4) provider enquiry handoff. Use them as supportive section illustrations beside real text. Avoid busy stock photography and avoid decorative illustrations that look like live appointment confirmations.
- **Icon system:** use one family of simple outline icons at consistent size and stroke; pair every icon with an explicit text label. Use search, location, specialty, hospital, source and status icons only where they improve scanning. Do not rely on color or an icon alone to convey verified/pending status.
- **Page hierarchy:** reserve a large, high-contrast hero for one question and one primary task; follow with quick-start choices, a short “available now” explanation, then deeper detail. Use more whitespace between major decisions, denser cards only in the directory.
- **Motion and depth:** use subtle hover/focus transitions and layered mint backgrounds, not strong parallax or motion that competes with reading. Keep reduced-motion behavior and visible keyboard focus.

These are proposed values and art direction, not a finished Figma file. The existing DOCVY hero illustration is the current visual reference.

## Detailed page and content structure

### Patient homepage

1. **Hero:** make the nationwide purpose clear, such as “Find your way to care across India.” Include a concern/specialty search and a visible directory action that states the current Delhi NCR coverage.
2. **Quick starts:** “I know the doctor I need,” “I have a health concern,” and “I want to search near a location.” Each route should lead to a working guide or directory state.
3. **Available today:** explain that the patient guide and hospital-linked directory are usable now; direct patients to the hospital for current appointments. Keep this status in one clear notice.
4. **How DOCVY is planned to help:** show the future request-and-confirm journey separately and mark it as planned, so patients do not confuse it with a live booking flow.
5. **Provider path:** a separate, lower-page path for doctors, clinics and hospitals with a clear contact action.

### Patient guide and condition content

- Search common concerns, conditions and specialty names; make suggested searches clickable and show a focused result instead of all 17 specialty cards by default. The current guide now shows current source-linked profiles for mapped specialties, links to filtered directory results, and clearly says when no matching profile is listed.
- For a reviewed topic, explain in everyday language what the term means, which type of specialist is commonly associated with it, what other specialties may be relevant, and when a general physician may be a reasonable starting point.
- Add “what this page can and cannot tell you,” source links and a content review date. Do not diagnose, promise outcomes or imply that one symptom always maps to one doctor.
- Link only to relevant doctors or specialties actually present in DOCVY's directory; make the gap visible when no matching listings exist.

### Doctor directory and profiles

- Keep the current city pages for Delhi, Gurugram/Gurgaon and Noida. Add Indian cities in growth-led phases when enough source-backed profiles are available; do not publish empty or thin city pages.
- Each profile should show the doctor's name, source-listed specialties, facility/city, source hospital, last source-check date, DOCVY review status and a direct hospital-profile action.
- Explain “12 unique profiles,” “16 profile-city placements,” and “17 facility locations” where a doctor appears in multiple city groups or at more than one same-city facility. Do not show a DOCVY booking button or imply live availability while those features are not enabled.
- Add deeper specialty/locality pages when the underlying source-linked profiles support genuinely useful, non-duplicated results.

### Provider information

- Separate the “For doctors” profile correction/onboarding route from clinic/hospital product discussions.
- Describe planned capabilities by operational task: manage provider and facility information, route appointment enquiries, coordinate departments/locations, review and confirm a request. Label each as planned until it is operational.
- Keep pricing as “contact DOCVY” while no public pricing or self-serve purchase is available. Replace duplicated tier cards with audience fit, planned capabilities and one direct contact action.

## SEO, AEO and GEO content plan

These terms describe three user needs, not a promise of rankings:

| Approach | DOCVY content to build | Why it helps |
|---|---|---|
| SEO — organic search | Focused, useful pages for concern-to-specialty questions, specialty directory searches, and doctor/hospital profiles | Each page answers a distinct search instead of forcing patients to search a generic homepage. |
| AEO — answer-ready content | A short direct answer near the top, descriptive headings, concise FAQs, visible sources and review dates | People and answer engines can understand the page quickly; key information is available as normal text. Google says its AI Search features use existing SEO fundamentals and require no special AI markup. |
| GEO — geographic discovery | Delhi, Gurugram/Gurgaon, Noida and supported locality content tied to actual sourced facilities and providers | Patients often include a city or neighbourhood when looking for in-person care. A location page is useful only if the available listings make it meaningfully different. |

**Initial keyword-intent groups to validate in Search Console:**

- Concern to specialty: “which doctor for [concern]”, “[condition] specialist”, “what kind of doctor treats [condition]”.
- Local specialty discovery: “[specialty] doctor in Delhi”, “cardiologist in Gurugram/Gurgaon”, “doctor in Noida [locality]”.
- Named provider/facility navigation: “[doctor name] [hospital]”, “[specialty] at [hospital] [city]”.
- Provider business intent: “clinic appointment management”, “hospital OPD enquiry management”, “doctor profile correction DOCVY”. Keep software feature pages informational until the product exists.

These are search-intent examples, **not verified keyword-volume data**. Use Google Search Console impressions, clicks, actual queries and landing-page behavior to prioritize additions after enough data is available. Do not invent search volumes or city demand.

Structured data should describe visible, accurate content only. Google says its AI Search experiences have no special markup requirement; ordinary people-first content and technical SEO remain the foundation. Organization markup can help Google understand and disambiguate DOCVY as an organization. Do not mark unverified doctors as verified, invent availability, add fake reviews or assign DOCVY's office address to a doctor/hospital listing.

## Recommended sequence

1. **Design foundation — started and published:** shared colors and type aliases and the patient-first homepage are live. Still unify page shells, mobile navigation, cards, alerts and mobile spacing.
2. **Patient journey — guide interaction delivered; mobile review remains:** clickable examples, focused specialty cards, exact current-directory matches, filtered profile links, and explicit “no matching profiles” guidance are implemented. Review the interaction and layout at mobile widths before adding further health topics.
3. **Directory trust and GEO — in progress:** add source-backed city pages and city navigation; distinguish unique profiles from repeated city placements.
4. **Provider conversion — in progress:** clarify clinic/hospital use cases and keep planned capabilities clearly labeled.
5. **Supporting pages and SEO:** reconcile stale/legacy pages, improve titles and internal links, then publish only pages with substantial verified value.

**Recommended next implementation:** review the deployed city pages and search interactions at mobile widths, then refine the shared navigation and add reviewed concern content based on actual Search Console queries. Do not invent search demand when Search Console query data is unavailable.

## 3 November implementation pass

- Replaced the homepage title/description that framed the entire site as only a patient guide with accurate pan-India discovery wording and current Delhi NCR directory coverage.
- Made the four homepage concern examples open the guide with a real initial search (`/care-guide?q=...`) instead of acting as static illustrations.
- Added a visible “What can I use on DOCVY today?” section that separates nationwide guide access, the limited Delhi NCR directory, and the fact that booking is not available.
- Added an original vector scene to the clinic/hospital plans hero. The art itself states that workflows are planned and not live.
- Updated the patient guide metadata to use plain-language “what kind of doctor” intent and avoid implying diagnosis.
- Updated Gurugram city metadata to include the commonly used “Gurgaon” name.
- Audited supporting-page title tags and removed repeated brand suffixes where the shared Next.js metadata template already appends “DOCVY.” Shortened city-page title tags while keeping the local city intent.
- Confirmed title-template behavior in the official [Next.js 14 metadata documentation](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#title).
- Rewrote the paused request and appointment-status pages to explain that DOCVY does not book appointments and to route patients to source-linked hospital profiles; removed internal access-preparation wording from the patient-facing status page.
- The connected Figma app lists a recent file named “DOCVY — Future Healthcare Experience.” The current session does not expose its direct file URL, file key, or node URL, so a design screenshot/context could not be retrieved. No seat was changed and no Figma file was edited. These changes follow the repository’s documented visual system and existing illustrations; they are not presented as Figma-derived.
- Google Search Central guidance reviewed: AI features use the same foundational SEO practices, and content should be useful to people with clear sourcing; no special AI markup or rankings are promised. See [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) and [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## Evidence and limits

- Source website: [https://www.docvy.in](https://www.docvy.in), reviewed 2 November 2026.
- Source pages: `/`, `/care-guide`, `/doctors`, `/pricing` (visual review); page-source review also covered provider, support, FAQ and legal routes.
- Source repository: DOCVY Next.js application (`app/`, `components/`, `lib/`).
- The screenshot review was desktop only. Mobile navigation, keyboard interactions, and real analytics were not measured here.
- This review does not verify provider credentials, health guidance, domain ranking, or conversion performance. Counts are from the current source data and directory page, not traffic analytics.
- Google Search guidance consulted: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization), and [Google Business Profile eligibility](https://support.google.com/business/answer/13763036?hl=en).

## 3 November mobile and Figma follow-up

- The connected Figma account lists two team plans with view seats and a recent file named “DOCVY — Future Healthcare Experience.” The Figma MCP app did not expose a file key or node URL for the design-to-code tools. No seat was upgraded and no Figma file was edited; the website's documented design tokens remain the implementation reference.
- Mobile screenshots at a 390px viewport were visually reviewed for the homepage, patient guide, doctor directory and provider plans. The first viewport showed readable headings, contained cards and the expected mobile menu; this was a visual review, not a measured full-page overflow test.
- The homepage's illustrated “search” panel is now an actual GET search form to `/care-guide`, with a labeled input and keyboard-accessible submit button. It submits only the search term and does not request patient contact details.
- The search form now sits in the homepage text column before the status badge, so it is reachable without scrolling in the reviewed 390px first viewport. The shortened mobile hint fits within the input field.
- Added a city selector to the patient guide using the existing mint-and-white card treatment, teal location icon and documented typography. It offers only currently listed cities and passes the selection into the matching directory link.
- Removed the repeated availability strip at the bottom of the homepage, added a patient/provider FAQ link to the footer, and corrected About copy that implied the doctor directory had not opened.
- The new search panel follows the documented palette and components: white surface, mint background, teal primary action, deep-green text, rounded corners, and the existing icon family.

## 3 November homepage GEO and social preview update

- Added an accessible “Browse doctor listings by city” section immediately after the homepage quick starts. Its three cards link to the existing Delhi, Gurugram/Gurgaon and Noida directory pages and show current source-linked profile/facility counts computed from the provider list.
- Kept the visual treatment within the documented DOCVY system: mint/white surfaces, deep-green headings, teal location icons, rounded cards and visible keyboard focus. The cards identify the current directory as limited and direct people to official hospital profiles for current details.
- Corrected the directory summary so “profile-city placements” is not confused with the 17 facility records. This avoids presenting multiple facilities for one doctor in Gurugram as additional city coverage.
- Updated inherited social-preview wording after a live HTML audit found it was too generic and could suggest that an enquiry flow was live. The text now matches the current patient-guide and directory scope.
- Added a 1200 × 630 DOCVY social preview card in the same mint, teal and pine palette. Its search card and three city markers make the nationwide guide/current NCR listings distinction visible when a page is shared.
- Checked the official Next.js 14 opengraph-image and ImageResponse references; the generated image was verified locally as a PNG and the homepage includes Open Graph and Twitter image tags.
- Verified the same social image tags and canonical metadata on 10 representative page routes, including city, provider, contact, FAQ and legal pages after aligning their page-level Open Graph metadata.
- Figma remained view-only. The recent DOCVY file was visible in the Figma app, but no file/node URL was available to retrieve a design context. Implementation followed the codebase design reference; no Figma source was claimed.

## 3 November hyperlocal directory refinement

- Added an explicit “Area or locality” select beside specialty search. The mint/white filter card, teal location icon, existing spacing and rounded controls follow the repository's DOCVY visual system.
- Area options are sourced from locality names already attached to provider records. The helper text says the choices are incomplete and current listings are limited to Delhi NCR, preventing the interface from implying nationwide provider coverage.
- City-page locality chips now open the exact city and locality filter. Changing cities resets the locality selection; clearing filters restores the whole directory.
- This is a codebase-grounded visual update. The connected Figma app lists “DOCVY — Future Healthcare Experience,” but its file/node URL is not exposed, so no external Figma screen or token set is claimed as the source.
- `pnpm lint` and `pnpm build` passed. Production deployment `dpl_FJwJ85KVvgxFhNf1apFQAmfQpVn8` is `READY` for commit `2fced91`. Live `/doctors` and `/doctors/delhi` returned HTTP 200 and retain page-specific canonicals, one H1 and `index, follow`; the city page exposes the locality link and the directory exposes the area filter. The sitemap remains 23 URLs, with no thin locality pages added. A desktop screenshot/interactive visual review is still pending.

## 3 November appointment enquiry closed-state refinement

- A fresh production crawl found that `/request` explained that intake was paused while still rendering disabled name, mobile and consent fields. That presentation could make a patient think DOCVY was collecting an enquiry.
- Changed the closed state to remove all contact fields and show “No form · no details stored,” the selected doctor and facility when present, a direct link to the hospital's official doctor profile, and a link back to current listings. The `/request` route remains `noindex, nofollow`.
- Kept the existing DOCVY palette, outline icon family, rounded cards and focus-ring treatment. No new claims about doctor availability, booking, payment or credential review were added.
- `pnpm lint` and `pnpm build` passed. Production deployment `dpl_8EetN7FZQTD9KKn7JGiFDoB5wCjJ` for commit `890febc` reached `READY` and received the `www.docvy.in` and `docvy.in` aliases. The live `/request?provider=balbir-singh&city=Delhi` page returned HTTP 200, contained no name/mobile inputs, showed Dr. Balbir Singh and the official Max Healthcare profile link, and retained `noindex, nofollow`. A no-data production API probe returned HTTP 503 because the private intake is not connected; no lead was created.
- Google Search Central's current generative-search guide recommends foundational SEO and useful, unique content; it says no special GEO schema is required. No unsupported FAQ or doctor-verification markup was added. See [Google's generative AI Search guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) and [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## 3 November homepage source-check clarity and search metadata

- Replaced a repeated homepage “what is available today” panel with a more useful three-step explanation: check the hospital source, confirm the exact facility, and ask the provider about availability and fees. The copy distinguishes source-linked information from DOCVY verification and live appointment status.
- Kept the current visual language—mint surface, deep-green heading, teal action, rounded white cards and outline icons—and added emergency guidance at the foot of the section.
- Changed homepage title and social descriptions to use clear patient-guide and doctor-directory language, while naming the current Delhi, Gurugram/Gurgaon and Noida coverage. The pan-India product scope remains clear and the live NCR limits are explicit.
- Added homepage `WebSite` structured data for the preferred site name and connected it to the existing `Organization` entity. This follows [Google’s site-name guidance](https://developers.google.com/search/docs/appearance/site-names); the content does not add unsupported AI-specific markup, which Google says is unnecessary for generative search in its [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
- Codebase-grounded design update; the connected Figma account still does not expose a direct file/node URL for a design-context review. No Figma design file was edited.
- Local `pnpm lint` and `pnpm build` passed (32 generated routes); `git diff --check` passed. Production deployment `dpl_A4jQaqkBMcLPgY9NGFnsDcNUGF2H` for `bce4e7b` is `READY` on both custom domains. Live title, description, canonical, one-H1 count and linked `Organization`/`WebSite` entities were verified. The new section was visually reviewed at desktop and 390px; measured page width did not exceed the mobile viewport.

## 3 November page-share metadata consistency

- A fresh production page-source check found that several internal URLs inherited the generic homepage X card even when their search title and description were specific. Added a shared social-metadata helper and applied each page's accurate title/description to Open Graph and X metadata across directory, patient guide, provider, support, legal and patient-answer routes.
- The shared 1200 × 630 illustration remains aligned with the DOCVY mint, teal and deep-green visual system. This pass improves how a route is presented when shared; it does not alter the page layout or assert a ranking gain.
- Lint and production build passed (32 routes). Local and live HTML checks confirmed page-specific social titles; live checks returned HTTP 200 for 16 representative routes, and the 12 indexable sample routes retained canonicals, one H1 and `index, follow`. `/request` and `/status` remain noindex.
- Commit `e7d59d8` is live on both `www.docvy.in` and `docvy.in` through Vercel deployment `dpl_7qwNRSboP9q4yDwqrFM8MhyY6eWB` (`READY`).
- Figma did not expose a direct file/node URL, so this codebase-grounded change is not described as Figma-derived.

## 3 November navigation refinement

- Split the shared navigation into patient and provider groups so visitors can quickly identify which part of DOCVY serves them. Desktop uses a divider; mobile adds visible group headings.
- Highlight the current section for doctor directory routes, patient guide routes, provider pages and contact. The mobile menu is always present in the document tree but hidden when closed, so its toggle controls a stable element; selecting a destination closes the menu.
- Use “Contact DOCVY” as the site-wide action label, with a distinct current-page state on the contact route.
- Reuse the established DOCVY palette, type scale, rounded surfaces and visible focus rings. This is grounded in the repository design reference; a direct Figma file/node reference was unavailable, so this update is not claimed as Figma-derived.
- Checked the mobile menu interaction locally from `/for-doctors` to `/pricing`; the menu closed after navigation. Production markup for `/doctors`, `/for-doctors`, `/pricing`, `/contact` and `/patient-guides/diabetes` returned HTTP 200 and showed the expected current-page links.
- This update supports clarity and internal navigation. It does not claim higher rankings, AI citations or conversion gains. Existing page-specific metadata, patient answer pages, source citations, sitemap and structured data remain the SEO/AEO/GEO foundation.

## 3 November clinic and hospital plan page

- `/pricing` keeps the existing provider workflow illustration and design tokens, then makes readiness visible before presenting future plan types: no published rate card, no active subscription and no live appointment dashboard.
- The clinic, multi-location group and hospital cards describe potential workflows only. A repeated “Contact now” action routes to DOCVY's existing contact page; it does not imply a quote, purchase or onboarding flow.
- Four visible answer disclosures address availability, pricing, appointment management and safe business-enquiry details. Answers appear directly on the page for readers and crawlers. No FAQ rich-result schema is added, and the page makes no claim that a feature or subscription is live.
- Google guidance supports clear, helpful content and foundational SEO for generative search; it does not call for a special GEO markup checklist. Sources: [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [FAQ/How-to result changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes).
- This implementation follows the repository's documented visual system. A Figma file/node link is still required for a direct design-context comparison; no Figma design was changed.

## 3 November patient and provider FAQ page

- The `/faqs` hero asks what a visitor can do today and makes the current enquiry-form state visible before the answers. Three large route cards send visitors to the patient guide, current doctor directory or provider plan page.
- Grouped 13 questions into patient discovery, appointment/payment/safety, and provider operations. Each group has its own icon, heading and short description; individual answers use native, keyboard-operable disclosure elements.
- Directly answers current availability and appointment questions, names pan-India guide scope alongside Delhi NCR directory coverage, and removes an unannounced city-expansion date. The emergency answer links to the Government of India's [112 Emergency Response Support System](https://112.gov.in/).
- Metadata matches the visible scope. No `FAQPage` structured data was added; the answers are visible and understandable without depending on a rich result.
- This codebase-grounded update keeps the DOCVY mint, teal and deep-green design language. A Figma file/node URL remains necessary for direct visual comparison; no Figma-origin claim is made.

## 3 November pan-India scope and provider coverage copy

- Across the homepage, guide, city directory and provider pages, state the two current facts together: DOCVY's discovery purpose is pan-India, while source-linked doctor listings currently cover Delhi, Gurugram and Noida.
- Describe new city listings as planned only when useful source-backed profiles are ready. Do not promise a city launch or imply a schedule that DOCVY has not announced.
- Keep city names and alternate place names readable in headings and descriptions to support geographic search intent. The wording is derived from current directory data, not keyword-volume assumptions.
- This is a content clarity pass that retains each page's existing visual hierarchy and icons. No Figma file was available for direct comparison, and no layout was changed in this pass.

## 3 November doctor profile correction and GEO links

- Reframed `/for-doctors` around the specific next step a doctor can take today: email the official hospital or clinic profile URL, the city, and the public detail to correct. The page says a self-service claim/edit portal is not live, avoids requesting identity or registration documents, and states that the DOCVY owner approves any published change.
- Added a responsive, labeled profile-status illustration that distinguishes a hospital source link from pending DOCVY review and a claim portal that is not open. It is explicitly marked as an example, not a live dashboard.
- Turned the Delhi, Gurugram/Gurgaon and Noida labels into internal links to the existing city directories. This improves patient/provider navigation and makes current local coverage discoverable without implying nationwide listings.
- Updated provider-page title and description to match the visible correction workflow and current cities. The answer addresses doctors asking how to correct a DOCVY profile, rather than targeting unsupported keyword variants.
- Design follows the documented mint, teal and deep-green palette, DM Sans stack, outline icons and rounded cards. The connected Figma account still has no usable file/node URL for direct design-context comparison; no Figma file was edited.
- Google Search Central says people-first content and foundational SEO apply to AI Search, with no special AI markup required. This pass adds a direct visible answer and source-linked city navigation rather than extra keyword pages. Sources: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- `pnpm lint`, `pnpm build` (32 routes) and `git diff --check` passed locally. Commit `f653214` is READY in Vercel production as deployment `dpl_8qh2SdCysbDxY7LnHkRvNa7FMhvW`, with aliases `www.docvy.in` and `docvy.in`.
- Live `/for-doctors`, `/doctors/delhi`, `/doctors/gurugram` and `/doctors/noida` all returned HTTP 200, one H1, page-specific canonicals and `index, follow`. The provider page visibly includes the profile-correction answer and owner-approval step; all three city links resolve. This verifies delivery and metadata, not ranking or traffic.

## 3 November profile correction email template

- Changed the primary provider-page action to “Email a profile correction request” and added a prefilled email template with blank fields for the official public profile URL, doctor name, city and public detail to correct.
- The template opens the visitor's email application; it does not send on its own, collect a web form, or create a patient appointment lead. It asks for public professional information only and repeats the instruction not to send patient or identity data.
- This is a usability and content-clarity improvement for a specific provider task. It adds no unsupported search terms and makes no ranking, AI citation, or listing-verification claim. The existing page metadata, source-linked city navigation, and current NCR-only coverage caveat remain.
- Local generated-page checks confirmed the visible profile count, email action and all four template fields. The production route now returns HTTP 200; URL-decoded mailto content contains all four fields, and the page repeats the instruction not to send patient or health information. The tracked production build is READY as `dpl_ENZwxwghcpLqhroV2DtXThFy5LHj`.

## 3 November targeted live search and design-reference audit

- Firecrawl's sitemap-only map found 23 public site URLs. Fresh raw-HTML inspection covered the homepage, `/care-guide`, `/doctors`, `/doctors/gurugram`, `/for-doctors`, `/pricing`, `/faqs`, and `/patient-guides/diabetes`. Each returned HTTP 200 with a page-specific title, description, canonical URL, `index, follow`, and one H1. The homepage exposes Organization and WebSite JSON-LD; the Gurugram and diabetes pages expose BreadcrumbList. The sampled content distinguishes India-wide guide availability from current Delhi NCR profiles and says the guide does not diagnose or make bookings.
- A live interaction check opened `/care-guide?q=joint%20pain&city=Noida`; it selected Noida, showed Orthopaedics, and offered the current source-linked Noida profiles. The form state remained closed. This is a navigation/search check, not an appointment submission.
- Google Search Central's current guidance says foundational SEO and helpful, reliable content also apply to AI Search; there is no extra AI markup requirement. The sampled direct answers, current location caveats and source links remain the appropriate AEO/GEO work. No ranking, indexing, traffic, or AI citation result is inferred.
- The connected Figma app lists `DOCVY — Future Healthcare Experience`, but opening it surfaced a Dev Mode seat-change prompt. The seat was left unchanged; no Figma file was edited and no design context was retrieved. A direct design share URL is still needed for a read-only comparison.

## 3 November grievance contact snippet

- The fresh sitemap check found that `/grievance` used the generic description “Current grievance-contact availability for DOCVY,” which did not explain the contact options shown on the page.
- Replaced it with a concise description of DOCVY's grievance contact and postal address, email/post submission, and the instruction to omit medical records and identity documents. The same description feeds page, Open Graph and Twitter metadata; visible grievance details remain the source of truth.
- Local production build output contains the updated description in all three metadata locations, one H1, and the visible contact, address and privacy caution. `pnpm lint`, `pnpm build` (32 routes), and `git diff --check` passed. Production `/grievance` now returns HTTP 200 with the updated 143-character description, canonical and one H1.
- The follow-up full sitemap check returned HTTP 200 and passed 23/23 pages for title, non-empty description, matching canonical, `index, follow` and exactly one H1. This is a markup/delivery check, not an indexing or ranking result.

## 3 November grievance page visual refresh

- Rebuilt `/grievance` with the existing mint hero, teal actions, deep-green headings, rounded surfaces and outline icons. The first action is an email link; the second jumps to the postal address. The grievance contact, operating entity, postal address, and privacy warning remain visible in separate sections.
- The route uses one H1, labels the email and address actions, and does not add a complaint form or request sensitive documents. The CTA opens an email draft only; it does not send a message.
- This uses the repository's established visual system. The connected Figma file is visible in Recents, but its viewer prompted for a Dev Mode seat change and no direct design context or Figma edit was available; no Figma-origin claim is made.
- `pnpm lint`, `pnpm build` (32 routes), `git diff --check`, and generated-HTML checks passed locally. Production publication and live visual verification are pending.

## 3 November Figma-aligned homepage refresh

- Read the connected `DOCVY — Future Healthcare Experience` file in view-only mode. Design references: Brand System frame `2:13`, desktop homepage `2:606`, mobile homepage `2:704`, and desktop care illustration `2:616`. No Figma file or seat settings were changed.
- The homepage preview uses a mint discovery surface, a two-column desktop hero, a floating search panel, an illustration, four entry paths, city coverage, a patient journey and a distinct provider area. The related Brand System frame also shows a separate navy/cyan direction; this release keeps the homepage's mint/teal system and adds a small cyan brand accent instead of replacing the established site-wide palette.
- Updated the shared logo mark and text color, loaded Inter for body text while retaining DM Sans headings, and added the Figma illustration as a local image at `public/images/docvy-homepage-care-team.png` so the site does not depend on a temporary asset URL.
- Rebuilt the homepage hero and four discovery cards around the actual current product: nationwide patient guide, source-linked doctor profiles currently in Delhi NCR, direct provider appointment confirmation, and provider tools clearly labelled as planned. Mockup-only claims such as verified profiles, confirmed booking and nationwide directory coverage were not carried into the live copy.
- Google Search Central says AI Search uses foundational SEO practices and does not require special AI markup. Direct answers, clear source links, descriptive headings, internal paths and accurate city coverage remain the AEO/GEO approach; no ranking or AI citation outcome is claimed.
- This replaces earlier same-day notes that Figma design context was unavailable; the connected MCP app later provided read-only design context in this session.
- Published as commit `a332187` to Vercel production (`dpl_34qvLTfP2UDmRbypaTYh5RE9rHPk`, `READY`). The live homepage and new local illustration returned HTTP 200; the homepage keeps its page-specific title, description, canonical, Open Graph/Twitter preview and visible product-scope disclosure.
- The live sitemap contains 23 URLs and all 23 passed HTTP 200, exactly one title, exactly one H1, one canonical and `index, follow`. This checks delivery and markup; it does not establish indexing, ranking, traffic or AI citations.

## 3 November provider plan contact action

- The three clinic/hospital plan cards now carry a direct plan-specific email draft action. Each draft uses the same brand buttons and asks only for business contact information; it explicitly tells visitors not to include patient or health information.
- This follows the existing provider-plan page and shared visual system. The email action opens a draft and does not submit or send information automatically.
- Local production-page verification confirmed three unique plan subjects, the business-details prompts and the privacy reminder. The page remains clear that these are future workflows, not purchasable plans or a live dashboard.
- Published with commit `ecca766`; Vercel deployment `dpl_92LexFurDMvbnHxvfMf8FRRb98V1` is `READY`. The live pricing page returned HTTP 200 with its title and one H1, and the three plan-specific draft subjects were verified on the published page.
- A post-release check of all 23 live sitemap URLs passed HTTP 200, one title, one H1, canonical URL and `index, follow`.

## 3 November provider section aligned to Figma brand system

- Reopened Figma file `4mPJkaKad7ZUc4CW1zWbGs` in a read-only design session and inspected `DOCVY Brand System` (node `2:13`) and `Mobile — Homepage concept` (node `2:704`). The brand foundation specifies Midnight `#071426`, Deep Blue `#102B46`, Electric Cyan `#17C8E5`, Medical Teal `#13BFA5`, Cloud White `#F4F8FC`, DM Sans headings and Inter body text. The mobile concept keeps a calm mint surface with a cyan primary action.
- Applied the deep navy/blue and electric-cyan treatment to the homepage care-team section, keeping the patient discovery pages' mint surfaces. Changed the provider cards' checkmarks to clock icons and explicit `Planned · not live` labels, then separated the existing doctor profile-correction route from future clinic/hospital workspaces and booking tools.
- Added direct links to doctor profile help and clinic/hospital plans. This corrects the impression that provider tools are already operational and makes audience-specific next steps easier to find.
- No Figma file was edited. `pnpm lint` passed; `pnpm build` passed with 32 routes and the existing non-blocking Open Graph edge-runtime notice. A local production-server check returned HTTP 200, one H1, the two provider CTAs, the updated planned status and no obsolete “One connected system” claim. `git diff --check` passed.
- Commit `7467c47` is live in Vercel production as deployment `dpl_3tGD4tEjUh95fFjXTGaJiC4BsyaY` (`READY`) with aliases `www.docvy.in` and `docvy.in`. The live homepage returned HTTP 200 with its page-specific title, one H1, the new care-team section, explicit planned status, both provider CTAs, and canonical URL; `/for-doctors` and `/sitemap.xml` also returned HTTP 200.

## 3 November provider plan card clarity and visual update

- Used the connected Figma brand foundation (`DOCVY Brand System`, node `2:13`) as the provider-page color reference: Midnight `#071426`, Deep Blue `#102B46`, Electric Cyan `#17C8E5` and Medical Teal `#13BFA5`. The current Figma file contains brand and homepage preview pages; it has no separate pricing-page design. No Figma file was edited.
- On `/pricing`, replaced checklist marks beside potential workflows with neutral outline bullets, added a clock and `Planned · not live` badge to each of the three plan cards, changed the label to `Potential future workflow`, and aligned the card accents with the Figma navy/cyan palette. Contact-now email drafts and the no-payment disclosure remain.
- `pnpm lint` and `pnpm build` passed (32 routes; existing non-blocking Open Graph edge-runtime notice). Local production-server check returned HTTP 200, the page-specific title, one H1, three plan cards, the planned label, future-workflow heading and no-payment disclosure. `git diff --check` passed.
- Commit `2b97dcc` is live in Vercel production as deployment `dpl_67XQXbCGnmfxnMH8uSVKnu5VgAu6` (`READY`) with aliases `www.docvy.in` and `docvy.in`. Live `/pricing` returned HTTP 200 with its canonical URL, one H1, three plan cards and planned status. A fresh production crawl passed all 23/23 sitemap URLs for HTTP 200, one title, one H1, exact canonical and `index, follow`.
- These checks confirm page delivery and metadata only. They do not establish search indexing, rankings, leads or provider-plan availability.

## 3 November doctor profile page clarity update

- Replaced the broad doctor-discovery hero headline with the concrete current action: request a correction to a DOCVY profile. The page copy continues to state that owner review is manual and self-service claims or credential verification are not live.
- Restyled the closing correction call-to-action with the Figma brand system's midnight, deep-blue and electric-cyan colors, and added a clear `Owner review` label and direct email action.
- No Figma file was edited. `pnpm lint` and `pnpm build` passed (32 routes; existing non-blocking Open Graph edge-runtime notice). The local production server returned HTTP 200 for `/for-doctors` with its page-specific title, one H1, the correction action, owner-review wording, non-live verification status and canonical URL. `git diff --check` passed.
- Commit `496822e` is live in Vercel production as deployment `dpl_3tpisTgqAFGcQeuPMFwvVFUHwxrc` (`READY`) with aliases `www.docvy.in` and `docvy.in`. Live `/for-doctors` returned HTTP 200 with its page-specific title, one H1, the profile-correction action, owner-review disclosure and canonical URL. A fresh full crawl passed 23/23 sitemap URLs for HTTP 200, one title, one H1, exact canonical and `index, follow`.

## 3 November Figma-aligned mobile discovery search

- Rechecked the connected Figma `DOCVY Brand System` frame `2:13` and homepage frames `2:606` (desktop) and `2:704` (mobile) in read-only mode. The implementation follows the mint discovery canvas, rounded search card, restrained warm accent and compact mobile rhythm. No Figma file was edited.
- Reduced the homepage hero's mobile-only minimum height while preserving the desktop composition, added the warm peach glow from the mobile concept, and removed the duplicated city/appointment line from the hero.
- Extended the homepage GET search card with an optional city selector for the current Delhi, Gurugram and Noida listings. Search terms and selected city pass as `q` and `city` into the existing patient guide filter. The helper copy keeps India-wide guide access distinct from the limited city directory.
- Updated homepage description and sharing metadata to describe the real search path and current NCR city coverage without implying nationwide doctor listings or online booking.
- `pnpm lint`, `pnpm build` (32 routes) and `git diff --check` passed. The local production server returned HTTP 200 for `/` and `/care-guide?q=diabetes&city=Noida`; the homepage had one H1 and the GET form contained the concern field, city field and all three current city options. Vercel production release verification is recorded in `DEVELOPMENT_STATUS.md` after publishing.

## 3 November doctor support page — Figma brand application

- Read the connected `DOCVY Brand System` frame `2:13`, desktop homepage reference `2:606`, and primary/secondary button specimens `2:66` and `2:68` in Figma file `4mPJkaKad7ZUc4CW1zWbGs`. The brand foundation defines Midnight `#071426`, Deep Blue `#102B46`, Electric Cyan `#17C8E5`, Medical Teal `#13BFA5`, Cloud White `#F4F8FC`, DM Sans headings and Inter body text. The file does not contain a dedicated doctor-support page; this implementation uses its provider-oriented brand system, not a claimed page mockup match.
- Reworked `/for-doctors` with a deep navy/blue provider hero, cyan primary action, white secondary action, cool-white status card and explicit status labels. The button treatment follows the Figma component specimens. Existing project-native Tailwind styles and Lucide icons were reused; no temporary Figma images were added.
- Clarified the public profile-correction path and added visible answers on source links, DOCVY credential review, self-service claims, listing coverage and charges. The page distinguishes the India-wide product purpose from current Delhi, Gurugram and Noida listings. Patient-request status is configuration-aware so the copy remains accurate when intake setup changes.
- Added a page-specific title and description, a canonical URL, one H1 and direct visible answers. Did not add FAQ rich-result markup, credential-verification claims, ranking claims or special AI markup.
- The connected Figma account uses a View seat. Figma denied Code Connect access for that seat, so no mapping was available. No Figma file or seat was changed.

## 3 November patient guide visual and search order

- Applied the Figma brand system's navy, blue, cyan and teal palette to an original editorial illustration showing a patient and care navigator exploring broad guide topics. This is a new code asset, not a copied Figma frame; no Figma file was edited.
- Reworked the patient guide's opening for a clearer visual hierarchy: direct patient question and explanation, supportive illustration, then the searchable guide before the four-step journey card. The search and city selector remain usable and server-rendered specialty results remain in the page markup.
- Used responsive `next/image` sizing, alt text describing the illustration, and a short figure caption. The visual is decorative context and does not suggest a diagnosis or confirmed appointment.

## 3 November Contact page audience routes

- Applied the documented DOCVY Figma brand system to `/contact`: mint patient-discovery surface, Midnight/Deep Blue status panel, Medical Teal actions, rounded cards and Lucide route icons. This is a code implementation of the existing brand system, not a new Figma mockup; no design file was changed.
- Replaced the single provider-oriented contact block with distinct patient, doctor and care-team routes, then separated current intake status from actual appointment booking. This makes the correct next action visible without presenting planned provider tools as available.
- Added a status panel for booking, profile correction and provider-tool readiness, plus matching route cards and contact links. The hero remains responsive; the three routes stack on mobile and align in columns on wider screens.

## Bloom-inspired discovery and CRM refresh

Reference: https://dribbble.com/shots/26661884-Mental-Health-Clinic-Web-Design-Bloom
Discovery reference: https://www.practo.com/

Bloom's published desktop composite uses a violet landscape, generous spacing, rounded sections and large editorial headings. DOCVY borrows those visual cues and uses its own clinician illustration. Practo's city and specialty navigation informs DOCVY's paired filters.

The DOCVY palette uses Ink #251B35, Orchid #51318D, Iris #6544A6, Lavender #DDD0FA, Mist #F8F5FC, and Muted Plum #584968. Use Orchid for primary actions, Ink for headings, and translucent white over Lavender and Mist for glass panels. The demo directory and booking pages stay outside the search index. The educational homepage and guide pages retain their canonical URLs.

## Healing Garden search and content direction

- Homepage intent: which doctor should I see, and search by specialty and city. The hero gives people a place to start and links directly to individual patient guides.
- Guide intent: which doctor treats diabetes, which doctor for joint pain, and which doctor for high blood pressure. Guides explain specialties, give preparation questions, and link to their source material.
- Demo intent: see how clinic booking works. The demo directory, booking, and staff pages stay outside the sitemap and search index.
- Practo and Pristyn Care were reviewed for city and specialty discovery and plain-language condition groupings. Search volumes and ranking positions were not measured.
- Consultation photo by the National Cancer Institute, https://unsplash.com/photos/doctor-talking-to-patient-in-clinic-tl447mekwuQ, under the Unsplash License. It illustrates a consultation and does not depict DOCVY staff or patients.
