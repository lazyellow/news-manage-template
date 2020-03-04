import request from '@/utils/request'
import axios from "axios";

// 登陆接口
export async function login(user, pwd) {
  const result = await axios.post("http://47.101.150.127:3030/user/login", { account: user, user_pwd: pwd })
  return result
}

// 退出登陆
export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

// 获取账号基本信息
export async function getUserInfo() {
  const result = await axios.get("http://47.101.150.127:3030/user/getAllUserInfo")
  return result
}

// 获取账号角色
export async function getUserRole() {
  const result = await axios.get("http://47.101.150.127:3030/user/getAllUser")
  return result
}

//添加账号
export async function addUser(form) {
  console.log("api:")
  console.log(form)
  const result  = await axios.post("http://47.101.150.127:3030/user/created",form)
  return result
}

//修改账号基本信息
export async function updateUserInfo(form) {
  const result = await axios.post(
    "http://47.101.150.127:3030/user/updateUserInfo", form)
  return result
}

//修改账号角色
export async function updateUserRole(form) {
  console.log(form)
  const result = await axios.post(
    "http://47.101.150.127:3030/user/updateUser", form)
  return result
}

//删除账号
export async function deleteUser(uid) {
  const result = await axios.get("http://47.101.150.127:3030/user/delectUser?user_id=" + uid)
  return result
}

