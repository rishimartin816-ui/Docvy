begin;
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
  if not found or selected.provider_id is not null or selected.blocked or not exists (select 1 from public.crm_clinics where id = clinic and booking_enabled) or selected.starts_at <= clock_timestamp() or
    exists (select 1 from public.crm_bookings where slot_id = slot and status <> 'cancelled') then
    raise exception using errcode = 'PT409', message = 'Slot unavailable';
  end if;
  insert into public.crm_bookings(slot_id, original_slot_id, request_key) values (slot, slot, request_id) returning * into existing;
  return existing.id;
end;
$$;


create function public.crm_guard_provider_move() returns trigger language plpgsql security invoker set search_path='' as $guard$
begin
 if exists(select 1 from public.crm_slots old_slot join public.crm_slots new_slot on new_slot.id=new.slot_id
 where old_slot.id=old.slot_id and (old_slot.clinic_id<>new_slot.clinic_id or old_slot.provider_id is distinct from new_slot.provider_id)) then
 raise exception using errcode='PT409',message='Cannot move a booking to another clinic or provider';end if;
 return new;
end;$guard$;
revoke all on function public.crm_guard_provider_move() from public,anon,authenticated;
create trigger crm_provider_move before update of slot_id on public.crm_bookings for each row execute function public.crm_guard_provider_move();
commit;
