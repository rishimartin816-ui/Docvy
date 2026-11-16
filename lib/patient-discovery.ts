import 'server-only';
import {cache} from 'react';
import {bookingConfigured,bookingDb} from './docvy-booking-server';

/** One request-scoped lookup, rather than a database call for each doctor card. */
export const getBookingDoctorIds=cache(async():Promise<Set<string>>=>{
 if(process.env.DOCVY_HYBRID_BOOKING_ENABLED!=='true'||!bookingConfigured())return new Set();
 try{const rows=await bookingDb('docvy_booking_provider_options',{query:new URLSearchParams({select:'provider_id',mode:'neq.disabled',limit:'200'})}) as {provider_id:string}[];return new Set(rows.map(r=>r.provider_id));}
 catch{return new Set();}
});
