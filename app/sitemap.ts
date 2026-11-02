import type { MetadataRoute } from "next";

const site = "https://www.docvy.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ["", 1],
    ["/about", 0.6],
    ["/care-guide", 0.9],
    ["/contact", 0.7],
    ["/doctors", 0.9],
    ["/for-doctors", 0.7],
    ["/faqs", 0.6],
    ["/grievance", 0.3],
    ["/how-it-works", 0.6],
    ["/legal/privacy", 0.2],
    ["/legal/terms", 0.2],
    ["/legal/refund", 0.2],
    ["/legal/disclaimer", 0.2],
    ["/pricing", 0.7],
  ] as const;

  return pages.map(([path, priority]) => ({
    url: `${site}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
  }));
}
