import axios from "axios";

function thisDate() { //当前时间
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0') //使用ES6 padStart(2,'0') 为日期强制两位数，少于两位数前面加0
    return date.getFullYear() + "-" + month + "-" + day + " " + date
        .getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') +
        ":" + date
        .getSeconds().toString().padStart(2, '0');
}

function oplogInfo(title, text = '更新内容：') { // 操作日志记录(参数：操作数据标题，操作内容)
    axios.post('oplog', {
        id: 1,
        username: sessionStorage.getItem("username"),
        text: text + title + '（成功）',
        date: thisDate()
    })
}

export {
    thisDate,
    oplogInfo
}