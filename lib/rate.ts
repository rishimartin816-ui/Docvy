// Best-effort per-instance limiter. Serverless instances do not share memory, so use Upstash/Redis or Vercel's WAF for real limits.
const hits = new Map<string, number[]>();
export function limited(key: string, max = 8, windowMs = 60_000) {
  const now = Date.now(), a = (hits.get(key) ?? []).filter(t => now - t < windowMs);
  a.push(now); hits.set(key, a); return a.length > max;
}
export const ip = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
