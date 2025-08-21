/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,   // 👈 tells Vercel to use App Router only
  },
};

module.exports = nextConfig;
