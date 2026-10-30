import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/journal", destination: "/writings", permanent: true },
      { source: "/journal/:slug", destination: "/writings/:slug", permanent: true },
      { source: "/blog", destination: "/writings", permanent: true },
      { source: "/grammario", destination: "/work/grammario", permanent: true },
    ];
  },
};

export default nextConfig;
