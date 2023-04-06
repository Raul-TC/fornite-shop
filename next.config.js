/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media.fortniteapi.io'],
    minimumCacheTTL: 60

  },
  reactStrictMode: true
}

module.exports = nextConfig
