import { sitemapPages, renderIndex, xmlResponse } from "@/lib/seo/segmented-sitemaps";

export const revalidate = 3600;
export function GET() {
  return xmlResponse(renderIndex(Object.keys(sitemapPages)));
}
