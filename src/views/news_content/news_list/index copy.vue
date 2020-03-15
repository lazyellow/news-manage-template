<template>
  <div class="content">
    <el-row class="search" type="flex" justify="left">
      <el-col :span="19"></el-col>
      <el-col :span="4">
        <el-input v-model="search" size="mini" placeholder="请输入新闻标题关键字搜索" />
      </el-col>
    </el-row>
    <el-row class="table" type="flex" justify="center">
      <el-col :span="23">
        <el-table
          :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
          @selection-change="handleSelectionChange"
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
              <el-button size="mini" @click="handleLook(scope.$index, scope.row)">查看内容</el-button>
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

        <!--分页-->
        <div class="page">
          <el-row type="flex" justify="center">
            <el-col :span="2">
              <el-pagination
                center
                background
                layout="prev, pager, next, jumper"
                :page-size="pagesize"
                :total="tableData.length"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </el-col>
          </el-row>
        </div>

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
      categoryList: [],
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
      check_title: "",
      check_reporter: "",
      check_editor: "",
      check_reviewer: "",
      check_time: "",
      check_update: "",
      check_amount: "",
      check_content: "",
      pagesize: 10,
      currpage: 1,
      getSearchInfo: []
    };
  },
  created: function() {
    //调用api中获取新闻列表的接口
    getNews().then(res => {
      this.newsList = res.data.data;
    });
    // 获取新闻类型
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
    handleLook(index, row) {
      this.dialogNewsVisible = true;
      this.check_title = row.news_title;
      this.check_reporter = row.news_reporter;
      this.check_editor = row.news_editor;
      this.check_reviewer = row.news_reviewer;
      this.check_time = row.news_time;
      this.check_update = row.news_update;
      this.check_amount = row.news_amount;
      this.check_content = row.news_content;
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
        this.$message({
          message: "删除成功",
          type: "success"
        });
        getNews().then(res => {
          this.newsList.length = 0;
          this.newsList = res.data.data;
        });
      } else {
        this.$message({
          message: "删除失败",
          type: "warning"
        });
      }
    },

    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },

    handleSizeChange(psize) {
      this.pagesize = psize;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 分类筛选
    filterCategory(value, row) {
      return row.Category.category_name === value;
    }
  },
  computed: {
    // 根据计算属性模糊搜索
    tableData() {
      const search = this.search;
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.newsList.filter(data => {
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          // 注意： some() 不会对空数组进行检测。
          // 注意： some() 不会改变原始数组。
          return Object.keys(data).some(key => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      }
      return this.newsList;
    }
  }
};
</script>
<style>
.content{
  margin:20px 0;
}
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
.page {
  margin: 30px 0;
}
</style>