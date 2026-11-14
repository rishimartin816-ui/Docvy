# Live doctor CRM integration — 13 November 2026

The production directory currently has one approved doctor with three practice locations. The existing CRM had no linked roster doctor and used a globally unique provider link. This release makes that link unique per clinic and checks every link against the approved primary or additional practice.

The DOCVY owner can use **Connect a live doctor** in `/crm/admin` to connect all approved practices in one transaction. It reuses matching clinics and roster records, requires explicit setup authority, and leaves public instant booking disabled. It creates no slots, clinic staff accounts, patient records or verification claims. After setup, the owner must add confirmed availability and invite authorised staff using their own work emails.

Website requests remain scoped to both the requested clinic name and city. A pending-request alert opens the clinic inbox. Cross-clinic availability for the same linked doctor cannot overlap, including when a roster record is linked after slots already exist.

## Verification

- TypeScript and targeted ESLint passed.
- `scripts/verify-crm-multiclinic.sql` passed on production inside a rolled-back transaction: three-practice setup, repeated setup, secondary-practice linking, per-clinic request isolation, overlapping-slot rejection, adjacent slots, authority requirement, staff restrictions and revoked consent.
- `scripts/verify-crm-production.sql` passed inside a rolled-back transaction: patient scope, booking lifecycle, payment/refund limits, consent, rescheduling, disabled staff, expired sessions and existing-owner protection.
- Browser-only authenticated fixtures passed at 390px and 1440px for all six workspace tabs, onboarding submission, required authority, viewer restrictions and request alerts. These fixtures did not authenticate a real owner or write production data.
- Production database inspection confirmed no test users or provider records remained after verification.
- Supabase advisors reported no new publicly callable onboarding helper. Existing project advisories remain; this is not a whole-project security certification.

## Activation still required

The existing owner's password was not accessed or reset. No real practice was connected during verification. Sign in as the DOCVY owner and connect the approved doctor. A doctor's confirmed work email is needed before recording their staff invitation. Invitation emails remain a separate pending integration; the existing UI states that the workspace link must be shared manually.
