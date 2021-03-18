/*  
    node 的 mySql  使用 (数据库)

    速查表
    https://www.runoob.com/nodejs/nodejs-mysql.html   
    https://www.runoob.com/sql/sql-tutorial.html  

    cnpm install mysql   
*/
//http://127.0.0.1:2101/api/v1/
// 生成动态API （使用node调数据库，生成数据API）
var app = require('express')();
var http = require('http').createServer(app);
var mysql = require('mysql');
const io = require('socket.io')(http);

//链接数据库
const connection = mysql.createConnection({ //配置数据库
    host: 'localhost', //主机地址
    user: 'king10',
    password: '@kingdom10',
    database: 'project' //数据库名
});

connection.connect(); //连接数据库

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//数据库查询    
const result = { //楼层返回数据
    "status": "200",
    "message": "success",
    floor: [{}, {}, {}, {}], //楼层数据
    sort: ['', ''],
    store: [{}, {}, {}, {}] //店铺数据
}
const result2 = { //新闻返回数据
    "status": "200",
    "message": "success",
    news: []
}


function select() {
    connection.query('SELECT * FROM bu_floor', function (err, rows, fields) { //读取楼层信息
        if (err) throw err;
        return result.floor = rows;
    });
    connection.query('SELECT * FROM bu_sort', function (err, rows, fields) { //读取楼层信息
        if (err) throw err;
        return result.sort = rows;
    });
    connection.query('SELECT * FROM bu_store', function (err, rows, fields) { //读取相关店铺信息
        if (err) throw err;
        return result.store = rows;
    });
    connection.query('SELECT * FROM bu_news', function (err, rows, fields) { //读取相关店铺信息
        if (err) throw err;
        return result2.news = rows;
    });
}
select();

setInterval(function () { //实时读数据库数据（注释connection.end();  确实可以用，不过不合理，临时用下）
    //select();
}, 1000)


//数据接口business
app.get('/api/v1/business', function (req, res) { //楼层接口
    res.status(200),
        res.json(result)
});
app.get('/api/v1/news', function (req, res) { //新闻接口
    res.status(200),
        res.json(result2)
});


// app.get('/business', (req, res) => {
//     res.sendFile(__dirname + '/ind.html');
// });

io.on('connection', (socket) => {
    console.log('a user connected');
});

connection.end(); //关闭数据库

//配置服务端口 
http.listen(2101, () => {
    console.log('listening on *:2101');
});