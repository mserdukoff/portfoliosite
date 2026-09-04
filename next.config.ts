import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/grammario", destination: "/work/grammario", permanent: true },
    ];
  },
};

export default nextConfig;
