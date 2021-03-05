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
const sql = 'SELECT * FROM bu_floor';
const sql1 = 'SELECT * FROM bu_sort';
const sql2 = 'SELECT * FROM bu_store';
const result = {
    "status": "200",
    "message": "success",
    floor: [{}, {}, {}, {}], //楼层数据
    sort: ['', ''],
    store: [{}, {}, {}, {}] //店铺数据
}

function select() {
    connection.query(sql, function (err, rows, fields) { //读取楼层信息
        if (err) throw err;
        return result.floor = rows;
    });
    connection.query(sql1, function (err, rows, fields) { //读取楼层信息
        if (err) throw err;
        return result.sort = rows;
    });
    connection.query(sql2, function (err, rows, fields) { //读取相关店铺信息
        if (err) throw err;
        return result.store = rows;
    });
}
select();

setInterval(function () { //实时读数据库数据（注释connection.end();  确实可以用，不过不合理，临时用下）
    //select();
}, 1000)


//数据接口business
app.get('/api/v1/business', function (req, res) {
    res.status(200),
        res.json(result) //接口数据      
});
app.post('/api/v1/login', function (req, res) {
    res.status(200),
        res.json(result)
})


// app.get('/business', (req, res) => {
//     res.sendFile(__dirname + '/ind.html');
// });

io.on('connection', (socket) => {
    console.log('a user connected');
});

connection.end();

//配置服务端口 
http.listen(2101, () => {
    console.log('listening on *:2101');
});