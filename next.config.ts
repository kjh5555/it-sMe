import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Vercel에서 이미지 최적화 문제 방지
  },
};

export default nextConfig;
