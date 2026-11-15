import { sitemapGroups, renderUrlset, xmlResponse } from "@/lib/seo/segmented-sitemaps";

export const dynamic = "force-dynamic";
export function GET(_request: Request, { params }: { params: { segment: string } }) {
  const name = params.segment;
  if (!name.endsWith(".xml")) return new Response("Not Found", { status: 404 });
  const group = name.slice(0, -4) as keyof typeof sitemapGroups;
  if (!Object.prototype.hasOwnProperty.call(sitemapGroups, group)) return new Response("Not Found", { status: 404 });
  return xmlResponse(renderUrlset(sitemapGroups[group]));
}
