import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      {
        source: "/services/business-automation",
        destination: "/ai-automation",
        permanent: true,
      },
      {
        source: "/locations/:slug/business-automation",
        destination: "/locations/:slug/ai-automation",
        permanent: true,
      },
      {
        source: "/industries/:slug/business-automation",
        destination: "/industries/:slug/ai-automation",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
