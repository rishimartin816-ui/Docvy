# Patient experience release — 16 November 2026

## Delivered

- Replaced the basic homepage with responsive patient discovery: real verified doctor cards, published practice fees, qualifications/experience, specialty entry points, actual practice-city counts, educational guides and booking FAQs.
- Doctor profiles now include professional details, practice addresses/hours/fees, preparation guidance, FAQs and an embedded doctor-scoped booking panel.
- Booking now has three steps: doctor/practice, preferred date/time, patient contact/consent. The selected practice and consultation fee remain visible. Back navigation preserves entered details.
- Preferred times use existing owner-approved recurring rules, intersected with published practice hours. Online and unconfigured providers use a manual preferred-time request. Times never claim confirmed inventory.
- Public provider responses whitelist presentation fields and reject unpublished/unverified/unconsented profiles. Homepage eligibility uses one request-scoped batched query, not one query per card.
- Root social descriptions now include discovery and appointment coordination. Canonicals and existing indexing controls remain intact.

## Boundaries

This builds on the operational booking branch, not main. It reuses the existing atomic booking service, private receipt, founder workflow, attendance verification and notification outbox. No new database migration, patient-data export, clinic CRM access or production release is part of this change.

Public star ratings/reviews, payments, video calls and instant provider-managed live inventory are not implemented by this release. No fake ratings, reviews, patient counts or unavailable inventory are shown. Newly activated doctors require owner-approved recurring rules before they receive a suggested time grid; they can still receive manually selected preferred-time requests.

## Verification

- TypeScript and ESLint passed.
- Optimized local production build passed: 2,455 generated pages.
- Existing booking API, email and patient-auth regression scripts passed with mocked transport.
- New presentation tests passed: IST rollover, future-time bounds, approved schedule/published-hour intersection, Meena practice windows, no Sunday/unknown/online invented suggestions, location fee precedence and private-field exclusion.
- Desktop and mobile browser checks completed; native forms, labeled controls, keyboard-focus states and reduced-motion support retained.
- Hosted staging provider API: 8 activated doctors / 11 practice choices at verification time.
- Staging API smoke: submit 201 requested; repeat 201 same reference; private view 200; missing receipt 401; cancellation 200. Synthetic reference DV-4A10B916925D4A36 was cancelled. Staging notifications are isolated to the founder test recipient.
- Browser testing found and fixed Continue-to-submit DOM reuse, so proceeding to contact details cannot accidentally become the final submission action.

## Production review

Review the hosted preview and verify the final deployed commit. Merge/release approval remains separate. Keep Preview pointed at staging, clinic access disabled and production secrets out of Preview. After approval, release the same reviewed commit and verify the www.docvy.in alias, canonical origin, live provider choices, request/confirmation wording and notification delivery. The production booking backend is unchanged by this UI release.
