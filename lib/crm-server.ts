import "server-only";
import { NextRequest } from "next/server";
import { clinicCrmConfig, crmUuid as uuid } from "@/lib/clinic-crm-config";
export async function database(path: string, body?: object, token?: string) {
    const target = clinicCrmConfig()!;
    return fetch(new URL(path, target.url), {
        method: body ? "POST" : "GET",
        headers: { apikey: target.key, Authorization: "Bearer " + (token ?? target.key), "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
    });
}
export function requestToken(request: NextRequest) {
    return request.headers.get("authorization")?.match(/^Bearer (\S+)$/i)?.[1];
}
export async function staff(clinicId: string, token?: string) {
    if (!token)
        return null;
    const user = await database("/auth/v1/user", undefined, token);
    if (!user.ok)
        return null;
    const { id } = await user.json();
    if (typeof id !== "string" || !uuid.test(id))
        return null;
    const membership = await database("/rest/v1/crm_staff?select=role&clinic_id=eq." + clinicId + "&user_id=eq." + id + (clinicCrmConfig()?.staging ? "" : "&active=eq.true"));
    if (!membership.ok)
        return null;
    const [access] = await membership.json();
    return access ? { id, role: access.role } : null;
}
