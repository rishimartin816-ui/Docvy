import { NextRequest } from "next/server";
import { jsonBody, sameOrigin } from "@/lib/directory-rpc";
import { crmUuid } from "@/lib/clinic-crm-config";
import { setWorkspaceCookies, workspaceEnabled, workspaceReply, workspaceResult, workspaceRpc, workspaceSession } from "@/lib/workspace";

export const dynamic="force-dynamic";
export async function GET(request:NextRequest) {
  if(!workspaceEnabled())return workspaceReply({error:"Production workspace is unavailable."},503);
  try {
    const session=await workspaceSession(request);if(!session)return workspaceReply({error:"Sign in to your clinic workspace."},401);
    const clinic=request.nextUrl.searchParams.get("clinic");const day=request.nextUrl.searchParams.get("day");const days=request.nextUrl.searchParams.get("days")??"7";
    if((clinic&&!crmUuid.test(clinic))||(day&&(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!Number.isFinite(Date.parse(day+"T00:00:00Z"))||new Date(day+"T00:00:00Z").toISOString().slice(0,10)!==day))||!["1","7","30"].includes(days))return workspaceReply({error:"Choose a valid clinic, date and calendar view."},400);
    return workspaceResult(await workspaceRpc("state",clinic,{...(day?{day}:{}),days:Number(days)},session.token),session);
  }catch{return workspaceReply({error:"The production workspace could not be reached. Please retry."},503);}
}
const operations=new Set(["activate-provider","create-clinic","add-doctor","link-provider","presence","patient","patient-update","patient-search","patient-delete","slot","block","book","lead-status","booking-status","reschedule","payment","invite","staff-access"]);
export async function POST(request:NextRequest) {
  if(!workspaceEnabled())return workspaceReply({error:"Production workspace is unavailable."},503);
  if(!sameOrigin(request))return workspaceReply({error:"Use the DOCVY workspace to submit changes."},403);
  const body=await jsonBody(request,12000);
  if(!body||typeof body.operation!=="string"||!operations.has(body.operation)||!body.data||typeof body.data!=="object"||Array.isArray(body.data)||(body.clinicId!=null&&(typeof body.clinicId!=="string"||!crmUuid.test(body.clinicId))))return workspaceReply({error:"Check the workspace form."},400);
  try{
    const session=await workspaceSession(request);if(!session)return setWorkspaceCookies(workspaceReply({error:"Sign in to continue."},401),null);
    return workspaceResult(await workspaceRpc(body.operation,typeof body.clinicId==="string"?body.clinicId:null,body.data as object,session.token),session);
  }catch{return workspaceReply({error:"The change could not be confirmed. Refresh before retrying."},503);}
}
