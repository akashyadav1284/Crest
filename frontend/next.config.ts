import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/resurgence-main',
        destination: '/resurgence-main/index.html',
      },
      {
        source: '/resurgence-main/:path*',
        destination: '/resurgence-main/index.html',
      },
    ];
  },
};

export default nextConfig;
