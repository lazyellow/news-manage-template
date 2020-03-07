import request from '@/utils/request'
import axios from "axios";

export async function getSlider(user, pwd) {
    const result = await axios.get("http://47.101.150.127:3030/slider/getSwiperLists")
    return result
  }