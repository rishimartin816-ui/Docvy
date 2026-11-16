// Initial owner provisioning only. The one-use project-issued capability authenticates this endpoint.
// No service key, password, session token or raw capability is ever returned or logged.
const runtime = globalThis as unknown as {Deno:{env:{get(name:string):string|undefined};serve(handler:(request:Request)=>Promise<Response>):void}};
const json=(status:number,body:object)=>new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
runtime.Deno.serve(async(request:Request)=>{
 if(request.method!=="POST")return json(405,{error:"POST required"});
 try{
  if(!request.headers.get("content-type")?.includes("application/json"))return json(415,{error:"JSON required"});
  const reader=request.body?.getReader();if(!reader)return json(400,{error:"Setup details required"});let text="";let count=0;const decoder=new TextDecoder();
  while(true){const part=await reader.read();if(part.done)break;count+=part.value.byteLength;if(count>7000){await reader.cancel();return json(413,{error:"Request too large"});}text+=decoder.decode(part.value,{stream:true});}text+=decoder.decode();
  const body=JSON.parse(text);
  if(typeof body.code!=="string"||!/^[A-Za-z0-9_-]{43}$/.test(body.code)||typeof body.password!=="string"||body.password.length<12||body.password.length>128)return json(400,{error:"Use a valid setup link and a password of 12–128 characters"});
  const url=runtime.Deno.env.get("SUPABASE_URL");const service=runtime.Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if(!url||!service)return json(503,{error:"Owner setup unavailable"});
  const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(body.code));const hash=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,"0")).join("");
  const headers={apikey:service,Authorization:"Bearer "+service,"Content-Type":"application/json"};
  const claim=await fetch(url+"/rest/v1/rpc/docvy_claim_owner_setup",{method:"POST",headers,body:JSON.stringify({p_hash:hash}),signal:AbortSignal.timeout(10000)});
  if(!claim.ok)return json([403,409].includes(claim.status)?claim.status:503,{error:"The owner setup link is invalid, expired, already used, or an owner account exists"});
  const email=await claim.json();if(email!=="contact@docvy.in")return json(503,{error:"Owner setup unavailable"});
  const created=await fetch(url+"/auth/v1/admin/users",{method:"POST",headers,body:JSON.stringify({email,password:body.password,email_confirm:true,app_metadata:{docvy_account_provisioning:"project_owner_setup"}}),signal:AbortSignal.timeout(12000)});
  if(!created.ok)return json(502,{error:"The account could not be confirmed. Try signing in; otherwise ask the project administrator for a new setup link"});
  return json(200,{ok:true,email});
 }catch{return json(503,{error:"Owner setup could not be confirmed. Try signing in before requesting another setup link"});}
});
export {};
