const os = require("os");
const syData = {}; //系统信息

function getIPAdress() { //获取IP
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

syData.hostname = os.hostname(); //服务器名
syData.ip = getIPAdress() //服务器IP
syData.node = 'node v12.18.1'
syData.location = __dirname.slice(0, __dirname.lastIndexOf('\\'));
syData.system = os.type() + " " + os.release()
syData.arch = os.arch();
syData.cpus = os.cpus().length;
syData.uptime = parseInt(os.uptime() / 60 / 60);
syData.totalmem = parseInt((os.totalmem() - os.freemem()) / 1048576)
module.exports = syData;