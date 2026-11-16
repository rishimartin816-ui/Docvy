-- Extend the existing JSON payload and approval flow; legacy pending applications remain reviewable.
create or replace function docvy_private.valid_partner_profile_fields(v jsonb) returns boolean
language sql immutable set search_path='' as $function$
 select case when not (v ? 'profileVersion') then true else
 v->>'profileVersion'='2' and v->>'hasPhoto'='true' and v->>'photoSha256' ~ '^[a-f0-9]{64}$'
 and coalesce(length(btrim(v->>'qualifications')),0) between 2 and 300
 and case when coalesce(v->>'experienceYears','') ~ '^[0-9]{1,2}([.][0-9]{1,2})?$' then (v->>'experienceYears')::numeric between 0 and 80 else false end
 and case when coalesce(v->>'consultationFee','') ~ '^[0-9]{1,6}$' then (v->>'consultationFee')::numeric between 0 and 100000 else false end
 and coalesce(length(btrim(v->>'address')),0) between 10 and 400
 and coalesce(length(btrim(v->>'state')),0) between 2 and 60
 and v->>'postalCode' ~ '^[1-9][0-9]{5}$'
 and coalesce(length(btrim(v->>'workingDays')),0) between 2 and 80
 and coalesce(length(btrim(v->>'consultingHours')),0) between 2 and 100
 and v->>'practicePhone' ~ '^[+]91[1-9][0-9]{9}$'
 and coalesce(length(v->>'languages'),0)<=150 and coalesce(length(v->>'services'),0)<=500
 and coalesce(length(v->>'mapsUrl'),0)<=500
 and (coalesce(v->>'mapsUrl','')='' or v->>'mapsUrl' ~ '^https://(www[.]google[.]com|maps[.]google[.]com|share[.]google|maps[.]app[.]goo[.]gl)/[^[:space:]]+$')
 end;
$function$;
revoke all on function docvy_private.valid_partner_profile_fields(jsonb) from public,anon,authenticated;

