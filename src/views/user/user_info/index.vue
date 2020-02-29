<template>
  <div>
    <!-- 表格 -->
    <el-row class="table" type="flex" justify="center">
      <el-col :span="23">
        <el-table
          :data="tableData"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          column-key="date"
        >
          <el-table-column label="信息ID" prop="userinfo_id"></el-table-column>
          <el-table-column label="账号ID" prop="userinfo_id"></el-table-column>
          <el-table-column label="姓名" prop="userinfo_name"></el-table-column>
          <el-table-column label="性别" prop="userinfo_sex"></el-table-column>
          <el-table-column label="联系电话" prop="userinfo_phone"></el-table-column>
          <el-table-column label="电子邮箱" prop="userinfo_email"></el-table-column>
          <el-table-column label="操作" prop>
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <!-- 编辑弹窗 -->
              <el-dialog title="修改账户" :visible.sync="dialogFormVisible">
                <el-form :model="tableData">
                  <el-form-item label="信息ID" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.userinfo_id"></el-input>
                  </el-form-item>
                  <el-form-item label="账号ID" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.user_id"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.userinfo_name"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.userinfo_sex"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.userinfo_phone"></el-input>
                  </el-form-item>
                  <el-form-item label="电子邮箱" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.userinfo_email"></el-input>
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
export default {
  data() {
    return {
      tableData: [
        {
          userinfo_id: "0",
          user_id: "0",
          userinfo_name: "张三",
          userinfo_sex: "男",
          userinfo_phone: "10086",
          userinfo_email: "958540498@qq.com"
        },
        {
          userinfo_id: "2",
          user_id: "2",
          userinfo_name: "李四",
          userinfo_sex: "女",
          userinfo_phone: "10086",
          userinfo_email: "958540498@qq.com"
        },
        {
          userinfo_id: "3",
          user_id: "3",
          userinfo_name: "老吴",
          userinfo_sex: "男",
          userinfo_phone: "10086",
          userinfo_email: "958540498@qq.com"
        }
      ],
      edit_form: {
        userinfo_id: "",
        user_id: "",
        userinfo_name: "",
        userinfo_sex: "",
        userinfo_phone: "",
        userinfo_email: ""
      },
      search: "",
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
      this.edit_form.userinfo_id = row.userinfo_id;
      this.edit_form.user_id = row.user_id;
      this.edit_form.userinfo_name = row.userinfo_name;
      this.edit_form.userinfo_sex = row.userinfo_sex;
      this.edit_form.userinfo_phone = row.userinfo_phone;
      this.edit_form.userinfo_email = row.userinfo_email;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 点击确定后，将修改的数据edit_form根据分类id更新到数据库中
    dialogEditCommit() {
      console.log(this.edit_form);
      this.dialogFormVisible = false;
      this.$message("修改成功");
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