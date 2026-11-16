import {generateApprovedSlotCandidates} from "@/lib/booking-schedule";
import { founderManagedBooking, bookingConfigured, bookingDb, bookingPermissions, jsonNoStore } from "@/lib/docvy-booking-server";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const canSchedule=new Set(["owner","clinic_admin","manager","scheduler"]);
function auth(request:Request){
  const value=request.headers.get("authorization")??"";
  return value.startsWith("Bearer ")?value.slice(7):"";
}
type Roster={id:string;provider_id:string|null;clinic_id:string;name:string;present:boolean|null};
type Clinic={id:string;name:string;city:string;booking_enabled:boolean};

export async function GET(request:Request){
  if(founderManagedBooking())return jsonNoStore({ok:true,rosters:[],clinics:[],founderManaged:true});
  if(!bookingConfigured())return jsonNoStore({error:"Not configured"},503);
  const permission=await bookingPermissions(auth(request)).catch(()=>null);
  if(!permission||(!permission.isAdmin&&!permission.clinicIds.length))return jsonNoStore({error:"Unauthorized"},401);
  try{
    const rosters=await bookingDb("crm_doctor_roster",{
      query:new URLSearchParams({
        select:"id,provider_id,clinic_id,name,present",
        ...(permission.isAdmin?{}:{clinic_id:`in.(${permission.clinicIds.join(",")})`}),
        limit:"200"
      }),
    }) as Roster[];
    const ids=[...new Set(rosters.map(r=>r.clinic_id))];
    const clinics=ids.length?await bookingDb("crm_clinics",{
      query:new URLSearchParams({select:"id,name,city,booking_enabled",id:`in.(${ids.join(",")})`,limit:"200"})
    }) as Clinic[]:[];
    return jsonNoStore({ok:true,rosters,clinics});
  }catch{return jsonNoStore({error:"Unable to load schedules"},503)}
}

