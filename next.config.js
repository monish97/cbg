/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'img.gamemonetize.com',        // replace with your actual thumbnail domain(s)      
    ],
  },
};

module.exports = nextConfig;
