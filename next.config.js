/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Next.js <Image> to load thumbnails from GameMonetize's CDN
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.gamemonetize.com',
      },
      {
        protocol: 'https',
        hostname: '**.gamedistribution.com',
      },
    ],
  },
}

module.exports = nextConfig
