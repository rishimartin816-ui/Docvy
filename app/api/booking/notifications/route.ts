import {timingSafeEqual} from "node:crypto";
import {bookingPermissions,jsonNoStore} from "@/lib/docvy-booking-server";
import {bookingEmailReady,processBookingNotifications} from "@/lib/booking-notifications";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export const maxDuration=60;
function scheduler(request:Request){const secret=process.env.CRON_SECRET;const supplied=Buffer.from(request.headers.get("authorization")??"");const expected=Buffer.from("Bearer "+secret);return Boolean(secret&&secret.length>=32&&supplied.length===expected.length&&timingSafeEqual(supplied,expected));}
async function drain(){if(!bookingEmailReady())return jsonNoStore({error:"Booking email delivery is not enabled/configured for this environment"},503);try{return jsonNoStore({ok:true,...await processBookingNotifications()});}catch{return jsonNoStore({error:"Notification processing unavailable"},503);}}
export async function GET(request:Request){if(!scheduler(request))return jsonNoStore({error:"Unauthorized"},401);return drain();}
export async function POST(request:Request){
 if(scheduler(request))return drain();
 if(request.headers.get("origin")!==new URL(request.url).origin)return jsonNoStore({error:"Submit through DOCVY"},403);
 const permission=await bookingPermissions(request.headers.get("authorization")?.replace(/^Bearer /,"")??"").catch(()=>null);
 if(!permission?.isAdmin)return jsonNoStore({error:"Founder access required"},403);
 return drain();
}
