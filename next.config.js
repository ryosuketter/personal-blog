const rewrites = async () => {
  return [
    {
      source: '/office/:path*',
      destination: '/:path*'
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

module.exports = {
  rewrites
}
