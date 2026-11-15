-- DOCVY Phase 1 hybrid booking: REVIEW-ONLY migration.
-- Do not apply to production or staging before RLS, operator workflow and synthetic E2E tests.
-- Existing crm_slots/crm_bookings and directory request pipeline remain authoritative.

begin;

create table if not exists docvy_private.hybrid_booking_profiles (
  doctor_roster_id uuid primary key references public.crm_doctor_roster(id) on delete restrict,
  booking_mode text not null default 'disabled'
    check (booking_mode in ('disabled', 'approval', 'instant')),
  approval_window_minutes integer not null default 1440
    check (approval_window_minutes between 15 and 10080),
  timezone text not null default 'Asia/Kolkata',
  enabled_by uuid references auth.users(id),
  enabled_at timestamptz,
  updated_at timestamptz not null default now(),
  constraint hybrid_booking_profiles_activation_check
    check (booking_mode = 'disabled' or enabled_by is not null)
);

create table if not exists docvy_private.hybrid_booking_intents (
  id uuid primary key default gen_random_uuid(),
  request_id uuid unique references public.docvy_directory_requests(request_id) on delete restrict,
  doctor_roster_id uuid not null references public.crm_doctor_roster(id) on delete restrict,
  requested_slot_id uuid references public.crm_slots(id) on delete restrict,
  crm_booking_id uuid unique references public.crm_bookings(id) on delete restrict,
  idempotency_key uuid not null unique,
  mode text not null check (mode in ('approval', 'instant')),
  status text not null default 'requested'
    check (status in ('requested','confirmed','declined','expired','cancelled','completed_reported','disputed')),
  preferred_start_at timestamptz,
  preferred_end_at timestamptz,
  expires_at timestamptz,
  source text not null default 'docvy_web',
  consent_version text not null,
  requested_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint hybrid_booking_intents_slot_guard
    check (mode = 'approval' or requested_slot_id is not null),
  constraint hybrid_booking_intents_time_guard
    check (preferred_start_at is null or preferred_end_at > preferred_start_at),
  constraint hybrid_booking_intents_confirmation_guard
    check (status <> 'confirmed' or crm_booking_id is not null)
);

create index if not exists hybrid_booking_intents_doctor_status_idx
  on docvy_private.hybrid_booking_intents(doctor_roster_id,status,requested_at desc);

create table if not exists docvy_private.hybrid_booking_events (
  id bigint generated always as identity primary key,
  intent_id uuid not null references docvy_private.hybrid_booking_intents(id) on delete restrict,
  event_type text not null,
  actor_type text not null check (actor_type in ('patient','clinic','docvy','system')),
  actor_id uuid,
  occurred_at timestamptz not null default clock_timestamp(),
  -- No patient names, phone numbers, notes, or clinical data in event metadata.
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists hybrid_booking_events_intent_idx
  on docvy_private.hybrid_booking_events(intent_id,occurred_at);

-- Existing booking statuses do not include pending: pending stays only in hybrid_booking_intents.
-- Only one active booking per slot. Review legacy data before applying the index.
create unique index if not exists crm_bookings_one_active_booking_per_slot
  on public.crm_bookings(slot_id)
  where status in ('confirmed','completed','no_show');

-- Closed by default. Service-side writes must enforce trusted operator identity and clinic scope.
alter table docvy_private.hybrid_booking_profiles enable row level security;
alter table docvy_private.hybrid_booking_intents enable row level security;
alter table docvy_private.hybrid_booking_events enable row level security;

revoke all on docvy_private.hybrid_booking_profiles from public,anon,authenticated;
revoke all on docvy_private.hybrid_booking_intents from public,anon,authenticated;
revoke all on docvy_private.hybrid_booking_events from public,anon,authenticated;
revoke all on sequence docvy_private.hybrid_booking_events_id_seq from public,anon,authenticated;
grant select,insert,update on docvy_private.hybrid_booking_profiles to service_role;
grant select,insert,update on docvy_private.hybrid_booking_intents to service_role;
grant select,insert on docvy_private.hybrid_booking_events to service_role;
grant usage,select on sequence docvy_private.hybrid_booking_events_id_seq to service_role;

commit;

-- IMPORTANT integration requirements:
-- 1. Never expose the service_role token to the browser.
-- 2. Service-side actions MUST authenticate users and verify clinic-specific access.
-- 3. Treat crm_bookings as confirmed only after an atomic transaction.
-- 4. Add an authenticated booking transaction + tests before switching booking_mode on.
-- 5. Event log must be append-only at the application and DB permission layers.
-- 6. No patient PII in logs/metadata; avoid leaking existence of booking IDs.
