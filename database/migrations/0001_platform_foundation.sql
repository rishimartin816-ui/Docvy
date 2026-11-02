-- DOCVY platform foundation
-- Target: PostgreSQL 17+
-- Use only in non-production development/staging databases.
-- It is intentionally additive and contains no patient or clinical tables.
-- RLS is enabled without policies: the non-owner application role is denied
-- until separately reviewed identity and authorization policies are implemented.

BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'docvy_app') THEN
    CREATE ROLE docvy_app
      NOLOGIN
      NOSUPERUSER
      NOCREATEDB
      NOCREATEROLE
      NOBYPASSRLS;
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY,
  display_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE profiles IS
  'Minimal platform profile. id is the UUID supplied by the trusted identity provider; no auth provider FK is assumed in this standalone PostgreSQL scaffold.';

CREATE TABLE IF NOT EXISTS organisations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(trim(name)) > 0),
  slug text NOT NULL UNIQUE CHECK (slug = lower(slug)),
  organisation_type text NOT NULL CHECK (
    organisation_type IN ('doctor_practice', 'clinic', 'hospital')
  ),
  status text NOT NULL DEFAULT 'active' CHECK (
    status IN ('active', 'suspended', 'archived')
  ),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE RESTRICT,
  name text NOT NULL CHECK (length(trim(name)) > 0),
  slug text NOT NULL CHECK (slug = lower(slug)),
  status text NOT NULL DEFAULT 'active' CHECK (
    status IN ('active', 'inactive', 'archived')
  ),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT branches_organisation_id_id_unique UNIQUE (organisation_id, id),
  CONSTRAINT branches_organisation_slug_unique UNIQUE (organisation_id, slug)
);

CREATE TABLE IF NOT EXISTS organisation_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE RESTRICT,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'invited' CHECK (
    status IN ('invited', 'active', 'suspended', 'removed')
  ),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT organisation_memberships_organisation_user_unique
    UNIQUE (organisation_id, user_id),
  CONSTRAINT organisation_memberships_organisation_id_id_unique
    UNIQUE (organisation_id, id)
);

CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_key text NOT NULL UNIQUE,
  display_name text NOT NULL,
  scope_type text NOT NULL CHECK (
    scope_type IN ('organisation', 'branch', 'both')
  ),
  is_system_role boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  permission_key text NOT NULL UNIQUE,
  description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
  permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS membership_role_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL,
  membership_id uuid NOT NULL,
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
  -- NULL means organisation-wide; non-NULL means branch-scoped.
  branch_id uuid,
  granted_by uuid REFERENCES profiles(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT membership_role_grants_membership_fk
    FOREIGN KEY (organisation_id, membership_id)
    REFERENCES organisation_memberships (organisation_id, id)
    ON DELETE RESTRICT,
  CONSTRAINT membership_role_grants_branch_fk
    FOREIGN KEY (organisation_id, branch_id)
    REFERENCES branches (organisation_id, id)
    ON DELETE RESTRICT
);

CREATE UNIQUE INDEX IF NOT EXISTS membership_role_grants_org_wide_unique
  ON membership_role_grants (organisation_id, membership_id, role_id)
  WHERE branch_id IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS membership_role_grants_branch_unique
  ON membership_role_grants (organisation_id, membership_id, role_id, branch_id)
  WHERE branch_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS provider_public_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE RESTRICT,
  public_display_name text NOT NULL CHECK (length(trim(public_display_name)) > 0),
  primary_specialty text,
  biography text,
  publication_status text NOT NULL DEFAULT 'draft' CHECK (
    publication_status IN ('draft', 'published', 'suspended')
  ),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS organisation_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE RESTRICT,
  provider_public_profile_id uuid NOT NULL
    REFERENCES provider_public_profiles(id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'active', 'inactive', 'ended')
  ),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT organisation_providers_unique
    UNIQUE (organisation_id, provider_public_profile_id)
);

CREATE TABLE IF NOT EXISTS audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid REFERENCES organisations(id) ON DELETE RESTRICT,
  actor_user_id uuid REFERENCES profiles(id) ON DELETE RESTRICT,
  actor_type text NOT NULL CHECK (actor_type IN ('user', 'system')),
  event_type text NOT NULL CHECK (length(trim(event_type)) > 0),
  target_type text,
  target_id uuid,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE audit_events IS
  'Append-only security and administrative events. Do not put patient identifiers, clinical content, credentials, or secrets in metadata.';

CREATE INDEX IF NOT EXISTS organisation_memberships_user_status_idx
  ON organisation_memberships (user_id, status);
CREATE INDEX IF NOT EXISTS organisation_memberships_org_status_idx
  ON organisation_memberships (organisation_id, status);
CREATE INDEX IF NOT EXISTS branches_org_status_idx
  ON branches (organisation_id, status);
CREATE INDEX IF NOT EXISTS membership_role_grants_scope_idx
  ON membership_role_grants (organisation_id, membership_id, branch_id);
CREATE INDEX IF NOT EXISTS role_permissions_permission_idx
  ON role_permissions (permission_id);
CREATE INDEX IF NOT EXISTS organisation_providers_org_status_idx
  ON organisation_providers (organisation_id, status);
CREATE INDEX IF NOT EXISTS organisation_providers_profile_idx
  ON organisation_providers (provider_public_profile_id);
CREATE INDEX IF NOT EXISTS audit_events_org_created_idx
  ON audit_events (organisation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS audit_events_actor_created_idx
  ON audit_events (actor_user_id, created_at DESC);

-- Fail closed for non-owner roles. No policies are added in this first migration.
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE organisation_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_role_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_public_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organisation_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO docvy_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON
  profiles,
  organisations,
  branches,
  organisation_memberships,
  roles,
  permissions,
  role_permissions,
  membership_role_grants,
  provider_public_profiles,
  organisation_providers
TO docvy_app;
GRANT SELECT, INSERT ON audit_events TO docvy_app;

COMMIT;
