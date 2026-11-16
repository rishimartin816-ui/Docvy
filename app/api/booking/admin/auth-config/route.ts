import {publicBookingAuthConfig,jsonNoStore} from "@/lib/docvy-booking-server";
export const dynamic="force-dynamic";
export async function GET(){try{return jsonNoStore({enabled:true,...publicBookingAuthConfig()});}catch{return jsonNoStore({enabled:false},503);}}
