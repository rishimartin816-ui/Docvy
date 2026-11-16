import {createHash} from "node:crypto";
import {bookingDb,jsonNoStore} from "@/lib/docvy-booking-server";
export const runtime="nodejs";
export const dynamic="force-dynamic";
function key(request:Request){const token=request.headers.get("x-docvy-doctor-link")??"";return /^dvdr_[a-f0-9]{64}$/.test(token)?createHash("sha256").update(token).digest("hex"):null;}
export async function GET(request:Request){const hash=key(request);if(!hash)return jsonNoStore({error:"Invalid appointment link"},401);try{return jsonNoStore({appointment:await bookingDb("rpc/docvy_booking_doctor_view",{method:"POST",body:{p_hash:hash}})});}catch{return jsonNoStore({error:"Link expired, revoked or unavailable; contact DOCVY"},404);}}
export async function POST(request:Request){
 if(request.headers.get("origin")!==new URL(request.url).origin)return jsonNoStore({error:"Submit through DOCVY"},403);
 const hash=key(request);if(!hash)return jsonNoStore({error:"Invalid appointment link"},401);
 try{const raw=await request.text();if(raw.length>200)return jsonNoStore({error:"Request too large"},413);const input=JSON.parse(raw);
 if(!["completed_reported","no_show_reported","cancelled"].includes(input.status))return jsonNoStore({error:"Unsupported report"},400);
 return jsonNoStore({appointment:await bookingDb("rpc/docvy_booking_doctor_report",{method:"POST",body:{p_hash:hash,p_status:input.status}})});
 }catch{return jsonNoStore({error:"Report not accepted: check the visit time, link validity and whether an outcome was already submitted"},409);}
}
