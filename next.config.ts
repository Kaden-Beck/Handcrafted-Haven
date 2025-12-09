import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow loading remote images from GitHub avatars and Unsplash.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'bundui-images.netlify.app',
      },
    ],
  },
};

export default nextConfig;
