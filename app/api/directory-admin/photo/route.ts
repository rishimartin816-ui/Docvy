import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { directoryRpc } from "@/lib/directory-rpc";
import { storagePhoto } from "@/lib/profile-photos";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const token = cookies().get("docvy-directory-session")?.value;
  if (!token) return new Response(null, { status: 401 });
  try {
    const auth = await directoryRpc("docvy_is_directory_admin", {}, token);
    if (!auth.ok || await auth.json() !== true) return new Response(null, { status: 403 });
    const id = new URL(request.url).searchParams.get("request");
    if (!id || !/^[0-9a-f-]{36}$/.test(id)) return new Response(null, { status: 400 });
    const image = await storagePhoto("docvy-profile-submissions", id + ".webp", token);
    if (!image.ok) return NextResponse.json({ error: "No uploaded portrait for this claim." }, { status: 404 });
    return new Response(await image.arrayBuffer(), { headers: { "Content-Type": "image/webp", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response(null, { status: 502 }); }
}
