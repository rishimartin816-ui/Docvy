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
