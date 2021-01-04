var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/business', (req, res) => {//访问接口  http://127.0.0.1:2101/business
  res.sendFile(__dirname + '/ind.html');
});

var n = 0;
io.on('connection', (socket) => {
  console.log('a user connected', n++);
  socket.on('on text', (msg) => {//监听数据    
    console.log(msg);
    io.emit('chat message', msg);//返回数据
  });
});

http.listen(2101, () => {//建立web服务
  console.log('listening on *:2101');
});