const webpack = require('webpack')
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const path = require('path');

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
  configureWebpack: config => {

    if (process.env.NODE_ENV !== 'production') return;

    return {

      plugins: [

        new PrerenderSPAPlugin({

          staticDir: path.join(__dirname, 'dist'),

          routes: ['/', '/Second', '/Detail'],

          renderer: new Renderer({

            inject: {

              foo: "bar"

            },
            headless: false,

            renderAfterDocumentEvent: 'render-event'

          })

        })

      ]

    }

  }
  // chainWebpack: config => { //xss
  //   config.module
  //     .rule("vue")
  //     .use("vue-loader")
  //     .loader("vue-loader")
  //     .tap(options => {
  //       options.compilerOptions.directives = {
  //         html(node, directiveMeta) {
  //           (node.props || (node.props = [])).push({
  //             name: "innerHTML",
  //             value: `xss(_s(${directiveMeta.value}))`
  //           });
  //         }
  //       };
  //       return options;
  //     });
  // }
}