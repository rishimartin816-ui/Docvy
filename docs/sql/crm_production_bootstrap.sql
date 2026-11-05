-- Production CRM bootstrap. Requires public.branches and Supabase Auth.
-- This snapshot installs the CRM schema without clinic, account, slot or patient data.
-- Keep live activation and verified clinic onboarding separate from this migration.

begin;

-- Apply only to an isolated Supabase instance.

create table public.crm_slots (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz not null check (ends_at > starts_at),
  blocked boolean not null default false,
  exclude using gist (tstzrange(starts_at, ends_at) with &&)
);
create table public.crm_staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('scheduler', 'viewer'))
);
create table public.crm_bookings (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null unique references public.crm_slots(id),
  request_key uuid not null unique,
  created_at timestamptz not null default now()
);
alter table public.crm_slots enable row level security;
alter table public.crm_staff enable row level security;
alter table public.crm_bookings enable row level security;
revoke all on public.crm_slots, public.crm_staff, public.crm_bookings from public, anon, authenticated;
grant select, update on public.crm_slots to service_role;
grant select on public.crm_staff to service_role;
grant select, insert on public.crm_bookings to service_role;

create function public.crm_reserve(slot uuid, request_id uuid) returns uuid
language plpgsql security invoker set search_path = '' as $$
declare
  existing public.crm_bookings;
  selected public.crm_slots;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(request_id::text, 0));
  select * into existing from public.crm_bookings where request_key = request_id;
  if found then
    if existing.slot_id <> slot then raise exception using errcode = 'PT409', message = 'Booking key already used'; end if;
    return existing.id;
  end if;
  select * into selected from public.crm_slots where id = slot for update;
  if not found or selected.blocked or selected.starts_at <= clock_timestamp() or
    exists (select 1 from public.crm_bookings where slot_id = slot) then
    raise exception using errcode = 'PT409', message = 'Slot unavailable';
  end if;
  insert into public.crm_bookings(slot_id, request_key) values (slot, request_id) returning * into existing;
  return existing.id;
end;
$$;

create function public.crm_set_block(actor uuid, slot uuid, desired boolean) returns void
language plpgsql security invoker set search_path = '' as $$
begin
  if not exists (select 1 from public.crm_staff where user_id = actor and role = 'scheduler') then
    raise exception using errcode = 'PT403', message = 'Scheduler access required';
  end if;
  perform 1 from public.crm_slots where id = slot and starts_at > clock_timestamp() for update;
  if not found or exists (select 1 from public.crm_bookings where slot_id = slot) then
    raise exception using errcode = 'PT409', message = 'Slot cannot be changed';
  end if;
  update public.crm_slots set blocked = desired where id = slot;
end;
$$;

create view public.crm_calendar with (security_invoker = true) as
select s.id, s.starts_at, s.ends_at, s.blocked, b.id as booking_id
from public.crm_slots s left join public.crm_bookings b on b.slot_id = s.id;
revoke all on public.crm_calendar from public, anon, authenticated;
grant select on public.crm_calendar to service_role;
revoke all on function public.crm_reserve(uuid, uuid), public.crm_set_block(uuid, uuid, boolean) from public, anon, authenticated;
grant execute on function public.crm_reserve(uuid, uuid), public.crm_set_block(uuid, uuid, boolean) to service_role;

-- Upgrade the isolated CRM schema to scope staff and calendar access by clinic.

create table public.crm_clinics (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null unique references public.branches(id),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  booking_enabled boolean not null default false
);
alter table public.crm_clinics enable row level security;
revoke all on public.crm_clinics from public, anon, authenticated;
grant select on public.crm_clinics to service_role;
grant update (role) on public.crm_staff to service_role;

alter table public.crm_slots add column clinic_id uuid references public.crm_clinics(id);
alter table public.crm_staff add column clinic_id uuid references public.crm_clinics(id);
alter table public.crm_slots alter column clinic_id set not null;
alter table public.crm_staff alter column clinic_id set not null;
alter table public.crm_staff drop constraint crm_staff_pkey, add primary key (user_id, clinic_id);
create index crm_slots_clinic_start on public.crm_slots(clinic_id, starts_at);

create or replace view public.crm_calendar with (security_invoker = true) as
select s.id, s.starts_at, s.ends_at, s.blocked, b.id as booking_id, s.clinic_id
from public.crm_slots s left join public.crm_bookings b on b.slot_id = s.id;

