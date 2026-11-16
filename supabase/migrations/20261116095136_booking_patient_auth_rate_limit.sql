-- Private throttling for receipt-bound Auth codes sent through existing Resend.
begin;
create table public.docvy_booking_auth_attempts (
 id bigint generated always as identity primary key,
 contact_hash text not null, network_hash text not null,
 kind text not null check(kind in ('send','verify')),
 created_at timestamptz not null default clock_timestamp()
);
create index docvy_booking_auth_contact on public.docvy_booking_auth_attempts(contact_hash,kind,created_at);
create index docvy_booking_auth_network on public.docvy_booking_auth_attempts(network_hash,created_at);
create index docvy_booking_auth_expiry on public.docvy_booking_auth_attempts(created_at);
alter table public.docvy_booking_auth_attempts enable row level security;
revoke all on public.docvy_booking_auth_attempts from public,anon,authenticated;
revoke all on sequence public.docvy_booking_auth_attempts_id_seq from public,anon,authenticated;
grant select,insert,delete on public.docvy_booking_auth_attempts to service_role;
grant usage,select on sequence public.docvy_booking_auth_attempts_id_seq to service_role;
create function public.docvy_booking_claim_auth(p_contact text,p_network text,p_kind text) returns boolean
language plpgsql security invoker set search_path='' as $$
begin
 if p_contact is null or p_contact !~ '^[a-f0-9]{64}$' or p_network is null or p_network !~ '^[a-f0-9]{64}$' or p_kind is null or p_kind not in ('send','verify') then raise exception 'invalid_auth_claim';end if;
 perform pg_advisory_xact_lock(hashtextextended('docvy-otp-contact:'||p_contact,0));
 perform pg_advisory_xact_lock(hashtextextended('docvy-otp-network:'||p_network,0));
 delete from public.docvy_booking_auth_attempts where created_at<clock_timestamp()-interval '1 day';
 if (select count(*) from public.docvy_booking_auth_attempts where network_hash=p_network and created_at>clock_timestamp()-interval '1 hour')>=30 then return false;end if;
 if p_kind='send' and (exists(select 1 from public.docvy_booking_auth_attempts where contact_hash=p_contact and kind='send' and created_at>clock_timestamp()-interval '1 minute') or (select count(*) from public.docvy_booking_auth_attempts where contact_hash=p_contact and kind='send' and created_at>clock_timestamp()-interval '1 hour')>=5) then return false;end if;
 if p_kind='verify' and (select count(*) from public.docvy_booking_auth_attempts where contact_hash=p_contact and kind='verify' and created_at>clock_timestamp()-interval '15 minutes')>=5 then return false;end if;
 insert into public.docvy_booking_auth_attempts(contact_hash,network_hash,kind) values(p_contact,p_network,p_kind);
 return true;
end $$;
revoke all on function public.docvy_booking_claim_auth(text,text,text) from public,anon,authenticated;
grant execute on function public.docvy_booking_claim_auth(text,text,text) to service_role;
commit;
