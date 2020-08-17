const path = require('path')
const CracoLessPlugin = require('craco-less')

module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#4254b2' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