do $migration$
declare definition text; first integer; last integer;
begin
 definition:=pg_get_functiondef('docvy_private.valid_partner_payload(jsonb)'::regprocedure);
 if position('valid_partner_profile_fields' in definition)=0 then
  if position('select jsonb_typeof(v)' in definition)=0 then raise exception 'Unexpected partner validator';end if;
  definition:=replace(definition,'select jsonb_typeof(v)','select docvy_private.valid_partner_profile_fields(v) and jsonb_typeof(v)');
  execute definition;
 end if;
 definition:=pg_get_functiondef('docvy_private.submit_partner_application(uuid,jsonb,text)'::regprocedure);
 definition:=replace(definition,'saved.payload<>v','(saved.payload-''photoPublished'')<>v');
 execute definition;
 definition:=pg_get_functiondef('public.docvy_review_partner_application(uuid,text,jsonb)'::regprocedure);
 if position('valid_partner_profile_fields' in definition)>0 then return;end if;
 if position('if application.status=''approved'' and p_action=''approve'' then return application.provider_id;end if;' in definition)=0 then raise exception 'Unexpected partner review function';end if;
 definition:=replace(definition,'new_id text; note text;','new_id text; note text; key text; bio text;');
 definition:=replace(definition,'if application.status=''approved'' and p_action=''approve'' then return application.provider_id;end if;',$photo$
 if application.status='approved' and p_action='approve' then
  if p_data->>'publishPhoto'='true' then
   if application.payload->>'hasPhoto' is distinct from 'true' or not exists(select 1 from storage.objects where bucket_id='docvy-provider-photos' and name='partner/'||p_id::text||'.webp') then
    raise exception using errcode='PT400',message='Approved portrait is not available';end if;
   update public.docvy_directory_providers set photo_url='https://cxyscxjauxoizvvllmfu.supabase.co/storage/v1/object/public/docvy-provider-photos/partner/'||p_id::text||'.webp',updated_at=now() where provider_id=application.provider_id;
   update docvy_private.partner_applications set payload=jsonb_set(payload,'{photoPublished}','true') where id=p_id;
  end if;
  return application.provider_id;
 end if;
$photo$);
 definition:=replace(definition,'if docvy_private.valid_partner_payload(v) is distinct from true then',$fields$
 for key in select unnest(array['qualifications','experienceYears','state','postalCode','consultationFee','workingDays','consultingHours','practicePhone','languages','mapsUrl','services']) loop
  if p_data ? key then v:=v||jsonb_build_object(key,p_data->>key);end if;
 end loop;
 if docvy_private.valid_partner_profile_fields(v) is distinct from true or docvy_private.valid_partner_payload(v) is distinct from true then
$fields$);
 first:=position(' insert into public.docvy_directory_providers(' in definition);
 last:=position(' update docvy_private.partner_applications set status=''approved''' in definition);
 if first=0 or last<=first then raise exception 'Unexpected partner publication block';end if;
 definition:=substr(definition,1,first-1)||$insert$
 if v->>'profileVersion'='2' and not exists(select 1 from storage.objects where bucket_id='docvy-profile-submissions' and name='partner/'||p_id::text||'.webp') then raise exception using errcode='PT400',message='Upload the required professional portrait before approval';end if;
 bio:=coalesce(nullif(btrim(v->>'bio'),''),btrim(v->>'doctorName')||' offers '||(v->>'specialty')||' consultations'||case when coalesce(v->>'facility','')<>'' then ' at '||(v->>'facility') else '' end||' in '||concat_ws(', ',v->>'city',nullif(v->>'state',''))||'.'||case when coalesce(v->>'qualifications','')<>'' then ' Qualifications: '||(v->>'qualifications')||'.' else '' end||case when coalesce(v->>'experienceYears','')<>'' then ' Experience: '||(v->>'experienceYears')||' years.' else '' end);
 if coalesce(v->>'services','')<>'' and position(lower(v->>'services') in lower(bio))=0 then bio:=bio||' Services: '||(v->>'services')||'.';end if;
 insert into public.docvy_directory_providers(provider_id,doctor_name,city,facility,source_url,source_checked,profile_status,consent_given,consent_date,consent_method,registration_number,registration_council,published,specialties,approved_bio,practice_locations,profile_details)
 values(new_id,btrim(v->>'doctorName'),v->>'city',coalesce(v->>'facility',''),coalesce(nullif(v->>'sourceUrl',''),'https://www.docvy.in/doctor/'||new_id),current_date,'claimed',true,application.created_at,'form',v->>'registrationNumber',v->>'registrationCouncil',true,jsonb_build_array(v->>'specialty'),bio,
 jsonb_build_array(jsonb_strip_nulls(jsonb_build_object('city',v->>'city','state',nullif(v->>'state',''),'facility',coalesce(v->>'facility',''),'locality',nullif(v->>'locality',''),
 'address',nullif(v->>'address','')||case when coalesce(v->>'postalCode','')<>'' and position(v->>'postalCode' in v->>'address')=0 then ', '||(v->>'postalCode') else '' end,
 'primary',true,'mapsUrl',nullif(v->>'mapsUrl',''),'practicePhone',nullif(v->>'practicePhone',''),
 'consultingHours',nullif(concat_ws(': ',nullif(v->>'workingDays',''),nullif(v->>'consultingHours','')),''),
 'consultationFee',case when coalesce(v->>'consultationFee','') ~ '^[0-9]{1,6}$' then (v->>'consultationFee')::numeric end,'currency','INR'))),
 jsonb_strip_nulls(jsonb_build_object('qualifications',nullif(v->>'qualifications',''),
 'experienceYears',case when coalesce(v->>'experienceYears','') ~ '^[0-9]{1,2}([.][0-9]{1,2})?$' then (v->>'experienceYears')::numeric end,
 'consultationFee',case when coalesce(v->>'consultationFee','') ~ '^[0-9]{1,6}$' then (v->>'consultationFee')::numeric end,
 'currency','INR','practicePhone',nullif(v->>'practicePhone',''),
 'languages',(select jsonb_agg(btrim(language)) from regexp_split_to_table(coalesce(v->>'languages',''),',') language where btrim(language)<>''),
 'appointmentNote','Request an appointment through DOCVY.')));
$insert$||substr(definition,last);
 execute definition;
end;
$migration$;

-- Same create-only pattern as claim photos; a private pending application must exist.
create or replace function docvy_private.can_submit_partner_photo(object_name text) returns boolean
language sql stable security definer set search_path='' as $function$
 select object_name ~ '^partner/[a-f0-9-]{36}[.]webp$' and exists(
 select 1 from docvy_private.partner_applications a where 'partner/'||a.id::text||'.webp'=object_name and a.status='pending' and a.payload->>'hasPhoto'='true' and a.payload->>'profileVersion'='2');
$function$;
revoke all on function docvy_private.can_submit_partner_photo(text) from public;
grant execute on function docvy_private.can_submit_partner_photo(text) to anon,authenticated;
do $policy$
begin
 drop policy if exists "partner photo create only" on storage.objects;
 create policy "partner photo create only" on storage.objects for insert to anon,authenticated with check(bucket_id='docvy-profile-submissions' and docvy_private.can_submit_partner_photo(name));
end;
$policy$;
