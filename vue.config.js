module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          'assets': '@/assets',
          'commom': '@/commom',
          'components': '@/components',
          'network': '@/network',
          'router': '@/router',
        }
      }
    }
  }