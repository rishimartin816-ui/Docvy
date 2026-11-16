import {endBookingSession,jsonNoStore} from "@/lib/docvy-booking-server";
export const dynamic="force-dynamic";
export async function POST(request:Request){if(request.headers.get("origin")!==new URL(request.url).origin)return jsonNoStore({error:"Invalid origin"},403);const token=request.headers.get("authorization")?.replace(/^Bearer /,"");if(!token)return jsonNoStore({error:"Session required"},401);try{return await endBookingSession(token)?jsonNoStore({ok:true}):jsonNoStore({error:"Session could not be closed"},503);}catch{return jsonNoStore({error:"Session could not be closed"},503);}}
