import "server-only";
import { cache } from "react";
import { directoryIntakeConfig } from "./directory-intake";
import type { ProviderCandidate } from "./provider-candidates";

/** Request-scoped memoization only. Publication and removal decisions are never cached. */
export const getDirectoryDoctors = cache(async (): Promise<ProviderCandidate[]> => {
  const config = directoryIntakeConfig();
  if (!config) return [];
  try {
    const response = await fetch(new URL("/rest/v1/rpc/docvy_public_directory", config.url), {
      method: "POST", headers: { apikey: config.key, "Content-Type": "application/json" }, body: "{}",
      cache: "no-store", signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return [];
    const doctors: unknown = await response.json();
    return Array.isArray(doctors) ? doctors as ProviderCandidate[] : [];
  } catch { return []; }
});
