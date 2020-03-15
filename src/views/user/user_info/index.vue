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
          :data="tableList.filter(data => !search || data.account.toLowerCase().includes(search.toLowerCase()))"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          column-key="date"
          :close-on-click-modal="false"
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
              <el-button
                size="mini"
                type="success"
                @click="handleRole(scope.$index, scope.row)"
              >查看角色</el-button>
              <!-- 编辑弹窗 -->
              <el-dialog title="修改账户" 
                :visible.sync="dialogFormVisible"
                :close-on-click-modal="false"
                >
                <el-form :model="edit_form" :rules="formRules">
                  <el-form-item label="姓名" :label-width="formLabelWidth" prop="userinfo_name">
                    <el-input v-model="edit_form.userinfo_name"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="edit_form.userinfo_sex" label="男"></el-radio>
                    <el-radio v-model="edit_form.userinfo_sex" label="女"></el-radio>
                  </el-form-item>
                  <el-form-item label="联系电话" :label-width="formLabelWidth" prop="userinfo_phone">
                    <el-input v-model="edit_form.userinfo_phone"></el-input>
                  </el-form-item>
                  <el-form-item label="电子邮箱" :label-width="formLabelWidth" prop="userinfo_email">
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

        <!--分页-->
        <!-- <div class="page">
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
        </div> -->

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from "@/api/user";
export default {
  data() {
    return {
      formRules: {
        userinfo_name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 5 个字符",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /^[\u2E80-\u9FFF]+$/,
            message: "姓名不支持特殊字符",
            trigger: "blur"
          }
        ],
        userinfo_phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        userinfo_email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur"
          }
        ]
      },
      tableList: [],
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
      formLabelWidth: "120px",
      pagesize: 10,
      currpage: 1
    };
  },
  created: function() {
    getUserInfo().then(res => {
      for (let item of res.data.data.rows) {
        this.tableItem = item;
        this.tableList.push(this.tableItem);
      }
    });
  },
  methods: {
    //编辑弹窗，数据初始化
    handleEdit(index, row) {
      this.dialogFormVisible = true;
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

    // 提交修改
    async dialogEditCommit() {
      if (
        this.edit_form.userinfo_name === "" ||
        this.edit_form.userinfo_phone === "" ||
        this.edit_form.userinfo_email === ""
      ) {
        if (this.edit_form.userinfo_name === "") {
          this.$message({
            message: "请输入姓名！",
            type: "warning"
          });
        } else if (this.edit_form.userinfo_phone === "") {
          this.$message({
            message: "请输入电话号码！",
            type: "warning"
          });
        } else if (this.edit_form.userinfo_email) {
          this.$message({
            message: "请输入电子邮箱！",
            type: "warning"
          });
        }
      } else {
        this.dialogFormVisible = false;
        const result = await updateUserInfo(this.edit_form);
        if (result.data.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
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
    },

    // 分页器
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },

    handleSizeChange(psize) {
      this.pagesize = psize;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
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
        return this.tableList.filter(data => {
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
      return this.tableList;
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
.page {
  margin: 30px 0;
}
</style>