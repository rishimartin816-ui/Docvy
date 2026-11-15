import { jsonNoStore } from "@/lib/docvy-booking-server";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(){
  const url=process.env.SUPABASE_URL??process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY??process.env.SUPABASE_ANON_KEY??process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY??process.env.SUPABASE_PUBLISHABLE_KEY;
  if(!url||!key)return jsonNoStore({enabled:false},503);
  const parsed=new URL(url);
  if(parsed.protocol!=="https:"||!parsed.hostname.endsWith(".supabase.co"))return jsonNoStore({enabled:false},503);
  return jsonNoStore({enabled:true,url:parsed.origin,anonKey:key});
}
