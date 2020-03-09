import { login, logout, getPersonalInfo } from '@/api/user'
import { getToken, setToken, removeToken, getRole, setRole, removeRole } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import axios from "axios";
import { asyncRoutes, constantRoutes } from '@/router'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: '',
    roles: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  async tologin({ commit }, userInfo) {
    const { account, user_pwd } = userInfo
    commit('SET_NAME', account)   //存储用户名到vuex

    //将登陆信息发送到登陆接口验证
    const result = await login(account, user_pwd)
    if (result.data.code === 200) {  //如果登陆成功，则将返回的token存储到cookie中
      setToken(result.data.data.toKen)  //将token存储到cookie中
      commit('SET_TOKEN', result.data.data.toKen)  //存储token到vuex
    }
    return result
  },

  // get user info
  async getInfo({ commit, state }) {
    // const result = await getPersonalInfo(state.token)
    // commit('SET_ROLES', result.data.data.role_id)
    // setRole(result.data.data.role_id)
    // return result
    commit('SET_ROLES', "1")
    setRole("1")
    return 1
  },

  // user logout
  logout({ commit, state }) {
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     commit('SET_ROLES', [])
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
    removeToken()
    removeRole()
    resetRouter()
    commit('RESET_STATE')
    commit('SET_TOKEN', [])
    commit('SET_ROLES', [])
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      commit('SET_ROLES', [])
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}