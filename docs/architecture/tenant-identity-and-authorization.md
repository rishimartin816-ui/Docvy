# Superseded: DOCVY Tenant Identity and Authorization

**Status:** Superseded on 2026-11-01 by `custom-authentication.md`.

This earlier proposal assumed Supabase Auth (`auth.users`, `auth.uid()`, and the Supabase `authenticated` role). DOCVY has since approved custom-built authentication on standalone PostgreSQL 17. Those Supabase-specific assumptions must not be implemented.

Use the current design instead:

- `docs/architecture/custom-authentication.md`
- `database/migrations/0002_custom_identity_schema.sql`

The existing `0001_platform_foundation.sql` migration remains the local foundation and is not rewritten. The new identity migration is prepared for review only; it has not been applied. No production or cloud database is in scope.

The existing tenant principles remain valid: one identity may join multiple organisations; role grants are tied to memberships and optional branch scope; composite foreign keys prevent cross-organisation branch references; RLS is the final tenant boundary; patient/clinical data is a separately restricted domain; and the legacy documentation-request workflow remains isolated.

Do not apply Supabase migration tooling or create `auth.uid()` compatibility shims in the standalone PostgreSQL database.
