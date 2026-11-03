-- Upgrade the isolated CRM schema to scope staff and calendar access by clinic.
begin;
create table public.crm_clinics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  booking_enabled boolean not null default false
);
alter table public.crm_clinics enable row level security;
revoke all on public.crm_clinics from public, anon, authenticated;
grant select on public.crm_clinics to service_role;
grant update (role) on public.crm_staff to service_role;

insert into public.crm_clinics(id, slug, name, booking_enabled)
values ('7dfbf055-2737-448c-921e-c074d84393d4', 'docvy-test-hospital', 'DOCVY Test Hospital', true);

alter table public.crm_slots add column clinic_id uuid references public.crm_clinics(id);
alter table public.crm_staff add column clinic_id uuid references public.crm_clinics(id);
update public.crm_slots set clinic_id = '7dfbf055-2737-448c-921e-c074d84393d4';
update public.crm_staff set clinic_id = '7dfbf055-2737-448c-921e-c074d84393d4';
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
commit;
