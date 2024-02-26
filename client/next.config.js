/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fe-case-study-iksl55dvn-lmatheus.vercel.app',
      },
    ],
  },
}

module.exports = nextConfig
