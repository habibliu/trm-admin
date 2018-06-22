import Vue from 'vue'
import App from './App'
import babelpolyfill from 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import 'element-ui/lib/theme-default/index.css'
//import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import fullCalendar from 'vue-fullcalendar'

import routes from './routes'
import Mock from './mock'
import axios from '@/common/js/AxiosPlugin'

Mock.bootstrap();//启动mock

import 'font-awesome/css/font-awesome.min.css'


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.component('full-calendar', fullCalendar)


//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})
//路由全局守卫，即拦截器
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  //未登录时，其他路由请求统一返回到login页面
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});
Vue.prototype.$http = axios;
new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

