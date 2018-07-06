'use strict'
// check-versions：调用检查版本的文件 
require('./check-versions')()

process.env.NODE_ENV = 'production' // 设置当前是生产环境

const rm = require('rimraf') // 删除文件/文件夹,重新生产时先删除！

const path = require('path') // node的path模块
const chalk = require('chalk') // 定义命令行输出内容的颜色

const webpack = require('webpack')
const config = require('../config') // 配置文件
const webpackConfig = require('./webpack.prod.conf') // 生产环境配置文件

const ora = require('ora') // 用于node命令行环境的loading效果！
const spinner = ora('开始生产...')
spinner.start() // 调用start的方法实现加载动画，优化开发体验

// 先删除dist文件再生成新文件，因为有时候会使用hash来命名，删除整个文件可避免冗余
// clean-webpack-plugin as well
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err)
    throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err)
      throw err
    //process.stdout.write() 向屏幕输出，提示信息
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('生产失败\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('生产完成\n'))
    console.log(chalk.yellow('提示: 置于http服务器上访问！'))
  })
})
// npm run build
// > vue-cli@1.0.0 build C:\Users\Administrator\Desktop\vue-app
// > node build/build.js

// Hash: 2fe758ac275e28d964f7
// Version: webpack 3.12.0
// Time: 6543ms
//                                            Asset       Size  Chunks             Chunk Names
// css/app.6cc8ae5c441c8589951edc11ef4aff94.css.map     1.3 kB          [emitted]
//                     js/0.69d34a3fdd2258ade6b9.js    1.23 kB       0  [emitted]  home
//                js/vendor.11c58d117f15097a8b04.js     126 kB       2  [emitted]  vendor
//                   js/app.0bd65ec4e33f352ba550.js  844 bytes       3  [emitted]  app
//              js/manifest.019756b9c31598274da8.js    1.48 kB       4  [emitted]  manifest
//     css/app.6cc8ae5c441c8589951edc11ef4aff94.css  642 bytes       3  [emitted]  app
//                     js/1.5bb11ee9c17a3d4e5cee.js  358 bytes       1  [emitted]  base
//                 js/0.69d34a3fdd2258ade6b9.js.map    8.74 kB       0  [emitted]  home
//                 js/1.5bb11ee9c17a3d4e5cee.js.map    3.31 kB       1  [emitted]  base
//            js/vendor.11c58d117f15097a8b04.js.map     620 kB       2  [emitted]  vendor
//               js/app.0bd65ec4e33f352ba550.js.map    4.73 kB       3  [emitted]  app
//          js/manifest.019756b9c31598274da8.js.map    7.78 kB       4  [emitted]  manifest
//                                       index.html  508 bytes          [emitted]

// 生产完成
// 提示: 置于http服务器上访问！


// 项目构建 Hash: ff639bb1151cac6a622d ! 
// 项目任意一处改变,这个值就会变！
// 不做任何修改，连续构建两次，这个值不变 
// 粒度最大 
// 场景 : 版本控制