import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["gateway.pinata.cloud"], // Add Pinata domain for images
  },
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
