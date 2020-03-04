import request from '@/utils/request'
import axios from "axios";

// 获取所有新闻
export async function getNews() {
    const result = await axios.get("http://47.101.150.127:3030/news/getNewsLists")
    return result
}

//获取热点新闻
export async function getHotNews() {
    const result = await axios.get("http://47.101.150.127:3030/news/getHotNews")
    return result
}

// 搜索新闻
export async function searchNews(nid) {
    const result = await axios.get("http://47.101.150.127:3030/news/getNewsDetail?nid=" + nid)
    return result
}

// 添加新闻
export async function addNews(form) {
    const result = await axios.post("http://47.101.150.127:3030/news/addNews", form)
    return result
}

//修改新闻
export async function updateNews(form) {
    const result = await axios.post("http://47.101.150.127:3030/news/updateNews", form)
    return result
}

//删除新闻
export async function deleteNews(nid) {
    const result = await axios.get("http://47.101.150.127:3030/news/delectNews?news_id=" + nid)
    return result
}

//上传图片
export async function uploadImg(param) {
    const result = await axios.post("http://47.101.150.127:3030/admin/upload", param)
    return result
}
