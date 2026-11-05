begin;

create table public.crm_doctor_roster (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid not null references public.crm_clinics(id),
  name text not null check (name = btrim(name) and length(name) between 2 and 100),
  specialty text not null check (specialty = btrim(specialty) and length(specialty) between 2 and 80),
  present boolean,
  changed_at timestamptz,
  changed_by uuid references auth.users(id) on delete set null
);
create unique index crm_doctor_roster_clinic_name on public.crm_doctor_roster (clinic_id, lower(name), lower(specialty));
alter table public.crm_doctor_roster enable row level security;
revoke all on public.crm_doctor_roster from public, anon, authenticated;
grant select, insert, update on public.crm_doctor_roster to service_role;

create function public.crm_change_doctor_presence(actor uuid, clinic uuid, doctor uuid, desired boolean)
returns void language plpgsql security invoker set search_path = '' as $$
begin
  if not exists (
    select 1 from public.crm_staff where user_id = actor and clinic_id = clinic
      and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler')
  ) then
    raise exception using errcode = 'PT403', message = 'Scheduling access required';
  end if;
  if desired is null then
    raise exception using errcode = 'PT400', message = 'Choose in or out';
  end if;
  update public.crm_doctor_roster
    set present = desired, changed_at = now(), changed_by = actor
    where id = doctor and clinic_id = clinic and present is distinct from desired;
  if not found and not exists (select 1 from public.crm_doctor_roster where id = doctor and clinic_id = clinic) then
    raise exception using errcode = 'PT404', message = 'Doctor not found';
  end if;
end;
$$;

revoke all on function public.crm_change_doctor_presence(uuid, uuid, uuid, boolean) from public, anon, authenticated;
grant execute on function public.crm_change_doctor_presence(uuid, uuid, uuid, boolean) to service_role;

commit;
