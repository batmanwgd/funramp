const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
  images: {
    domains: ['flocksafety.showpad.com']
  },
}

module.exports = withPlugins([[withImages]], nextConfig)

