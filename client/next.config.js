/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fe-case-study-iksl55dvn-lmatheus.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'https://squad-builder-server.vercel.app',
      },
      {
        // protocol: 'https',
        hostname: 'localhost',
        port: '4000',
        pathname: '/api/images/**',
      },
    ],
  },
}

module.exports = nextConfig
