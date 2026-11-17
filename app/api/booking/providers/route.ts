import { founderManagedBooking, bookingConfigured, bookingDb, jsonNoStore } from "@/lib/docvy-booking-server";
import {ownedPortrait} from '@/lib/profile-policy';

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!bookingConfigured() || process.env.DOCVY_HYBRID_BOOKING_ENABLED !== "true") {
    return jsonNoStore({ providers: [], enabled: false });
  }
  try {
    const opts = await bookingDb("docvy_booking_provider_options", {
      query: new URLSearchParams({select:"provider_id,mode",mode:"neq.disabled",limit:"200"}),
    }) as Array<{provider_id:string;mode:"approval"|"instant"}>;
    if (!opts.length) return jsonNoStore({providers:[],enabled:true});
    const ids = opts.map(x=>x.provider_id).filter(x=>/^[a-z0-9-]+$/.test(x)).slice(0,200);
    const profiles = await bookingDb("docvy_directory_providers", {
      query:new URLSearchParams({
        select:"provider_id,doctor_name,city,facility,practice_locations,specialties,photo_url,profile_details",
        provider_id:`in.(${ids.join(",")})`,
        profile_status:"eq.verified",published:"eq.true",enabled:"eq.true",consent_given:"eq.true",
        verified_at:"not.is.null",limit:"200"
      }),
    }) as Array<{provider_id:string;doctor_name:string;city:string;facility:string;specialties?:string[];photo_url?:string;profile_details?:{consultationFee?:number;experienceYears?:number;languages?:string[]};practice_locations:{city:string;facility:string;consultationFee?:number;address?:string;consultingHours?:string;kind?:string}[]}>;
    return jsonNoStore({enabled:true,providers:profiles.flatMap(p=>{
      const locations=p.practice_locations?.length?p.practice_locations:[{city:p.city,facility:p.facility}];
      return locations.filter(l=>p.provider_id!=="mr-sahil-kochale"||["Indore","Online"].includes(l.city)).map(l=>{
        const fee=l.consultationFee??p.profile_details?.consultationFee;
        // Whitelist approved public presentation fields; never serialize the raw profile JSON.
        return {key:p.provider_id+"|"+l.city+"|"+l.facility,id:p.provider_id,name:p.doctor_name,city:l.city,facility:l.facility,mode:founderManagedBooking()?"approval":p.provider_id==="mr-sahil-kochale"&&l.city==="Online"?"approval":opts.find(o=>o.provider_id===p.provider_id)?.mode,
          specialties:Array.isArray(p.specialties)?p.specialties.filter(x=>typeof x==='string').slice(0,5):[],photoUrl:ownedPortrait(p.photo_url)?p.photo_url:null,
          fee:typeof fee==='number'&&Number.isFinite(fee)&&fee>=0&&fee<=1000000?fee:null,experienceYears:typeof p.profile_details?.experienceYears==='number'&&p.profile_details.experienceYears>=0&&p.profile_details.experienceYears<=100?p.profile_details.experienceYears:null,
          languages:Array.isArray(p.profile_details?.languages)?p.profile_details.languages.filter(x=>typeof x==='string').slice(0,5):[],address:typeof l.address==='string'?l.address.slice(0,400):'',hours:typeof l.consultingHours==='string'?l.consultingHours.slice(0,160):'',kind:l.kind==='online'?'online':'in-person'};
      });
    })});
  } catch {
    return jsonNoStore({providers:[],enabled:false},503);
  }
}
