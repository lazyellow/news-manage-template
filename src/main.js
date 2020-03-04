import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// axios
import axios from 'axios'
import { getToken } from '@/utils/auth'
Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.headers.common['authorizatior'] = getToken()

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

//添加动态路由
// import { asyncRoutes, constantRoutes } from '@/router'

// const whiteList = ["/login"];
// router.beforeEach((to, from, next) => {
//   if (store.getters.token) {
//     next();
//     const newRouter = asyncRoutes.filter(route => route.meta.roles.includes("admin"))
//     console.log(newRouter)
//     // constantRoutes.concat(newRouter)
//     router.addRoutes(newRouter)
//     // newRouter.forEach((item, index) => {
//     //     constantRoutes.push(item)
//     //   })
//     console.log(constantRoutes)
//   } else {
//     if (to.path === "/login" || whiteList.indexOf(to.path) !== -1) {
//       next();
//     } else {
//       next("/login");
//     }
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
