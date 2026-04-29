import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Vercel에서 이미지 최적화 문제 방지
  },
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["@react-three/drei", "@react-three/fiber", "lucide-react"],
  },
};

export default nextConfig;
