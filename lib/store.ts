// PLACEHOLDER in-memory store. Replace with a managed database before launch.
export type Status = "awaiting_payment" | "payment_verified" | "doctor_review_pending" | "outcome_shared";
export type Req = { ref: string; purpose: string; status: Status; createdAt: string };
const g = globalThis as unknown as { __dv?: Map<string, Req>; __ev?: Set<string> };
export const db = (g.__dv ??= new Map<string, Req>());
export const seenEvents = (g.__ev ??= new Set<string>());
export const makeRef = () => "DVY-" + Math.random().toString(36).slice(2, 8).toUpperCase();
