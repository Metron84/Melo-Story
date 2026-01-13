import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize video loading for mobile
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable experimental features for better mobile support
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Video optimization
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
        },
      },
    });
    return config;
  },
};

export default nextConfig;
