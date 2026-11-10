import { americanSpecialtyAliases } from "@/lib/specialty-taxonomy";
import { cleanDoctorSlug } from "@/lib/directory-normalization";
import { NextRequest, NextResponse } from "next/server";
import { cities, citySlug, directoryProcedures, directorySpecialties, specialtySlug, slugify } from "@/lib/directory";
import { canonicalSiteRedirect } from "@/lib/site-domain";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const designPreview = process.env.DOCVY_DESIGN_PREVIEW === "true" ||
    (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_GIT_COMMIT_REF === "preview/doctor-glass-claim");
  if (designPreview && !["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    return NextResponse.json({ error: "This is a design preview. Submissions are disabled and no changes have been saved." }, { status: 409, headers: { "Cache-Control": "no-store" } });
  }
  const destination = canonicalSiteRedirect(new URL(request.url), process.env.VERCEL_ENV === "production");
  if (destination) {
    if (request.method === "GET" || request.method === "HEAD") return NextResponse.redirect(destination, 301);
    return NextResponse.json({ error: "Open https://www.docvy.in and submit your request there." }, { status: 421, headers: { "Cache-Control": "no-store" } });
  }
  const parts = url.pathname.split("/").filter(Boolean);
  const alias = americanSpecialtyAliases[parts[parts.length - 1]];
  if (alias && ((parts.length===2 && parts[0]==="specialties") || (parts.length===3 && parts[0]==="doctors" && (parts[1]==="specialty" || cities.some(c=>c.slug===citySlug(parts[1])))) || (parts.length===2 && parts[0]==="doctors") || parts.length===1)) {
    url.pathname = parts[0]==="specialties" ? "/specialties/"+alias : parts.length===3 && parts[1]!=="specialty" ? "/doctors/"+citySlug(parts[1])+"/"+alias : "/doctors/specialty/"+alias;
    return NextResponse.redirect(url,301);
  }
  if (parts.length===2 && parts[0]==="doctor" && cleanDoctorSlug(parts[1])!==parts[1]) { url.pathname="/doctor/"+cleanDoctorSlug(parts[1]); return NextResponse.redirect(url,301); }
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
    const specialty = specialtySlug(url.searchParams.get("specialty") ?? "");
    if (cities.some(({ slug }) => slug === city) && (!specialty || directorySpecialties.some(({ slug }) => slug === specialty))) {
      url.pathname = "/doctors/" + city + (specialty ? "/" + specialty : "");
      url.searchParams.delete("city");
      url.searchParams.delete("specialty");
      return NextResponse.redirect(url, 301);
    }
  }
  if (/^\/doctors\/rangapani(?:\/|$)/.test(url.pathname)) { url.pathname = url.pathname.replace("/doctors/rangapani", "/doctors/siliguri"); return NextResponse.redirect(url, 301); }
  if (/^\/doctors\/gurugram(?:\/|$)/.test(url.pathname)) {
    url.pathname = url.pathname.replace("/doctors/gurugram", "/doctors/gurgaon");
    return NextResponse.redirect(url, 301);
  }
  const response = NextResponse.next();
  if (url.search && ["GET","HEAD"].includes(request.method) && !url.pathname.startsWith("/api/")) response.headers.set("X-Robots-Tag","noindex, follow");
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"] };
