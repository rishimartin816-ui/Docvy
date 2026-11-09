/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [
    { protocol: "https", hostname: "medanta.s3.ap-south-1.amazonaws.com", pathname: "/**" },
    { protocol: "https", hostname: "www.artemishospitals.com", pathname: "/BackEndImages/DoctorImage/**" },
    { protocol: "https", hostname: "backend.ckbhospital.com", pathname: "/wp-content/uploads/**" },
  ] },
  async headers() {
    if (process.env.VERCEL_ENV === "production" && process.env.DOCVY_INDEXING_ENABLED === "true") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
