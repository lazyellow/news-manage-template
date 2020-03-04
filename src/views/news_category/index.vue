<template>
  <div>
    <el-button class="add" icon="el-icon-plus" @click="dialogAddVisible = true">添加分类</el-button>
    <!-- 编辑弹窗 -->
    <el-dialog title="新闻类型" :visible.sync="dialogAddVisible">
      <el-form :model="add_form">
        <!-- <el-form-item label="类型ID" :label-width="formLabelWidth">
          <el-input v-model="add_form.id"></el-input>
        </el-form-item>-->
        <el-form-item label="类型名称" :label-width="formLabelWidth">
          <el-input v-model="add_form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型描述" :label-width="formLabelWidth">
          <el-input v-model="add_form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddCommit()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 表格 -->
    <el-row class="table" type="flex" justify="center">
      <el-col :span="23">
        <el-table
          :data="CategoryList"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          column-key="date"
        >
          <el-table-column label="类型ID" prop="category_id"></el-table-column>
          <el-table-column label="类型名称" prop="category_name"></el-table-column>
          <el-table-column label="类型描述" prop="Category_desc"></el-table-column>
          <el-table-column label="操作" prop>
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <!-- 编辑弹窗 -->
              <el-dialog title="新闻类型" :visible.sync="dialogFormVisible">
                <el-form :model="edit_form">
                  <!-- <el-form-item label="类型ID" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.id"></el-input>
                  </el-form-item>-->
                  <el-form-item label="类型名称" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="类型描述" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.desc"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogEditCommit()">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { getCategory, addCategory, updateCategory, deleteCategory } from "@/api/category";

export default {
  data() {
    return {
      tableData: [
        {
          category_id: "0",
          category_name: "综合新闻",
          category_desc: "放置综合类型的新闻"
        },
        {
          category_id: "1",
          category_name: "公告通知",
          category_desc: "放置公告通知"
        },
        {
          category_id: "2",
          category_name: "缤纷校园",
          category_desc: "放置校园活动相关的新闻"
        },
        {
          category_id: "3",
          category_name: "学术成果",
          category_desc: "放置学术成果相关的新闻"
        },
        {
          category_id: "4",
          category_name: "学术动态",
          category_desc: "放置学术动态相关的新闻"
        },
        {
          category_id: "5",
          category_name: "学术竞赛",
          category_desc: "放置学术竞赛相关的新闻"
        },
        {
          category_id: "6",
          category_name: "校园人物",
          category_desc: "放置校园人物相关的新闻"
        }
      ],
      add_form: {
        // id: "",
        name: "",
        desc: ""
      },
      edit_form: {
        id: "",
        name: "",
        desc: ""
      },
      CategoryList: [],
      search: "",
      dialogAddVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created: function() {
    //调用api中获取分类的接口，把数据渲染到页面上
    getCategory().then(res => {
      this.CategoryList = res.data.data;
    });
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.edit_form.id = row.category_id;
      this.edit_form.name = row.category_name;
      this.edit_form.desc = row.Category_desc;
    },

    // 删除
    async handleDelete(index, row) {
      const result = await deleteCategory(row.category_id);
      if (result.data.code === 200) {
        this.$router.go(0);
        this.$message({
          message: "删除成功!",
          type: "success"
        });
      } else {
        this.$message({ message: "删除失败!" });
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    //  添加分类，将新增的数据edit_form根据分类id更新到数据库中
    async dialogAddCommit() {
      this.dialogAddVisible = false;
      const result = await addCategory(this.add_form);
      if (result.data.code === 200) {
        this.$router.go(0);
        this.$message({
          message: "添加成功!",
          type: "success"
        });
      } else {
        this.$message({ message: "添加失败!" });
      }
    },

    // 编辑提交
    async dialogEditCommit() {
      this.dialogFormVisible = false;
      const result = await updateCategory(this.edit_form);
       if (result.data.code === 200) {
        this.$router.go(0);
        this.$message({
          message: "修改成功!",
          type: "success"
        });
      } else {
        this.$message({ message: "修改失败!" });
      }
    }
  }
};
</script>
<style>
.add {
  margin-top: 20px;
  margin-left: 35px;
}
.table {
  margin: 20px 0px;
}
</style>