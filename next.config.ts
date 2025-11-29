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
    ],
  },
};

export default nextConfig;
