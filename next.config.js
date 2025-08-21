/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { typedRoutes: true, appDir: true },
};
module.exports = nextConfig;
