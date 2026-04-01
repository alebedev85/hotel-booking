import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: { sourceMap: true },
  images: {
    domains: ['lh3.googleusercontent.com', 'images.unsplash.com'],
  },
};

export default nextConfig;
