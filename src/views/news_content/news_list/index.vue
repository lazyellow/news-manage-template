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
          :data="newsList.filter(data => !search || data.news_title.toLowerCase().includes(search.toLowerCase()))"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          column-key="date"
        >
          <el-table-column label="新闻ID" prop="news_id" width="80"></el-table-column>
          <el-table-column label="新闻标题" prop="news_title"></el-table-column>
          <el-table-column
            label="新闻类型"
            prop="Category.category_name"
            :filters="categoryList"
            :filter-method="filterCategory"
            filter-placement="bottom-end"
            width="150"
          ></el-table-column>
          <el-table-column label="热点新闻" prop="hot_status" width="100">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.hot_status === 2 ? 'warning' : 'info'"
                disable-transitions
              >{{scope.row.hot_status === 2 ? '热点' : '非热点'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="阅读量" prop="read_amount" width="100"></el-table-column>
          <el-table-column label="新闻记者" prop="news_reporter" width="150"></el-table-column>
          <el-table-column label="编辑人员" prop="news_editor" width="150"></el-table-column>
          <el-table-column label="审核人员" prop="news_reviewer" width="150"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleLook(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
import { getCategory } from "@/api/category";
import { getNews, deleteNews } from "@/api/newslist";

export default {
  data() {
    return {
      newsList: [],
      categoryList: [
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
      CategoryList: [],
      test: [],
      hot: [
        {
          text: "是",
          value: "是"
        },
        {
          text: "否",
          value: "否"
        }
      ],
      search: "",
      dialogNewsVisible: false,
      checkNews: ""
    };
  },
  created: function() {
    //调用api中获取新闻列表的接口
    getNews().then(res => {
      this.newsList = res.data.data;
    });
  },
  methods: {
    // 查看操作
    handleLook(index, row) {
      this.dialogNewsVisible = true;
      this.checkNews = row.news_content;
    },

    // 编辑操作
    handleEdit(index, row) {
      this.$router.push({
        name: "news_edit",
        params: { newsMessage: row }
      });
    },

    // 删除操作
    async handleDelete(index, row) {
      const result = await deleteNews(row.news_id);
      if (result.data.code === 200) {
        this.$router.go(0);
        this.$message({
          message: "删除成功",
          type: "success"
        });
      } else {
        this.$message({
          message: "删除失败",
          type: "warning"
        });
      }
    },

    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 分类筛选
    filterCategory(value, row) {
      return row.Category.category_name === value;
    },

    // 热点筛选
    filterHotnews(value, row) {
      return row.hotnews === value;
    }
  }
};
</script>
<style>
.search {
  margin: 20px 0px;
}
</style>