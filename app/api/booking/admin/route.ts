import { bookingConfigured, bookingDb, bookingPermissions, jsonNoStore } from "@/lib/docvy-booking-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function tokenFrom(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  return auth.startsWith("Bearer ") ? auth.slice(7) : "";
}
const idPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(request: Request) {
  if (!bookingConfigured()) return jsonNoStore({error:"Booking backend not configured"},503);
  try {
    const permission = await bookingPermissions(tokenFrom(request));
    if (!permission || (!permission.isAdmin && permission.clinicIds.length===0)) {
      return jsonNoStore({error:"Unauthorized"},401);
    }
    const query = new URLSearchParams({
      select:"id,reference,provider_id,doctor_name,city,facility,clinic_id,mode,status,patient_name,patient_mobile,patient_email,preferred_date,preferred_time,confirmed_starts_at,created_at,updated_at",
      order:"created_at.desc",limit:"150",
    });
    if (!permission.isAdmin) query.set("clinic_id",`in.(${permission.clinicIds.join(",")})`);
    const cases = await bookingDb("docvy_booking_cases", {query}) as unknown[];
    const profiles = permission.isAdmin ? await bookingDb("docvy_booking_provider_options", {
      query:new URLSearchParams({select:"provider_id,mode,enabled_at",limit:"200"}),
    }) : [];
    const candidates = permission.isAdmin ? await bookingDb("docvy_directory_providers",{
      query:new URLSearchParams({
        select:"provider_id,doctor_name,city,facility",
        profile_status:"eq.verified",consent_given:"eq.true",published:"eq.true",
        enabled:"eq.true",verified_at:"not.is.null",limit:"200",
      }),
    }) : [];
    return jsonNoStore({ok:true,isAdmin:permission.isAdmin,cases,profiles,candidates});
  } catch {
    return jsonNoStore({error:"Unable to load appointment queue"},503);
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return jsonNoStore({error:"Invalid origin"},403);
  if (!bookingConfigured()) return jsonNoStore({error:"Booking backend not configured"},503);
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw)>4000) return jsonNoStore({error:"Request too large"},413);
    const input = JSON.parse(raw) as Record<string,unknown>;
    const permission = await bookingPermissions(tokenFrom(request));
    if (!permission) return jsonNoStore({error:"Unauthorized"},401);

    if (input.action === "mode") {
      if (!permission.isAdmin) return jsonNoStore({error:"Admin permission required"},403);
      const providerId = String(input.providerId ?? "");
      const mode = String(input.mode ?? "");
      if (!/^[a-z0-9][a-z0-9-]{1,99}$/.test(providerId) ||
          !["disabled","approval","instant"].includes(mode)) return jsonNoStore({error:"Invalid booking option"},400);
      const eligible = await bookingDb("docvy_directory_providers", {
        query:new URLSearchParams({
          select:"provider_id",provider_id:`eq.${providerId}`,
          profile_status:"eq.verified",published:"eq.true",enabled:"eq.true",consent_given:"eq.true",verified_at:"not.is.null",limit:"1",
        }),
      }) as unknown[];
      if (!eligible.length) return jsonNoStore({error:"Provider verification incomplete"},409);
      if (mode==="instant") {
        const roster = await bookingDb("crm_doctor_roster", {
          query:new URLSearchParams({select:"id,clinic_id",provider_id:`eq.${providerId}`,present:"eq.true",limit:"25"}),
        }) as Array<{id:string;clinic_id:string}>;
        if (!roster.length) return jsonNoStore({error:"No connected clinic roster"},409);
        const slots = await bookingDb("crm_slots", {
          query:new URLSearchParams({
            select:"id",doctor_id:`in.(${roster.map(r=>r.id).join(",")})`,
            blocked:"eq.false",starts_at:`gt.${new Date().toISOString()}`,limit:"1",
          }),
        }) as unknown[];
        if (!slots.length) return jsonNoStore({error:"No managed future slots"},409);
        // Clinic booking_enabled is rechecked transactionally inside the database RPC.
      }
      await bookingDb("docvy_booking_provider_options", {
        method:"POST",query:new URLSearchParams({on_conflict:"provider_id"}),
        body:[{provider_id:providerId,mode,
          enabled_by:mode==="disabled"?null:permission.id,
          enabled_at:mode==="disabled"?null:new Date().toISOString(),
          updated_at:new Date().toISOString(),
        }],
      });
      return jsonNoStore({ok:true,providerId,mode});
    }

    if (input.action === "transition") {
      const caseId = String(input.caseId??"");
      const status = String(input.status??"");
      const note = String(input.note??"").trim().slice(0,500);
      const confirmedStart = typeof input.confirmedStart==="string" && !Number.isNaN(Date.parse(input.confirmedStart))
        ? input.confirmedStart : null;
      if (!idPattern.test(caseId) || !["confirmed","declined","cancelled","completed_reported","no_show_reported","disputed"].includes(status)) {
        return jsonNoStore({error:"Unsupported status change"},400);
      }
      if (status==="confirmed" && (!confirmedStart || !note)) {
        return jsonNoStore({error:"Confirmation requires date/time and clinic confirmation note"},400);
      }
      const rows = await bookingDb("docvy_booking_cases", {
        query:new URLSearchParams({select:"id,clinic_id,status",id:`eq.${caseId}`,limit:"1"}),
      }) as Array<{id:string;clinic_id:string|null;status:string}>;
      const appointment = rows[0];
      if (!appointment) return jsonNoStore({error:"Appointment not found"},404);
      const isClinic = appointment.clinic_id && permission.clinicIds.includes(appointment.clinic_id);
      if (!permission.isAdmin && !isClinic) return jsonNoStore({error:"Not authorized for this clinic"},403);
      const result = await bookingDb("rpc/docvy_booking_transition",{
        method:"POST",
        body:{
          p_case_id:caseId,p_actor:permission.id,p_role:permission.isAdmin?"docvy":"clinic",
          p_status:status,p_note:note,p_confirmed_start:confirmedStart,
        },
      });
      return jsonNoStore({ok:true,result});
    }
    return jsonNoStore({error:"Unknown action"},400);
  } catch {
    return jsonNoStore({error:"Update failed or status transition not permitted"},422);
  }
}
