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
          <el-table-column
            label="账户角色"
            prop="role_name"
            :filters="roleData"
            :filter-method="filterRole"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column label="操作" prop>
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <!-- 编辑弹窗 -->
              <el-dialog title="修改账户" :visible.sync="dialogFormVisible">
                <el-form :model="edit_form">
                  <el-form-item label="账户名称" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.account"></el-input>
                  </el-form-item>
                  <el-form-item label="账户密码" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.user_pwd"></el-input>
                  </el-form-item>
                  <el-form-item label="账户角色" :label-width="formLabelWidth">
                    <el-select v-model="edit_form.role_id" placeholder="请选择角色">
                      <el-option
                        v-for="item in roleDataDialog"
                        :key="item.role_id"
                        :label="item.text"
                        :value="item.value"
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
import { getUserRole, updateUserRole, deleteUser } from "@/api/user";
export default {
  data() {
    return {
      tableData: [],
      tableItem: {
        user_id: "",
        account: "",
        user_pwd: "",
        role_id: "",
        role_name: ""
      },
      roleData: [
        {
          text: "管理员",
          value: "管理员"
        },
        {
          text: "新闻处长",
          value: "新闻处长"
        },
        {
          text: "新闻记者",
          value: "新闻记者"
        }
      ],
      roleDataDialog: [
        {
          text: "管理员",
          value: "1"
        },
        {
          text: "新闻处长",
          value: "2"
        },
        {
          text: "新闻记者",
          value: "3"
        }
      ],
      edit_form: {
        user_id: "",
        account: "",
        user_pwd: "",
        role_name: "",
        role_id: ""
      },
      search: "",
      dialogAddVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  created: function() {
    getUserRole().then(res => {
      for (let item of res.data.data.rows) {
        this.tableItem = item;
        this.tableItem.role_name = item.Role.role_name;
        this.tableData.push(this.tableItem);
      }
    });
  },
  methods: {
    // 编辑弹窗，数据初始化
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.edit_form.user_id = row.user_id;
      this.edit_form.account = row.account;
      this.edit_form.user_pwd = row.user_pwd;
      this.edit_form.role_id = row.role_id;
      this.edit_form.role_name = row.role_name;
    },

    //删除操作
    async handleDelete(index, row) {
      const result = await deleteUser(row.user_id);
      console.log(result);
      if (result.data.code === 200) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.$router.go(0);
      } else {
        this.$message({
          message: "删除失败",
          type: "success"
        });
      }
    },

    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 角色修改提交
    async dialogEditCommit() {
      this.$delete(this.edit_form, "role_name");
      const result = await updateUserRole(this.edit_form);
      console.log(result);
      this.dialogFormVisible = false;
      if (result.data.code === 200) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
      } else if (result.data.code === 400) {
        this.$message({
          message: "修改失败",
          type: "warning"
        });
      }
    },

    // 角色筛选
    filterRole(value, row) {
      return row.role_name === value;
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