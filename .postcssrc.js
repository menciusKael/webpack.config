// postcss-loader配置,在webpack的旧版本可以直接在webpack.config.js中配置
// 新版独立出.postcssrc.js，里面配置需要使用到的插件
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},   
    "autoprefixer": {}
  }
}
