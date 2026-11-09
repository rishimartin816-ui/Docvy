/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: "https", hostname: "cxyscxjauxoizvvllmfu.supabase.co", pathname: "/storage/v1/object/public/docvy-provider-photos/**" }] },
  async headers() {
    if (process.env.VERCEL_ENV === "production" && process.env.DOCVY_INDEXING_ENABLED === "true") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
