import {createHash,randomBytes} from "node:crypto";
import {bookingDb,bookingPermissions,jsonNoStore} from "@/lib/docvy-booking-server";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function POST(request:Request){
 if(request.headers.get("origin")!==new URL(request.url).origin)return jsonNoStore({error:"Submit through DOCVY"},403);
 try{
  const permission=await bookingPermissions(request.headers.get("authorization")?.replace(/^Bearer /,"")??"");
  if(!permission?.isAdmin)return jsonNoStore({error:"DOCVY founder access required"},403);
  const raw=await request.text();if(raw.length>300)return jsonNoStore({error:"Request too large"},413);
  const input=JSON.parse(raw);if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.caseId??""))return jsonNoStore({error:"Invalid appointment"},400);
  if(input.action==="revoke"){
   await bookingDb("rpc/docvy_booking_revoke_doctor_links",{method:"POST",body:{p_case_id:input.caseId,p_actor:permission.id}});
   return jsonNoStore({ok:true});
  }
  if(input.action!=="issue")return jsonNoStore({error:"Unsupported action"},400);
  const token="dvdr_"+randomBytes(32).toString("hex");
  const result=await bookingDb("rpc/docvy_booking_issue_doctor_link",{method:"POST",body:{p_case_id:input.caseId,p_actor:permission.id,p_hash:createHash("sha256").update(token).digest("hex")}}) as {expiresAt:string};
  return jsonNoStore({ok:true,url:new URL(request.url).origin+"/appointments/doctor#link="+token,expiresAt:result.expiresAt});
 }catch{return jsonNoStore({error:"Could not update provider link; confirm this appointment first"},409);}
}
