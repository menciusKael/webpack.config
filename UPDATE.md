## webpack4 升级探索
**tip ：webpack3 => webpack4升级指南**
[变化总览](https://dev.to/flexdinesh/upgrade-to-webpack-4---5bc5)
 
### 前言
    相比webpack3,webpack4可以零配置运行,新增的optimization简化很多,mode区分环境变量更便捷,打包速度有很大的提升！
     
#### 0配置
> webpack4设置了默认值,可以零配置启动项目
1. entry 默认值 ./src/
1. output.path 默认值 ./dist
1. mode 默认值 production
当想要添加自己想要的插件,或者要多个entery时,零配置不再适用
大部分项目,依旧需要多个不同的配置文件

##### 模块类型
> webpack4提供了5种模块类型,此处列举两种

- json: 可通过 require 和 import 导入JSON格式的数据(默认为 .json 的文件)
- javascript/auto: (webpack3 中的默认类型)支持所有的JS模块系统：CommonJS、AMD。

*webpack4 不仅支持本地处理 JSON，还支持对 JSON 的 Tree Shaking。另外如果要用 loader 转换 json 为 js，需要设置 type 为 javascript/auto*
    
#### 模式mode
> 新增mode区分环境,webpack3中,通过 webpack.DefinePlugin 向相关配置文件注入 NODE_ENV 这个环境变量

mode值 : development / production , 设置 mode ,相当于把 process.env.NODE——ENV 设置为对应的值

webpack4中,测试环境,还是需要手动注入NODE_ENV,此环境下mode = development , 因为测试属于开发

```
module.exports = {
  mode: 'production'
}
```
包括生产环境production、开发环境devolopment和自定义none这三个选择可选

#### 开发模式
> 浏览器调试工具

- 注释、开发阶段的详细错误日志和提示
- 快速和优化的增量构建机制
- 开启 output.pathinfo 在 bundle 中显示模块信息
- 开启 NamedModulesPlugin
- 开启 NoEmitOnErrorsPlugin
- 
#### 生产模式
> 启用所有优化代码的功能
- 更小的bundle大小
- 去除只在开发阶段运行的代码
- 关闭内存缓存
- Scope hoisting 和 Tree-shaking
- 开启 NoEmitOnErrorsPlugin
- 开启 ModuleConcatenationPlugin
- 开启 optimization.minimize

#### none
- 禁用所有的默认设置

#### optimization
    webpack4移除了commonchunk插件,optimization属性代替 
    
### optimization常用配置项

#### minimize
> 启用unglifyjsWebpackPlugin压缩,生产环境下该值默认为true

```
optimization: {
    minimize: false
}
```
#### minimier
> 可以使用其他插件来执行压缩功能

```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  //...
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ /* your config */ })
    ]
  }
};
```

##### splitChunks
> webpack4默认使用splitChunksPlugin插件来实现代码分割功能，来替代webpack3中的commonChunksPlugin插件

```
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
```

##### runtimeChunk
    通过设置 runtimeChunk: true 来为每一个入口默认添加一个只包含 runtime 的 chunk, 通过提供字符串值，可以使用插件的预设模式
 
```
signal: 创建一个被所有生成的块共享的runtime文件
    multiple: 为共同的块创建多个runtime文件
```
    缺省值为false，表示每个入口块默认内嵌runtime代码
    
```
runtimeChunk {
    name: "runtime"
}
```
#### noEmitOnErrors
> 只要在编译时出现错误，就使用noEmitOnErrors属性来跳过emit 阶段，用来替代NoEmitOnErrorsPlugin 插件

#### nameModules
> 使用可读的模块标识，方便更好的调试。webpack在开发模式下默认开启，生产模式下默认关闭，用来替代 NamedModulesPlugin 插件
    
```
module.exports = {
  //...
  optimization: {
    namedModules: true
  }
};
```
##### 升级
下面就基于vue-cli的项目对webpack配置进行升级
1. 升级nodejs
使用 webpack4 时，必须保证 Node.js 版本 >= 8.9.4，因为 webpack4 使用了大量的ES6语法，这些语法在 nodejs新版 v8 中得到了原生支持
2. 升级webpack主要部件，包括webpack、webpack-bundle-analyzer、webpack-dev-server、webpack-merge,升级的操作很简单，先删除，再安装即可。但要注意的是webpack4版本中 cli工具分离成了 webpack 核心库 与 webpack-cli 命令行工具两个模块，需要使用 CLI，必安装 webpack-cli 至项目中

```
cnpm uninstall -D webpack webpack-bundle-analyzer webpack-dev-server webpack-merge
```

```
cnpm install -D webpack webpack-cli webpack-bundle-analyzer webpack-dev-server webpack-merge
```
3. 升级webpack相关插件，包括copy-webpack-plugin、css-loader、eslint-loader、file-loader、html-webpack-plugin、url-loader、friendly-errors-webpack-plugin、optimize-css-assets-webpack-plugin、uglifyjs-webpack-plugin

```
cnpm uninstall -D copy-webpack-plugin css-loader eslint-loader file-loader html-webpack-plugin url-loader  friendly-errors-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
```

```
cnpm install -D copy-webpack-plugin css-loader eslint-loader file-loader html-webpack-plugin url-loader  friendly-errors-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
```
4. 升级vue-loader
由于vue-loader升级到版本15后，配置有较多的变化，稳妥起见，可以只将vue-loader升级到14.4.2

```
cnpm uninstall -D vue-loader
cnpm uninstall -D vue-loader@14.4.2
```
5. 替换webpack相关插件，extract-text-webpack-plugin替换为mini-css-extract-plugin

```
cnpm uninstall -D extract-text-webpack-plugin
cnpm install -D mini-css-extract-plugin
```

#### 配置
> 下面对配置文件的修改进行详细说明：

1. webpack.base.conf.js文件
　增加node:process.env.NODE_ENV即可
　
```
module.exports = {
+  mode: process.env.NODE_ENV,
...
```
2. webpack.prop.conf.js文件配置
 
2.1 将ExtractTextPlugin替换为MiniCssExtraPlugin


```
+ const MiniCssExtractPlugin = require("mini-css-extract-plugin")
- const ExtractTextPlugin = require('extract-text-webpack-plugin')

...
-    new ExtractTextPlugin({
+    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),
...
```
2.2 删除UglifyJsPlugin配置项

```
- const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
...
- new UglifyJsPlugin({
-      uglifyOptions: {
-        compress: {
-          warnings: false
-        }
-      },
-      sourceMap: config.build.productionSourceMap,
-      parallel: true
- })
```
2.3 删除CommonsChunkPlugin配置项,引入optimization.splitChunks

> Code Splitting 一般有如下配置,为vendor、manifest、vendor-async配置CommonsChunkPlugin
- Vendor单独打包(Vendor指第三方库或者公共的基础文件,特点是变化少,单独打包利用缓存)
- Manifest(Webpack的runtime代码)单独打包
- 异步加载的代码单独打包
- 不同入口公共业务代码单独打包(利用缓存)

```
- new webpack.optimize.CommonsChunkPlugin({
-      name: 'vendor',
-      minChunks (module) {
-        return (
-          module.resource &&
-          /\.js$/.test(module.resource) &&
-          module.resource.indexOf(
-            path.join(__dirname, '../node_modules')
-          ) === 0
-        )
-      }
-    }),
-    new webpack.optimize.CommonsChunkPlugin({
-     name: 'manifest',
-      minChunks: Infinity
-    }),
-    new webpack.optimize.CommonsChunkPlugin({
-      name: 'app',
-      async: 'vendor-async',
-      children: true,
-      minChunks: 3
-    }), 
...
```
2.4 添加optimization配置项
optimization.splitChunks 默认是不用设置的,如果 mode 是 production，那 Webpack 4 就会开启 Code Splitting。
默认 Webpack 4 只会对按需加载的代码做分割。如果我们需要配置初始加载的代码也加入到代码分割中，可以设置 splitChunks.chunks 为 'all'。
Webpack4 会把代码中的公共模块自动抽出来，变成一个包，前提是这个包大于 30kb，不然 Webpack 是不会抽出公共代码的，因为增加一次请求的成本是不能忽视的
webpack4 参数cacheGroups可自定义chunk抽离规格,和webpack3类似,默认不开启
```
+  optimization: {
+    splitChunks: {
+      chunks: 'async',
+      minSize: 30000,
+      minChunks: 1,
+      maxAsyncRequests: 5, // 异步加载并发加载的 bundle 数不能大于 5 个
+      maxInitialRequests: 3, // 初始加载的 bundle 数不能大于 3 个
+      automaticNameDelimiter: '~',
+      name: true,
+      cacheGroups: {
+        vendors: {
+          test: /[\\/]node_modules[\\/]/,
+          priority: -10
+        },
+        default: {
+          minChunks: 2,
+          priority: -20,
+          reuseExistingChunk: true
+        }
+      }
+    },
+    runtimeChunk: { name: 'runtime' }
+  },
```




