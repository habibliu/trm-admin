/**
 * ajax 模块，可以将 axios 替换成 $.ajax 等
 */
import axios from 'axios'
import { catchError } from '@/common/js/util.js'

const Axios = axios.create({
  baseUrl:'http://39.159.214.95:8100',
  timeout: 60000
})

// 暂时不启用过滤
// 添加请求拦截器
Axios.defaults.headers['Cache-Control'] = 'no-cache'
Axios.defaults.headers['Pragma'] = 'no-cache'

Axios.interceptors.request.use(config => {
  if (config.url=='/login'){//如果请求的地址为/login,Content-Type用表单形式
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }else{//其余请求，请json提交
    config.headers['Content-Type'] = 'application/json; charset=UTF-8';
  }
  // 用户登录后,存储token，发送请求时，设置token sessionStorage.token
  // 前端Header中需要传入FrontType字段：
  //  admin-ui  管理平台
  //  mobile-ui 云手机平台
  if (sessionStorage.token) {
    config.headers.Authorization = sessionStorage.token
  }
  config.headers.FrontType = 'admin-ui'
  return config
}, error => {
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
// Add a response interceptor
Axios.interceptors.response.use(response => {
  // console.log('success：' + JSON.stringify(response))
  // if (responseData.code === '1000') {
  //   return responseData
  // }
  return response
}, function (error) {
  /*
  console.log(error)
  var responseData = error.response.data
  Message.Message.error({
    message: responseData
  })
  return Promise.reject(error)
  */
  return catchError(error)
})

let base = '';

export default Axios
