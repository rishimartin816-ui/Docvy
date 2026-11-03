-- Apply after crm_booking_lifecycle.sql in isolated staging.
begin;

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

commit;
