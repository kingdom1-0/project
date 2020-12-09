const webpack = require('webpack')
module.exports = {
    pages: {
      index: {
        // page 的入口
        entry: 'src/main.js',
        // 模板来源
        template: 'public/index.html',
        // 在 dist/index.html 的输出
        filename: 'index.html',
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: '牧星策划',
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      }
  },
  devServer: {
      port: 3350,
      open: true,
      proxy: {
        "/api": {
            //代理路径 例如 https://baidu.com
            target:  "https://baidu.com",
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
          $:"jquery",  
          jQuery:"jquery",  
          "windows.jQuery":"jquery"  
        })  
      ]  
    }
  }