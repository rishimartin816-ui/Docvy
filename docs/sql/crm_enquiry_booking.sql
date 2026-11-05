begin;
alter table public.crm_enquiries
  add column booking_id uuid unique references public.crm_bookings(id);
grant update (booking_id) on public.crm_enquiries to service_role;

create function public.crm_book_enquiry(actor uuid, clinic uuid, ref text, slot uuid)
returns uuid language plpgsql security invoker set search_path = '' as $$
declare
  enquiry public.crm_enquiries;
  booked uuid;
begin
  perform 1 from public.crm_staff where user_id = actor and clinic_id = clinic
    and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler') for share;
  if not found then
    raise exception using errcode = 'PT403', message = 'Scheduling access required';
  end if;

  select * into enquiry from public.crm_enquiries where reference = ref and clinic_id = clinic for update;
  if not found then
    raise exception using errcode = 'PT404', message = 'Enquiry not found';
  end if;
  if enquiry.booking_id is not null and exists (
    select 1 from public.crm_bookings where id = enquiry.booking_id and original_slot_id = slot
  ) then
    return enquiry.booking_id;
  end if;
  if enquiry.status = 'closed' then
    raise exception using errcode = 'PT409', message = 'Enquiry is already closed';
  end if;

  perform 1 from public.crm_slots
    where id = slot and clinic_id = clinic and not blocked and starts_at > clock_timestamp() for update;
  if not found or exists (
    select 1 from public.crm_bookings where slot_id = slot and status <> 'cancelled'
  ) then
    raise exception using errcode = 'PT409', message = 'Slot unavailable';
  end if;

  insert into public.crm_bookings(slot_id, original_slot_id, request_key)
    values (slot, slot, gen_random_uuid()) returning id into booked;
  update public.crm_enquiries set booking_id = booked, status = 'closed', updated_at = clock_timestamp()
    where reference = ref and clinic_id = clinic;
  insert into public.crm_enquiry_events(reference, actor_id, status) values (ref, actor, 'closed');
  return booked;
end;
$$;
revoke all on function public.crm_book_enquiry(uuid, uuid, text, uuid) from public, anon, authenticated;
grant execute on function public.crm_book_enquiry(uuid, uuid, text, uuid) to service_role;
commit;