export async function POST(request:Request){
  if(founderManagedBooking())return jsonNoStore({error:"Use DOCVY appointment approval; clinic schedules are not activated"},403);
  if(request.headers.get("origin")!==new URL(request.url).origin)return jsonNoStore({error:"Invalid origin"},403);
  if(!bookingConfigured())return jsonNoStore({error:"Not configured"},503);
  const permission=await bookingPermissions(auth(request)).catch(()=>null);
  if(!permission)return jsonNoStore({error:"Unauthorized"},401);
  try{
    const raw=await request.text();
    if(Buffer.byteLength(raw)>2500)return jsonNoStore({error:"Too large"},413);
    const data=JSON.parse(raw) as Record<string,unknown>;
    const action=String(data.action??"");
    const rosterId=String(data.rosterId??"");
    if(!uuid.test(rosterId))return jsonNoStore({error:"Invalid doctor roster"},400);
    const rosters=await bookingDb("crm_doctor_roster",{
      query:new URLSearchParams({select:"id,clinic_id,provider_id,name,present",id:`eq.${rosterId}`,limit:"1"})
    }) as Roster[];
    const roster=rosters[0];
    if(!roster)return jsonNoStore({error:"Doctor mapping missing"},404);
    const clinic=await bookingDb("crm_clinics",{
      query:new URLSearchParams({select:"id,name,city,booking_enabled",id:`eq.${roster.clinic_id}`,limit:"1"})
    }) as Clinic[];
    if(!clinic.length)return jsonNoStore({error:"Clinic missing"},404);
    const manager=permission.isAdmin||permission.roles.some(p=>p.clinic_id===roster.clinic_id&&canSchedule.has(p.role));
    if(!manager)return jsonNoStore({error:"Not permitted for this clinic"},403);
    if(!roster.provider_id)return jsonNoStore({error:"Doctor is not linked to an approved directory profile"},409);
    const provider=await bookingDb("docvy_directory_providers",{
      query:new URLSearchParams({
        select:"provider_id",provider_id:`eq.${roster.provider_id}`,
        published:"eq.true",enabled:"eq.true",consent_given:"eq.true",
        profile_status:"eq.verified",verified_at:"not.is.null",limit:"1",
      })
    }) as unknown[];
    if(!provider.length)return jsonNoStore({error:"Provider verification incomplete"},409);
    if(action==="presence"){
      if(data.confirmedByClinic!==true)return jsonNoStore({error:"Clinic confirmation is required"},400);
      await bookingDb("crm_doctor_roster",{
        method:"PATCH",query:new URLSearchParams({id:`eq.${roster.id}`}),
        body:{present:true,changed_at:new Date().toISOString(),changed_by:permission.id},
      });
      return jsonNoStore({ok:true,message:"Doctor confirmed present for scheduling"});
    }
    if(action==="approved_range"){
      if(!permission.isAdmin)return jsonNoStore({error:"DOCVY schedule approval required"},403);
      if(roster.present!==true||data.confirmedByClinic!==true)return jsonNoStore({error:"Confirm doctor availability before publishing"},409);
      const from=String(data.startDate??""),until=String(data.endDate??"");
      const candidates=generateApprovedSlotCandidates(from,until).filter(slot=>slot.provider_id===roster.provider_id&&(!slot.location||(slot.location.city===clinic[0].city&&slot.location.facility===clinic[0].name))&&Date.parse(slot.starts_at)>Date.now()+15*60000);
      if(!candidates.length)return jsonNoStore({error:"No approved slots match this practice and range"},409);
      const existing=await bookingDb("crm_slots",{query:new URLSearchParams({select:"starts_at,ends_at",doctor_id:"eq."+roster.id,starts_at:"gte."+candidates[0].starts_at,limit:"1000"})}) as {starts_at:string;ends_at:string}[];
      const seen=new Set(existing.map(slot=>new Date(slot.starts_at).toISOString()+"|"+new Date(slot.ends_at).toISOString()));
      const pending=candidates.filter(slot=>!seen.has(slot.starts_at+"|"+slot.ends_at)).map(slot=>({clinic_id:roster.clinic_id,doctor_id:roster.id,starts_at:slot.starts_at,ends_at:slot.ends_at,blocked:false}));
      if(pending.length)await bookingDb("crm_slots",{method:"POST",body:pending});
      return jsonNoStore({ok:true,created:pending.length,existing:candidates.length-pending.length,activated:false});
    }
    if(action==="slot"){
      if(roster.present!==true)return jsonNoStore({error:"Confirm doctor availability first"},409);
      const starts=typeof data.startsAt==="string"?new Date(data.startsAt):new Date(NaN);
      const ends=typeof data.endsAt==="string"?new Date(data.endsAt):new Date(NaN);
      const duration=ends.getTime()-starts.getTime();
      if(!Number.isFinite(duration)||starts.getTime()<Date.now()+15*60000||
          starts.getTime()>Date.now()+90*86400000||duration<5*60000||duration>180*60000){
        return jsonNoStore({error:"Choose a future slot lasting 5–180 minutes within 90 days"},400);
      }
      const rows=await bookingDb("crm_slots",{
        method:"POST",
        body:[{clinic_id:roster.clinic_id,doctor_id:roster.id,starts_at:starts.toISOString(),ends_at:ends.toISOString(),blocked:false}],
      }) as Array<{id:string}>;
      return jsonNoStore({ok:true,slotId:rows[0]?.id});
    }
    if(action==="activate_clinic"){
      if(!permission.isAdmin)return jsonNoStore({error:"DOCVY admin approval required"},403);
      if(roster.present!==true)return jsonNoStore({error:"Doctor availability not confirmed"},409);
      const future=await bookingDb("crm_slots",{
        query:new URLSearchParams({
          select:"id",clinic_id:`eq.${roster.clinic_id}`,doctor_id:`eq.${roster.id}`,
          blocked:"eq.false",starts_at:`gt.${new Date().toISOString()}`,limit:"1"
        })
      }) as unknown[];
      if(!future.length)return jsonNoStore({error:"Create a verified future clinic slot first"},409);
      await bookingDb("crm_clinics",{
        method:"PATCH",query:new URLSearchParams({id:`eq.${roster.clinic_id}`}),body:{booking_enabled:true}
      });
      return jsonNoStore({ok:true,clinicId:roster.clinic_id});
    }
    return jsonNoStore({error:"Unsupported schedule action"},400);
  }catch{return jsonNoStore({error:"Schedule update rejected; check for overlapping slots"},422)}
}
