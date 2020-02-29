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
          <el-table-column label="账户ID" prop="user_id"></el-table-column>
          <el-table-column label="账户名称" prop="account"></el-table-column>
          <el-table-column label="账户密码" prop="user_pwd"></el-table-column>
          <el-table-column label="操作" prop>
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <!-- 编辑弹窗 -->
              <el-dialog title="修改账户" :visible.sync="dialogFormVisible">
                <el-form :model="tableData">
                  <el-form-item label="账户ID" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.user_id"></el-input>
                  </el-form-item>
                  <el-form-item label="账户名称" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.account"></el-input>
                  </el-form-item>
                  <el-form-item label="账户密码" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.user_pwd"></el-input>
                  </el-form-item>
                  <el-form-item label="账户角色" :label-width="formLabelWidth">
                    <el-select v-model="edit_form.role_id" placeholder="请选择活动区域">
                      <el-option
                        v-for="item in roleData"
                        :key="item.role_id"
                        :label="item.role_name"
                        :value="item.role_id"
                      ></el-option>
                    </el-select>
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
          user_id: "0",
          account: "user1",
          user_pwd: "user1",
          role_id: "1",
          role_name: "管理员"
        },
        {
          user_id: "2",
          account: "user2",
          user_pwd: "user2",
          role_id: "2",
          role_name: "新闻处长"
        },
        {
          user_id: "3",
          account: "user3",
          user_pwd: "user3",
          role_id: "3",
          role_name: "新闻记者"
        }
      ],
      roleData: [
        {
          role_id: "1",
          role_name: "管理员"
        },
        {
          role_id: "2",
          role_name: "新闻处长"
        },
        {
          role_id: "3",
          role_name: "新闻记者"
        }
      ],
      edit_form: {
        user_id: "",
        account: "",
        user_pwd: "",
        role_id: ""
      },
      search: "",
      dialogAddVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
      this.edit_form.user_id = row.user_id;
      this.edit_form.account = row.account;
      this.edit_form.user_pwd = row.user_pwd;
      this.edit_form.role_id = row.role_id;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 点击确定后，将修改的数据edit_form根据分类id更新到数据库中(role_name不提交)
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