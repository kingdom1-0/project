/*  
    node 的 mySql  使用 (数据库)

    速查表
    https://www.runoob.com/nodejs/nodejs-express-framework.html   //Express
    https://www.runoob.com/nodejs/nodejs-mysql.html   //连接 MySQL
    https://www.runoob.com/sql/sql-tutorial.html    //写SQL

    cnpm install mysql   
*/
//http://127.0.0.1:2101/api/v1/
// 生成动态API （使用node调数据库，生成数据API）
const express = require('express');
const cors = require('cors'); //cors跨域支持
const app = express();
const mysql = require('mysql'); //请求数据库
const bodyParser = require('body-parser'); //post中间件，用于post解析参数
const fs = require("fs");
const multipart = require('connect-multiparty'); //在处理模块中引入第三方解析模块
const multipartMiddleware = multipart(); //post数据解析

app.use(cors()); //解决跨域(替换下面的处理方案)

//设置跨域访问
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.use('/public', express.static('public')); //设置图片、视频、附件等静态资源存放路径

//处理post请求数据解析 
app.use(bodyParser.json()); //JSON请求
app.use(bodyParser.urlencoded({ //表单请求
    extended: false
}))

//版本号
var apiLo = "/api/v1/"

//数据库查询
const dataArray = [];
const apiArray = ['floor', 'sort', 'store', 'news', 'active', 'join', 'notice', 'banner', 'login']; //做个数组封装下简单的get API(对应上面dataArray数据)

/*配置数据库*/
var sqlConfig = {
    host: 'localhost', //主机地址
    user: 'king10',
    password: '@kingdom10',
    database: 'project' //数据库名
}

let conn;
let pool;
let que;
/*数据库重连机制(防止数据库断开)*/
function reconn() {
    conn = mysql.createPool(sqlConfig); //数据库连接池
    // 封装
    que = function (sql, callback) {
        pool.getConnection(function (err, conn) { //从连接池中取出连接,如无连接可用则隐式的建立一个数据库连接。
            conn.query(sql, function (err, results) {
                callback(err, results) // 结果回调
                conn.release() // 释放连接资源 | 跟 conn.destroy() 不同，它是销毁
            })
        })
    }
    conn.on("error", err => { //数据库断开的回调
        console.log("数据库重连");
        setTimeout(reconn, 1000) //递归调用数据库连接
    })
}
reconn();

/* 封装数据库读取 */
function getQuery(item) {
    conn.query('SELECT * FROM bu_' + item, function (err, rows) { //读取数据库
        if (err) throw err;
        return dataArray[apiArray.indexOf(item)] = rows;
    });
}


/*刷新全部SQL数据池*/
apiArray.forEach(function (item) { //遍历sql数据读取
    getQuery(item) //引用数据读取
})


//常规get数据接口
apiArray.forEach(function (item, n) {
    app.get(apiLo + item, function (req, res) { //建立数据接口
        res.status(200),
            res.json(dataArray[n]) //响应头返回相应查询数据
    });
})

/*修改内容数据接口*/
function putData(item) {
    app.put(apiLo + item, function (req, res) { //建立数据接口
        const da = req.body; //post请求数据
        const resData = {}; //响应数据
        let te = "";
        let idT = "";
        let daAr = [];
        for (var key in da) { //sql字段拼接
            if (key == "id") {
                idT = " id=?"
            } else {
                te += "," + key + "=?";
                daAr.push(da[key]);
            }
        }
        daAr.push(da.id);
        console.log(te.slice(1))
        //console.log(daAr.toString())
        conn.query('UPDATE bu_' + item + ' SET ' + te.slice(1) + ' WHERE ' + idT, daAr, function (err) { //修改指定数据
            if (err) {
                console.log(err.message);
                return;
            } else {
                resData.meta = {
                    "status": "200",
                    "message": "内容修改成功"
                };
                getQuery(item) //刷新单个数据池
            }
        });
        res.json(resData); //以json形式发送响应数据
    });
}
//常规数据修改
apiArray.forEach((item) => {
    if (item != "login") { //登录用户数据修改单独处理
        putData(item);
    }
})

