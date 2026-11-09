-- Private review records; public access is limited to purpose-specific functions.
create schema if not exists docvy_private;
revoke all on schema docvy_private from public, anon, authenticated;
create table docvy_private.directory_admins(email text primary key);
insert into docvy_private.directory_admins values ('contact@docvy.in');
alter table docvy_private.directory_admins enable row level security;

alter table public.docvy_directory_providers
 add column profile_status text not null default 'unclaimed' check(profile_status in ('unclaimed','claimed','verified')),
 add column consent_given boolean not null default false,
 add column consent_date timestamptz,
 add column consent_method text check(consent_method in ('email','form')),
 add column registration_number text,
 add column registration_council text,
 add column verified_at timestamptz,
 add column published boolean not null default true,
 add column specialties jsonb not null default '[]',
 add column approved_bio text,
 add column photo_url text,
 add column updated_at timestamptz not null default now(),
 add constraint docvy_consent_required check(profile_status='unclaimed' or (consent_given and consent_date is not null and consent_method is not null)),
 add constraint docvy_verification_required check(profile_status<>'verified' or (length(btrim(registration_number))>0 and length(btrim(registration_council))>0 and verified_at is not null)),
 add constraint docvy_owned_photo check(photo_url is null or photo_url ~ '^https://cxyscxjauxoizvvllmfu[.]supabase[.]co/storage/v1/object/public/docvy-provider-photos/[a-z0-9/-]+[.](jpg|png|webp)$');

