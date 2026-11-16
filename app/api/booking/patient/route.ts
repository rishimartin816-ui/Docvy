import {createHash} from "node:crypto";
import {bookingDb,jsonNoStore,verifiedBookingUser} from "@/lib/docvy-booking-server";
export const dynamic="force-dynamic";
function hash(request:Request){const key=request.headers.get("x-docvy-receipt")||request.headers.get("authorization")?.replace(/^Bearer /,"");if(!key||!/^dvpt_[a-f0-9]{64}$/.test(key))return null;return createHash("sha256").update(key).digest("hex");}
export async function GET(request:Request){const key=hash(request),ref=new URL(request.url).searchParams.get("reference");if(!key||!/^DV-[A-F0-9]{16}$/.test(ref??""))return jsonNoStore({error:"Invalid receipt"},401);try{return jsonNoStore({appointment:await bookingDb("rpc/docvy_booking_patient_view",{method:"POST",body:{p_reference:ref,p_key_hash:key}})});}catch{return jsonNoStore({error:"Receipt unavailable"},404);}}
export async function POST(request:Request){if(request.headers.get("origin")!==new URL(request.url).origin)return jsonNoStore({error:"Submit through DOCVY"},403);const key=hash(request);if(!key)return jsonNoStore({error:"Invalid receipt"},401);try{const raw=await request.text();if(raw.length>500)return jsonNoStore({error:"Request too large"},413);const body=JSON.parse(raw);if(!/^DV-[A-F0-9]{16}$/.test(body.reference??"")||!["check_in","attended","did_not_attend","cancel","dispute"].includes(body.action))return jsonNoStore({error:"Invalid action"},400);let patient=null;
 if(body.action!=="cancel"){
 patient=await verifiedBookingUser(request.headers.get("authorization")?.replace(/^Bearer /,"")??"");
 if(!patient)return jsonNoStore({error:"Verify your appointment contact before updating visit evidence"},401);
 const rows=await bookingDb("docvy_booking_cases",{query:new URLSearchParams({select:"patient_email,patient_mobile",reference:"eq."+body.reference,patient_key_hash:"eq."+key,limit:"1"})}) as {patient_email:string|null;patient_mobile:string}[];
 const c=rows[0];const email=patient.email&&c?.patient_email&&patient.email.toLowerCase()===c.patient_email.toLowerCase();
 const phone=patient.phone&&c&&patient.phone.replace(/\D/g,"").replace(/^91/,"")===c.patient_mobile;
 if(!email&&!phone)return jsonNoStore({error:"Verified contact does not match this appointment"},403);
 }
 return jsonNoStore({appointment:await bookingDb("rpc/docvy_booking_patient_action",{method:"POST",body:{p_reference:body.reference,p_key_hash:key,p_action:body.action,p_patient_actor:patient?.id??null}})});}catch{return jsonNoStore({error:"This action is unavailable for the appointment"},409);}}
