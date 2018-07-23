'use strict'
// 开发和生产使用到的公共配置文件
const path = require('path') // node路径模块
const utils = require('./utils') // 工具
const config = require('../config') // 配置文件
const vueLoaderConfig = require('./vue-loader.conf') // vue-loader

function resolve(dir) {
  // 返回 绝对路径
  return path.join(__dirname, '..', dir)
}
// path.join()将路径片段进行拼接  path.join('/a', '/b') // 'a/b'
// path.resolve()将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃 path.resolve('/a', '/b') // '/b'
// __dirname 全局变量,可以防止不同操作系统之间的文件路径问题，并且可以使相对路径按照预期工作
module.exports = {
  // path.resolve 获取绝对路径
  context: path.resolve(__dirname, '../'),
  // 入口,依赖图构建开始的模块  
  entry: {
    // SPA只有一个
    app: './src/main.js',
    // 第三方库(vendor) vendors: './src/vendors.js'
  },
  // output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。
  output: {
    // 此配置将一个单独的 bundle.js 文件输出到 config.build.assetsRoot 目录中。
    path: config.build.assetsRoot, // bundle输出路径
    filename: '[name].js', //bundle 文件名
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath //公共存放路径
  },
  resolve: {
    extensions: [
      // 自动补全文件后缀
      '.js', '.vue', '.json', '.scss'
    ],
    alias: {
      // 创建路径的别名
      // 创建 import 或 require 的别名，来确保模块引入变得更简单
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
      // E:
      //   '~': resolve(__dirname, 'src')  import stickTop from '~/components/stickTop'
      //    'components': path.resolve(__dirname, '../src/components'),  import stickTop from 'components/stickTop'      
    }
  },
  module: {
    // loader配置
    rules: [{
        //使用vue-loader将vue文件转化成js的模块①
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
         //js文件需要通过babel-loader进行编译成es5文件以及压缩等操作②
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
         //图片、音像、字体都使用url-loader进行处理，超过10000会编译成base64③
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.scss$/,
        loader: ["style", "css", "sass"]
      }
    ]
  },
  node: {
    //以下选项是Node.js全局变量或模块，这里主要是防止webpack注入一些Node.js的东西到
    // vue中 
    setImmediate: false,
     
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
