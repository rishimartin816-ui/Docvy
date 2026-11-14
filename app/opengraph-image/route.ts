/** Preserve existing shared image URLs while using the supplied brand artwork. */
export function GET(request: Request) {
  return Response.redirect(new URL("/brand/14_DOCVY_OpenGraph_1200x630.png", request.url), 301);
}
