<template>
  <div>
     <!-- 搜索框 -->
    <el-row class="search" type="flex" justify="left">
      <el-col :span="19"></el-col>
      <el-col :span="4">
        <el-input v-model="search" size="mini" placeholder="根据姓名搜索" />
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row class="table" type="flex" justify="center">
      <el-col :span="23">
        <el-table
          :data="tableData.filter(data => !search || data.UserInfo.Userinfo_name.toLowerCase().includes(search.toLowerCase()))"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          column-key="date"
        >
          <el-table-column label="信息ID" prop="Userinfo_id"></el-table-column>
          <el-table-column label="账号ID" prop="user_id"></el-table-column>
          <el-table-column label="姓名" prop="UserInfo.Userinfo_name"></el-table-column>
          <el-table-column label="性别" prop="UserInfo.Userinfo_sex"></el-table-column>
          <el-table-column label="联系电话" prop="UserInfo.Userinfo_phone"></el-table-column>
          <el-table-column label="电子邮箱" prop="UserInfo.Userinfo_email"></el-table-column>
          <el-table-column label="操作" prop>
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="success" @click="handleRole(scope.$index, scope.row)">查看角色</el-button>
              <!-- 编辑弹窗 -->
              <el-dialog title="修改账户" :visible.sync="dialogFormVisible">
                <el-form :model="edit_form">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="edit_form.userinfo_name"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="edit_form.userinfo_sex" label="男"></el-radio>
                    <el-radio v-model="edit_form.userinfo_sex" label="女"></el-radio>
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
import { getUserInfo, updateUserInfo } from "@/api/user";
export default {
  data() {
    return {
      tableData: [],
      tableItem: {
        user_id: "",
        userinfo_id: "",
        userinfo_name: "",
        userinfo_sex: "",
        userinfo_phone: "",
        userinfo_email: ""
      },
      edit_form: {
        userinfo_id: "",
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
  created: function() {
    getUserInfo().then(res => {
      for (let item of res.data.data.rows) {
        this.tableItem = item;
        this.tableData.push(this.tableItem);
      }
    });
  },
  methods: {
    //编辑弹窗，数据初始化
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      // this.edit_form.user_id = row.user_id;
      this.edit_form.userinfo_id = row.Userinfo_id;
      this.edit_form.userinfo_name = row.UserInfo.Userinfo_name;
      this.edit_form.userinfo_sex = row.UserInfo.Userinfo_sex;
      this.edit_form.userinfo_phone = row.UserInfo.Userinfo_phone;
      this.edit_form.userinfo_email = row.UserInfo.Userinfo_email;
    },

    //查看角色操作
    handleRole(index, row) {
      this.$router.push({
        name: "user_account",
        params: { user_id: row.user_id }
      });
    },

    handleCurrentChange(val) {
      this.currentRow = val;
    },

    // 提交修改
    async dialogEditCommit() {
      this.dialogFormVisible = false;
      const result = await updateUserInfo(this.edit_form);
      if (result.data.code === 200) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        // this.$router.go(0)
        getUserInfo().then(res => {
          this.tableData.length = 0;
          for (let item of res.data.data.rows) {
            this.tableItem = item;
            this.tableData.push(this.tableItem);
          }
        });
      } else {
        this.$message({
          message: "修改失败",
          type: "warning"
        });
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