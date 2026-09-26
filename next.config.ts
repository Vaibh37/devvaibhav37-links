import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "awesome-github-stats.azurewebsites.net",
      },
    ],
  },
};

export default nextConfig;
