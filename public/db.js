/*  
    node 的 mySql  使用 (数据库)

    速查表
    https://www.runoob.com/nodejs/nodejs-mysql.html   
    https://www.runoob.com/sql/sql-tutorial.html  

    cnpm install mysql   
*/
//http://127.0.0.1:2101/api/v1/
// 生成动态API （使用node调数据库，生成数据API）
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var mysql = require('mysql'); //请求数据库
const io = require('socket.io')(http);
var bodyParser = require('body-parser'); //post中间件，用于post请求解析
var fs = require("fs");
var multipart = require('connect-multiparty'); //在处理模块中引入第三方解析模块

//处理静态资源
app.use('/public', express.static('public'));

//处理post请求数据解析 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))


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
    'SELECT * FROM me_notice',
    'SELECT * FROM bu_banner',
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
const apiArray = ['business', 'news', 'active', 'join', 'notice', 'banner']; //做个数组封装下简单的get API(对应上面dataArray数据)
apiArray.forEach(function (item, n) {
    app.get('/api/v1/' + item, function (req, res) { //建立数据接口
        res.status(200),
            res.json(dataArray[n]) //响应头返回相应查询数据
    });
})


//delete请求
app.delete('/api/v1/books/:id', (req, res) => {
    // res.json('传统的?id=123 : ' + req.query.id)  
    res.json('delete传参 ： ' + req.params.id)
})


//post请求
app.post('/api/v1/books', (req, res) => {
    // res.json('传统的?id=123 : ' + req.query.id)  
    res.json('post传参 ： ' + req.body.uname + '---' + req.body.pwd)
})

//put请求
app.put('/api/v1/books/:id', (req, res) => {
    // res.json('传统的?id=123 : ' + req.query.id)  
    res.json('put传参 ： ' +
        req.params.id + '---' + req.params.username + '---' + req.params.password)
})




//用户登录数据接口
app.post('/api/v1/login', function (req, res) { //建立数据接口
    const reqBody = req.body; //post请求数据
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


var multipartMiddleware = multipart(); //服务器文件上传

app.post('/api/v1/file_upload', multipartMiddleware, function (req, res) { //文件上传
    console.log(req.files.file); //上传文件信息
    var r = new Date().getTime(); //定文件唯一路径
    var des_file = "/tmp/image/" + r + req.files.file.originalFilename; //文件存放相对路径
    fs.readFile(req.files.file.path, function (err, data) {
        fs.writeFile(__dirname + des_file, data, function (err) { //_dirname （写入需绝对路径，把相对路径转换成绝对路径）
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: '文件上传成功',
                    filename: des_file
                };
            }
            console.log(response);
            res.json(response);
        });
    });
})

var buf = new Buffer.alloc(10240);
fs.open(__dirname + '/ueConfig.json', 'r+', function (err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("文件打开成功！");
    console.log("准备读取文件：");
    fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
        if (err) {
            console.log(err);
        }
        console.log(bytes + "  字节被读取");
        // 仅输出读取的字节
        if (bytes > 0) {
            console.log(buf.slice(0, bytes).toString());
        }
        app.get('/api/v1/ueditor', function (req, res) { //文件上传

            console.log(JSON.parse(buf.slice(0, bytes).toString()))
            res.send(JSON.parse(buf.slice(0, bytes).toString()));
            //res.json({"imageMaxSize": 2048,})
        })
    });
});







//使用setInterval实时读数据库数据，注释connection.end();  确实可以用，不过不合理，使用socket.io监控后台页面提交数据，更新数据接口会比较合理
io.on('connection', (socket) => {
    console.log('a user connected');
});


//配置服务端口
app.listen(2101, () => {
    console.log('listening on *:2101');
});