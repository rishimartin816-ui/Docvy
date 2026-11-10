import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { directoryIntakeConfig } from "@/lib/directory-intake";
import { jsonBody, sameOrigin, signedDirectoryWrite } from "@/lib/directory-rpc";
import { crmUuid } from "@/lib/clinic-crm-config";
export const runtime="nodejs";export const dynamic="force-dynamic";
const reply=(status:number,data:object)=>NextResponse.json(data,{status,headers:{"Cache-Control":"private, no-store"}});
const clean=(v:unknown,n:number)=>typeof v==="string"?v.trim().replace(/[<>\u0000-\u001f]/g,"").slice(0,n):"";
export async function POST(request:Request){
 if(!sameOrigin(request))return reply(403,{error:"Submit your application from DOCVY."});
 const body=await jsonBody(request,12000);if(!body||body.website||typeof body.requestId!=="string"||!crmUuid.test(body.requestId))return reply(400,{error:"Check the form and try again."});
 const config=directoryIntakeConfig();if(!config)return reply(503,{error:"Applications are unavailable. Email contact@docvy.in."});
 const payload={role:clean(body.role,30),doctorName:clean(body.doctorName,120),specialty:clean(body.specialty,100),registrationNumber:clean(body.registrationNumber,100),registrationCouncil:clean(body.registrationCouncil,150),facility:clean(body.facility,160),city:clean(body.city,60),locality:clean(body.locality,100),address:clean(body.address,400),email:clean(body.email,254).toLowerCase(),phone:clean(body.phone,24).replace(/[\s()-]/g,""),sourceUrl:clean(body.sourceUrl,500),bio:clean(body.bio,2000),details:clean(body.details,1500),consent:body.consent===true};
 if(/^[6-9]\d{9}$/.test(payload.phone))payload.phone="+91"+payload.phone;
 if(payload.sourceUrl){try{const url=new URL(payload.sourceUrl);if(url.protocol!=="https:"||url.username||url.password)return reply(400,{error:"Use an HTTPS professional website without embedded credentials."});}catch{return reply(400,{error:"Enter a valid HTTPS professional website, or leave it blank."});}}
 try{
  const result=await signedDirectoryWrite("partner",{requestId:body.requestId,payload,networkHash:createHmac("sha256",process.env.DOCVY_DIRECTORY_WRITE_SECRET||config.key).update(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown").digest("hex")});
  if(!result.ok){const details=await result.json();return reply([400,409,429].includes(result.status)?result.status:502,{error:[400,409,429].includes(result.status)?details.message:"Your application could not be confirmed. Retry with the same details."});}
  const reference:unknown=await result.json();if(typeof reference!=="string"||!/^PA-[A-F0-9]{16}$/.test(reference))throw new Error("Invalid reference");
  return reply(201,{reference,emailStatus:"pending_connection"});
 }catch{return reply(502,{error:"Your application could not be confirmed. Retry with the same details."});}
}
