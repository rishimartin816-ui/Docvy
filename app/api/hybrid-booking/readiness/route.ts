import {bookingConfigured,bookingDb,jsonNoStore} from "@/lib/docvy-booking-server";
export const runtime="nodejs";
export const dynamic="force-dynamic";
/** Read-only. Readiness never reserves an appointment or exposes patient information. */
export async function GET(request:Request){
 const provider=new URL(request.url).searchParams.get("provider")??"";
 if(!/^[a-z0-9][a-z0-9-]{1,99}$/.test(provider))return jsonNoStore({bookable:false,reason:"invalid_provider"},400);
 if(!bookingConfigured()||process.env.DOCVY_HYBRID_BOOKING_ENABLED!=="true")return jsonNoStore({bookable:false,reason:"booking_not_activated"});
 try{
  const profiles=await bookingDb("docvy_directory_providers",{query:new URLSearchParams({select:"provider_id",provider_id:"eq."+provider,enabled:"eq.true",published:"eq.true",consent_given:"eq.true",profile_status:"eq.verified",verified_at:"not.is.null",limit:"1"})}) as unknown[];
  if(!profiles.length)return jsonNoStore({bookable:false,reason:"provider_not_eligible"});
  const options=await bookingDb("docvy_booking_provider_options",{query:new URLSearchParams({select:"mode",provider_id:"eq."+provider,limit:"1"})}) as {mode:string}[];
  const mode=options[0]?.mode??"disabled";
  // A request is not a reserved appointment. The slots endpoint rechecks actual availability.
  return jsonNoStore({bookable:false,acceptingRequests:mode==="approval",mode,reason:mode==="instant"?"select_available_slot":mode==="approval"?"clinic_confirmation_required":"provider_not_activated"});
 }catch{return jsonNoStore({bookable:false,reason:"booking_service_unavailable"},503);}
}
