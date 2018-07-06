'use strict'
const path = require('path')

module.exports = {
  // 开发环境
  dev: {
    assetsSubDirectory: '', // 子目录、存放css,js,image等
    assetsPublicPath: '/', // 根目录
    proxyTable: {}, // 此属性可解决跨域问题   
    host: 'localhost', // 主机名,优先级低于process.env.HOST
    port: 8080, // 端口，优先级低于process.env.PORT 
    autoOpenBrowser: false, // 自动打开浏览器
    errorOverlay: true, //浏览器错误提示
    notifyOnErrors: true, //跨平台错误提示
    poll: false, //使用文件系统(file system)获取文件改动的通知devServer.watchOptions   

    // source map 错误追踪到源文件，方便调试！
    // 开发推荐 : cheap-module-eval-source-map
    devtool: 'cheap-module-eval-source-map',
    // eval： 使用eval包裹模块代码
    // source-map： 产生.map文件
    // cheap： 不包含列信息（关于列信息的解释下面会有详细介绍)也不包含loader的sourcemap
    // module： 包含loader的sourcemap（比如jsx to js ，babel的sourcemap）
    // inline： 将.map作为DataURI嵌入，不单独生成.map文件（这个配置项比较少见）

    cacheBusting: true, //使缓存失效
    cssSourceMap: true //代码压缩后进行调bug定位将非常困难，
    //  于是引入sourcemap记录压缩前后的位置信息记录
    // ，当产生错误时直接定位到未压缩前的位置，将大大的方便我们调试
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // output Paths config
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,


    //线上推荐: #source-map
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
