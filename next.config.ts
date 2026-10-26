import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product/feature images are pasted as URLs in /admin, so any https host is allowed.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
