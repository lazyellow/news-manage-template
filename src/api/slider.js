import request from '@/utils/request'
import axios from "axios";

// 获取轮播图列表
export async function getSlider() {
  const result = await axios.get("http://47.101.150.127:3030/slider/getSwiperLists")
  return result
}

// 增加轮播图
export async function addSlider(form) {
  const result = await axios.post("http://47.101.150.127:3030/slider/createdSwiper",form)
  return result
}

// 修改轮播图
export async function updateSlider(form) {
  const result = await axios.post("http://47.101.150.127:3030/slider/updateSwiper", form)
  return result
}

// 删除轮播位
export async function deleteSlider(sid) {
  const result = await axios.get("http://47.101.150.127:3030/slider/destroySlide?sid=", sid)
  return result
}