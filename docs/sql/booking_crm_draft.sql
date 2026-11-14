-- DOCVY booking CRM draft (NOT applied).
-- Review against the live schema and create a numbered migration with Supabase CLI.
-- Private data must be accessed through authenticated server handlers only.
create schema if not exists docvy_private;
revoke all on schema docvy_private from public, anon, authenticated;

create table if not exists public.provider_branch_affiliations (
  id uuid primary key default gen_random_uuid(),
  organisation_provider_id uuid not null references public.organisation_providers(id),
  branch_id uuid not null references public.branches(id),
  status text not null default 'pending'
    check (status in ('pending','verified','inactive')),
  created_at timestamptz not null default now(),
  unique (organisation_provider_id, branch_id)
);

create table if not exists public.appointment_slots (
  id uuid primary key default gen_random_uuid(),
  affiliation_id uuid not null references public.provider_branch_affiliations(id),
  start_at timestamptz not null,
  end_at timestamptz not null,
  capacity integer not null default 1 check (capacity between 1 and 100),
  status text not null default 'open'
    check (status in ('open','blocked')),
  block_reason text,
  updated_at timestamptz not null default now(),
  check (end_at > start_at),
  unique (affiliation_id,start_at,end_at)
);
create index if not exists appointment_slots_open_start_idx
  on public.appointment_slots(start_at,affiliation_id) where status='open';

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references public.appointment_slots(id),
  patient_name text not null check (length(btrim(patient_name)) between 2 and 140),
  patient_phone text not null,
  patient_email text,
  status text not null default 'confirmed'
    check (status in ('requested','confirmed','completed','cancelled','declined','no_show')),
  idempotency_key uuid not null unique,
  is_synthetic_test boolean not null default false,
  source_channel text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists appointments_slot_active_idx on public.appointments(slot_id)
  where status in ('requested','confirmed');

create table if not exists public.appointment_events (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.appointments(id),
  event_type text not null,
  actor_user_id uuid,
  event_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists appointment_events_appointment_time_idx
  on public.appointment_events(appointment_id,created_at desc);

create table if not exists public.notification_outbox (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references public.appointments(id),
  event_key text not null unique,
  channel text not null check (channel in ('email','sms','whatsapp')),
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending'
    check (status in ('pending','processing','sent','failed','dead_letter')),
  attempts integer not null default 0 check (attempts >= 0),
  next_attempt_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Defense in depth. No direct browser access to patient information.
alter table public.provider_branch_affiliations enable row level security;
alter table public.appointment_slots enable row level security;
alter table public.appointments enable row level security;
alter table public.appointment_events enable row level security;
alter table public.notification_outbox enable row level security;
revoke all on public.appointments, public.appointment_events,
  public.notification_outbox from anon, authenticated;
revoke all on public.appointment_slots,
  public.provider_branch_affiliations from anon, authenticated;

-- No direct execution permissions for browser clients.
-- A server route must authenticate / authorize organization and branch access
-- before invoking these service-role-only functions.
create or replace function docvy_private.reserve_slot(
  p_slot_id uuid, p_patient_name text, p_phone text,
  p_email text, p_idempotency_key uuid, p_is_test boolean default false
) returns uuid
language plpgsql security invoker
set search_path = ''
as $$
declare
  v_slot public.appointment_slots%rowtype;
  v_count integer;
  v_existing uuid;
  v_appointment uuid;
begin
  select id into v_existing
  from public.appointments
  where idempotency_key = p_idempotency_key;
  if found then
    return v_existing;
  end if;

  select * into v_slot from public.appointment_slots
  where id = p_slot_id for update;
  if not found then raise exception 'Unknown slot'; end if;
  if v_slot.status <> 'open' then raise exception 'Slot unavailable'; end if;
  if v_slot.start_at <= now() then raise exception 'Slot has passed'; end if;

  select count(*) into v_count from public.appointments
  where slot_id=p_slot_id and status in ('requested','confirmed');
  if v_count >= v_slot.capacity then raise exception 'Slot full'; end if;

  insert into public.appointments
    (slot_id,patient_name,patient_phone,patient_email,idempotency_key,is_synthetic_test)
  values
    (p_slot_id,p_patient_name,p_phone,p_email,p_idempotency_key,p_is_test)
  on conflict (idempotency_key) do nothing
  returning id into v_appointment;
  if v_appointment is null then
    select id into v_appointment from public.appointments
    where idempotency_key=p_idempotency_key;
  else
    insert into public.appointment_events(appointment_id,event_type)
    values(v_appointment,'appointment_confirmed');
    insert into public.notification_outbox(appointment_id,event_key,channel,payload)
    values(v_appointment,'appointment:'||v_appointment::text||':confirmation','email','{}'::jsonb);
  end if;
  return v_appointment;
end $$;

create or replace function docvy_private.set_slot_block(
  p_slot_id uuid, p_blocked boolean, p_reason text default null
) returns void
language plpgsql security invoker
set search_path = ''
as $$
declare
  v_count integer;
begin
  -- Update row lock serializes this operation with reserve_slot.
  perform 1 from public.appointment_slots where id=p_slot_id for update;
  if not found then raise exception 'Unknown slot'; end if;

  if p_blocked then
    select count(*) into v_count from public.appointments
    where slot_id=p_slot_id and status in ('requested','confirmed');
    if v_count > 0 then
      raise exception 'Existing appointments must be rescheduled/cancelled first';
    end if;
  end if;

  update public.appointment_slots
  set status=case when p_blocked then 'blocked' else 'open' end,
      block_reason=case when p_blocked then p_reason else null end,
      updated_at=now()
  where id=p_slot_id;
end $$;

revoke all on function docvy_private.reserve_slot(uuid,text,text,text,uuid,boolean) from public,anon,authenticated;
revoke all on function docvy_private.set_slot_block(uuid,boolean,text) from public,anon,authenticated;
grant usage on schema docvy_private to service_role;
grant execute on function docvy_private.reserve_slot(uuid,text,text,text,uuid,boolean) to service_role;
grant execute on function docvy_private.set_slot_block(uuid,boolean,text) to service_role;

-- Before production: test permissions, staff authorization, audit changes,
-- schema exposure, retry semantics, cross-branch integrity, overlaps,
-- patient privacy and role grants. DO NOT run directly in production.
