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
          <el-table-column label="热点新闻ID" prop="news_id" width="100"></el-table-column>
          <el-table-column label="热点新闻标题" prop="news_title"></el-table-column>
          <el-table-column
            label="热点新闻类型"
            prop="Category.category_name"
            :filters="categoryList"
            :filter-method="filterCategory"
            filter-placement="bottom-end"
            width="150"
          ></el-table-column>
          <el-table-column label="阅读量" prop="read_amount" width="100"></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleCheck(scope.$index, scope.row)">查看内容</el-button>
              <el-button size="mini" type="info" @click="handleDelete(scope.$index, scope.row)">取消热点</el-button>
              <!-- 查看弹窗 -->
              <el-dialog :visible.sync="dialogNewsVisible">
                <div class="news-title">{{check_title}}</div>
                <div class="news-message">
                  <span>新闻记者：{{check_reporter}}</span>
                  <span>编辑人员：{{check_editor}}</span>
                  <span>审核人员：{{check_reviewer}}</span>
                  <span>发布时间：{{check_time}}</span>
                  <span>修改时间：{{check_update}}</span>
                  <span>阅读量：{{check_amount}}</span>
                </div>
                <div v-html="check_content" />
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
import { getHotNews, searchNews, updateNews } from "@/api/newslist";
export default {
  data() {
    return {
      hotList: [],
      categoryList: [],
      deleteData: {
        news_id: "",
        hot_status: ""
      },
      search: "",
      checkNews: "1111",
      dialogNewsVisible: false,
      check_title: "",
      check_reporter: "",
      check_editor: "",
      check_reviewer: "",
      check_time: "",
      check_update: "",
      check_amount: "",
      check_content: ""
    };
  },
  created: function() {
    // 获取热点新闻列表初始化
    getHotNews().then(res => {
      this.hotList = res.data.data;
    });

    //获取新闻类型
    getCategory().then(res => {
      this.categoryList = res.data.data;
      for (let item in this.categoryList) {
        this.$delete(this.categoryList[item], "Category_desc");
      }
      var result = this.categoryList.map(o => {
        return { text: o.category_name, value: o.category_name };
      });
      this.categoryList.length = 0;
      this.categoryList = result;
    });
  },
  methods: {
    // 查看操作
    async handleCheck(index, row) {
      this.dialogNewsVisible = true;
      const result = await searchNews(row.news_id);
      console.log(result);
      this.check_title = result.data.data.news_title;
      this.check_reporter = result.data.data.news_reporter;
      this.check_editor = result.data.data.news_editor;
      this.check_reviewer = result.data.data.news_reviewer;
      this.check_time = result.data.data.news_time;
      this.check_update = result.data.data.news_update;
      this.check_amount = result.data.data.news_amount;
      this.check_content = result.data.data.news_content;
    },

    // 取消热点设置
    async handleDelete(index, row) {
      console.log(row);
      this.deleteData.news_id = row.news_id;
      this.deleteData.hot_status = 0;
      const result = await updateNews(this.deleteData);
      if (result.data.code === 200) {
        this.$message({
          message: "取消成功",
          type: "success"
        });
        getHotNews().then(res => {
          this.hotList.length = 0;
          this.hotList = res.data.data;
        });
      } else {
        this.$message({
          message: "取消失败",
          type: "warning"
        });
        console.log(result);
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
.news-title {
  font-size: 25px;
  text-align: center;
  margin-bottom: 50px;
}
.news-message {
  width: 100%;
  border: 0.5px solid #cccccc;
  padding: 20px;
  color: #999999;
}
</style>