create table docvy_private.profile_requests (
 id uuid primary key,
 reference text not null unique default ('DP-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,16))),
 kind text not null check(kind in ('claim','removal')),
 provider_id text not null references public.docvy_directory_providers(provider_id),
 doctor_name text not null,
 registration_number text,
 registration_council text,
 work_email text not null,
 work_phone text,
 bio text,
 consent boolean not null,
 details text,
 network_hash text not null,
 created_at timestamptz not null default now(),
 status text not null default 'pending' check(status in ('pending','approved','rejected','completed')),
 email_status text not null default 'pending_connection',
 recipient text not null default 'contact@docvy.in' check(recipient='contact@docvy.in')
);
create index profile_request_deadline on docvy_private.profile_requests(provider_id,created_at) where kind='removal' and status='pending';
create index profile_request_rate on docvy_private.profile_requests(network_hash,created_at);
alter table docvy_private.profile_requests enable row level security;
create table docvy_private.consent_audit (
 id bigint generated always as identity primary key,
 provider_id text not null,
 actor uuid not null,
 action text not null,
 evidence text not null,
 created_at timestamptz not null default now()
);
alter table docvy_private.consent_audit enable row level security;
revoke all on all tables in schema docvy_private from public,anon,authenticated;

create function public.docvy_is_directory_admin() returns boolean
language sql stable security definer set search_path='' as $$
 select exists(select 1 from auth.users u join docvy_private.directory_admins a on lower(u.email)=a.email
 where u.id=auth.uid() and u.email_confirmed_at is not null
 and exists(select 1 from auth.sessions s where s.user_id=u.id and s.id::text=auth.jwt()->>'session_id'));
$$;
revoke all on function public.docvy_is_directory_admin() from public,anon;
grant execute on function public.docvy_is_directory_admin() to authenticated;

create function docvy_private.directory_visible(p_id text) returns boolean
language sql stable security definer set search_path='' as $$
 select not exists(select 1 from docvy_private.profile_requests r where r.provider_id=p_id
 and r.kind='removal' and r.status='pending' and r.created_at<=now()-interval '48 hours');
$$;
revoke all on function docvy_private.directory_visible(text) from public,anon,authenticated;

create function public.docvy_public_directory() returns jsonb
language sql stable security definer set search_path='' as $$
 select coalesce(jsonb_agg(jsonb_build_object(
 'id',p.provider_id,'live',true,'name',p.doctor_name,'specialties',p.specialties,
 'hospital',p.facility,'locations',jsonb_build_array(jsonb_build_object('city',p.city,'facility',p.facility,'primary',true)),
 'otherNcrLocations','[]'::jsonb,'sourceUrl',p.source_url,'sourceChecked',p.source_checked,
 'profileStatus',p.profile_status,'consentGiven',p.consent_given,
 'consentDate',case when p.profile_status<>'unclaimed' then p.consent_date end,
 'consentMethod',case when p.profile_status<>'unclaimed' then p.consent_method end,
 'registrationNumber',case when p.profile_status='verified' then p.registration_number end,
 'registrationCouncil',case when p.profile_status='verified' then p.registration_council end,
 'verifiedAt',case when p.profile_status='verified' then p.verified_at end,
 'photoUrl',case when p.profile_status<>'unclaimed' then p.photo_url end,
 'summary',case when p.profile_status<>'unclaimed' then p.approved_bio end
 ) order by p.city,p.doctor_name),'[]'::jsonb)
 from public.docvy_directory_providers p where p.published and docvy_private.directory_visible(p.provider_id);
$$;
revoke all on function public.docvy_public_directory() from public;
grant execute on function public.docvy_public_directory() to anon,authenticated;

create function docvy_private.guard_provider() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 new.enabled:=new.published and new.profile_status in ('claimed','verified') and new.consent_given;
 new.updated_at:=now(); return new;
end; $$;
revoke all on function docvy_private.guard_provider() from public,anon,authenticated;
create trigger directory_consent_guard before insert or update on public.docvy_directory_providers
for each row execute function docvy_private.guard_provider();

create function public.docvy_submit_profile_request(p_id uuid,p_kind text,p_payload jsonb,p_network_hash text) returns text
language plpgsql security definer set search_path='' as $$
declare saved docvy_private.profile_requests%rowtype; v_reference text;
begin
 if p_id is null or p_kind not in ('claim','removal') or p_kind is null
 or jsonb_typeof(p_payload) is distinct from 'object' or length(p_payload::text)>7000
 or p_network_hash is null or p_network_hash !~ '^[a-f0-9]{64}$'
 or coalesce(length(btrim(p_payload->>'doctorName')),0) not between 2 and 120
 or coalesce(length(p_payload->>'email'),0) not between 5 and 254
 or p_payload->>'email' !~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
 or (coalesce(p_payload->>'phone','')<>'' and p_payload->>'phone' !~ '^\+?[0-9 ()-]{7,24}$')
 or (p_payload->>'consent') is distinct from 'true'
 or coalesce(length(p_payload->>'bio'),0)>2000 or coalesce(length(p_payload->>'details'),0)>1500
 or (p_kind='claim' and (coalesce(length(btrim(p_payload->>'registrationNumber')),0) not between 2 and 100
 or coalesce(length(btrim(p_payload->>'registrationCouncil')),0) not between 2 and 150)) then
 raise exception using errcode='PT400',message='Check the form and consent'; end if;
 if not exists(select 1 from public.docvy_directory_providers where provider_id=p_payload->>'providerId') then
 raise exception using errcode='PT404',message='Profile not found'; end if;
 perform pg_advisory_xact_lock(hashtextextended('profile-id:'||p_id::text,0));
 select * into saved from docvy_private.profile_requests where id=p_id;
 if found then
 if saved.kind<>p_kind or saved.provider_id<>p_payload->>'providerId' or saved.work_email<>lower(p_payload->>'email') then
 raise exception using errcode='PT409',message='Use a new form for changed details'; end if;
 return saved.reference; end if;
 perform pg_advisory_xact_lock(hashtextextended('profile-network:'||p_network_hash,0));
 if (select count(*) from docvy_private.profile_requests where network_hash=p_network_hash and created_at>now()-interval '1 hour')>=5 then
 raise exception using errcode='PT429',message='Please wait before sending another request'; end if;
 insert into docvy_private.profile_requests(id,kind,provider_id,doctor_name,registration_number,registration_council,work_email,work_phone,bio,consent,details,network_hash)
 values(p_id,p_kind,p_payload->>'providerId',p_payload->>'doctorName',p_payload->>'registrationNumber',p_payload->>'registrationCouncil',lower(p_payload->>'email'),p_payload->>'phone',p_payload->>'bio',true,p_payload->>'details',p_network_hash)
 returning reference into v_reference;
 return v_reference;
end; $$;
revoke all on function public.docvy_submit_profile_request(uuid,text,jsonb,text) from public;
grant execute on function public.docvy_submit_profile_request(uuid,text,jsonb,text) to anon,authenticated;

create function public.docvy_directory_admin_data() returns jsonb
language plpgsql security definer set search_path='' as $$
begin
 if not public.docvy_is_directory_admin() then raise exception using errcode='PT403',message='Owner access required'; end if;
 return jsonb_build_object('doctors',(select coalesce(jsonb_agg(to_jsonb(p) order by p.doctor_name),'[]') from public.docvy_directory_providers p),
 'requests',(select coalesce(jsonb_agg(to_jsonb(r)-'network_hash' order by r.created_at desc),'[]') from docvy_private.profile_requests r),
 'audit',(select coalesce(jsonb_agg(to_jsonb(a) order by a.created_at desc),'[]') from docvy_private.consent_audit a));
end; $$;
revoke all on function public.docvy_directory_admin_data() from public,anon;
grant execute on function public.docvy_directory_admin_data() to authenticated;

create function public.docvy_update_directory_profile(p_id text,p_action text,p_data jsonb) returns boolean
language plpgsql security definer set search_path='' as $$
declare p public.docvy_directory_providers%rowtype; evidence text; request_row docvy_private.profile_requests%rowtype;
begin
 if not public.docvy_is_directory_admin() then raise exception using errcode='PT403',message='Owner access required'; end if;
 evidence:=btrim(p_data->>'evidence');
 if coalesce(length(evidence),0) not between 10 and 2000 or p_action not in ('claim','verify','unpublish','publish','revoke','reject') then
 raise exception using errcode='PT400',message='Record the action and review evidence'; end if;
 select * into p from public.docvy_directory_providers where provider_id=p_id for update;
 if not found then raise exception using errcode='PT404',message='Profile not found'; end if;
 if p_action='claim' then
 if p_data->>'confirmedConsent' is distinct from 'true' or p_data->>'consentMethod' not in ('form','email')
 or coalesce(length(p_data->>'registrationNumber'),0)<2 or coalesce(length(p_data->>'registrationCouncil'),0)<2 then
 raise exception using errcode='PT400',message='Written consent and registration details are required'; end if;
 if p_data->>'consentMethod'='form' then
 select * into request_row from docvy_private.profile_requests where id::text=p_data->>'requestId' and kind='claim' and provider_id=p_id and consent and status='pending';
 if not found then raise exception using errcode='PT400',message='Choose a pending claim'; end if;
 end if;
 update public.docvy_directory_providers set profile_status='claimed',consent_given=true,
 consent_date=now(),consent_method=p_data->>'consentMethod',registration_number=p_data->>'registrationNumber',registration_council=p_data->>'registrationCouncil',
 verified_at=null,approved_bio=left(p_data->>'bio',2000),photo_url=null where provider_id=p_id;
 if request_row.id is not null then update docvy_private.profile_requests set status='approved' where id=request_row.id; end if;
 elsif p_action='verify' then
 if p.profile_status='unclaimed' or not p.consent_given or p_data->>'manuallyChecked' is distinct from 'true'
 or coalesce(length(p.registration_number),0)<2 or coalesce(length(p.registration_council),0)<2 then
 raise exception using errcode='PT400',message='Approve consent and manually check registration first'; end if;
 update public.docvy_directory_providers set profile_status='verified',verified_at=now() where provider_id=p_id;
 elsif p_action='revoke' then
 update public.docvy_directory_providers set profile_status='unclaimed',consent_given=false,consent_date=null,consent_method=null,verified_at=null,photo_url=null,approved_bio=null where provider_id=p_id;
 elsif p_action='unpublish' then
 update public.docvy_directory_providers set published=false where provider_id=p_id;
 update docvy_private.profile_requests set status='completed' where provider_id=p_id and kind='removal' and status='pending';
 elsif p_action='publish' then
 if exists(select 1 from docvy_private.profile_requests where provider_id=p_id and kind='removal' and status='pending') then
 raise exception using errcode='PT400',message='Resolve removal requests before publishing'; end if;
 update public.docvy_directory_providers set published=true where provider_id=p_id;
 elsif p_action='reject' then
 update docvy_private.profile_requests set status='rejected' where provider_id=p_id and id::text=p_data->>'requestId' and status='pending';
 end if;
 insert into docvy_private.consent_audit(provider_id,actor,action,evidence) values(p_id,auth.uid(),p_action,evidence);
 return true;
end; $$;
revoke all on function public.docvy_update_directory_profile(text,text,jsonb) from public,anon;
grant execute on function public.docvy_update_directory_profile(text,text,jsonb) to authenticated;

-- Guard the existing appointment function even when called directly.
create function docvy_private.guard_directory_request() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 if not exists(select 1 from public.docvy_directory_providers p where p.provider_id=new.provider_id
 and p.enabled and p.published and p.consent_given and p.profile_status in ('claimed','verified') and docvy_private.directory_visible(p.provider_id)) then
 raise exception using errcode='PT403',message='This doctor has not enabled appointment requests'; end if;
 return new;
end; $$;
revoke all on function docvy_private.guard_directory_request() from public,anon,authenticated;
create trigger directory_request_consent before insert on public.docvy_directory_requests
for each row execute function docvy_private.guard_directory_request();
