import "server-only";
import { createHmac } from "node:crypto";
import { directoryIntakeConfig } from "./directory-intake";

export async function directoryRpc(name: string, body: Record<string, unknown>, token?: string) {
  const config = directoryIntakeConfig();
  if (!config) throw new Error("Directory connection unavailable");
  return fetch(new URL("/rest/v1/rpc/" + name, config.url), {
    method: "POST", headers: { apikey: config.key, "Content-Type": "application/json", ...(token ? { Authorization: "Bearer " + token } : {}) },
    body: JSON.stringify(body), cache: "no-store", signal: AbortSignal.timeout(10000),
  });
}

export function sameOrigin(request: Request) {
  return request.headers.get("origin") === new URL(request.url).origin;
}

export function signedDirectoryWrite(operation: "profile" | "appointment", body: Record<string, unknown>) {
  const secret = process.env.DOCVY_DIRECTORY_WRITE_SECRET;
  if (!secret) throw new Error("Directory write connection unavailable");
  const serialized = JSON.stringify(body);
  const timestamp = Math.floor(Date.now() / 1000);
  return directoryRpc("docvy_directory_intake", {
    p_operation: operation, p_body: serialized, p_timestamp: timestamp,
    p_signature: createHmac("sha256", secret).update(operation + ":" + timestamp + ":" + serialized).digest("hex"),
  });
}

export async function jsonBody(request: Request, limit = 12000): Promise<Record<string, unknown> | null> {
  if (!request.headers.get("content-type")?.includes("application/json") || Number(request.headers.get("content-length") || 0) > limit) return null;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > limit) return null;
    const data: unknown = JSON.parse(raw);
    return data && typeof data === "object" && !Array.isArray(data) ? data as Record<string, unknown> : null;
  } catch { return null; }
}
