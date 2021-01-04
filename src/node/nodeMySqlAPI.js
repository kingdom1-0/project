/*
    nodeJS 数据库接口  node  public/db.js(node运行端口)      http://127.0.0.1:3000/business      
    （结合使用node调数据库 和 RESTful API生成API接口）
*/

var express = require('express');   
var app =express();
var mysql = require('mysql');
    //链接数据库
    const connection = mysql.createConnection({   //配置数据库
        host     : 'localhost',   //主机地址
        user     : 'king10',      
        password : '@kingdom10',
        database : 'project'  //数据库名
      });
       
    connection.connect(); //连接数据库
      
    //设置跨域访问
    app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
       res.header("X-Powered-By",' 3.2.1');
       res.header("Content-Type", "application/json;charset=utf-8");
       next();
    });
    var result = {
        "status": "200",
        "message": "success", 
    }
    
    const sql = 'SELECT * FROM business';
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log(rows)
        return  result.data=rows;
    });
    connection.end();
    //写个接口  business
    app.get('/business',function(req,res){
        res.status(200),
        res.json(result)
    });
    //配置服务端口
    var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
    })