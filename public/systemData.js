const os = require('os')
class System {
    constructor() {
        this.hostname = os.hostname() // 服务器名
        this.ip = this.getIPAdress() // 服务器IP
        this.node = 'node v12.18.1'
        this.location = __dirname.slice(0, __dirname.lastIndexOf('\\'))
        this.system = os.type() + ' ' + os.release()
        this.arch = os.arch()
        this.cpus = os.cpus().length
        this.uptime = parseInt(os.uptime() / 60 / 60)
        this.totalmem = parseInt((os.totalmem() - os.freemem()) / 1048576)
    }
    getIPAdress() { // 获取IP
        var interfaces = os.networkInterfaces()
        for (var devName in interfaces) {
            var iface = interfaces[devName]
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i]
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address
                }
            }
        }
    }
} // 系统信息

module.exports = System
