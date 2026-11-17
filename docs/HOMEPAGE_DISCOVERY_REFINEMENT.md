# Homepage discovery refinement — 17 November 2026

The user requested no featured doctor in the hero, one emergency notice near the footer, and an interactive homepage doctor section.

- The hero is centered and text-led. No doctor name, profile card or portrait is rendered in it.
- The homepage-specific bottom emergency callout is removed. DiscoverySearch no longer renders its hidden emergency paragraph on the homepage. The shared footer retains one call link to 112. The general educational disclaimer remains.
- All published verified profiles are available to the homepage explorer. Search matches public name, specialty, language and practice information; city and consultation type filter immediately. More results load locally in groups of six, with real counts, an empty state and clear-filter action.
- Every selected practice must match all filters. The displayed city, facility, fee and booking-link context come from that same practice. Online and in-person options are not conflated. Booking is available only when the existing eligibility lookup marks the doctor active.
- Only a whitelisted public presentation object crosses into the client component. No consent records, registration-review metadata, private contact, booking receipt or service credentials are serialized.
- No additional database calls are needed for filtering. Native controls, live result counts, visible focus, responsive layouts and reduced-motion handling are retained.

The emergency number is 112, verified against the Ministry of Home Affairs ERSS description: https://www.mha.gov.in/emergency-response-support-system-erss . No number change to 113 is made.

Validation includes TypeScript, ESLint, production builds, focused cross-practice filtering tests and browser checks for hero content, search, online selection, empty/reset state and mobile layout. Booking backend and production database are unchanged.

## Verification and release

TypeScript, ESLint, the optimized local build (2,455 generated pages), Vercel production build and matching/booking presentation tests passed. Browser checks verified instant Anil search, no-match/reset, show-more (6 to 9 verified profiles), Online showing Sahil’s online practice/fee, and Sankhalim plus in-person showing Meena’s corresponding practice. Contradictory practice filters correctly return no matches.

Live homepage checks returned 200, no images or provider name within the hero, exactly one tel:112 link, and the interactive controls. Authenticated live booking health returned 200 and healthy=true. Final production application commit: 4c7d000a8e9b032a284a4ec443dfef7281f9a400. Deployment: dpl_Ha9HUopHz5o6KQCEGP9spqXetbdd. The last responsive refinement makes doctor cards full width below 600px. Production database records and schema are unchanged.

Final live mobile check passed: the filtered result card filled its 437px results container, with document width 469px within the measured 488px viewport. The online card retained its matching practice, ₹1,200 published fee and direct booking link. Desktop hero screenshot is saved under docs/release-screenshots/homepage-no-portrait.jpg. Final live homepage and protected backend health both returned 200; the hero contained zero images and the page contained one emergency call link.
