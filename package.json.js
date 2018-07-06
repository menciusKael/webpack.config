// 注 : package.json文件内不能注释,注释单独到此文件！定义为变量仅为在编辑器下显示不报错！
var conf = {
  "name": "vue-cli", // 项目名称、不能有大写字母，不能 . _ 开头
  "version": "1.0.0", // 版本号、三段式
  "description": "vue-cli webpack configure explain", // 项目描述
  "author": "mzc", // 作者
  "private": true, // 私有
  // 定义运行的脚本
  "scripts": {
    // npm start = npm run start = npm run dev 
    "start": "npm run dev",
    // 运行开发环境,启动http服务器,实时编译
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    // 运行生成环境,使用node运行build.js文件
    "build": "node build/build.js"
  },
  // 项目上线依赖 cnpm i xxx --save 或 -S
  "dependencies": {
    "axios": "^0.18.0",
    "vue": "^2.5.2",
    "vue-router": "^3.0.1"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",// 属于postcss(后处理器)插件,自动添加浏览器前缀！
    "babel-core": "^6.22.1", // babel的核心
    "babel-helper-vue-jsx-merge-props": "^2.0.3",//预制babel-template函数，提供给vue,jsx等使用
    "babel-loader": "^7.1.1",//使项目运行使用Babel和webpack来传输js文件，使用babel-core提供的api进行转译
    "babel-plugin-syntax-jsx": "^6.18.0",//支持jsx
    "babel-plugin-transform-runtime": "^6.22.0",//避免编译输出中的重复，直接编译到build环境中
    "babel-plugin-transform-vue-jsx": "^3.5.0",//babel转译过程中使用到的插件，避免重复
    "babel-preset-env": "^1.3.2",// 转es5
    "babel-preset-stage-2": "^6.22.0",//ECMAScript第二阶段的规范
    "chalk": "^2.0.1",// 用来在命令行输出不同颜色文字
    "copy-webpack-plugin": "^4.0.1",//拷贝资源和文件
    "css-loader": "^0.28.11",//webpack先用css-loader加载器去解析后缀为css的文件，再使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里
    "extract-text-webpack-plugin": "^3.0.0",//将一个以上的包里面的文本提取到单独文件中
    "file-loader": "^1.1.4",//③打包压缩文件，与url-loader用法类似
    "friendly-errors-webpack-plugin": "^1.6.1",//识别某些类别的WebPACK错误和清理，聚合和优先排序，以提供更好的开发经验
    "html-webpack-plugin": "^2.30.1",//简化了HTML文件的创建，引入了外部资源，创建html的入口文件，可通过此项进行多页面的配置
    "less": "^3.0.4",
    "less-loader": "^4.1.0",
    "node-notifier": "^5.1.2",//支持使用node发送跨平台的本地通知
    "node-sass": "^4.9.0",
    "optimize-css-assets-webpack-plugin": "^3.2.0",//压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
    "ora": "^1.2.0",//加载（loading）的插件
    "portfinder": "^1.0.13",//查看进程端口
    "postcss-import": "^11.0.0",//可以消耗本地文件、节点模块或web_modules
    "postcss-loader": "^2.0.8",//用来兼容css的插件
    "postcss-url": "^7.2.1",//URL上重新定位、内联或复制
    "rimraf": "^2.6.0",//节点的UNIX命令RM—RF,强制删除文件或者目录的命令
    "sass": "^1.4.0",
    "sass-loader": "^7.0.1",
    "scss": "^0.2.4",
    "scss-loader": "^0.0.1",
    "semver": "^5.3.0",//用来对特定的版本号做判断的
    "shelljs": "^0.7.6",//使用它来消除shell脚本在UNIX上的依赖性，同时仍然保留其熟悉和强大的命令，即可执行Unix系统命令
    "style-loader": "^0.21.0",
    "uglifyjs-webpack-plugin": "^1.1.1",//压缩js文件
    "url-loader": "^0.5.8",//压缩文件，可将图片转化为base64
    "vue-loader": "^13.3.0",// VUE单文件组件的WebPACK加载器
    "vue-style-loader": "^3.0.1",//类似于样式加载程序，您可以在CSS加载器之后将其链接，以将CSS动态地注入到文档中作为样式标签
    "vue-template-compiler": "^2.5.2",//这个包可以用来预编译VUE模板到渲染函数，以避免运行时编译开销和CSP限制
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",//可视化webpack输出文件的大小
    "webpack-dev-server": "^2.9.1",//开发服务器
    "webpack-merge": "^4.1.0"//配置合并，它将数组和合并对象创建一个新对象。如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值封装在函数中
  },
  //指定node和npm版本
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  //限制了浏览器或者客户端需要什么版本才可运行
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
