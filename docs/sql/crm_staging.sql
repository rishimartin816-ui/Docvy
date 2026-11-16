-- Apply only to an isolated Supabase instance.
begin;
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
commit;
