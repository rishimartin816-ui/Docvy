# Mobile layout polish — 17 November 2026

User request: make the mobile view clearer and more organised, reduce the logo slightly, and fix layout/detail mistakes.

- Header logo: 138px on phones, 160px on small tablets, unchanged 180px desktop width. Responsive image sizes match. Mobile footer logo is 150px. Header spacing is tighter while navigation targets retain their size.
- Hero: readable headline/body/trust text and equally aligned booking actions. Existing approved consultation artwork is preserved.
- Search dock: full-width main query field, city and Find doctors together, then optional location action and its explanation. Controls use 16px text and 48px height. Popular searches are readable two-column links.
- Specialties: two columns on phones with complete names; long specialty labels are no longer squeezed into four narrow columns.
- Doctor explorer: vertically arranged mobile filters, 16px control text, clear counts and reset action. Doctor cards retain full-width layouts and align fees/booking actions with larger text and touch targets.
- Related page families: mobile public filters, private-link access, profiles and appointment forms receive consistent control sizes and improved reading order. Underlying authorisation and booking logic are unchanged.

TypeScript, ESLint, production build, discovery and booking-presentation regressions, desktop regression checks and narrow-screen browser verification are required for release. This change uses the existing feature-branch release process; no production database/schema changes or merge to main are included.