//用户登录数据接口
app.post(apiLo + 'login', function (req, res) { //建立数据接口
    // req.params.id(get请求参数 /:id)  req.query.id(get请求 ?id=0)   req.body.id(post请求体)      
    const reqBody = req.body; //post请求数据
    const resData = {}; //响应数据
    /*
        dataArray[8]  //数据库用户数据
        对比数据返回登陆结果
    */
    dataArray[8].forEach(function (item) {
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

//修改密码数据接口
app.put(apiLo + 'login', function (req, res) { //建立数据接口
    const reqBody = req.body; //post请求数据
    const resData = {}; //响应数据
    /*
        dataArray[8]  //数据库用户数据
        对比数据返回登陆结果
    */
    dataArray[8].forEach(function (item) {
        if (reqBody.username == item.username && reqBody.password == item.password) {
            var modSql = 'UPDATE bu_login SET password = ? WHERE username = ?';
            var modSqlParams = [reqBody.setPassword, reqBody.username];
            conn.query(modSql, modSqlParams, function (err) { //修改指定用户密码
                if (err) {
                    console.log(err.message);
                    return;
                }
                getQuery('login') //刷新数据池单个数据
            });

            resData.meta = {
                "status": "200",
                "message": "密码修改成功"
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

let response;
app.post(apiLo + 'file_upload', multipartMiddleware, function (req, res) { //文件上传
    console.log(req.files.file); //上传文件信息
    var r = new Date().getTime(); //定文件唯一路径
    var des_file = "/serves/images/" + r + req.files.file.originalFilename; //文件存放相对路径
    fs.readFile(req.files.file.path, function (err, data) {
        fs.writeFile(__dirname + des_file, data, function (err) { //_dirname （写入需绝对路径，把相对路径转换成绝对路径）
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: '文件上传成功',
                    data: des_file
                };
            }
            console.log(response);
            res.json(response);
        });
    });
})

/* neditor编辑器 */
var buf = new Buffer.alloc(3000);
fs.open(__dirname + '/ueConfig.json', 'r+', function (err, fd) { //打开ueditor配置文件
    if (err) {
        return console.error(err);
    }
    //console.log("配置文件打开成功");
    fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) { //读取配置
        if (err) {
            console.log(err);
        }
        //console.log(bytes + "  字节被读取");
        app.get(apiLo + 'ueditor', function (req, res) { //文件上传          
            var daOb = JSON.parse(buf.slice(0, bytes).toString())
            res.jsonp(daOb); //传送JSONP响应
        })
    });
});

let responseImg;
app.post(apiLo + 'ueditor', multipartMiddleware, function (req, res) { //文件上传      
    //const action = req.query.action;
    //if (action == 'uploadimage' || action == 'uploadvideo' || action == 'uploadfile') { //图片/视频/附件上传判断  
    console.log(req.is())
    console.log(req.files.upfile)
    var r = new Date().getTime(); //定文件唯一路径
    var des_file = "/serves/images/" + r + req.files.upfile.originalFilename; //文件存放相对路径
    fs.readFile(req.files.upfile.path, function (err, data) {
        fs.writeFile(__dirname + des_file, data, function (err) { //_dirname （写入需绝对路径，把相对路径转换成绝对路径）
            if (err) {
                console.log(err);
            } else {
                responseImg = { //要按neditor后端请求规范返回响应数据
                    code: '200',
                    message: 'SUCCESS',
                    url: des_file,
                    thumbnail: des_file,
                    title: req.files.upfile.originalFilename,
                    original: req.files.upfile.originalFilename,
                    error: err
                };
            }
            //console.log(responseImg);
            res.jsonp(responseImg);
        });
    });
})

//conn.end(); //关闭数据库

//配置服务端口
app.listen(2101, () => {
    console.log('serve :2101');
});