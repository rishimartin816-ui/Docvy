import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { directoryIntakeConfig } from "./directory-intake";

const secure = process.env.NODE_ENV === "production";
const accessName = secure ? "__Secure-docvy-crm-access" : "docvy-crm-access";
const refreshName = secure ? "__Secure-docvy-crm-refresh" : "docvy-crm-refresh";
type Tokens = { access_token: string; refresh_token: string; expires_in: number };
export function workspaceEnabled() { return process.env.DOCVY_CRM_WORKSPACE_ENABLED === "true" && Boolean(directoryIntakeConfig()); }
export function workspaceReply(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store, max-age=0", "Vary": "Cookie", "X-Robots-Tag": "noindex, nofollow" } });
}
export async function workspaceFetch(path: string, body?: object, token?: string, method?: string) {
  const config = directoryIntakeConfig(); if (!workspaceEnabled() || !config) throw new Error("Workspace connection unavailable");
  return fetch(new URL(path,config.url), {method:method??(body?"POST":"GET"),headers:{apikey:config.key,"Content-Type":"application/json",...(token?{Authorization:"Bearer "+token}:{})},body:body?JSON.stringify(body):undefined,cache:"no-store",signal:AbortSignal.timeout(12000)});
}
export function workspaceRpc(operation: string, clinic: string | null, data: object, token: string) {
  return workspaceFetch("/rest/v1/rpc/docvy_crm",{p_operation:operation,p_clinic:clinic,p_data:data},token);
}
export function setWorkspaceCookies(response: NextResponse, tokens?: Tokens | null) {
  const settings = {httpOnly:true,secure,sameSite:"strict" as const,path:"/api/workspace"};
  response.cookies.set(accessName,tokens?.access_token??"",{...settings,maxAge:tokens?Math.min(tokens.expires_in||3600,3600):0});
  response.cookies.set(refreshName,tokens?.refresh_token??"",{...settings,maxAge:tokens?8*3600:0});
  return response;
}
export async function workspaceSession(request: NextRequest): Promise<{token:string;tokens?:Tokens}|null> {
  const access=request.cookies.get(accessName)?.value;
  if(access){const verified=await workspaceFetch("/auth/v1/user",undefined,access);if(verified.ok)return {token:access};if(verified.status!==401&&verified.status!==403)throw new Error("Account service unavailable");}
  const refresh=request.cookies.get(refreshName)?.value;
  if(!refresh)return null;
  const response=await workspaceFetch("/auth/v1/token?grant_type=refresh_token",{refresh_token:refresh});
  if(!response.ok){if(response.status>=500||response.status===429)throw new Error("Account service unavailable");return null;}
  const tokens=await response.json() as Tokens;
  return tokens.access_token&&tokens.refresh_token?{token:tokens.access_token,tokens}:null;
}
export async function workspaceResult(response: Response, session?: {tokens?:Tokens}) {
  const data=await response.json().catch(()=>null);
  const safeStatus=[400,401,403,404,409,429].includes(response.status)?response.status:502;
  const reply=response.ok?workspaceReply(data):workspaceReply({error:safeStatus===502?"The workspace could not complete this request. Refresh before retrying.":data?.message??"Sign in again to continue."},safeStatus);
  if(response.status===401)return setWorkspaceCookies(reply,null);
  return session?.tokens?setWorkspaceCookies(reply,session.tokens):reply;
}
