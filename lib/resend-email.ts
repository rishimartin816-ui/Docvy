import "server-only";
export type EmailEnvelope={from:string;to:string;subject:string;text:string;reply_to:string};
/** Same credential aliases as the existing Partner with us integration. */
export function resendKey(){return process.env.RESEND_API_KEY||process.env.resend_api_key;}
export async function sendResendEmail(envelope:EmailEnvelope,idempotencyKey:string){
 const key=resendKey();if(!key)throw Error("resend_not_configured");
 try{
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json","Idempotency-Key":idempotencyKey},body:JSON.stringify({...envelope,to:[envelope.to]}),cache:"no-store",signal:AbortSignal.timeout(8000)});
  if(!response.ok)return {result:(response.status===429||response.status>=500?"retry":"failed") as "retry"|"failed",error:"resend_http_"+response.status};
  const body:unknown=await response.json();const id=body&&typeof body==="object"&&"id" in body?body.id:null;
  return typeof id==="string"&&/^[0-9a-f-]{36}$/i.test(id)?{result:"accepted" as const,providerId:id}:{result:"retry" as const,error:"resend_invalid_response"};
 }catch{return {result:"retry" as const,error:"resend_transport_unavailable"};}
}
