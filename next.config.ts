import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io'  // Added this line
    ]
  },
};

export default nextConfig;
