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
// import '@/permission' // permission control

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

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// axios
import axios from 'axios'
import { getToken } from '@/utils/auth'
Vue.prototype.$http = axios
Vue.config.productionTip = false
// axios.defaults.headers.common['authorizatior'] = getToken()
console.log('----设置authorizatior----' + store.getters.token)
// axios.defaults.headers.common['authorizatior'] = store.getters.token

Vue.config.productionTip = false

// 第三次重写
import { getRole, setRole } from '@/utils/auth'
import { asyncRoutes, constantRoutes, getSessionRoutes } from '@/router'

const whiteList = ['/login', '/404'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {  //store里有token
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.roles.length === 0) { //还没有用户权限信息
        console.log('----2.拿到token后，获取用户权限信息----')
        console.log('store里的token：' + store.getters.token)
        console.log('cookies里的token：' + getToken())
        axios.defaults.headers.common['authorizatior'] = store.getters.token
        await store.dispatch('user/getInfo')
        console.log('store里的roles' + store.getters.roles)
        console.log('cookies里的role' + getRole())
        console.log('---3.加载动态路由---')
        const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)
        router.addRoutes(accessRoutes)
        router.options.routes = store.getters.permission_routes
        next({ ...to, replace: true })
      } else {  //已经获取了用户权限，生成了动态路由表
        next()
      }
    }
  } else {  //store里无token
    if (getToken()) {  // Cookies里有token,已登录状态
      store.commit('user/SET_TOKEN', getToken())
      next()
    } else {  // Cookies里无token，未登录状态
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next(`/login?redirect=${to.path}`)
      }
    }
  }
})

// router.beforeEach(async (to, from, next) => {
//   if (getToken()) {   //有token的情况（登录状态）
//     console.log("test:store.roles:")
//     console.log(store.getters.roles)
//     console.log(store.getters.roles.length)
//     if (to.path === '/login') {
//       return next({ path: '/personal_center/index' })
//     } else {
//       const hasRoles = store.getters.roles
//       if (hasRoles) {
//         next()
//       } else {
//         const result = await store.dispatch('user/getInfo')
//         if (store.getters.roles === null) {
//           console.log("if无值")
//         } else {
//           console.log("if有值")
//         }
//         const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)
//         router.addRoutes(accessRoutes)
//         router.options.routes = store.getters.permission_routes
//         next({ ...to, replace: true })
//         // next()
//       }
//     }
//   } else {  //无token的情况（未登录状态）
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`)
//     }
//   }
// })

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
