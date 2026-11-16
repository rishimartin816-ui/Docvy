begin;
alter table public.crm_booking_events alter column created_at set default clock_timestamp();
alter table public.crm_reschedule_events alter column created_at set default clock_timestamp();
grant select on public.crm_booking_events, public.crm_reschedule_events to service_role;

create function public.crm_booking_history(actor uuid, clinic uuid, booking uuid)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
  result jsonb;
begin
  if not exists (
    select 1 from public.crm_staff where user_id = actor and clinic_id = clinic
      and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler')
  ) then
    raise exception using errcode = 'PT403', message = 'Appointment history access required';
  end if;

  select jsonb_build_object(
    'status', b.status, 'starts_at', s.starts_at,
    'events', (
      select jsonb_agg(to_jsonb(timeline) order by timeline.at, case timeline.action when 'confirmed' then 0 when 'rescheduled' then 1 else 2 end)
      from (
        select 'confirmed' as action, b.created_at as at, original.starts_at as appointment_at
        union all
        select e.status, e.created_at, null::timestamptz
          from public.crm_booking_events e where e.booking_id = b.id
        union all
        select 'rescheduled', e.created_at, target.starts_at
          from public.crm_reschedule_events e join public.crm_slots target on target.id = e.to_slot_id
          where e.booking_id = b.id
      ) timeline
    )
  ) into result
  from public.crm_bookings b join public.crm_slots s on s.id = b.slot_id
    join public.crm_slots original on original.id = b.original_slot_id
  where b.id = booking and s.clinic_id = clinic;
  if not found then
    raise exception using errcode = 'PT404', message = 'Appointment not found';
  end if;
  return result;
end;
$$;
revoke all on function public.crm_booking_history(uuid, uuid, uuid) from public, anon, authenticated;
grant execute on function public.crm_booking_history(uuid, uuid, uuid) to service_role;
commit;
