export const siteOrigin = "https://www.docvy.in";

/** Keep paths and filters, but never accept a user-controlled redirect destination. */
export function canonicalSiteRedirect(source: URL, production: boolean) {
  if (!production || !(source.hostname.endsWith(".vercel.app") || source.hostname === "demo.docvy.in")) return null;
  const destination = new URL(siteOrigin);
  destination.pathname = source.pathname;
  destination.search = source.search;
  return destination;
}
