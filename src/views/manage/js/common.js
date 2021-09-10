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

/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce (func, wait = 50, immediate = true) {
  let timer, context, args

  // 延迟执行函数
  const later = () => setTimeout(() => {
    // 延迟函数执行完毕，清空缓存的定时器序号
    timer = null
    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文
    if (!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  // 这里返回的函数是每次实际调用的函数
  return function(...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
    // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}

export {
    thisDate,
    oplogInfo,
    debounce
}