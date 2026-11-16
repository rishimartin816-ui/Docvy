begin;

grant insert (clinic_id, starts_at, ends_at) on public.crm_slots to service_role;

create function public.crm_create_slot(actor uuid, clinic uuid, starts timestamptz, ends timestamptz)
returns uuid language plpgsql security invoker set search_path = '' as $$
declare
  slot_id uuid;
begin
  perform 1 from public.crm_staff where user_id = actor and clinic_id = clinic
    and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler') for share;
  if not found then
    raise exception using errcode = 'PT403', message = 'Scheduling access required';
  end if;
  if starts is null or ends is null or starts <= clock_timestamp() or starts > clock_timestamp() + interval '365 days'
    or ends - starts not between interval '5 minutes' and interval '4 hours' then
    raise exception using errcode = 'PT400', message = 'Invalid slot time';
  end if;

  insert into public.crm_slots(clinic_id, starts_at, ends_at)
    values (clinic, starts, ends) returning id into slot_id;
  return slot_id;
exception when exclusion_violation then
  select id into slot_id from public.crm_slots
    where clinic_id = clinic and starts_at = starts and ends_at = ends;
  if found then return slot_id; end if;
  raise exception using errcode = 'PT409', message = 'Slot overlaps existing availability';
end;
$$;
revoke all on function public.crm_create_slot(uuid, uuid, timestamptz, timestamptz) from public, anon, authenticated;
grant execute on function public.crm_create_slot(uuid, uuid, timestamptz, timestamptz) to service_role;

commit;
