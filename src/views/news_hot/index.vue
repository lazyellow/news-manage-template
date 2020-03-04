<template>
  <div>
    <el-row class="search" type="flex" justify="left">
      <el-col :span="19"></el-col>
      <el-col :span="4">
        <el-input v-model="search" size="mini" placeholder="请输入新闻标题关键字搜索" />
      </el-col>
    </el-row>
    <el-row class="table" type="flex" justify="center">
      <el-col :span="23">
        <el-table
          :data="hotList.filter(data => !search || data.news_title.toLowerCase().includes(search.toLowerCase()))"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          column-key="date"
        >
          <el-table-column label="热点新闻ID" prop="news_id"></el-table-column>
          <el-table-column label="热点新闻标题" prop="news_title"></el-table-column>
          <el-table-column
            label="热点新闻类型"
            prop="Category.category_name"
            :filters="category"
            :filter-method="filterCategory"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column label="阅读量" prop="read_amount"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <!-- 查看弹窗 -->
              <el-dialog :visible.sync="dialogNewsVisible">
                <div v-html="checkNews" />
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getHotNews, searchNews, updateNews } from "@/api/newslist";
export default {
  data() {
    return {
      hotList: [],
      category: [
        {
          text: "综合新闻",
          value: "综合新闻"
        },
        {
          text: "校园人物",
          value: "校园人物"
        },
        {
          text: "动态新闻",
          value: "动态新闻"
        },
        {
          text: "缤纷校园",
          value: "缤纷校园"
        },
        {
          text: "公告通知",
          value: "公告通知"
        }
      ],
      deleteData: [
        {
          news_id: "",
          hot_status: ""
        }
      ],
      search: "",
      checkNews: "1111",
      dialogNewsVisible: false
    };
  },
  created: function() {
    getHotNews().then(res => {
      this.hotList = res.data.data;
    });
  },
  methods: {
    // 查看操作
    async handleCheck(index, row) {
      this.dialogNewsVisible = true;
      const result = await searchNews(row.news_id);
      this.checkNews = result.data.data.news_content;
    },

    // 取消热点设置
    async handleDelete(index, row) {
      console.log(row)
      this.deleteData.news_id = row.news_id
      this.deleteData.hot_status = 0
      console.log(this.deleteData)
      const result = await updateNews(this.deleteData)
      console.log(result)
      if (result.data.code === 200) {
        this.$router.go(0);
        this.$notify({
          title: "删除成功",
          type: "success"
        });
      } else {
         this.$notify.error({
          title: '删除失败'
        });
      }
    },

    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 过滤类型
    filterCategory(value, row) {
      return row.Category.category_name === value;
    }
  }
};
</script>
<style>
.search {
  margin: 20px 0px;
}
</style>