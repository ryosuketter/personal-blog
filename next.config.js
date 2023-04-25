/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/office/:path*',
        destination: ':path*'
      },
      {
        source: '/:path*',
        destination: 'https://legacy.hakadori-soudan.com/:path*'
      },
      {
        source: '/',
        destination: 'https://legacy.hakadori-soudan.com/'
      }
    ]
  }
}
