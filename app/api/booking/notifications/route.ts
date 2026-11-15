import { bookingDb, jsonNoStore } from "@/lib/docvy-booking-server";

export const runtime="nodejs";
export const dynamic="force-dynamic";

type Job={id:number;case_id:string;status:string;recipient_type:"patient"|"admin";attempts:number};
type Case={id:string;reference:string;status:string;doctor_name:string;patient_email:string|null;confirmed_starts_at:string|null};

export async function POST(request:Request){
  const expected=process.env.DOCVY_BOOKING_CRON_SECRET;
  if(!expected||expected.length<32||request.headers.get("authorization")!==`Bearer ${expected}`) {
    return jsonNoStore({error:"Unauthorized"},401);
  }
  const key=process.env.RESEND_API_KEY;
  const from=process.env.DOCVY_BOOKING_FROM_EMAIL;
  if(!key||!from)return jsonNoStore({error:"Booking email delivery is not configured"},503);
  try{
    const jobs=await bookingDb("rpc/docvy_booking_claim_notifications",{
      method:"POST",body:{p_limit:10},
    }) as Job[];
    let sent=0,skipped=0,failed=0;
    for(const job of jobs){
      try{
        const results=await bookingDb("docvy_booking_cases",{
          query:new URLSearchParams({
            select:"id,reference,status,doctor_name,patient_email,confirmed_starts_at",
            id:`eq.${job.case_id}`,limit:"1",
          }),
        }) as Case[];
        const record=results[0];
        const recipient=job.recipient_type==="admin"?process.env.DOCVY_BOOKING_ALERT_EMAIL:record?.patient_email;
        if(!record||!recipient){
          await bookingDb("docvy_booking_notification_outbox",{
            method:"PATCH",query:new URLSearchParams({id:`eq.${job.id}`}),
            body:{delivery_state:"skipped",last_error:"recipient_unavailable"},
          });
          skipped++;continue;
        }
        const safeReference=record.reference;
        const subject=job.recipient_type==="admin"
          ?`DOCVY appointment update — ${safeReference}`
          :`Your DOCVY appointment — ${safeReference}`;
        const text=`DOCVY appointment reference: ${safeReference}\nProvider: ${record.doctor_name}\nStatus: ${job.status.replaceAll("_"," ")}\n${job.status==="confirmed"&&record.confirmed_starts_at?`Confirmed appointment: ${new Date(record.confirmed_starts_at).toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})} IST\n`:""}${job.status==="requested"?"This is a request only; do not travel until you receive confirmation.\n":""}Please contact DOCVY for assistance.\nDOCVY does not collect consultation fees.\n`;
        const response=await fetch("https://api.resend.com/emails",{
          method:"POST",
          headers:{
            Authorization:`Bearer ${key}`,"Content-Type":"application/json",
            "Idempotency-Key":`docvy-${job.id}`,
          },
          body:JSON.stringify({from,to:[recipient],subject,text}),
          cache:"no-store",signal:AbortSignal.timeout(10000),
        });
        if(!response.ok)throw new Error(`email_provider_http_${response.status}`);
        await bookingDb("docvy_booking_notification_outbox",{
          method:"PATCH",query:new URLSearchParams({id:`eq.${job.id}`}),
          body:{delivery_state:"sent",sent_at:new Date().toISOString(),last_error:null},
        });
        sent++;
      }catch{
        failed++;
        await bookingDb("docvy_booking_notification_outbox",{
          method:"PATCH",query:new URLSearchParams({id:`eq.${job.id}`}),
          body:{last_error:"delivery_attempt_failed"},
        }).catch(()=>undefined);
      }
    }
    return jsonNoStore({ok:true,claimed:jobs.length,sent,skipped,failed});
  }catch{
    return jsonNoStore({error:"Notification processing unavailable"},503);
  }
}
