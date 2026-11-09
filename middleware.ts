import { NextRequest, NextResponse } from "next/server";
import { cities, citySlug, directoryProcedures, directorySpecialties, slugify } from "@/lib/directory";
import { canonicalSiteRedirect } from "@/lib/site-domain";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const destination = canonicalSiteRedirect(new URL(request.url), process.env.VERCEL_ENV === "production");
  if (destination) {
    if (request.method === "GET" || request.method === "HEAD") return NextResponse.redirect(destination, 308);
    return NextResponse.json({ error: "Open https://www.docvy.in and submit your request there." }, { status: 421, headers: { "Cache-Control": "no-store" } });
  }
  if (url.pathname === "/crm" || url.pathname === "/crm/") {
    url.pathname = "/crm/clinic";
    return NextResponse.redirect(url, 308);
  }
  if (url.pathname === "/doctors" && url.searchParams.has("procedure")) {
    const procedure = slugify(url.searchParams.get("procedure") ?? "");
    if (directoryProcedures.some(({ slug }) => slug === procedure)) {
      url.pathname = "/surgeries/" + procedure;
      url.searchParams.delete("procedure");
      url.searchParams.delete("specialty");
      return NextResponse.redirect(url, 301);
    }
  }
  if (url.pathname === "/doctors" && url.searchParams.has("city")) {
    const city = citySlug(url.searchParams.get("city") ?? "");
    const specialty = slugify(url.searchParams.get("specialty") ?? "");
    if (cities.some(({ slug }) => slug === city) && (!specialty || directorySpecialties.some(({ slug }) => slug === specialty))) {
      url.pathname = "/doctors/" + city + (specialty ? "/" + specialty : "");
      url.searchParams.delete("city");
      url.searchParams.delete("specialty");
      return NextResponse.redirect(url, 301);
    }
  }
  if (/^\/doctors\/gurugram(?:\/|$)/.test(url.pathname)) {
    url.pathname = url.pathname.replace("/doctors/gurugram", "/doctors/gurgaon");
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"] };
