-- DOCVY custom identity foundation
-- Target: PostgreSQL 17
-- Status: prepared for review; NOT applied to any database.
-- Apply only after review, to the intended local development database.
-- This migration creates identity storage and non-login privilege roles.
-- Authentication functions, application grants, profile linkage and RLS
-- policies are separate migrations and are intentionally not included here.

BEGIN;

-- Privilege boundaries. Neither role is a database login.
CREATE ROLE docvy_auth_fn
  NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS;

CREATE ROLE docvy_auth_runtime
  NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOBYPASSRLS;

COMMENT ON ROLE docvy_auth_fn IS
  'Owns DOCVY identity tables and narrowly scoped SECURITY DEFINER authentication functions; never used as a login.';
COMMENT ON ROLE docvy_auth_runtime IS
  'Group role for authentication runtime connections; receives EXECUTE on approved functions only in a later migration.';

CREATE SCHEMA identity AUTHORIZATION docvy_auth_fn;
CREATE SCHEMA docvy_private AUTHORIZATION docvy_auth_fn;

REVOKE ALL ON SCHEMA identity FROM PUBLIC;
REVOKE ALL ON SCHEMA docvy_private FROM PUBLIC;

COMMENT ON SCHEMA identity IS
  'Private DOCVY identity and authentication data. No direct application table access.';
COMMENT ON SCHEMA docvy_private IS
  'Non-exposed DOCVY authorization helpers and narrowly scoped privileged functions.';

-- Email addresses are normalized by the application before insertion.
-- A unique lower-case index remains the final duplicate-account safeguard.
CREATE TABLE identity.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending_verification'
    CHECK (status IN ('pending_verification', 'active', 'suspended', 'disabled')),
  email_verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT identity_users_email_normalized_check
    CHECK (email = lower(btrim(email)) AND length(email) BETWEEN 3 AND 254),
  CONSTRAINT identity_users_active_requires_verified_email_check
    CHECK (status <> 'active' OR email_verified_at IS NOT NULL)
);

CREATE UNIQUE INDEX identity_users_email_lower_unique
  ON identity.users (lower(email));

CREATE TABLE identity.password_credentials (
  user_id uuid PRIMARY KEY
    REFERENCES identity.users(id) ON DELETE RESTRICT,
  password_hash text NOT NULL
    CHECK (password_hash LIKE '$argon2id$%'),
  password_changed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE identity.sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL
    REFERENCES identity.users(id) ON DELETE RESTRICT,
  token_hash bytea NOT NULL UNIQUE
    CHECK (octet_length(token_hash) = 32),
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz,
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  revoke_reason text,
  CONSTRAINT identity_sessions_expiry_check
    CHECK (expires_at > created_at),
  CONSTRAINT identity_sessions_last_seen_check
    CHECK (last_seen_at IS NULL OR last_seen_at >= created_at),
  CONSTRAINT identity_sessions_revocation_check
    CHECK (revoked_at IS NULL OR revoked_at >= created_at)
);

CREATE INDEX identity_sessions_user_expiry_idx
  ON identity.sessions (user_id, expires_at DESC)
  WHERE revoked_at IS NULL;

CREATE TABLE identity.verification_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL
    REFERENCES identity.users(id) ON DELETE RESTRICT,
  token_hash bytea NOT NULL UNIQUE
    CHECK (octet_length(token_hash) = 32),
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  CONSTRAINT identity_verification_expiry_check
    CHECK (expires_at > created_at),
  CONSTRAINT identity_verification_consumed_check
    CHECK (consumed_at IS NULL OR consumed_at >= created_at)
);

CREATE INDEX identity_verification_user_expiry_idx
  ON identity.verification_tokens (user_id, expires_at)
  WHERE consumed_at IS NULL;

CREATE TABLE identity.password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL
    REFERENCES identity.users(id) ON DELETE RESTRICT,
  token_hash bytea NOT NULL UNIQUE
    CHECK (octet_length(token_hash) = 32),
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  consumed_at timestamptz,
  CONSTRAINT identity_password_reset_expiry_check
    CHECK (expires_at > created_at),
  CONSTRAINT identity_password_reset_consumed_check
    CHECK (consumed_at IS NULL OR consumed_at >= created_at)
);

CREATE INDEX identity_password_reset_user_expiry_idx
  ON identity.password_reset_tokens (user_id, expires_at)
  WHERE consumed_at IS NULL;

CREATE TABLE identity.auth_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid
    REFERENCES identity.users(id) ON DELETE SET NULL,
  event_type text NOT NULL
    CHECK (length(btrim(event_type)) BETWEEN 1 AND 100),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  request_id uuid,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(metadata) = 'object')
);

CREATE INDEX identity_auth_events_user_time_idx
  ON identity.auth_events (user_id, occurred_at DESC);

CREATE INDEX identity_auth_events_type_time_idx
  ON identity.auth_events (event_type, occurred_at DESC);

-- The function-owner role owns the private schema and identity tables.
ALTER TABLE identity.users OWNER TO docvy_auth_fn;
ALTER TABLE identity.password_credentials OWNER TO docvy_auth_fn;
ALTER TABLE identity.sessions OWNER TO docvy_auth_fn;
ALTER TABLE identity.verification_tokens OWNER TO docvy_auth_fn;
ALTER TABLE identity.password_reset_tokens OWNER TO docvy_auth_fn;
ALTER TABLE identity.auth_events OWNER TO docvy_auth_fn;

REVOKE ALL ON ALL TABLES IN SCHEMA identity FROM PUBLIC;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA identity FROM PUBLIC;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA identity FROM PUBLIC;

-- Future objects created as docvy_auth_fn must not become PUBLIC by default.
ALTER DEFAULT PRIVILEGES FOR ROLE docvy_auth_fn IN SCHEMA identity
  REVOKE ALL ON TABLES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE docvy_auth_fn IN SCHEMA identity
  REVOKE ALL ON SEQUENCES FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE docvy_auth_fn IN SCHEMA identity
  REVOKE ALL ON FUNCTIONS FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE docvy_auth_fn IN SCHEMA docvy_private
  REVOKE ALL ON FUNCTIONS FROM PUBLIC;

COMMENT ON TABLE identity.users IS
  'DOCVY login identity. Email is normalized and unique case-insensitively. Account state is authoritative in PostgreSQL.';
COMMENT ON TABLE identity.password_credentials IS
  'Argon2id password hashes only. Never store plaintext passwords or reversible password encryption.';
COMMENT ON TABLE identity.sessions IS
  'Opaque server-side sessions. token_hash stores SHA-256 of a cryptographically random bearer token; raw tokens are never stored.';
COMMENT ON TABLE identity.verification_tokens IS
  'Single-use email verification token hashes. Raw tokens are delivered to the user and never persisted.';
COMMENT ON TABLE identity.password_reset_tokens IS
  'Single-use password recovery token hashes. Raw tokens are delivered to the user and never persisted.';
COMMENT ON TABLE identity.auth_events IS
  'Security events only. Do not store passwords, tokens, full IP addresses, patient identifiers or clinical content in metadata.';

COMMIT;
