import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://example.com/thumbnails/**'),
      new URL('http://localhost:6413/image/**'),
      new URL('https://gumball-backend.alamondaii.com/image/**')
    ],
  },
};

export default nextConfig;
