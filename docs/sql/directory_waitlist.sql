begin;
create table public.directory_waitlist (
  city text not null,
  specialty text not null default '',
  contact text not null check (length(contact) between 1 and 254),
  consented_at timestamptz not null default now(),
  primary key (city, specialty, contact)
);
alter table public.directory_waitlist enable row level security;
revoke all on public.directory_waitlist from public, anon, authenticated;
grant select, insert, delete on public.directory_waitlist to service_role;
commit;
