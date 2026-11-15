import { sitemapPages, renderUrlset, xmlResponse } from "@/lib/seo/segmented-sitemaps";

export const revalidate = 3600;
export function generateStaticParams() {
  return Object.keys(sitemapPages).map(group => ({ segment: group + ".xml" }));
}

export function GET(_request: Request, { params }: { params: { segment: string } }) {
  const name = params.segment;
  if (!name.endsWith(".xml")) return new Response("Not Found", { status: 404 });
  const group = name.slice(0, -4) as keyof typeof sitemapPages;
  if (!Object.prototype.hasOwnProperty.call(sitemapPages, group)) return new Response("Not Found", { status: 404 });
  return xmlResponse(renderUrlset(sitemapPages[group]));
}
