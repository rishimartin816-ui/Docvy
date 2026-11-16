import { bookingConfigured, bookingDb, jsonNoStore } from "@/lib/docvy-booking-server";

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function GET(request:Request) {
  const params=new URL(request.url).searchParams;
  const providerId=params.get("provider")??"",city=params.get("city")??"",facility=params.get("facility")??"";
  if(!city||!facility||city.length>70||facility.length>200)return jsonNoStore({slots:[]},400);
  if(providerId==="mr-sahil-kochale"&&city!=="Indore")return jsonNoStore({slots:[]});
  if (!/^[a-z0-9][a-z0-9-]{1,99}$/.test(providerId)) return jsonNoStore({slots:[]},400);
  if (!bookingConfigured() || process.env.DOCVY_HYBRID_BOOKING_ENABLED!=="true") return jsonNoStore({slots:[]});
  try {
    const opt = await bookingDb("docvy_booking_provider_options",{
      query:new URLSearchParams({select:"mode",provider_id:`eq.${providerId}`,limit:"1"}),
    }) as Array<{mode:string}>;
    if (opt[0]?.mode!=="instant") return jsonNoStore({slots:[]});
    const roster = await bookingDb("crm_doctor_roster",{
      query:new URLSearchParams({select:"id,clinic_id",provider_id:`eq.${providerId}`,present:"eq.true",limit:"20"}),
    }) as Array<{id:string;clinic_id:string}>;
    if (!roster.length) return jsonNoStore({slots:[]});
    const clinics = await bookingDb("crm_clinics",{
      query:new URLSearchParams({select:"id",id:`in.(${roster.map(r=>r.clinic_id).join(",")})`,city:`eq.${city}`,name:`eq.${facility}`,
        booking_enabled:"eq.true",limit:"20"}),
    }) as Array<{id:string}>;
    const clinicIds = new Set(clinics.map(c=>c.id));
    const doctorIds = roster.filter(r=>clinicIds.has(r.clinic_id)).map(r=>r.id);
    if (!doctorIds.length) return jsonNoStore({slots:[]});
    const slots = await bookingDb("crm_slots", {
      query:new URLSearchParams({
        select:"id,doctor_id,starts_at,ends_at",
        doctor_id:`in.(${doctorIds.join(",")})`,
        starts_at:`gt.${new Date().toISOString()}`,
        blocked:"eq.false",order:"starts_at.asc",limit:"100",
      }),
    }) as Array<{id:string;doctor_id:string;starts_at:string;ends_at:string}>;
    if (!slots.length) return jsonNoStore({slots:[]});
    const occupied = await bookingDb("crm_bookings",{
      query:new URLSearchParams({select:"slot_id",slot_id:`in.(${slots.map(s=>s.id).join(",")})`,
        status:"neq.cancelled",limit:"100"}),
    }) as Array<{slot_id:string}>;
    const taken = new Set(occupied.map(b=>b.slot_id));
    return jsonNoStore({slots:slots.filter(s=>!taken.has(s.id)).map(s=>({
      id:s.id,startsAt:s.starts_at,endsAt:s.ends_at,
    }))});
  } catch {
    return jsonNoStore({slots:[],error:"Availability could not be checked"},503);
  }
}
