import "server-only";
import {createHash} from "node:crypto";
import {waitUntil} from "@vercel/functions";
import {bookingDb,patientReceiptKey} from "@/lib/docvy-booking-server";
import {resendKey,sendResendEmail,type EmailEnvelope} from "@/lib/resend-email";
type Snapshot={reference:string;doctor:string;city:string;facility:string;patientEmail:string|null;startsAt:string|null;preferredDate:string|null;preferredTime:string|null;idempotencyKey:string;patientHash:string;event:string};
type Job={id:number;case_id:string;status:string;recipient_type:"patient"|"admin";claim_token:string;delivery_payload:Snapshot};
const email=(v:string)=>/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(v);
const events:Record<string,string>={requested:"Request received — awaiting DOCVY confirmation",confirmed:"Appointment confirmed by DOCVY",declined:"Appointment request declined",expired:"Appointment request expired",cancelled:"Appointment cancelled",completed_reported:"Provider reported attendance — patient confirmation pending",completed_verified:"Patient and provider attendance reports agree",no_show_reported:"Provider reported non-attendance — patient response requested",disputed:"Appointment reports require DOCVY review",patient_check_in:"Patient reported arrival",patient_attended:"Patient reported attendance",patient_did_not_attend:"Patient reported non-attendance",patient_cancel:"Patient cancelled the appointment",patient_dispute:"Patient requested DOCVY review",appointment_reminder:"Upcoming DOCVY appointment",visit_feedback:"Please verify your DOCVY visit",provider_outcome_due:"Provider outcome update is due"};
function stagingRecipient(){return process.env.DOCVY_BOOKING_STAGING_EMAIL_TO??"";}
function trackingOrigin(){if(process.env.VERCEL_ENV==="production")return "https://www.docvy.in";const u=new URL(process.env.DOCVY_BOOKING_STAGING_SITE_URL??("https://"+process.env.VERCEL_URL));if(u.protocol!=="https:"||!u.hostname.endsWith(".vercel.app")||u.username||u.password||u.port||u.pathname!=="/"||u.search||u.hash)throw Error("invalid_staging_site");return u.origin;}
export function bookingEmailReady(){
 if(process.env.DOCVY_BOOKING_EMAIL_ENABLED!=="true"||process.env.DOCVY_HYBRID_BOOKING_ENABLED!=="true"||!resendKey()||(process.env.DOCVY_BOOKING_PATIENT_SECRET?.length??0)<32)return false;
 if(process.env.VERCEL_ENV==="production")return true;
 // Preview may never email production appointment data or arbitrary patient addresses.
 try{trackingOrigin();return new URL(process.env.SUPABASE_URL??process.env.NEXT_PUBLIC_SUPABASE_URL??"").hostname==="pmyzedtpogmhvcrurcau.supabase.co"&&email(stagingRecipient());}catch{return false;}
}
function envelopeFor(job:Job):EmailEnvelope|null{
 const s=job.delivery_payload;if(!s||!/^DV-[A-F0-9]{16}$/.test(s.reference)||typeof events[job.status]!=="string")throw Error("invalid_event_snapshot");
 const to=process.env.VERCEL_ENV!=="production"?stagingRecipient():job.recipient_type==="patient"?s.patientEmail:process.env.DOCVY_BOOKING_ALERT_EMAIL||"rishimartin@docvy.in";
 if(!to||!email(to))return null;
 const isPatient=job.recipient_type==="patient";
 const lines=["DOCVY appointment reference: "+s.reference,events[job.status],"Doctor: "+s.doctor,"Location: "+s.facility+", "+s.city];
 if(job.status==="requested")lines.push("Preferred time: "+(s.preferredDate??"Not supplied")+" "+(s.preferredTime??"")+" IST","This is a request only. No slot is reserved. Wait for DOCVY confirmation before travelling.");
 else if(s.startsAt)lines.push("Appointment time: "+new Date(s.startsAt).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})+" IST");
 if(["completed_reported","no_show_reported","visit_feedback"].includes(job.status))lines.push("Please provide your own visit response. Provider reports alone do not verify attendance.");
 if(!isPatient)lines.push("Review privately: "+trackingOrigin()+"/founder");
 lines.push("Check the DOCVY tracking page for the latest status. Contact contact@docvy.in for help.","Consultation fees are paid to the healthcare provider; DOCVY does not collect them here.");
 if(isPatient)lines.push("Private tracking link — keep it safe: "+trackingOrigin()+"/appointments/track#reference="+encodeURIComponent(s.reference)+"&receipt=");
 return {from:"DOCVY <contact@docvy.in>",to,reply_to:"contact@docvy.in",subject:(process.env.VERCEL_ENV!=="production"?"[STAGING] ":"")+"DOCVY appointment update — "+s.reference,text:lines.join("\n")};
}
async function finish(job:Job,result:string,providerId?:string,error?:string){return bookingDb("rpc/docvy_booking_finish_email",{method:"POST",body:{p_id:job.id,p_claim:job.claim_token,p_result:result,p_provider_id:providerId??null,p_error:error??null}});}
async function processJob(job:Job){
 try{
  const rows=await bookingDb("docvy_booking_cases",{query:new URLSearchParams({select:"status,patient_response_at",id:"eq."+job.case_id,limit:"1"})}) as {status:string;patient_response_at:string|null}[];
  const current=rows[0];
  if(!current||(["requested","confirmed"].includes(job.status)&&current.status!==job.status)||(job.status==="appointment_reminder"&&current.status!=="confirmed")||(job.status==="provider_outcome_due"&&current.status!=="confirmed")||(job.status==="visit_feedback"&&(current.patient_response_at||!["confirmed","completed_reported","no_show_reported"].includes(current.status)))){await finish(job,"skipped",undefined,"event_superseded");return "skipped";}
  const candidate=envelopeFor(job);if(!candidate){await finish(job,"skipped",undefined,"recipient_unavailable");return "skipped";}
  const frozen=await bookingDb("rpc/docvy_booking_prepare_email",{method:"POST",body:{p_id:job.id,p_claim:job.claim_token,p_envelope:candidate}}) as EmailEnvelope;
  if(process.env.VERCEL_ENV!=="production"&&frozen.to!==stagingRecipient())throw Error("staging_recipient_changed");
  let text=frozen.text;
  if(job.recipient_type==="patient"){
   const s=job.delivery_payload;const receipt=patientReceiptKey(s.idempotencyKey);
   if(createHash("sha256").update(receipt).digest("hex")!==s.patientHash)throw Error("patient_receipt_secret_changed");
   text+=receipt;
  }
  const result=await sendResendEmail({...frozen,text},"docvy-booking/"+job.id);
  await finish(job,result.result,"providerId" in result?result.providerId:undefined,"error" in result?result.error:undefined);
  return result.result;
 }catch(error){
  const reason=error instanceof Error&&["patient_receipt_secret_changed","staging_recipient_changed","invalid_event_snapshot"].includes(error.message)?error.message:"notification_processing_unavailable";
  await finish(job,reason==="notification_processing_unavailable"?"retry":"failed",undefined,reason).catch(()=>undefined);
  return "failed";
 }
}
export async function processBookingNotifications(){
 if(!bookingEmailReady())throw Error("booking_email_not_ready");
 await bookingDb("rpc/docvy_booking_queue_followups",{method:"POST",body:{}});
 // ponytail: two emails per invocation; increase with rate limiting when measured backlog warrants it.
 const jobs=await bookingDb("rpc/docvy_booking_claim_notifications",{method:"POST",body:{p_limit:2}}) as Job[];
 const results=await Promise.all(jobs.map(processJob));
 return {claimed:jobs.length,accepted:results.filter(r=>r==="accepted").length,retry:results.filter(r=>r==="retry").length,failed:results.filter(r=>r==="failed").length,skipped:results.filter(r=>r==="skipped").length};
}
/** Business commit succeeds first. Outbox survives cancelled background work; scheduler retries it. */
export function kickBookingNotifications(){if(bookingEmailReady()){try{waitUntil(processBookingNotifications().catch(()=>undefined));}catch{/* Durable outbox remains available to the scheduler. */}}}
export async function bookingNotificationHealth(){try{return {ready:bookingEmailReady(),...await bookingDb("rpc/docvy_booking_notification_health",{method:"POST",body:{}}) as object};}catch{return {ready:false,available:false};}}
