import { sitemapGroups, renderIndex, xmlResponse } from "@/lib/seo/segmented-sitemaps";

export const dynamic = "force-dynamic";
export function GET() {
  return xmlResponse(renderIndex(Object.keys(sitemapGroups)));
}
