/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
  },
}

export default nextConfig;
