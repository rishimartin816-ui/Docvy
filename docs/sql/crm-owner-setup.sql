-- Owner setup capabilities are issued only through the authorised project-management connection.
-- Store SHA-256 only. Never put the raw capability in Git, an email or a query string.
create table docvy_private.crm_owner_setup (
 email text primary key check(email='contact@docvy.in'), code_hash text not null check(code_hash ~ '^[a-f0-9]{64}$'),
 expires_at timestamptz not null, used_at timestamptz
);
alter table docvy_private.crm_owner_setup enable row level security;
revoke all on docvy_private.crm_owner_setup from public,anon,authenticated,service_role;
create function public.docvy_claim_owner_setup(p_hash text) returns text
language plpgsql security definer set search_path='' as $$
declare owner_email text;
begin
 if exists(select 1 from auth.users u where lower(u.email)='contact@docvy.in') then raise exception using errcode='PT409',message='Owner account already exists';end if;
 update docvy_private.crm_owner_setup set used_at=now()
  where email='contact@docvy.in' and code_hash=p_hash and expires_at>now() and used_at is null
  returning email into owner_email;
 if owner_email is null then raise exception using errcode='PT403',message='Setup link invalid, expired or already used';end if;
 return owner_email;
end;
$$;
revoke all on function public.docvy_claim_owner_setup(text) from public,anon,authenticated;
grant execute on function public.docvy_claim_owner_setup(text) to service_role;
