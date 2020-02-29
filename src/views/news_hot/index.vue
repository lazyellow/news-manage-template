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
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          column-key="date"
        >
          <el-table-column label="热点新闻ID" prop="date"></el-table-column>
          <el-table-column label="热点新闻标题" prop="name"></el-table-column>
          <el-table-column
            label="热点新闻类型"
            prop="category"
            :filters="category"
            :filter-method="filterCategory"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          hotnews: "是",
          category: "校园人物"
        },
        {
          date: "1",
          name: "陈小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          hotnews: "是",
          category: "学术动态"
        }
      ],
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
      search: ""
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    filterCategory(value, row) {
      return row.category === value
    }
  }
}
</script>
<style>
.search {
  margin: 20px 0px;
}
</style>