-- Scope the existing staging RPC explicitly. Replace the old callable signature.
drop function public.crm_set_block(uuid, uuid, boolean);
create function public.crm_set_block(actor uuid, clinic uuid, slot uuid, desired boolean) returns void
language plpgsql security invoker set search_path = '' as $$
begin
  perform 1 from public.crm_staff
    where user_id = actor and clinic_id = clinic and role = 'scheduler' for share;
  if not found then
    raise exception using errcode = 'PT403', message = 'Scheduler access required';
  end if;
  perform 1 from public.crm_slots
    where id = slot and clinic_id = clinic and starts_at > clock_timestamp() for update;
  if not found or exists (select 1 from public.crm_bookings where slot_id = slot) then
    raise exception using errcode = 'PT409', message = 'Slot cannot be changed';
  end if;
  update public.crm_slots set blocked = desired where id = slot and clinic_id = clinic;
end;
$$;
revoke all on function public.crm_set_block(uuid, uuid, uuid, boolean) from public, anon, authenticated;
grant execute on function public.crm_set_block(uuid, uuid, uuid, boolean) to service_role;
drop function public.crm_reserve(uuid, uuid);
create function public.crm_reserve(clinic uuid, slot uuid, request_id uuid) returns uuid
language plpgsql security invoker set search_path = '' as $$
declare
  existing public.crm_bookings;
  selected public.crm_slots;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(request_id::text, 0));
  select * into existing from public.crm_bookings where request_key = request_id;
  if found then
    if existing.slot_id <> slot or not exists (select 1 from public.crm_slots where id = slot and clinic_id = clinic) then raise exception using errcode = 'PT409', message = 'Booking key already used'; end if;
    return existing.id;
  end if;
  select * into selected from public.crm_slots where id = slot and clinic_id = clinic for update;
  if not found or selected.blocked or not exists (select 1 from public.crm_clinics where id = clinic and booking_enabled) or selected.starts_at <= clock_timestamp() or
    exists (select 1 from public.crm_bookings where slot_id = slot) then
    raise exception using errcode = 'PT409', message = 'Slot unavailable';
  end if;
  insert into public.crm_bookings(slot_id, request_key) values (slot, request_id) returning * into existing;
  return existing.id;
end;
$$;
revoke all on function public.crm_reserve(uuid, uuid, uuid) from public, anon, authenticated;
grant execute on function public.crm_reserve(uuid, uuid, uuid) to service_role;

-- Apply after crm_clinic_scope.sql in the isolated CRM environment.

alter table public.crm_staff drop constraint crm_staff_role_check;
alter table public.crm_staff add constraint crm_staff_role_check
  check (role in ('owner', 'clinic_admin', 'manager', 'doctor', 'receptionist', 'viewer', 'scheduler'));
create or replace function public.crm_set_block(actor uuid, clinic uuid, slot uuid, desired boolean) returns void
language plpgsql security invoker set search_path = '' as $$
begin
  perform 1 from public.crm_staff
    where user_id = actor and clinic_id = clinic
      and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler') for share;
  if not found then
    raise exception using errcode = 'PT403', message = 'Scheduling access required';
  end if;
  perform 1 from public.crm_slots
    where id = slot and clinic_id = clinic and starts_at > clock_timestamp() for update;
  if not found or exists (select 1 from public.crm_bookings where slot_id = slot) then
    raise exception using errcode = 'PT409', message = 'Slot cannot be changed';
  end if;
  update public.crm_slots set blocked = desired where id = slot and clinic_id = clinic;
end;
$$;

-- Apply after crm_staff_roles.sql in the isolated CRM environment.

alter table public.crm_bookings
  add column status text not null default 'confirmed'
  check (status in ('confirmed', 'completed', 'cancelled', 'no_show'));

alter table public.crm_bookings drop constraint crm_bookings_slot_id_key;
create unique index crm_bookings_occupied_slot on public.crm_bookings(slot_id)
  where status <> 'cancelled';

create table public.crm_booking_events (
  booking_id uuid not null references public.crm_bookings(id),
  actor_id uuid not null,
  status text not null check (status in ('completed', 'cancelled', 'no_show')),
  created_at timestamptz not null default now(),
  primary key (booking_id, status)
);
alter table public.crm_booking_events enable row level security;
revoke all on public.crm_booking_events from public, anon, authenticated;
grant insert on public.crm_booking_events to service_role;
grant update (status) on public.crm_bookings to service_role;

create or replace view public.crm_calendar with (security_invoker = true) as
select s.id, s.starts_at, s.ends_at, s.blocked, b.id as booking_id, s.clinic_id,
       b.status as booking_status
