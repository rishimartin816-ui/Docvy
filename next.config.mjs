/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [
    ...["www.maxhealthcare.in", "d35oenyzp35321.cloudfront.net", "max-website20-images.s3.ap-south-1.amazonaws.com", "www.fortishealthcare.com", "www.yashodahealthcare.com", "metrohospitalfaridabad.com", "www.mirascare.com"].map((hostname) => ({ protocol: "https", hostname, pathname: "/**" })),
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
