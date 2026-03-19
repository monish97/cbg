/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'example.com',        // replace with your actual thumbnail domain(s)
      'another-domain.com'  // add more if needed
    ],
  },
};

module.exports = nextConfig;
