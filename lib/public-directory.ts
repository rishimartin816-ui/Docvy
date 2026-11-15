import "server-only";
import { cache } from "react";
import { parsePublicDoctors } from "@/lib/public-doctor-policy";

/** Adapted from preview/doctor-glass-claim. Only the existing anonymous public RPC. */
export const getDirectoryDoctors = cache(async () => {
  const url = process.env.DOCVY_DIRECTORY_INTAKE_URL || process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.DOCVY_DIRECTORY_INTAKE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (process.env.DOCVY_DIRECTORY_INTAKE_ENABLED === "false" || url !== "https://cxyscxjauxoizvvllmfu.supabase.co" || !key) {
    throw new Error("Public directory connection unavailable");
  }
  // Never accept a privileged credential, even in a server-only configuration.
  let anonymous = key.startsWith("sb_publishable_");
  if (!anonymous) {
    try { anonymous = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString()).role === "anon"; } catch { /* Invalid key. */ }
  }
  if (!anonymous) throw new Error("Public directory requires a publishable key");
  const response = await fetch(new URL("/rest/v1/rpc/docvy_public_directory", url), {
    method: "POST", headers: { apikey: key, "Content-Type": "application/json" }, body: "{}",
    cache: "no-store", signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("Public directory unavailable");
  return parsePublicDoctors(await response.json());
});
