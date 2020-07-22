 //防抖函数
 export function debounce(func,delay) {
   let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

// 时间戳格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

// 时间戳格式化
// export function formatDate(v) {
//   if (/^(-)?\d{1,10}$/.test(v))
//    {
//      v = v * 1000;
//    } 
//    else if (/^(-)?\d{1,13}$/.test(v))
//     {
//       v = v * 1;
//     }               
//     var dateObj = new Date(v);               
//     var month = dateObj.getMonth() + 1;               
//      var day =  dateObj.getDate();               
//     var hours = dateObj.getHours();               
//     var minutes = dateObj.getMinutes();               
//     var seconds = dateObj.getSeconds();               
//     if(month<10){
//            month = "0" + month;
//        }               
//     if(day<10){
//            day = "0" + day;
//        }               
//      if(hours<10){
//            hours = "0" + hours;
//        }               
//      if(minutes<10){
//            minutes = "0" + minutes;
//        }               
//      if(seconds<10){
//            seconds = "0" + seconds;
//        }               
//      var UnixTimeToDate = dateObj.getFullYear() + '-' + month + '-' +day + ' ' + hours + ':' + minutes + ':' + seconds;               
//      return UnixTimeToDate;
// }
