const rewrites = async () => {
  return [
    {
      source: '/office/:path*',
      destination: '/:path*'
    },
    {
      source: '/aaa',
      destination: 'https://example.com/blog'
    },
    {
      source: '/login_88273',
      destination: 'https://hakadori-soudan.com/login_88273'
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
