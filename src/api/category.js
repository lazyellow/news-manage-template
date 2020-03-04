import request from '@/utils/request'
import axios from "axios";

// 获取新闻分类
export async function getCategory() {
    const result = await axios.get("http://47.101.150.127:3030/category/getCategorys")
    return result
}

// 添加新闻分类
export async function addCategory(data) {
    const result = await axios.post("http://47.101.150.127:3030/category/addCategorys", { category_name: data.name, category_desc: data.desc })
    return result
}
// 修改新闻分类
export async function updateCategory(data) {
    const result = await axios.post("http://47.101.150.127:3030/category/updateCategorys", { category_id: data.id, category_name: data.name, category_desc: data.desc })
    return result
}

//删除新闻分类
export async function deleteCategory(cid){
    const result = await axios.get("http://47.101.150.127:3030/category/delectCategorys?category_id="+cid)
    return result
}

