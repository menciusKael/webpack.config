'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')

// 常量定义相关插件
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//美化webpack的错误信息和日志的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')// 查看空闲端口位置，默认情况下搜索8000这个端口 

// 获取当前环境变量
// set HOST 查看
// set HOST=3000 设置
// set HOST= 删除  
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
// http://javascript.ruanyifeng.com/nodejs/process.html#toc0  

 //通过webpack-merge实现webpack.dev.conf.js对wepack.base.config.js的继承
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    //规则是工具utils中处理出来的styleLoaders，生成了css，less,postcss等规则
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  //  开发环境下cheap-module-eval-source-map更快
  devtool: config.dev.devtool,
  //  devServer配置在 /config/index.js定制
  devServer: {  
    clientLogLevel: 'warning',//控制台显示的选项有none, error, warning 或者 info
    // 使用 HTML5 History API 时，404 响应被替代为 index.html
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path
          .posix
          .join(config.dev.assetsPublicPath, 'index.html')
      }]
    },
    hot: true, //启用 webpack 的模块热替换特性：
    compress: true, // 一切服务都启用gzip 压缩：
    // 指定使用一个 host。默认是 localhost。 
    host: HOST || config.dev.host,
    // 指定要监听请求的端口号：
    port: PORT || config.dev.port,    
    open: config.dev.autoOpenBrowser,//调试时自动打开浏览器
    // 在存在编译器错误或警告时显示浏览器中的全屏覆盖。 默认情况下禁用。如果只显示编译器错误：
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要 。devServer.publicPath 将用于确定应该从哪里提供
    // bundle，并且此选项优先。
    contentBase: false, // since we use CopyWebpackPlugin.
    publicPath: config.dev.assetsPublicPath,
    // 如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 
    // ，那么代理某些 URL 会很有用。
    proxy: config.dev.proxyTable,
    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。
    // 这也意味着来自 webpack 的错误或警告在控制台不可见
    quiet: true, //控制台是否禁止打印警告和错误,若用FriendlyErrorsPlugin 此处为 true
    // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。
    watchOptions: {
      // poll: 1000 // 每秒检查一次变动
      aggregateTimeout: 300 ,// 默认值
      poll: config.dev.poll
    }
  },
  // 插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。
  plugins: [
    // 你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。
    new webpack.DefinePlugin({
      // 任何出现 'process.env'，都会被替换为 require('../config/dev.env')
      // NODE_ENV: '"development"'
      'process.env': require('../config/dev.env')      
    }),
    //模块热替换，修改可以局部刷新，生产环境禁用！
    //devserver 的 hot: true,然后实例化即可
    new webpack.HotModuleReplacementPlugin(), 

    new webpack.NamedModulesPlugin(), // 显示文件的正确名字
    new webpack.NoEmitOnErrorsPlugin(),//当webpack编译错误的时候，来中端打包进程，防止错误代码打包到文件中
    // 该插件可自动生成一个 html5 文件或使用模板文件将编译好的代码注入进去⑥
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets//复制插件
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
   //查找端口号
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
       //端口被占用时就重新设置evn和devServer的端口
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig
        .plugins
        //友好地输出信息
        .push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
          },
          onErrors: config.dev.notifyOnErrors ?
            utils.createNotifierCallback() : undefined
        }))

      resolve(devWebpackConfig)
    }
  })
})
