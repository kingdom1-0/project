const express = require('express')
const compression = require('compression')
// 创建 web 服务器
const app = express()
// 启用中间件(gzip压缩)
app.use(compression())
// 托管静态资源
app.use(express.static('./dist'))
// 启动 web 服务器
app.listen(2001, () => { // 线上设置80端口
    console.log('server: 127.0.0.1:2001')
})
