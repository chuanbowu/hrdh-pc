const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: config => {
    config.externals = {
      'AMap': 'AMap'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components')
        }
      }
    })
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      return {
        plugins: [new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 10240, // 文件压缩阈值，对超过10k的进行压缩
          deleteOriginalAssets: false // 是否删除源文件
        })]
      }
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8888,
    https: false,
    hotOnly: false,
    proxy: {
      // 设置代理
      // proxy all requests starting with /api to jsonplaceholder
      '/hrdh-restful': {
        target: 'http://www.chuanbowu.com/', // 真实请求的目标地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/hrdh-restful': '/hrdh-restful'
        }
      }
    },
    before: (app) => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
