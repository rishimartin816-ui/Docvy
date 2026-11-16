import "server-only";
import { createHmac } from "node:crypto";

type Json = Record<string, unknown>;

function config() {
  const base = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) throw new Error("Booking database is not configured");
  const url = new URL(base);
  if (url.protocol !== "https:" || !["cxyscxjauxoizvvllmfu.supabase.co", "pmyzedtpogmhvcrurcau.supabase.co"].includes(url.hostname) || url.username || url.password || url.port || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("Invalid booking database URL");
  }
  return { url, key };
}

export function bookingConfigured() {
  return Boolean((process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL) && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function bookingDb(path: string, options: { method?: "GET" | "POST" | "PATCH"; query?: URLSearchParams; body?: unknown; bearer?: string } = {}) {
  const { url, key } = config();
  const endpoint = new URL(`/rest/v1/${path}`, url);
  if (options.query) endpoint.search = options.query.toString();
  const response = await fetch(endpoint, {
    method: options.method ?? "GET",
    headers: {
      apikey: key,
      Authorization: `Bearer ${options.bearer ?? key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      Prefer: options.method === "POST" && options.query?.get("on_conflict") ? "resolution=merge-duplicates,return=representation" : "return=representation",
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  const result: unknown = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`booking_database_error_${response.status}`);
  return result;
}

export async function verifiedBookingUser(accessToken: string) {
  if (!accessToken || accessToken.length > 4096) return null;
  const { url, key } = config();
  const response = await fetch(new URL("/auth/v1/user", url), {
    headers: { apikey: key, Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
    signal: AbortSignal.timeout(7000),
  });
  if (!response.ok) return null;
  const user = await response.json().catch(() => null) as { id?:string; email?:string;phone?:string;email_confirmed_at?:string;phone_confirmed_at?:string } | null;
  if(!user?.id||(!user.email_confirmed_at&&!user.phone_confirmed_at))return null;
  const active=await bookingDb("rpc/docvy_booking_session_active",{method:"POST",body:{},bearer:accessToken});
  if(active!==true)return null;
  return user?.id && (user.email_confirmed_at||user.phone_confirmed_at) ? {id:user.id,accessToken,email:user.email_confirmed_at?user.email:null,phone:user.phone_confirmed_at?user.phone:null} : null;
}

export async function bookingPermissions(token: string) {
  const user = await verifiedBookingUser(token);
  if (!user) return null;
  const admin = await bookingDb("rpc/docvy_is_directory_admin", {
    method: "POST", bearer: token, body: {},
  });
  const isAdmin = admin === true;
  if (founderManagedBooking() && !isAdmin) return null;
  const rows = isAdmin && founderManagedBooking() ? [] : await bookingDb("crm_staff", {
    query: new URLSearchParams({
      select: "clinic_id,role,doctor_id",
      user_id: `eq.${user.id}`,
      active: "eq.true",
      limit: "100",
    }),
  }) as Array<{ clinic_id: string; role: string; doctor_id?: string | null }>;
  const managers=rows.filter(row=>["owner","clinic_admin","manager","receptionist","scheduler"].includes(row.role));
  return { id:user.id,isAdmin,clinicIds:rows.map(row=>row.clinic_id),manageClinicIds:managers.map(row=>row.clinic_id),doctorIds:rows.filter(row=>row.role==="doctor"&&row.doctor_id).map(row=>row.doctor_id!),roles:rows };
}

export function clientFingerprint(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const secret = process.env.DOCVY_BOOKING_RATE_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret || secret.length < 32) throw new Error("Rate-limit secret is not configured");
  return createHmac("sha256", secret).update("docvy-booking-rate-v1:" + forwarded).digest("hex");
}

export function jsonNoStore(body: Json, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "private, no-store", "X-Robots-Tag":"noindex, nofollow", "Referrer-Policy":"no-referrer", "X-Content-Type-Options":"nosniff" } });
}

export function patientReceiptKey(idempotencyKey:string){
 const secret=process.env.DOCVY_BOOKING_PATIENT_SECRET;
 if(!secret||secret.length<32)throw new Error("Patient receipt protection is not configured");
 return "dvpt_"+createHmac("sha256",secret).update("docvy-patient-v1:"+idempotencyKey).digest("hex");
}

export function publicBookingAuthConfig(){
 const {url}=config();
 const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||process.env.SUPABASE_PUBLISHABLE_KEY||process.env.SUPABASE_ANON_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!key)throw new Error("Public auth key missing");
 if(!key.startsWith("sb_publishable_")) { let role;try{role=JSON.parse(Buffer.from(key.split(".")[1],"base64url").toString()).role;}catch{throw new Error("Invalid public key");}if(role!=="anon")throw new Error("Privileged key cannot be public"); }
 return {url:url.origin,anonKey:key};
}

export async function endBookingSession(token:string){
 const {url,key}=config();
 const r=await fetch(new URL("/auth/v1/logout?scope=local",url),{method:"POST",headers:{apikey:key,Authorization:"Bearer "+token},cache:"no-store",signal:AbortSignal.timeout(7000)});
 return r.ok||r.status===401||r.status===403;
}

export async function activeProviderBookingMode(provider:string){if(process.env.DOCVY_HYBRID_BOOKING_ENABLED!=="true"||!bookingConfigured())return "disabled";try{const rows=await bookingDb("docvy_booking_provider_options",{query:new URLSearchParams({select:"mode",provider_id:"eq."+provider,limit:"1"})}) as {mode:string}[];return rows[0]?.mode && rows[0].mode!=="disabled" && founderManagedBooking()?"approval":rows[0]?.mode??"disabled";}catch{return "disabled";}}

/** Clinic booking access is opt-in; the approved launch is managed only by DOCVY. */
export function founderManagedBooking(){return process.env.DOCVY_BOOKING_CLINIC_ACCESS_ENABLED!=="true";}
