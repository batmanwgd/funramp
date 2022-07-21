const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
  images: {
    domains: ['flocksafety.showpad.com']
  },
  distDir: 'build',
}

module.exports = withPlugins([[withImages]], nextConfig)

