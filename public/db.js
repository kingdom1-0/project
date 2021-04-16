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
var bodyParser = require('body-parser'); //用于获取前端传送过来的数据

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
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//数据库查询
const dataArray = [];
const sqlArray = [ //做个数组封装单个数据读取（复杂数据结构下面单独写sql）
    'SELECT * FROM bu_floor',
    'SELECT * FROM bu_news',
    'SELECT * FROM me_active',
    'SELECT * FROM me_join',
    'SELECT * FROM me_notice'
]
sqlArray.forEach(function (item, n) {
    connection.query(item, function (err, rows, fields) { //读取数据库
        if (err) throw err;
        dataArray[n] = {
            "status": "200",
            "message": "数据获取成功"
        };
        return dataArray[n].data = rows;
    });
})

connection.query('SELECT * FROM bu_sort', function (err, rows, fields) { //读取楼层信息(合并多sql数据)
    if (err) throw err;
    return dataArray[0].sort = rows;
});
connection.query('SELECT * FROM bu_store', function (err, rows, fields) { //读取相关店铺信息(合并多sql数据)
    if (err) throw err;
    return dataArray[0].store = rows;
});

const user = {}; //数据库用户数据
connection.query('SELECT * FROM ma_login', function (err, rows, fields) {
    if (err) throw err;
    rows = JSON.parse(JSON.stringify(rows));
    return user.data = rows;
});

connection.end(); //关闭数据库


//简单数据接口
const apiArray = ['business', 'news', 'active', 'join', 'notice']; //做个数组封装下简单的get API(对应上面dataArray数据)
apiArray.forEach(function (item, n) {
    app.get('/api/v1/' + item, function (req, res) { //建立数据接口
        res.status(200),
            res.json(dataArray[n]) //响应头返回相应查询数据
    });
})


//创建application/json解析(用于解析post发送的req数据)
var jsonParser = bodyParser.json();

//用户登录数据接口
app.post('/api/v1/login', jsonParser, function (req, res) { //建立数据接口
    const reqBody = req.body; //前端数据
    const resData = {}; //响应数据
    /*
        user.data  //数据库用户数据
        对比数据返回登陆结果
    */
    user.data.forEach(function (item, n) {
        if (reqBody.username == item.username && reqBody.password == item.password) {
            resData.meta = {
                "status": "200",
                "message": "用户登录成功"
            };
            resData.token = item.token
        } else if (reqBody.username != item.username) {
            resData.meta = {
                "status": "400",
                "message": "用户不存在"
            };
        } else if (reqBody.password != item.password) {
            resData.meta = {
                "status": "401",
                "message": "密码错误"
            };
        }
    })
    res.json(resData); //以json形式发送响应数据
});

//使用setInterval实时读数据库数据，注释connection.end();  确实可以用，不过不合理，使用socket.io监控后台页面提交数据，更新数据接口会比较合理
io.on('connection', (socket) => {
    console.log('a user connected');
});


//配置服务端口
http.listen(2101, () => {
    console.log('listening on *:2101');
});