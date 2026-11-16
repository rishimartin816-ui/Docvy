import { bookingConfigured, bookingDb, jsonNoStore } from "@/lib/docvy-booking-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!bookingConfigured() || process.env.DOCVY_HYBRID_BOOKING_ENABLED !== "true") {
    return jsonNoStore({ providers: [], enabled: false });
  }
  try {
    const opts = await bookingDb("docvy_booking_provider_options", {
      query: new URLSearchParams({select:"provider_id,mode",mode:"neq.disabled",limit:"200"}),
    }) as Array<{provider_id:string;mode:"approval"|"instant"}>;
    if (!opts.length) return jsonNoStore({providers:[],enabled:true});
    const ids = opts.map(x=>x.provider_id).filter(x=>/^[a-z0-9-]+$/.test(x)).slice(0,200);
    const profiles = await bookingDb("docvy_directory_providers", {
      query:new URLSearchParams({
        select:"provider_id,doctor_name,city,facility,practice_locations",
        provider_id:`in.(${ids.join(",")})`,
        profile_status:"eq.verified",published:"eq.true",enabled:"eq.true",consent_given:"eq.true",
        verified_at:"not.is.null",limit:"200"
      }),
    }) as Array<{provider_id:string;doctor_name:string;city:string;facility:string;practice_locations:{city:string;facility:string}[]}>;
    return jsonNoStore({enabled:true,providers:profiles.flatMap(p=>{
      const locations=p.practice_locations?.length?p.practice_locations:[{city:p.city,facility:p.facility}];
      return locations.filter(l=>p.provider_id!=="mr-sahil-kochale"||["Indore","Online"].includes(l.city)).map(l=>({key:p.provider_id+"|"+l.city+"|"+l.facility,id:p.provider_id,name:p.doctor_name,city:l.city,facility:l.facility,mode:p.provider_id==="mr-sahil-kochale"&&l.city==="Online"?"approval":opts.find(o=>o.provider_id===p.provider_id)?.mode}));
    })});
  } catch {
    return jsonNoStore({providers:[],enabled:false},503);
  }
}
