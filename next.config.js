/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/office/(.*)',
        destination: '/$1'
      },
      {
        source: '/(.*)',
        destination: 'https://legacy.hakadori-soudan.com/$1'
      },
      {
        source: '/',
        destination: 'https://legacy.hakadori-soudan.com/'
      }
    ]
  }
}
