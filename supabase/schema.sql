-- Run in the Supabase SQL editor. Choose an India (Mumbai) region for the project.
create extension if not exists pgcrypto;
create table requests (
  id uuid primary key default gen_random_uuid(),
  ref text unique not null,
  status_token text unique not null,          -- unguessable; used in public status URLs
  purpose text not null check (purpose in ('work','college','other')),
  full_name text not null, email text not null, mobile text not null,
  status text not null default 'awaiting_payment' check (status in
    ('awaiting_payment','payment_failed','doctor_review_pending','outcome_shared','refund_pending','refunded')),
  created_at timestamptz not null default now());
create table payments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references requests(id),
  order_id text unique not null, payment_id text, amount int not null,
  status text not null default 'created', created_at timestamptz not null default now());
create table payment_events (event_id text primary key, type text not null, received_at timestamptz not null default now());
create table staff (
  user_id uuid primary key references auth.users(id), role text not null check (role in ('admin','doctor')),
  registration_verified boolean not null default false, verified_by uuid, verified_at timestamptz);
create table reviews (
  id uuid primary key default gen_random_uuid(), request_id uuid not null references requests(id),
  doctor_id uuid not null references staff(user_id), decision text check (decision in ('approved','declined','needs_more')),
  decided_at timestamptz);
create table audit_log (id bigserial primary key, actor text not null, action text not null, request_id uuid, meta jsonb, at timestamptz not null default now());
-- Deny everything to the public API keys. Only the server-side service-role key can read or write.
alter table requests enable row level security; alter table payments enable row level security;
alter table payment_events enable row level security; alter table staff enable row level security;
alter table reviews enable row level security; alter table audit_log enable row level security;
revoke all on all tables in schema public from anon, authenticated;
