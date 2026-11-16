import {bookingBackendHealth,bookingSchedulerAuthorized,jsonNoStore} from '@/lib/docvy-booking-server';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(request:Request){
 if(!bookingSchedulerAuthorized(request))return jsonNoStore({error:'Unauthorized'},401);
 try{const health=await bookingBackendHealth();return jsonNoStore(health,health.healthy?200:503);}
 catch{return jsonNoStore({healthy:false,reason:'configuration_invalid'},503);}
}
