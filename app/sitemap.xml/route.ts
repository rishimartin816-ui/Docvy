import { renderIndex, xmlResponse, unavailableSitemap } from "@/lib/seo/segmented-sitemaps";
import { getPublicSitemapPages } from "@/lib/seo/public-sitemaps";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    return xmlResponse(renderIndex(Object.keys(await getPublicSitemapPages())), 300);
  } catch {
    return unavailableSitemap();
  }
}
