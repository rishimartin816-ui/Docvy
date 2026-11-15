import { createHash, createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { directoryIntakeConfig } from "@/lib/directory-intake";
import { jsonBody, sameOrigin, signedDirectoryWrite } from "@/lib/directory-rpc";
import { crmUuid } from "@/lib/clinic-crm-config";
import { notifyPartnerApplication } from "@/lib/partner-notification";
import { partnerPayload } from "@/lib/partner-application";
import { storagePhoto, webpPhoto } from "@/lib/profile-photos";
export const runtime="nodejs";export const dynamic="force-dynamic";
const reply=(status:number,data:object)=>NextResponse.json(data,{status,headers:{"Cache-Control":"private, no-store"}});
export async function POST(request:Request){
 if(!sameOrigin(request))return reply(403,{error:"Submit your application from DOCVY."});
 const body=await jsonBody(request,2900000);
 if(!body||body.website||typeof body.requestId!=="string"||!crmUuid.test(body.requestId))return reply(400,{error:"Check the form and try again."});
 const requestId=body.requestId.toLowerCase();
 const photo=webpPhoto(body.photo);if(!photo)return reply(400,{error:"Upload a valid professional portrait smaller than 2 MB after resizing."});
 let payload;try{payload={...partnerPayload(body),photoSha256:createHash("sha256").update(photo).digest("hex")};}catch(error){return reply(400,{error:error instanceof Error?error.message:"Check your profile details."});}
 const config=directoryIntakeConfig();if(!config)return reply(503,{error:"Applications are unavailable. Email contact@docvy.in."});
 try{
  const result=await signedDirectoryWrite("partner",{requestId,payload,networkHash:createHmac("sha256",process.env.DOCVY_DIRECTORY_WRITE_SECRET||config.key).update(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown").digest("hex")});
  if(!result.ok){const details=await result.json();return reply([400,409,429].includes(result.status)?result.status:502,{error:[400,409,429].includes(result.status)?details.message:"Your application could not be confirmed. Retry with the same details."});}
  const reference:unknown=await result.json();if(typeof reference!=="string"||!/^PA-[A-F0-9]{16}$/.test(reference))throw new Error("Invalid reference");
  const upload=await storagePhoto("docvy-profile-submissions","partner/"+requestId+".webp",undefined,photo);
  if(!upload.ok&&upload.status!==409)return reply(502,{error:"Your details were saved under "+reference+", but the portrait upload failed. Retry with the same details and photo."});
  const emailStatus=await notifyPartnerApplication({reference,doctorName:payload.doctorName,specialty:payload.specialty,city:payload.city});
  return reply(201,{reference,emailStatus,photoStatus:"private_review"});
 }catch{return reply(502,{error:"Your application could not be confirmed. Retry with the same details."});}
}
