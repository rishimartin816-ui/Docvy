import { legal } from "@/lib/content";
import { doctorCitySlugs } from "@/lib/seo/route-registry";
import { patientTopicGuides } from "@/lib/patient-topic-guides";

export const SITE = "https://www.docvy.in";
export const sitemapGroups = {
  static: ["", "/about", "/contact", "/for-doctors", "/faqs", "/grievance", "/how-it-works", "/pricing", ...Object.keys(legal).map(slug => `/legal/${slug}`)],
  doctors: ["/doctors"],
  cities: Object.keys(doctorCitySlugs).map(slug => `/doctors/${slug}`),
  content: ["/care-guide", ...patientTopicGuides.map(({ slug }) => `/patient-guides/${slug}`)],
} as const;

export type SitemapGroup = keyof typeof sitemapGroups;

export function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function xmlResponse(body: string, maxAge = 3600) {
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": `public, s-maxage=${maxAge}, must-revalidate` } });
}

export function unavailableSitemap() {
  return new Response("Sitemap temporarily unavailable", { status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "300" } });
}

export function renderUrlset(paths: readonly string[]) {
  if (!paths.length || paths.length > MAX_URLS) throw new Error("Invalid sitemap size");
  const urls = [...new Set(paths)].map(path => `  <url><loc>${escapeXml(SITE + path)}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export const MAX_URLS = 10_000;

/** One owner per canonical URL; stable ordering and no query/filter aliases. */
export function paginateGroups(groups: Record<string, readonly string[]>) {
  const seen = new Set<string>();
  const pages: Record<string, string[]> = {};
  for (const [group, paths] of Object.entries(groups)) {
    if (!/^[a-z]+(?:-[a-z]+)*$/.test(group)) throw new Error("Invalid sitemap group");
    const unique = [...new Set(paths)].sort();
    for (const path of unique) {
      if ((SITE + path).length > 2048 || (path !== "" && (!path.startsWith("/") || path.startsWith("//") || /[?#\\\s\u0000-\u001f]/.test(path) || new URL(SITE + path).href !== SITE + path))) {
        throw new Error("Noncanonical sitemap path: " + path);
      }
      if (seen.has(path)) throw new Error("URL belongs to multiple sitemap groups: " + path);
      seen.add(path);
    }
    for (let offset = 0; offset < unique.length; offset += MAX_URLS) {
      const page = offset / MAX_URLS + 1;
      pages[page === 1 ? group : group + "-" + page] = unique.slice(offset, offset + MAX_URLS);
    }
  }
  return pages;
}

export const sitemapPages = paginateGroups(sitemapGroups);

export function renderIndex(groups: string[]) {
  const items = groups.map(group => `  <sitemap><loc>${escapeXml(SITE + "/sitemaps/" + group + ".xml")}</loc></sitemap>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>`;
}
