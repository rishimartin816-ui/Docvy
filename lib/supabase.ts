import "server-only";
import { createClient } from "@supabase/supabase-js";
// Service-role key: server only. Never import this file from a client component.
export const sb = () => createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
export async function audit(actor: string, action: string, requestId?: string, meta?: object) {
  await sb().from("audit_log").insert({ actor, action, request_id: requestId, meta }); // never put PII in meta
}
