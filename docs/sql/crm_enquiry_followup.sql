-- Apply after crm_enquiry_intake.sql.
begin;
create table public.crm_enquiry_events (
  reference text not null references public.crm_enquiries(reference),
  actor_id uuid not null,
  status text not null check (status in ('contacted', 'closed')),
  created_at timestamptz not null default now(),
  primary key (reference, status)
);
alter table public.crm_enquiry_events enable row level security;
revoke all on public.crm_enquiry_events from public, anon, authenticated;
grant insert on public.crm_enquiry_events to service_role;
grant update (status, updated_at) on public.crm_enquiries to service_role;

create function public.crm_update_enquiry(actor uuid, clinic uuid, ref text, expected text, desired text)
returns void language plpgsql security invoker set search_path = '' as $$
declare
  current_status text;
begin
  perform 1 from public.crm_staff where user_id = actor and clinic_id = clinic
    and role in ('owner', 'clinic_admin', 'manager', 'receptionist', 'scheduler') for share;
  if not found then
    raise exception using errcode = 'PT403', message = 'Enquiry access required';
  end if;
  if (expected = 'new' and desired = 'contacted' or expected in ('new', 'contacted') and desired = 'closed') is not true then
    raise exception using errcode = 'PT400', message = 'Invalid enquiry transition';
  end if;

  select status into current_status from public.crm_enquiries
    where reference = ref and clinic_id = clinic for update;
  if not found then
    raise exception using errcode = 'PT404', message = 'Enquiry not found';
  end if;
  if current_status = desired then return; end if;
  if current_status <> expected then
    raise exception using errcode = 'PT409', message = 'Enquiry has changed';
  end if;
  update public.crm_enquiries set status = desired, updated_at = clock_timestamp()
    where reference = ref and clinic_id = clinic;
  insert into public.crm_enquiry_events(reference, actor_id, status) values (ref, actor, desired);
end;
$$;

revoke all on function public.crm_update_enquiry(uuid, uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.crm_update_enquiry(uuid, uuid, text, text, text) to service_role;
commit;
