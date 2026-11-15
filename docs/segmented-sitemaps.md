# DOCVY segmented sitemap rollout

Root: https://www.docvy.in/sitemap.xml

Current segments: static, doctors, cities, content. These include only routes already present in the previous sitemap. Do not create empty provider, surgery, clinic, hospital or locality sitemaps.

## Expansion plan

Add database-driven segments for approved published doctors, clinics, hospitals, surgeries, specialities, localities, and high-quality location combinations only after verifying the corresponding canonical route and public record status. Use stable pagination (maximum 10,000 URLs per sitemap), real material modification dates, and exclude private or noindex URLs. Do not automatically create thin location landing pages.

## Search Console

Submit the root index and each child separately, then monitor indexed versus submitted URLs by segment. Validate XML, HTTP status, canonical URL consistency and robots directives before merging.

## Verification

Run npm ci && npm run build && npm run lint. Confirm the root returns sitemapindex, all children return urlset, unknown child returns 404, and /robots.txt points to the root. No production deployment was made by this branch.