from public.crm_slots s
left join public.crm_bookings b on b.slot_id = s.id and b.status <> 'cancelled';

create function public.crm_transition_booking(actor uuid, clinic uuid, booking uuid, desired text)
returns void language plpgsql security invoker set search_path = '' as $$
declare
  current_status text;
  slot_start timestamptz;
begin
  perform 1 from public.crm_staff
    where user_id = actor and clinic_id = clinic
      and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler') for share;
  if not found then
    raise exception using errcode = 'PT403', message = 'Scheduling access required';
  end if;
  if desired is null or desired not in ('completed', 'cancelled', 'no_show') then
    raise exception using errcode = 'PT400', message = 'Invalid booking status';
  end if;
  select b.status, s.starts_at into current_status, slot_start
    from public.crm_bookings b join public.crm_slots s on s.id = b.slot_id
    where b.id = booking and s.clinic_id = clinic for update of s, b;
  if not found or (current_status <> 'confirmed' and current_status <> desired) then
    raise exception using errcode = 'PT409', message = 'Booking cannot be changed';
  end if;
  if current_status = desired then return; end if;
  if desired in ('completed', 'no_show') and slot_start > clock_timestamp() then
    raise exception using errcode = 'PT409', message = 'Appointment has not started';
  end if;
  update public.crm_bookings set status = desired where id = booking;
  insert into public.crm_booking_events(booking_id, actor_id, status)
    values (booking, actor, desired);
end;
$$;
revoke all on function public.crm_transition_booking(uuid, uuid, uuid, text) from public, anon, authenticated;
grant execute on function public.crm_transition_booking(uuid, uuid, uuid, text) to service_role;

create or replace function public.crm_reserve(clinic uuid, slot uuid, request_id uuid) returns uuid
language plpgsql security invoker set search_path = '' as $$
declare
  existing public.crm_bookings;
  selected public.crm_slots;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(request_id::text, 0));
  select * into existing from public.crm_bookings where request_key = request_id;
  if found then
    if existing.slot_id <> slot or not exists (select 1 from public.crm_slots where id = slot and clinic_id = clinic) then raise exception using errcode = 'PT409', message = 'Booking key already used'; end if;
    return existing.id;
  end if;
  select * into selected from public.crm_slots where id = slot and clinic_id = clinic for update;
  if not found or selected.blocked or not exists (select 1 from public.crm_clinics where id = clinic and booking_enabled) or selected.starts_at <= clock_timestamp() or
    exists (select 1 from public.crm_bookings where slot_id = slot and status <> 'cancelled') then
    raise exception using errcode = 'PT409', message = 'Slot unavailable';
  end if;
  insert into public.crm_bookings(slot_id, request_key) values (slot, request_id) returning * into existing;
  return existing.id;
end;
$$;

create or replace function public.crm_set_block(actor uuid, clinic uuid, slot uuid, desired boolean) returns void
language plpgsql security invoker set search_path = '' as $$
begin
  perform 1 from public.crm_staff
    where user_id = actor and clinic_id = clinic
      and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler') for share;
  if not found then
    raise exception using errcode = 'PT403', message = 'Scheduling access required';
  end if;
  perform 1 from public.crm_slots
    where id = slot and clinic_id = clinic and starts_at > clock_timestamp() for update;
  if not found or exists (select 1 from public.crm_bookings where slot_id = slot and status <> 'cancelled') then
    raise exception using errcode = 'PT409', message = 'Slot cannot be changed';
  end if;
  update public.crm_slots set blocked = desired where id = slot and clinic_id = clinic;
end;
$$;

-- Apply after crm_booking_lifecycle.sql in isolated staging.

alter table public.crm_bookings add column original_slot_id uuid references public.crm_slots(id);
update public.crm_bookings set original_slot_id = slot_id;
alter table public.crm_bookings alter column original_slot_id set not null;
grant update (slot_id) on public.crm_bookings to service_role;

create table public.crm_reschedule_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.crm_bookings(id),
  actor_id uuid not null,
  from_slot_id uuid not null references public.crm_slots(id),
  to_slot_id uuid not null references public.crm_slots(id),
  created_at timestamptz not null default now()
);
alter table public.crm_reschedule_events enable row level security;
revoke all on public.crm_reschedule_events from public, anon, authenticated;
grant insert on public.crm_reschedule_events to service_role;

create function public.crm_reschedule_booking(actor uuid, clinic uuid, booking uuid, source uuid, destination uuid)
returns void language plpgsql security invoker set search_path = '' as $$
declare
  current_slot uuid;
  current_status text;
  current_start timestamptz;
