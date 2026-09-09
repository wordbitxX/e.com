import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Direct CDN delivery keeps Vercel deploys independent of the public
    // binary folder and avoids an optimizer 400 when an old deployment is
    // missing an asset. Pexels URLs are verified catalog fallbacks.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 128, 200, 280, 384, 512],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // This showcase is embedded in the platform's cross-origin preview.
          // SAMEORIGIN prevents that preview from rendering. A live payment
          // deployment should configure CSP frame-ancestors for trusted origins.
        ],
      },
    ];
  },
};

export default nextConfig;
