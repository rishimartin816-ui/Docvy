begin;

alter table public.crm_bookings
  add column if not exists fee_paise integer check (fee_paise between 0 and 10000000);

create or replace function public.crm_set_booking_fee(
  actor uuid, clinic uuid, booking uuid, expected_fee integer, desired_fee integer
)
returns void language plpgsql security invoker set search_path = '' as $$
declare
  current_fee integer;
begin
  if not exists (
    select 1 from public.crm_staff where user_id = actor and clinic_id = clinic
      and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler')
  ) then
    raise exception using errcode = 'PT403', message = 'Scheduling access required';
  end if;
  if desired_fee is null or desired_fee not between 0 and 10000000 then
    raise exception using errcode = 'PT400', message = 'Invalid booking fee';
  end if;

  select b.fee_paise into current_fee
    from public.crm_bookings b join public.crm_slots s on s.id = b.slot_id
    where b.id = booking and s.clinic_id = clinic
    for update of b;
  if not found then
    raise exception using errcode = 'PT404', message = 'Appointment not found';
  end if;
  if current_fee is not distinct from desired_fee then
    return;
  end if;
  if current_fee is distinct from expected_fee then
    raise exception using errcode = 'PT409', message = 'Booking fee changed';
  end if;
  update public.crm_bookings set fee_paise = desired_fee where id = booking;
end;
$$;

revoke all on function public.crm_set_booking_fee(uuid, uuid, uuid, integer, integer) from public, anon, authenticated;
grant execute on function public.crm_set_booking_fee(uuid, uuid, uuid, integer, integer) to service_role;
grant update (fee_paise) on public.crm_bookings to service_role;


create or replace function public.crm_booking_history(actor uuid, clinic uuid, booking uuid)
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
    'reference', b.id, 'status', b.status, 'starts_at', s.starts_at,
    'fee_paise', b.fee_paise,
    'contact', case when e.reference is not null then jsonb_build_object(
      'enquiry_reference', e.reference, 'name', e.patient_name,
      'mobile', e.mobile, 'email', e.email
    ) end,
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
    left join public.crm_enquiries e on e.booking_id = b.id and e.clinic_id = s.clinic_id
  where b.id = booking and s.clinic_id = clinic;
  if not found then
    raise exception using errcode = 'PT404', message = 'Appointment not found';
  end if;
  return result;
end;
$$;

commit;
