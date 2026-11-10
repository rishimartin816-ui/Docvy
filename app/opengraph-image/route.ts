/** Preserve existing shared image URLs while using the supplied brand artwork. */
export function GET(request: Request) {
  return Response.redirect(new URL("/brand/13_social_og_brand_banner.png", request.url), 301);
}
