import { sitemapPages, renderUrlset, xmlResponse, unavailableSitemap } from "@/lib/seo/segmented-sitemaps";
import { getPublicSitemapPages } from "@/lib/seo/public-sitemaps";

// Mixed static and live children must not use generateStaticParams: Next 14
// cannot switch a pre-rendered handler to no-store for a later dynamic child.
// CDN caching is explicit per response; static children never query Supabase.
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { segment: string } }) {
  const name = params.segment;
  if (!name.endsWith(".xml")) return new Response("Not Found", { status: 404 });
  const group = name.slice(0, -4) as keyof typeof sitemapPages;
  if (Object.prototype.hasOwnProperty.call(sitemapPages, group)) return xmlResponse(renderUrlset(sitemapPages[group]));
  if (!/^doctor-profiles(?:-[2-9]|-[1-9][0-9]+)?$/.test(group)) return new Response("Not Found", { status: 404 });
  try {
    const pages = await getPublicSitemapPages();
    if (!Object.prototype.hasOwnProperty.call(pages, group)) return new Response("Not Found", { status: 404 });
    return xmlResponse(renderUrlset(pages[group]), 300);
  } catch {
    return unavailableSitemap();
  }
}
