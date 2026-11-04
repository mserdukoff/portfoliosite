import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/writing", destination: "/journal", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/grammario", destination: "/work/grammario", permanent: true },
    ];
  },
};

export default nextConfig;
