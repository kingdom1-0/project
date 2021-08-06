/*
   RESTful API(表述性状态传递API)（ URL定位资源接口 ）

   https://www.runoob.com/nodejs/nodejs-restful-api.html
*/

var express = require('express')
var app = express()
var fs = require('fs')

var user = {// 数据对象
   'user4': {
      'name': 'mohit',
      'password': 'password4',
      'profession': 'teacher',
      'id': 4
   }
}
app.get('/addUser', function (req, res) { // 添加新数据 ( http://127.0.0.1:3350/addUser )
   // 读取已存在的数据
   fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
       data = JSON.parse(data)
      data['user4'] = user['user4']// 添加新数据
       res.end(JSON.stringify(data))
   })
})

app.get('/deleteUser', function (req, res) { // 删除数据 ( http://127.0.0.1:3350/deleteUser )
   // 读取已存在的数据
   fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
       data = JSON.parse(data)
      delete data['user2']
       res.end(JSON.stringify(data))
   })
})

app.get('/listUsers', function (req, res) { // 显示数据 ( http://127.0.0.1:3350/listUsers )
   fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
       res.end(data)// 从这里返回数据
   })
})

app.get('/:id', function (req, res) { // 显示详情数据 ( http://127.0.0.1:3350/2 )
   fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
      data = JSON.parse(data)
      var user = data['user' + req.params.id]
       res.end(JSON.stringify(user))
   })
})

var server = app.listen(3350, function () {
  var host = server.address().address
  var port = server.address().port
})
