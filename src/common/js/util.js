var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};
export default {

    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
};
/**
 * 日期字符串解释成日期类型对象
 * @param  {String} dateString 日期字符串
 * @param  {String} pattern    日期字符串格式
 * @return {Date}            日期对象
 */
export const parseDate=function (dateString, pattern) {
  var matchs1 = pattern.match(SIGN_REGEXP);
  var matchs2 = dateString.match(/(\d)+/g);
  if (matchs1.length == matchs2.length) {
    var _date = new Date(1970, 0, 1);
    for (var i = 0; i < matchs1.length; i++) {
      var _int = parseInt(matchs2[i]);
      var sign = matchs1[i];
      switch (sign.charAt(0)) {
        case 'y': _date.setFullYear(_int); break;
        case 'M': _date.setMonth(_int - 1); break;
        case 'd': _date.setDate(_int); break;
        case 'h': _date.setHours(_int); break;
        case 'm': _date.setMinutes(_int); break;
        case 's': _date.setSeconds(_int); break;
      }
    }
    return _date;
  }
  return null;
}

/**
 * 格式化日期
 * @param  {[type]} dateInput [description]
 * @param  {[type]} pattern   [description]
 * @return {[type]}           [description]
 */
export  const formatDate = function (dateInput, pattern) {
  if(!dateInput){
    return;
  }
  let date='';
  if( typeof(dateInput)=='number'){
    date=new Date(dateInput);
  }else if( typeof(dateInput)=='date'){
    date=dateInput;
  }else{
    return dateInput;
  }
  pattern = pattern || DEFAULT_PATTERN;
  return pattern.replace(SIGN_REGEXP, function ($0) {
    
    switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
    }
  });
}

export const calAge=function(birthDate){
  if(!birthDate){
    return;
  }
  if( typeof(birthDate)!='number'){
    return;
  }
  var diff=new Date().getTime()-birthDate;
  return Math.ceil(diff/1000/60/60/24/365);
}
// ajax错误处理
export const catchError = function (error) {
  if (error.response) {
    let messageInfo = error.response.data.message
    if (messageInfo === null || messageInfo === '' || messageInfo === undefined) {
      messageInfo = error.response.data
    }
    if (messageInfo !== undefined && ((messageInfo.indexOf('499') !== -1) || (messageInfo.indexOf('非法请求【缓存无效】') !== -1) || (messageInfo.indexOf('缓存无效') !== -1))) {
      window.location.href = '/login'
    }
    switch (error.response.status) {
      case 400:
        Vue.prototype.$message({
          message: messageInfo || '请求参数异常',
          type: 'error'
        })
        break
      case 401:
        // localStorage.removeItem('user')
        Vue.prototype.$message({
          message: messageInfo || '密码错误或账号不存在！',
          type: 'warning'
        })
        break
      case 403:
        Vue.prototype.$message({
          message: messageInfo || '无访问权限，请联系企业管理员',
          type: 'warning'
        })
        break
      case 404:
        Vue.prototype.$message({
          message: messageInfo || '404错误，访问路径没找到，请联系技术支持',
          type: 'error'
        })
        break
      case 500:
        Vue.prototype.$message({
          message: messageInfo || '500服务器内部错误，请联系技术支持',
          type: 'error'
        })
        break
      default:
        Vue.prototype.$message({
          message: messageInfo || '服务端异常，请联系技术支持',
          type: 'error'
        })
    }
  }
  return Promise.reject(error)
}

// 处理iE11下分页控件不能回车的事件方法
export const addEgscEventHandler = function (target, type, fn) {
  if (target.addEventListener) {
    target.addEventListener(type, fn)
  } else {
    target.attachEvent('on' + type, fn)
  }
}
