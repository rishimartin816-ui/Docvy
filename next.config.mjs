const csp = ["default-src 'self'", "script-src 'self' 'unsafe-inline' https://checkout.razorpay.com", "style-src 'self' 'unsafe-inline'", "img-src 'self' data: https:", "font-src 'self' data:", "connect-src 'self' https://api.razorpay.com https://lumberjack.razorpay.com", "frame-src https://api.razorpay.com https://checkout.razorpay.com", "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'"].join("; ");
export default { reactStrictMode: true, poweredByHeader: false, async headers() { return [{ source: "/(.*)", headers: [
  { key: "Content-Security-Policy", value: csp }, { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }] }]; } };
