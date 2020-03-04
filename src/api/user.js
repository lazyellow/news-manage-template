import request from '@/utils/request'
import axios from "axios";

export async function login(user, pwd) {
  const result = await axios.post("http://47.101.150.127:3030/user/login", { account: user, user_pwd: pwd })
  return result
}

export function getInfo(token) {
  return request({
    // url: '/vue-admin-template/user/info',
    // url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
