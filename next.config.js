/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
