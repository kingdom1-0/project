/*  
    node 的 mySql  使用 (数据库)

    速查表
    https://www.runoob.com/nodejs/nodejs-mysql.html   
    https://www.runoob.com/sql/sql-tutorial.html  

    cnpm install mysql   
*/

const mysql = require('mysql');
const connection = mysql.createConnection({ //配置数据库
  host: 'localhost', //主机地址
  user: 'king10',
  password: '@kingdom10',
  database: 'project' //数据库名
});

connection.connect(); //连接数据库

//本质上通地发送sql进行增删改查(sql通用)

//插入数据
const addSql = 'INSERT INTO business(Id,fl,img) VALUES(6,?,?)';
const addSqlParams = ['6L', '/images/10.jpg'];
connection.query(addSql, addSqlParams, function (err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }
  console.log(result.insertId); //插入ID     
});

//更新数据 
const updateSql = 'UPDATE business SET fl = ?,img = ? WHERE id=?';
const updateSqlParams = ['7L', '/images/11.jpg', 7];
connection.query(updateSql, updateSqlParams, function (err, result) {
  if (err) {
    console.log('UPDATE ERROR - ', err.message)
    return
  }
  console.log(result.affectedRows) //更新成功返回1
})

//删除数据
const delSql = 'DELETE FROM business WHERE id > 8';
connection.query(delSql, function (err, result) {
  if (err) {
    console.log("[DELETE ERROR] - ", err.message)
    return
  }
  console.log(result.affectedRows) //删除成功返回1
})

//数据查询
const sql = 'SELECT * FROM business';
connection.query(sql, function (err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }
  console.log(result); //查询结果
});

connection.end(); //关闭数据库