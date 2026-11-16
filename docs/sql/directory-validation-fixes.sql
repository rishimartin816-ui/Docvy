-- Correct accidental double escaping in the existing phone/email regular expressions.
do $$ begin
 execute replace(pg_get_functiondef('public.docvy_submit_directory_request(uuid,jsonb,text)'::regprocedure),chr(92)||chr(92),chr(92));
end $$;
alter table public.docvy_directory_providers drop constraint docvy_verification_required;
alter table public.docvy_directory_providers add constraint docvy_verification_required
 check(profile_status<>'verified' or (coalesce(length(btrim(registration_number)),0)>0 and coalesce(length(btrim(registration_council)),0)>0 and verified_at is not null));