begin
  perform 1 from public.crm_staff
    where user_id = actor and clinic_id = clinic
      and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler') for share;
  if not found then
    raise exception using errcode = 'PT403', message = 'Scheduling access required';
  end if;

  select b.slot_id, b.status, s.starts_at into current_slot, current_status, current_start
    from public.crm_bookings b join public.crm_slots s on s.id = b.slot_id
    where b.id = booking and s.clinic_id = clinic for update of b;
  if not found or current_status <> 'confirmed' or current_start <= clock_timestamp() then
    raise exception using errcode = 'PT409', message = 'Booking cannot be moved';
  end if;
  if current_slot = destination then return; end if;
  if current_slot is distinct from source then
    raise exception using errcode = 'PT409', message = 'Booking has already moved';
  end if;

  perform 1 from public.crm_slots
    where id = destination and clinic_id = clinic and not blocked and starts_at > clock_timestamp() for update;
  if not found or exists (
    select 1 from public.crm_bookings where slot_id = destination and status <> 'cancelled'
  ) then
    raise exception using errcode = 'PT409', message = 'Destination slot unavailable';
  end if;

  update public.crm_bookings set slot_id = destination where id = booking;
  insert into public.crm_reschedule_events(booking_id, actor_id, from_slot_id, to_slot_id)
    values (booking, actor, current_slot, destination);
end;
$$;
revoke all on function public.crm_reschedule_booking(uuid, uuid, uuid, uuid, uuid) from public, anon, authenticated;
grant execute on function public.crm_reschedule_booking(uuid, uuid, uuid, uuid, uuid) to service_role;

create or replace function public.crm_reserve(clinic uuid, slot uuid, request_id uuid) returns uuid
language plpgsql security invoker set search_path = '' as $$
declare
  existing public.crm_bookings;
  selected public.crm_slots;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(request_id::text, 0));
  select * into existing from public.crm_bookings where request_key = request_id;
  if found then
    if existing.original_slot_id <> slot or not exists (select 1 from public.crm_slots where id = slot and clinic_id = clinic) then raise exception using errcode = 'PT409', message = 'Booking key already used'; end if;
    return existing.id;
  end if;
  select * into selected from public.crm_slots where id = slot and clinic_id = clinic for update;
  if not found or selected.blocked or not exists (select 1 from public.crm_clinics where id = clinic and booking_enabled) or selected.starts_at <= clock_timestamp() or
    exists (select 1 from public.crm_bookings where slot_id = slot and status <> 'cancelled') then
    raise exception using errcode = 'PT409', message = 'Slot unavailable';
  end if;
  insert into public.crm_bookings(slot_id, original_slot_id, request_key) values (slot, slot, request_id) returning * into existing;
  return existing.id;
end;
$$;

create or replace function public.crm_transition_booking(actor uuid, clinic uuid, booking uuid, desired text)
returns void language plpgsql security invoker set search_path = '' as $$
declare
  current_status text;
  slot_start timestamptz;
begin
  perform 1 from public.crm_staff
    where user_id = actor and clinic_id = clinic
      and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler') for share;
  if not found then
    raise exception using errcode = 'PT403', message = 'Scheduling access required';
  end if;
  if desired is null or desired not in ('completed', 'cancelled', 'no_show') then
    raise exception using errcode = 'PT400', message = 'Invalid booking status';
  end if;
  select b.status, s.starts_at into current_status, slot_start
    from public.crm_bookings b join public.crm_slots s on s.id = b.slot_id
    where b.id = booking and s.clinic_id = clinic for update of b;
  if not found or (current_status <> 'confirmed' and current_status <> desired) then
    raise exception using errcode = 'PT409', message = 'Booking cannot be changed';
  end if;
  if current_status = desired then return; end if;
  if desired in ('completed', 'no_show') and slot_start > clock_timestamp() then
    raise exception using errcode = 'PT409', message = 'Appointment has not started';
  end if;
  update public.crm_bookings set status = desired where id = booking;
  insert into public.crm_booking_events(booking_id, actor_id, status)
    values (booking, actor, desired);
end;
$$;

-- Requires the CRM clinic and staff tables. Populate routes only for verified clinics.

create table public.crm_enquiry_routes (
  provider_id text not null,
  city text not null,
  facility text not null,
  clinic_id uuid not null references public.crm_clinics(id),
  enabled boolean not null default false,
  primary key (provider_id, city, facility)
);

