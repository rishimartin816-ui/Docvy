-- SYNTHETIC DATA ONLY. Run in isolated staging after reviewing the CRM schema.
-- Never publish as a real licensed doctor or operating hospital.
-- Does NOT create a login account. A verified test-user identity must be connected separately.
begin;
insert into public.organisations(name,slug,organisation_type,status)
values('DOCVY Test Hospital','docvy-test-hospital','hospital','active')
on conflict (slug) do nothing;

insert into public.branches(organisation_id,name,slug,status)
select id,'DOCVY Test Branch','docvy-test-branch','active'
from public.organisations where slug='docvy-test-hospital'
on conflict do nothing;

insert into public.profiles(id,display_name)
select gen_random_uuid(),'DOCVY Test Doctor'
where not exists (
  select 1 from public.profiles where display_name='DOCVY Test Doctor'
);

insert into public.provider_public_profiles(profile_id,public_display_name,primary_specialty,biography,publication_status)
select p.id,'DOCVY Test Doctor','Testing only',
  'Synthetic test profile. Not a licensed doctor. Not available to real patients.',
  'draft'
from public.profiles p
where p.display_name='DOCVY Test Doctor'
on conflict (profile_id) do nothing;

insert into public.organisation_providers(organisation_id,provider_public_profile_id,status)
select o.id,pp.id,'pending'
from public.organisations o cross join public.provider_public_profiles pp
where o.slug='docvy-test-hospital' and pp.public_display_name='DOCVY Test Doctor'
and not exists (
  select 1 from public.organisation_providers op
  where op.organisation_id=o.id and op.provider_public_profile_id=pp.id
);

insert into public.provider_branch_affiliations(organisation_provider_id,branch_id,status)
select op.id,b.id,'verified'
from public.organisation_providers op
join public.organisations o on o.id=op.organisation_id
join public.branches b on b.organisation_id=o.id
join public.provider_public_profiles pp on pp.id=op.provider_public_profile_id
where o.slug='docvy-test-hospital'
and b.slug='docvy-test-branch'
and pp.public_display_name='DOCVY Test Doctor'
on conflict (organisation_provider_id,branch_id) do nothing;

-- Create one test slot two days from now, in UTC.
insert into public.appointment_slots(affiliation_id,start_at,end_at,capacity,status)
select pba.id,
  date_trunc('day',now())+interval '2 days 5 hours',
  date_trunc('day',now())+interval '2 days 5 hours 30 minutes',
  1,'open'
from public.provider_branch_affiliations pba
join public.branches b on b.id=pba.branch_id
join public.organisations o on o.id=b.organisation_id
where o.slug='docvy-test-hospital'
on conflict (affiliation_id,start_at,end_at) do nothing;
commit;
