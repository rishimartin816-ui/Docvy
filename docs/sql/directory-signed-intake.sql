-- Provision the key separately in the private table and encrypted server environment.
create table docvy_private.intake_keys(id boolean primary key default true check(id), secret text not null);
alter table docvy_private.intake_keys enable row level security;
revoke all on docvy_private.intake_keys from public,anon,authenticated;
create function public.docvy_directory_intake(p_operation text,p_body text,p_timestamp bigint,p_signature text) returns text
language plpgsql security definer set search_path='' as $$
declare key text; data jsonb; expected text;
begin
 if p_operation not in ('profile','appointment') or p_operation is null or p_body is null or length(p_body)>12000
 or p_timestamp is null or abs(extract(epoch from now())::bigint-p_timestamp)>300 or p_signature is null then
 raise exception using errcode='PT403',message='Invalid intake signature'; end if;
 select secret into key from docvy_private.intake_keys where id;
 expected:=encode(extensions.hmac(convert_to(p_operation||':'||p_timestamp::text||':'||p_body,'UTF8'),convert_to(key,'UTF8'),'sha256'),'hex');
 if expected is null or p_signature<>expected then raise exception using errcode='PT403',message='Invalid intake signature'; end if;
 data:=p_body::jsonb;
 if p_operation='profile' then
 return public.docvy_submit_profile_request((data->>'requestId')::uuid,data->>'kind',data->'payload',data->>'networkHash');
 end if;
 return public.docvy_submit_directory_request((data->>'requestId')::uuid,data->'payload',data->>'networkHash');
end; $$;
revoke all on function public.docvy_directory_intake(text,text,bigint,text) from public;
grant execute on function public.docvy_directory_intake(text,text,bigint,text) to anon,authenticated;
revoke all on function public.docvy_submit_profile_request(uuid,text,jsonb,text) from public,anon,authenticated;
revoke all on function public.docvy_submit_directory_request(uuid,jsonb,text) from public,anon,authenticated;
