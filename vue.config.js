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
    },
    // 更改打包入口
    chainWebpack: config => {
      config.when(process.env.NODE_ENV === 'production', config => {
        config.entry('app').clear().add('./src/main-prod.js')

        // 查找外部资源
        config.set('externals', {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          axios: 'axios',
          echarts: 'echarts',
          nprogress: 'NProgress',
          'vue-quill-editor': 'VueQuillEditor'
        })
        // 自定义属性
        config.plugin('html').tap(args => {
          args[0].isProd = true
          return args
        })
      })
      
      config.when(process.env.NODE_ENV === 'development', config => {
        config.entry('app').clear().add('./src/main-dev.js')
        // 开发模式
        config.plugin('html').tap(args => {
          args[0].isProd = false
          return args
        })
      })
    }
  }