import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upcdn.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
