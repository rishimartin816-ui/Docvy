import {createHash,randomUUID} from 'node:crypto';
import {bookingDb,clientFingerprint,generatePatientEmailCode,publicBookingAuthConfig,jsonNoStore} from "@/lib/docvy-booking-server";
import {resendKey,sendResendEmail} from '@/lib/resend-email';
export const dynamic="force-dynamic";
export async function POST(request:Request){
 if(request.headers.get("origin")!==new URL(request.url).origin)return jsonNoStore({error:"Submit through DOCVY"},403);
 if(process.env.DOCVY_PATIENT_AUTH_ENABLED!=="true")return jsonNoStore({error:"DOCVY contact verification is not configured"},503);
 try{const raw=await request.text();if(raw.length>1000)return jsonNoStore({error:"Request too large"},413);const b=JSON.parse(raw);
 if(typeof b.email!=="string"||b.email.length>254||!/^\S+@\S+\.\S+$/.test(b.email)||!["send","verify"].includes(b.action))return jsonNoStore({error:"Enter a valid email"},400);
 if(b.action==="verify"&&(typeof b.code!=="string"||!/^\d{6,8}$/.test(b.code)))return jsonNoStore({error:"Enter the verification code"},400);
 const receipt=request.headers.get('x-docvy-receipt')??'';
 if(!/^dvpt_[a-f0-9]{64}$/.test(receipt)||!/^DV-[A-F0-9]{16}$/.test(b.reference??''))return jsonNoStore({error:'Open your private appointment tracking link'},401);
 const normalized=b.email.trim().toLowerCase();
 const cases=await bookingDb('docvy_booking_cases',{query:new URLSearchParams({select:'patient_email',reference:'eq.'+b.reference,patient_key_hash:'eq.'+createHash('sha256').update(receipt).digest('hex'),limit:'1'})}) as {patient_email:string|null}[];
 if(!cases[0]?.patient_email||cases[0].patient_email.toLowerCase()!==normalized)return jsonNoStore({error:'Use the email supplied for this appointment'},403);
 const allowed=await bookingDb('rpc/docvy_booking_claim_auth',{method:'POST',body:{p_contact:createHash('sha256').update(normalized).digest('hex'),p_network:clientFingerprint(request),p_kind:b.action}});
 if(allowed!==true)return jsonNoStore({error:'Please wait before requesting or checking another code'},429);
 const config=publicBookingAuthConfig();
 if(b.action==='send'){
  const preview=process.env.VERCEL_ENV!=='production';const to=preview?process.env.DOCVY_BOOKING_STAGING_EMAIL_TO:normalized;
  if(!resendKey()||!to||(preview&&new URL(config.url).hostname!=='pmyzedtpogmhvcrurcau.supabase.co'))return jsonNoStore({error:'Contact verification unavailable'},503);
  const code=await generatePatientEmailCode(normalized);
  const sent=await sendResendEmail({from:'DOCVY <contact@docvy.in>',to,reply_to:'contact@docvy.in',subject:(preview?'[STAGING] ':'')+'Your DOCVY verification code',text:'Your DOCVY verification code is '+code+'. Enter it only on your private DOCVY appointment tracking page. Do not share this code with your doctor or anyone else. If you did not request it, ignore this email.'},'docvy-patient-auth/'+randomUUID());
  if(sent.result!=='accepted')return jsonNoStore({error:'Code email could not be accepted; please try later'},503);
  return jsonNoStore({sent:true});
 }
 const response=await fetch(config.url+"/auth/v1/verify",{method:"POST",headers:{apikey:config.anonKey,"Content-Type":"application/json"},body:JSON.stringify({email:normalized,token:b.code,type:"email"}),cache:"no-store",signal:AbortSignal.timeout(10000)});
 if(!response.ok)return jsonNoStore({error:"Verification could not be completed; check the code or try later"},response.status===429?429:400);
 const data=await response.json();if(typeof data.access_token!=='string')return jsonNoStore({error:'Contact verification unavailable'},503);return jsonNoStore({token:data.access_token});
 }catch{return jsonNoStore({error:"Contact verification unavailable"},503);}
}
