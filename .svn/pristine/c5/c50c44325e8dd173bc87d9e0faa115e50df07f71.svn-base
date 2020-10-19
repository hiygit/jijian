import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import store from './store'

import axios from 'axios'
axios.defaults.withCredentials=true;//设置跨域
// axios.defaults.headers.post["Content-type"] = "application/x-www-form-urlencoded"//设置请求头
Vue.prototype.$ajax = axios

// 引入的UI库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

// 全局变量
import globals from '@/commonFunction/index'
Vue.prototype.globals = globals

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false

//base64 
let Base64 = require('js-base64').Base64

new Vue({
  router,
  store,
  Base64,
  render: h => h(App)
}).$mount('#app')
