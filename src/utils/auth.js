import Cookies from 'js-cookie'

const TokenKey = 'token'
const RoleKey = 'role'

//设置token
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置role
export function getRole() {
  return Cookies.get(RoleKey)
}

export function setRole(role) {
  return Cookies.set(RoleKey, role)
}

export function removeRole() {
  return Cookies.remove(RoleKey)
}

//将过滤出来的动态路由表存在session中
export function setSessionRoutes(value) {
  sessionStorage.setItem('accessedRoutes', value)
  // retrun window.sessionStorage.setItem("accessedRoutes", value)
}

export function getSessionRoutes(key) {
  sessionStorage.getItem(key)
  // retrun sessionStorage.getItem(key)
}

export function removeSessionRoutes(key){
  sessionStorage.removeItem(key)
}

