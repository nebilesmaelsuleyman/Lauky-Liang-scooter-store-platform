import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
    ignoreDuringBuilds: true,
  },
 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", 
      },
    ],
    unoptimized: true, 
  },
 
};

export default nextConfig;
