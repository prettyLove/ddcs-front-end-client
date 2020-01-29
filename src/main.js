import Vue from 'vue'

import Cookies from 'js-cookie'
import 'babel-polyfill'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // router权限过滤

import './assets/style/border.css'
import './assets/style/common.css'
// 引入字体库
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// 引入http工具
import { default as HTTP } from './utils/http'
Vue.prototype.$http = HTTP

import querystring from 'querystring'
Vue.prototype.$qs = querystring

// 常量定义
import Cnost from './utils/const'
Vue.use(Cnost)
// 全局过虑器
import filters from './utils/filters'
Vue.use(filters)
// 工具类
import Utils from './utils/utils'
Vue.use(Utils)



Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
