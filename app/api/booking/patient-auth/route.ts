import {publicBookingAuthConfig,jsonNoStore} from "@/lib/docvy-booking-server";
export const dynamic="force-dynamic";
export async function POST(request:Request){
 if(request.headers.get("origin")!==new URL(request.url).origin)return jsonNoStore({error:"Submit through DOCVY"},403);
 if(process.env.DOCVY_PATIENT_AUTH_ENABLED!=="true")return jsonNoStore({error:"DOCVY contact verification is not configured"},503);
 try{const raw=await request.text();if(raw.length>1000)return jsonNoStore({error:"Request too large"},413);const b=JSON.parse(raw);
 if(typeof b.email!=="string"||b.email.length>254||!/^\S+@\S+\.\S+$/.test(b.email)||!["send","verify"].includes(b.action))return jsonNoStore({error:"Enter a valid email"},400);
 if(b.action==="verify"&&(typeof b.code!=="string"||!/^\d{6,8}$/.test(b.code)))return jsonNoStore({error:"Enter the verification code"},400);
 const config=publicBookingAuthConfig();const endpoint=b.action==="send"?"otp":"verify";
 const response=await fetch(config.url+"/auth/v1/"+endpoint,{method:"POST",headers:{apikey:config.anonKey,"Content-Type":"application/json"},body:JSON.stringify(b.action==="send"?{email:b.email,create_user:true}:{email:b.email,token:b.code,type:"email"}),cache:"no-store",signal:AbortSignal.timeout(10000)});
 if(!response.ok)return jsonNoStore({error:"Verification could not be completed; check the code or try later"},response.status===429?429:400);
 if(b.action==="send")return jsonNoStore({sent:true});const data=await response.json();return jsonNoStore({token:data.access_token});
 }catch{return jsonNoStore({error:"Contact verification unavailable"},503);}
}
