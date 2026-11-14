import { NextRequest } from "next/server";
import { jsonBody, sameOrigin } from "@/lib/directory-rpc";
import { setWorkspaceCookies, workspaceEnabled, workspaceFetch, workspaceReply, workspaceRpc, workspaceSession } from "@/lib/workspace";

export const dynamic="force-dynamic";
export async function POST(request:NextRequest){
  if(!workspaceEnabled())return workspaceReply({error:"Production workspace is unavailable."},503);
  if(!sameOrigin(request))return workspaceReply({error:"Use the DOCVY sign-in page."},403);
  const body=await jsonBody(request,7000);if(!body)return workspaceReply({error:"Check the account form."},400);
  try{
    if(body.action==="owner-setup"){
      if(typeof body.code!=="string"||!/^[A-Za-z0-9_-]{43}$/.test(body.code)||typeof body.password!=="string"||body.password.length<12||body.password.length>128)return workspaceReply({error:"Use your private owner setup link and a password of 12–128 characters."},400);
      const setup=await workspaceFetch("/functions/v1/docvy-owner-setup",{code:body.code,password:body.password});
      if(!setup.ok)return workspaceReply({error:(await setup.json()).error??"Owner setup could not be confirmed."},[400,403,409].includes(setup.status)?setup.status:502);
      return workspaceReply({message:"Owner account created for contact@docvy.in. Sign in with the password you just chose."});
    }
    if(body.action==="logout"){
      const session=await workspaceSession(request);
      const response=session?await workspaceFetch("/auth/v1/logout?scope=local",{},session.token):null;
      return setWorkspaceCookies(workspaceReply(response&&!response.ok?{error:"Signed out on this device. Server sign-out could not be confirmed."}:{ok:true},response&&!response.ok?502:200),null);
    }
    if(body.action==="reset-password"){
      if(typeof body.recoveryToken!=="string"||body.recoveryToken.length>4500||typeof body.password!=="string"||body.password.length<12||body.password.length>128)return workspaceReply({error:"Use the recovery email link and a password of 12–128 characters."},400);
      const user=await workspaceFetch("/auth/v1/user",undefined,body.recoveryToken);
      if(!user.ok)return workspaceReply({error:"The recovery link expired. Request another email."},401);
      const changed=await workspaceFetch("/auth/v1/user",{password:body.password},body.recoveryToken,"PUT");
      if(!changed.ok)return workspaceReply({error:"The password could not be updated. Try another password or request a new recovery link."},400);
      await workspaceFetch("/auth/v1/logout?scope=global",{},body.recoveryToken);
      return setWorkspaceCookies(workspaceReply({message:"Password updated. Sign in with your new password."}),null);
    }
    const email=typeof body.email==="string"?body.email.trim().toLowerCase():"";
    const password=typeof body.password==="string"?body.password:"";
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||!["login","signup","recover"].includes(String(body.action)))return workspaceReply({error:"Enter your work email."},400);
    if(body.action==="recover"){
      const r=await workspaceFetch("/auth/v1/recover?redirect_to="+encodeURIComponent("https://www.docvy.in/crm/clinic"),{email});
      return workspaceReply(r.status===429?{error:"Too many requests. Try again later."}:{message:"If this account can receive recovery email, instructions will be sent. Follow the email link, then return to sign in."},r.status===429?429:200);
    }
    if(password.length<12||password.length>128)return workspaceReply({error:"Use a password of 12–128 characters."},400);
    const signup=body.action==="signup";
    const r=await workspaceFetch(signup?"/auth/v1/signup?redirect_to="+encodeURIComponent("https://www.docvy.in/crm/clinic"):"/auth/v1/token?grant_type=password",{email,password});
    const data=await r.json();
    if(!r.ok)return workspaceReply({error:r.status===429?"Too many attempts. Please wait before retrying.":signup?"Account setup could not be completed. If email delivery is unavailable, contact DOCVY. Existing users can sign in.":"Sign-in failed. Check your password and confirm your work email first."},r.status===429?429:401);
    if(signup&&!data.access_token)return workspaceReply({confirmationRequired:true,message:"Check your work email to confirm your account, then return here to sign in. Clinic access also requires an administrator invitation."});
    if(!data.access_token||!data.refresh_token)return workspaceReply({error:"Confirm your email before signing in."},401);
    const accepted=await workspaceRpc("accept-invites",null,{},data.access_token);
    if(!accepted.ok){await workspaceFetch("/auth/v1/logout?scope=local",{},data.access_token);return workspaceReply({error:"Confirm your email and contact DOCVY if workspace access is unavailable."},403);}
    return setWorkspaceCookies(workspaceReply({ok:true}),data);
  }catch{return body.action==="logout"?setWorkspaceCookies(workspaceReply({error:"Signed out on this device. Server sign-out could not be confirmed."},503),null):workspaceReply({error:"The account service could not be reached. Please retry."},503);}
}
