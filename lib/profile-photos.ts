import "server-only";
import { directoryIntakeConfig } from "./directory-intake";
export function webpPhoto(value: unknown) {
  if (typeof value !== "string" || value.length > 2800000 || !/^data:image\/webp;base64,[A-Za-z0-9+/=]+$/.test(value)) return null;
  const bytes = Buffer.from(value.slice(value.indexOf(",") + 1), "base64");
  return bytes.length <= 2097152 && bytes.subarray(0,4).toString() === "RIFF" && bytes.subarray(8,12).toString() === "WEBP" ? bytes : null;
}
export async function storagePhoto(bucket: string, path: string, token?: string, bytes?: Buffer) {
  const config = directoryIntakeConfig();
  if (!config) throw new Error("Directory unavailable");
  return fetch(new URL("/storage/v1/object/" + bucket + "/" + path, config.url), {
    method: bytes ? "POST" : "GET", headers: { apikey: config.key, ...(token ? { Authorization: "Bearer " + token } : {}), ...(bytes ? { "Content-Type": "image/webp", "x-upsert": "false" } : {}) },
    ...(bytes ? { body: new Uint8Array(bytes) } : {}), cache: "no-store", signal: AbortSignal.timeout(10000),
  });
}
