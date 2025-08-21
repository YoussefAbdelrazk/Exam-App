/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exam.elevateegy.com',
      },
    ],
    domains: ['exam.elevateegy.com'],
  },
};

export default nextConfig;
