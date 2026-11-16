-- Apply after crm_clinic_scope.sql in the isolated CRM environment.
begin;
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
commit;
