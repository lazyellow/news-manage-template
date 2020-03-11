import router from './router'
import store from './store'
import { getToken, getRole, setRole } from '@/utils/auth'
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
        await store.dispatch('user/getInfo')
        console.log('store里的roles' + store.getters.roles)
        console.log('cookies里的role' + getRole())
        console.log('---3.加载动态路由---')
        const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)
        router.addRoutes(accessRoutes)
        router.options.routes = store.getters.permission_routes
        // router.options.routes = getSessionRoutes('accessedRoutes')
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