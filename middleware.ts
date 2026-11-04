import { NextRequest, NextResponse } from "next/server";
import { cities, citySlug, directoryProcedures, directorySpecialties, slugify } from "@/lib/directory";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
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

export const config = { matcher: ["/doctors/:path*"] };
