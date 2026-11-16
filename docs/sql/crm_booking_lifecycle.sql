-- Apply after crm_staff_roles.sql in the isolated CRM environment.
begin;

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

commit;
