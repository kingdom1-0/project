const webpack = require('webpack')

module.exports = {
  pages: {
    index: {
      // webpack 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '牧星策划'
    }
  },
  publicPath: "./", //定义相对路径(打出静态打开即可使用的包),
  assetsDir: "style", //指定静态资源打包路径  
  devServer: { //域名服务器
    port: 3350,
    open: true,
    proxy: {
      "/api": {
        //代理路径 例如 https://baidu.com
        target: "https://baidu.com",
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  }
}