create table public.crm_enquiries (
  reference text primary key,
  clinic_id uuid not null references public.crm_clinics(id),
  provider_id text not null,
  city text not null,
  facility text not null,
  patient_name text not null,
  mobile text not null,
  email text,
  preferred_date date,
  preferred_time time,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  consented_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index crm_enquiries_clinic_recent on public.crm_enquiries(clinic_id, consented_at desc);
create index crm_enquiries_mobile_recent on public.crm_enquiries(mobile, consented_at desc);
alter table public.crm_enquiry_routes enable row level security;
alter table public.crm_enquiries enable row level security;
revoke all on public.crm_enquiry_routes, public.crm_enquiries from public, anon, authenticated;
grant select on public.crm_enquiry_routes to service_role;
grant select, insert on public.crm_enquiries to service_role;

create function public.crm_submit_enquiry(
  ref text, provider text, location_city text, location_facility text,
  name text, phone text, contact_email text, requested_date date, requested_time time
) returns void language plpgsql security invoker set search_path = '' as $$
declare
  target_clinic uuid;
begin
  select clinic_id into target_clinic from public.crm_enquiry_routes
    where provider_id = provider and city = location_city and facility = location_facility and enabled;
  if not found then
    raise exception using errcode = 'PT404', message = 'Enquiry intake unavailable for this location';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('crm-enquiry:' || phone, 0));
  if exists (
    select 1 from public.crm_enquiries where mobile = phone and consented_at > clock_timestamp() - interval '2 minutes'
  ) then
    raise exception using errcode = 'PT429', message = 'Please wait before sending another enquiry';
  end if;
  insert into public.crm_enquiries(reference, clinic_id, provider_id, city, facility,
    patient_name, mobile, email, preferred_date, preferred_time)
  values (ref, target_clinic, provider, location_city, location_facility,
    name, phone, contact_email, requested_date, requested_time);
end;
$$;

create function public.crm_list_enquiries(actor uuid, clinic uuid)
returns setof public.crm_enquiries language plpgsql security invoker set search_path = '' as $$
begin
  if not exists (
    select 1 from public.crm_staff where user_id = actor and clinic_id = clinic
      and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler')
  ) then
    raise exception using errcode = 'PT403', message = 'Enquiry access required';
  end if;
  return query select * from public.crm_enquiries where clinic_id = clinic
    order by consented_at desc, reference desc limit 100;
end;
$$;

revoke all on function public.crm_submit_enquiry(text, text, text, text, text, text, text, date, time),
  public.crm_list_enquiries(uuid, uuid) from public, anon, authenticated;
grant execute on function public.crm_submit_enquiry(text, text, text, text, text, text, text, date, time),
  public.crm_list_enquiries(uuid, uuid) to service_role;

-- Apply after crm_enquiry_intake.sql.

create table public.crm_enquiry_events (
  reference text not null references public.crm_enquiries(reference),
  actor_id uuid not null,
  status text not null check (status in ('contacted', 'closed')),
  created_at timestamptz not null default now(),
  primary key (reference, status)
);
alter table public.crm_enquiry_events enable row level security;
revoke all on public.crm_enquiry_events from public, anon, authenticated;
grant insert on public.crm_enquiry_events to service_role;
grant update (status, updated_at) on public.crm_enquiries to service_role;

create function public.crm_update_enquiry(actor uuid, clinic uuid, ref text, expected text, desired text)
returns void language plpgsql security invoker set search_path = '' as $$
declare
  current_status text;
begin
  perform 1 from public.crm_staff where user_id = actor and clinic_id = clinic
    and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler') for share;
  if not found then
    raise exception using errcode = 'PT403', message = 'Enquiry access required';
  end if;
  if (expected = 'new' and desired = 'contacted' or expected in ('new', 'contacted') and desired = 'closed') is not true then
    raise exception using errcode = 'PT400', message = 'Invalid enquiry transition';
  end if;

  select status into current_status from public.crm_enquiries
    where reference = ref and clinic_id = clinic for update;
  if not found then
    raise exception using errcode = 'PT404', message = 'Enquiry not found';
  end if;
  if current_status = desired then return; end if;
  if current_status <> expected then
    raise exception using errcode = 'PT409', message = 'Enquiry has changed';
  end if;
  update public.crm_enquiries set status = desired, updated_at = clock_timestamp()
    where reference = ref and clinic_id = clinic;
  insert into public.crm_enquiry_events(reference, actor_id, status) values (ref, actor, desired);
end;
$$;

revoke all on function public.crm_update_enquiry(uuid, uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.crm_update_enquiry(uuid, uuid, text, text, text) to service_role;

commit;
