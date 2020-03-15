<template>
  <div>
    <!-- 搜索框 -->
    <el-row class="search" type="flex" justify="left">
      <el-col :span="19"></el-col>
      <el-col :span="4">
        <el-input v-model="search" size="mini" placeholder="根据账号名称搜索" />
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row class="table" type="flex" justify="center">
      <el-col :span="23">
        <el-table
          :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          column-key="date"
        >
          <el-table-column label="账号ID" prop="user_id" width="150"></el-table-column>
          <el-table-column label="账号名称" prop="account"></el-table-column>
          <el-table-column label="账号密码" prop="user_pwd"></el-table-column>
          <el-table-column
            label="账号角色"
            prop="role_name"
            :filters="roleFilter"
            :filter-method="filterRole"
            filter-placement="bottom-end"
          ></el-table-column>
          <el-table-column label="操作" prop>
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

    <!-- 编辑弹窗 -->
    <el-dialog title="修改账号" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="edit_form" :rules="rules">
        <el-form-item label="账号名称" :label-width="formLabelWidth" prop="account">
          <el-input v-model="edit_form.account"></el-input>
        </el-form-item>
        <el-form-item label="账号密码" :label-width="formLabelWidth" prop="user_pwd">
          <el-input v-model="edit_form.user_pwd"></el-input>
        </el-form-item>
        <el-form-item label="账号角色" :label-width="formLabelWidth">
          <el-select v-model="edit_form.role_id" placeholder="请选择角色">
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
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import {
  getUserRole,
  getRoleAll,
  updateUserRole,
  deleteUser
} from "@/api/user";

export default {
  data() {
    return {
      rules: {
        account: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符"
          }
        ],
        user_pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 10,
            message: "长度在 6 到 10 个字符"
          }
        ]
      },
      tableList: [],
      tableItem: {
        user_id: "",
        account: "",
        user_pwd: "",
        role_id: "",
        role_name: ""
      },
      roleData: [],
      roleFilter: [],
      edit_form: {
        user_id: "",
        account: "",
        user_pwd: "",
        role_id: ""
      },
      search: "",
      dialogAddVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      pagesize: 2,
      currpage: 1
    };
  },
  created: function() {
    // 表格数据初始化
    getUserRole().then(res => {
      for (let item of res.data.data.rows) {
        this.tableItem = item;
        this.tableItem.role_name = item.Role.role_name;
        this.tableList.push(this.tableItem);
      }
      if (typeof this.$route.params.user_id === "number") {
        //有带参数跳转
        for (let item of this.tableList) {
          if (item.user_id === this.$route.params.user_id) {
            this.search = item.account;
          }
        }
      }
    });

    // 角色列表数据初始化
    let token = getToken();
    getRoleAll(token).then(res => {
      if (res.data.code === 200) {
        for (let item of res.data.data) {
          this.roleData.push({
            role_id: item.role_id,
            role_name: item.role_name
          });
          this.roleFilter.push({
            text: item.role_name,
            value: item.role_name
          });
        }
      } else {
        console.log(res);
      }
    });
  },
  methods: {
    // 编辑弹窗，数据初始化
    handleEdit(index, row) {
      console.log(this.pagesize);
      console.log(this.currpage);
      console.log(
        this.tableData.slice(
          (this.currpage - 1) * this.pagesize,
          this.currpage * this.pagesize
        )
      );
      this.dialogFormVisible = true;
      this.edit_form.user_id = row.user_id;
      this.edit_form.account = row.account;
      this.edit_form.user_pwd = row.user_pwd;
      this.edit_form.role_id = row.role_id;
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
        getUserRole().then(res => {
          this.tableData.length = 0;
          for (let item of res.data.data.rows) {
            this.tableItem = item;
            this.tableItem.role_name = item.Role.role_name;
            this.tableData.push(this.tableItem);
          }
        });
      } else {
        this.$message({
          message: "删除失败",
          type: "success"
        });
      }
    },

    // 角色修改提交
    async dialogEditCommit() {
      if (this.edit_form.account === "" || this.edit_form.user_pwd === "") {
        if (this.edit_form.account === "") {
          this.$message({
            message: "请输入账号！",
            type: "warning"
          });
        } else if (this.edit_form.user_pwd === "") {
          this.$message({
            message: "请输入密码！",
            type: "warning"
          });
        }
      } else {
        const result = await updateUserRole(this.edit_form);
        this.dialogFormVisible = false;
        if (result.data.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          getUserRole().then(res => {
            this.tableData.length = 0;
            for (let item of res.data.data.rows) {
              this.tableItem = item;
              this.tableItem.role_name = item.Role.role_name;
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

    // 角色筛选
    filterRole(value, row) {
      return row.role_name === value;
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
  },
  watch: {
    tableData: {
      handler(val) {
        console.log("测试", val);
      },
      deep: true
    }
  }
};
</script>
<style>
.search {
  margin: 20px 0px;
}
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