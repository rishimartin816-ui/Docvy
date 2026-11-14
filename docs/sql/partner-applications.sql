-- Unlisted doctors submit private applications. Only the directory owner can publish one.
create table docvy_private.partner_applications (
 id uuid primary key, reference text not null unique default ('PA-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,16))),
 payload jsonb not null check(jsonb_typeof(payload)='object'), network_hash text not null,
 created_at timestamptz not null default now(), status text not null default 'pending' check(status in ('pending','approved','rejected')),
 provider_id text references public.docvy_directory_providers(provider_id), reviewed_by uuid references auth.users(id), reviewed_at timestamptz,
 evidence text, email_status text not null default 'pending_connection', recipient text not null default 'contact@docvy.in' check(recipient='contact@docvy.in')
);
alter table docvy_private.partner_applications enable row level security;
revoke all on docvy_private.partner_applications from public,anon,authenticated;
create index partner_application_rate on docvy_private.partner_applications(network_hash,created_at);
create unique index partner_pending_registration on docvy_private.partner_applications(lower(payload->>'registrationCouncil'),lower(payload->>'registrationNumber')) where status='pending';

create function docvy_private.doctor_name_key(v text) returns text language sql immutable set search_path='' as $$
 select regexp_replace(regexp_replace(lower(btrim(v)),'^(doctor[[:space:]]+|dr([.][[:space:]]*|[[:space:]]+))','','i'),'[^a-z0-9]','','g');
$$;
create function docvy_private.partner_city(v text) returns text language sql immutable set search_path='' as $$
 select case lower(btrim(v)) when 'gurugram' then 'Gurgaon' when 'gurgaon' then 'Gurgaon' when 'bangalore' then 'Bengaluru' when 'bengaluru' then 'Bengaluru' when 'mangalore' then 'Mangaluru' when 'mangaluru' then 'Mangaluru' when 'mysore' then 'Mysuru' when 'mysuru' then 'Mysuru' else initcap(btrim(v)) end;
$$;
create function docvy_private.valid_partner_payload(v jsonb) returns boolean language sql immutable set search_path='' as $$
 select jsonb_typeof(v)='object' and coalesce(v->>'role','') in ('doctor','clinic') and v->>'consent'='true'
  and coalesce(length(btrim(v->>'doctorName')),0) between 2 and 120
  and coalesce(length(btrim(v->>'specialty')),0) between 2 and 100
  and coalesce(length(btrim(v->>'city')),0) between 2 and 60
  and coalesce(length(btrim(v->>'registrationNumber')),0) between 2 and 100
  and coalesce(length(btrim(v->>'registrationCouncil')),0) between 2 and 150
  and coalesce(length(btrim(v->>'email')),0) between 5 and 254
  and v->>'email' ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
  and v->>'phone' ~ '^[+]91[6-9][0-9]{9}$'
  and coalesce(length(v->>'facility'),0)<=160 and (v->>'role'<>'clinic' or coalesce(length(btrim(v->>'facility')),0)>=2)
  and coalesce(length(v->>'locality'),0)<=100 and coalesce(length(v->>'address'),0)<=400
  and coalesce(length(v->>'bio'),0)<=2000 and coalesce(length(btrim(v->>'details')),0) between 10 and 1500
  and coalesce(length(v->>'sourceUrl'),0)<=500 and (coalesce(v->>'sourceUrl','')='' or v->>'sourceUrl' ~ '^https://[^/@[:space:]]+(/[^[:space:]]*)?$');
$$;
revoke all on function docvy_private.doctor_name_key(text),docvy_private.partner_city(text),docvy_private.valid_partner_payload(jsonb) from public,anon,authenticated;

create function docvy_private.submit_partner_application(p_id uuid,p_payload jsonb,p_network_hash text) returns text
language plpgsql security invoker set search_path='' as $$
declare saved docvy_private.partner_applications; v jsonb; ref text;
begin
 if p_id is null or p_network_hash is null or p_network_hash !~ '^[a-f0-9]{64}$' or coalesce(length(p_payload::text),0)>9000 or docvy_private.valid_partner_payload(p_payload) is distinct from true then
  raise exception using errcode='PT400',message='Check your professional details, work contact information and consent';end if;
 v:=p_payload||jsonb_build_object('city',docvy_private.partner_city(p_payload->>'city'),'email',lower(btrim(p_payload->>'email')));
 perform pg_advisory_xact_lock(hashtextextended('partner-id:'||p_id::text,0));
 select * into saved from docvy_private.partner_applications where id=p_id;
 if found then
  if saved.payload<>v or saved.network_hash<>p_network_hash then raise exception using errcode='PT409',message='These details changed. Use a new form or contact DOCVY with your original reference';end if;
  return saved.reference;
 end if;
 if exists(select 1 from public.docvy_directory_providers p where docvy_private.doctor_name_key(p.doctor_name)=docvy_private.doctor_name_key(v->>'doctorName') and lower(p.city)=lower(v->>'city')) then
  raise exception using errcode='PT409',message='A matching profile already exists in this city. Search your name on the claim page instead';end if;
 perform pg_advisory_xact_lock(hashtextextended('profile-network:'||p_network_hash,0));
 if (select count(*) from docvy_private.partner_applications where network_hash=p_network_hash and created_at>now()-interval '1 hour')+(select count(*) from docvy_private.profile_requests where network_hash=p_network_hash and created_at>now()-interval '1 hour')>=5 then
  raise exception using errcode='PT429',message='Please wait before sending another application';end if;
 insert into docvy_private.partner_applications(id,payload,network_hash) values(p_id,v,p_network_hash) returning reference into ref;
 return ref;
exception when unique_violation then raise exception using errcode='PT409',message='An application with these registration details is already pending review';
end;
$$;
revoke all on function docvy_private.submit_partner_application(uuid,jsonb,text) from public,anon,authenticated;

create or replace function public.docvy_directory_intake(p_operation text,p_body text,p_timestamp bigint,p_signature text) returns text
language plpgsql security definer set search_path='' as $$
declare key text; data jsonb; expected text;
begin
 if p_operation not in ('profile','appointment','partner') or p_operation is null or p_body is null or length(p_body)>12000
  or p_timestamp is null or abs(extract(epoch from now())::bigint-p_timestamp)>300 or p_signature is null then raise exception using errcode='PT403',message='Invalid intake signature';end if;
 select secret into key from docvy_private.intake_keys where id;
 expected:=encode(extensions.hmac(convert_to(p_operation||':'||p_timestamp::text||':'||p_body,'UTF8'),convert_to(key,'UTF8'),'sha256'),'hex');
 if expected is null or p_signature<>expected then raise exception using errcode='PT403',message='Invalid intake signature';end if;
 data:=p_body::jsonb;
 if p_operation='profile' then return public.docvy_submit_profile_request((data->>'requestId')::uuid,data->>'kind',data->'payload',data->>'networkHash');
 elsif p_operation='partner' then return docvy_private.submit_partner_application((data->>'requestId')::uuid,data->'payload',data->>'networkHash');
 end if;
 return public.docvy_submit_directory_request((data->>'requestId')::uuid,data->'payload',data->>'networkHash');
end;
$$;

create or replace function public.docvy_directory_admin_data() returns jsonb
language plpgsql security definer set search_path='' as $$
begin
 if not public.docvy_is_directory_admin() then raise exception using errcode='PT403',message='Owner access required';end if;
 return jsonb_build_object(
  'doctors',(select coalesce(jsonb_agg(to_jsonb(p) order by p.doctor_name),'[]') from public.docvy_directory_providers p),
  'requests',(select coalesce(jsonb_agg(to_jsonb(r)-'network_hash' order by r.created_at desc),'[]') from docvy_private.profile_requests r),
  'applications',(select coalesce(jsonb_agg(to_jsonb(a)-'network_hash' order by a.created_at desc),'[]') from docvy_private.partner_applications a),
  'audit',(select coalesce(jsonb_agg(to_jsonb(a) order by a.created_at desc),'[]') from docvy_private.consent_audit a));
end;
$$;

create function public.docvy_review_partner_application(p_id uuid,p_action text,p_data jsonb) returns text
language plpgsql security definer set search_path='' as $$
declare application docvy_private.partner_applications; v jsonb; new_id text; note text;
begin
 if not public.docvy_is_directory_admin() then raise exception using errcode='PT403',message='Owner access required';end if;
 note:=btrim(p_data->>'evidence');
 if p_action is null or p_action not in ('approve','reject') or coalesce(length(note),0) not between 10 and 2000 then raise exception using errcode='PT400',message='Record a review decision and evidence';end if;
 select * into application from docvy_private.partner_applications a where a.id=p_id for update;
 if not found then raise exception using errcode='PT404',message='Application not found';end if;
 if application.status='approved' and p_action='approve' then return application.provider_id;end if;
 if application.status='rejected' and p_action='reject' then return null;end if;
 if application.status<>'pending' then raise exception using errcode='PT409',message='This application was already reviewed';end if;
 if p_action='reject' then update docvy_private.partner_applications set status='rejected',reviewed_by=auth.uid(),reviewed_at=now(),evidence=note where id=p_id;return null;end if;
 if p_data->>'confirmedConsent' is distinct from 'true' then raise exception using errcode='PT400',message='Check the submitter authority and written consent first';end if;
 v:=application.payload||jsonb_build_object(
  'doctorName',coalesce(p_data->>'doctorName',application.payload->>'doctorName'),
  'specialty',coalesce(p_data->>'specialty',application.payload->>'specialty'),
  'city',docvy_private.partner_city(coalesce(p_data->>'city',application.payload->>'city')),
  'facility',coalesce(p_data->>'facility',application.payload->>'facility'),
  'locality',coalesce(p_data->>'locality',application.payload->>'locality'),
  'address',coalesce(p_data->>'address',application.payload->>'address'),
  'registrationNumber',coalesce(p_data->>'registrationNumber',application.payload->>'registrationNumber'),
  'registrationCouncil',coalesce(p_data->>'registrationCouncil',application.payload->>'registrationCouncil'),
  'sourceUrl',coalesce(p_data->>'sourceUrl',application.payload->>'sourceUrl'),
  'bio',coalesce(p_data->>'bio',application.payload->>'bio'));
 if docvy_private.valid_partner_payload(v) is distinct from true then raise exception using errcode='PT400',message='Check the proposed public profile details';end if;
 perform pg_advisory_xact_lock(hashtextextended('partner-name:'||docvy_private.doctor_name_key(v->>'doctorName')||':'||lower(v->>'city'),0));
 if exists(select 1 from public.docvy_directory_providers p where (docvy_private.doctor_name_key(p.doctor_name)=docvy_private.doctor_name_key(v->>'doctorName') and lower(p.city)=lower(v->>'city')) or (lower(p.registration_number)=lower(v->>'registrationNumber') and lower(p.registration_council)=lower(v->>'registrationCouncil'))) then
  raise exception using errcode='PT409',message='A matching profile exists. Review its claim instead of publishing a duplicate';end if;
 new_id:=left(trim(both '-' from regexp_replace(lower((v->>'doctorName')||'-'||(v->>'city')),'[^a-z0-9]+','-','g')),100);
 new_id:=coalesce(nullif(new_id,''),'doctor')||'-'||substr(replace(p_id::text,'-',''),1,8);
 insert into public.docvy_directory_providers(provider_id,doctor_name,city,facility,source_url,source_checked,profile_status,consent_given,consent_date,consent_method,registration_number,registration_council,published,specialties,approved_bio,practice_locations)
  values(new_id,btrim(v->>'doctorName'),v->>'city',coalesce(v->>'facility',''),coalesce(nullif(v->>'sourceUrl',''),'https://www.docvy.in/doctor/'||new_id),current_date,'claimed',true,application.created_at,'form',v->>'registrationNumber',v->>'registrationCouncil',true,jsonb_build_array(v->>'specialty'),nullif(v->>'bio',''),jsonb_build_array(jsonb_strip_nulls(jsonb_build_object('city',v->>'city','facility',coalesce(v->>'facility',''),'locality',nullif(v->>'locality',''),'address',nullif(v->>'address',''),'primary',true))));
 update docvy_private.partner_applications set status='approved',provider_id=new_id,reviewed_by=auth.uid(),reviewed_at=now(),evidence=note where id=p_id;
 insert into docvy_private.consent_audit(provider_id,actor,action,evidence) values(new_id,auth.uid(),'claim','Partner application '||application.reference||': '||note);
 return new_id;
end;
$$;
revoke all on function public.docvy_review_partner_application(uuid,text,jsonb) from public,anon;
grant execute on function public.docvy_review_partner_application(uuid,text,jsonb) to authenticated;
