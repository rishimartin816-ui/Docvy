-- DOCVY identity data: defense-in-depth row-level security.
-- Tables remain private with no API grants or policies. Trusted owner functions
-- are introduced separately and must receive explicit authorization review.

BEGIN;

ALTER TABLE identity.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity.password_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity.verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity.password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity.auth_events ENABLE ROW LEVEL SECURITY;

COMMIT;
