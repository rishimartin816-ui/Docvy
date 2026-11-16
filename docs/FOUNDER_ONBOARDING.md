# Founder access setup — review before applying

This launch needs one DOCVY founder/admin account, not clinic accounts. On 16 November 2026, read-only production checks found **no Auth user and no directory-admin allowlist entry for `rishimartin@docvy.in`**. No account, password or privilege was created or changed.

1. Configure a trusted DOCVY sender/SMTP flow first, then create/invite the founder through Supabase Auth's supported administrative flow. The owner must verify control of `rishimartin@docvy.in` and set their own password securely. Do not share passwords/API keys in chat or commit them.
2. After verification and explicit production-change approval, an authorized operator can run this narrow allowlist change in the intended project. It refuses an unverified/missing Auth account. Test with a synthetic identity in isolated staging first.

```sql
begin;
do $$
begin
  if not exists (
    select 1 from auth.users
    where lower(email) = 'rishimartin@docvy.in'
      and email_confirmed_at is not null
  ) then
    raise exception 'Founder must verify the approved email before admin access is granted';
  end if;
  insert into docvy_private.directory_admins(email)
    values ('rishimartin@docvy.in') on conflict do nothing;
end;
$$;
commit;
```

3. Configure the server-only runtime and all reviewed migrations from `DOCVY_BOOKING_RELEASE.md` in a production-shaped isolated staging deployment. Keep `DOCVY_BOOKING_CLINIC_ACCESS_ENABLED=false`; do not create clinic logins. Verify founder Auth, active-session validation and queue access using the owner-created login. Supplying the email in a request never grants access.
4. Complete the full hosted patient/founder/provider-link/patient-verification journey and real notification delivery before approving production migration/deployment. Only then turn on `DOCVY_HYBRID_BOOKING_ENABLED` and eligible providers in approval mode.

The existing `docvy_is_directory_admin()` requires a verified Auth user, matching private allowlist email and an active session. The appointment dashboard also checks session revocation. Founder access is an administrative privilege; an alert-recipient environment variable is not an authorization rule.
