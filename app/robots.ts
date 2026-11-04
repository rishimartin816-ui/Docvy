import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const sitemap = new URL("/sitemap.xml", "https://www.docvy.in").toString();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    ...(process.env.VERCEL_ENV === "production" && process.env.DOCVY_INDEXING_ENABLED === "true" ? { sitemap } : {}),
  };
}
