import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Image optimization settings
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
      {
        protocol: 'https',
        hostname: '**.replicate.delivery',
      },
    ],
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'three', '@react-three/fiber'],
  },
  
  // Fix workspace root warning
  outputFileTracingRoot: path.join(__dirname),
  
  // Note: webpack config removed - Next.js 15.5 uses Turbopack by default
  // Videos should be served from /public folder or external URLs
};

export default nextConfig;
