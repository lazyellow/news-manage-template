<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="auto"
      class="ruleForm"
    >
      <el-form-item label="姓名" prop="userinfo_name">
        <el-col :span="3">
          <el-input
            type="input"
            size="20px;"
            placeholder="长度为2-10个字符"
            v-model="ruleForm.userinfo_name"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="账户名称" prop="account">
        <el-col :span="3">
          <el-input
            type="input"
            placeholder="长度为5-10个字符"
            v-model="ruleForm.account"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="账户角色" prop="role_id">
        <el-col :span="3">
          <el-select v-model="ruleForm.role_id" placeholder="请选择角色">
            <el-option
              v-for="item in roleData"
              :key="item.role_id"
              :label="item.role_name"
              :value="item.role_id"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="user_pwd">
        <el-col :span="3">
          <el-input
            type="password"
            placeholder="密码长度为6-10个字符"
            v-model="ruleForm.user_pwd"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-col :span="3">
          <el-input
            type="password"
            placeholder="请保持两次密码一致"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" prop="userinfo_sex">
        <el-radio v-model="ruleForm.userinfo_sex" label="男"></el-radio>
        <el-radio v-model="ruleForm.userinfo_sex" label="女"></el-radio>
      </el-form-item>
      <el-form-item label="联系电话" prop="userinfo_phone">
        <el-col :span="3">
          <el-input
            type="input"
            placeholder="请输入有效号码"
            v-model="ruleForm.userinfo_phone"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="userinfo_email">
        <el-col :span="5">
          <el-input
            type="email"
            placeholder="请输入有效的邮箱地址"
            v-model="ruleForm.userinfo_email"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { getRoleAll, addUser } from "@/api/user";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (value.toString().length < 6 || value.toString().length > 10) {
        callback(new Error("密码长度为6 - 10个字符"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.user_pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        userinfo_name: "",
        account: "",
        role_id: "",
        user_pwd: "",
        checkPass: "",
        userinfo_sex: "男",
        userinfo_phone: "",
        userinfo_email: ""
      },
      roleData: [],
      rules: {
        user_pwd: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
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
      }
    };
  },
  created: function() {
    let token = getToken();
    // 角色列表数据初始化
    getRoleAll(token).then(res => {
      if (res.data.code === 200) {
        for (let item of res.data.data) {
          this.roleData.push({
            role_id: item.role_id,
            role_name: item.role_name
          });
        }
      } else {
        console.log(res);
      }
    });
  },
  methods: {
    // 添加
    async submitForm() {
      if (
        this.ruleForm.userinfo_name === "" ||
        this.ruleForm.account === "" ||
        this.ruleForm.role_id === "" ||
        this.ruleForm.user_pwd === "" ||
        this.ruleForm.user_pwd === "" ||
        this.ruleForm.checkPass === "" ||
        this.ruleForm.userinfo_sex === "" ||
        this.ruleForm.userinfo_phone === "" ||
        this.ruleForm.userinfo_email === ""
      ) {
        if (this.ruleForm.userinfo_name === "") {
          this.$message({
            message: "请输入姓名!",
            type: "warning"
          });
        } else if (this.ruleForm.account === "") {
          this.$message({
            message: "请输入账号!",
            type: "warning"
          });
        } else if (this.ruleForm.role_id === "") {
          this.$message({
            message: "请选择账号角色!",
            type: "warning"
          });
        } else if (this.ruleForm.user_pwd === "") {
          this.$message({
            message: "请输入密码!",
            type: "warning"
          });
        } else if (this.ruleForm.checkPass === "") {
          this.$message({
            message: "请输入再次密码!",
            type: "warning"
          });
        } else if (this.ruleForm.userinfo_sex === "") {
          this.$message({
            message: "请选择用户性别!",
            type: "warning"
          });
        } else if (this.ruleForm.userinfo_phone === "") {
          this.$message({
            message: "请输入用户电话!",
            type: "warning"
          });
        } else if (this.ruleForm.userinfo_email === "") {
          this.$message({
            message: "请输入电子邮箱!",
            type: "warning"
          });
        }
      } else {
        this.$delete(this.ruleForm, "checkPass");
        const result = await addUser(this.ruleForm);
        if (result.data.code === 200) {
          this.$message({
            message: "添加成功!",
            type: "success"
          });
          // 跳转到用户角色列表
          this.$router.push({
            name: "user_account"
          });
        } else {
          console.log(result);
          this.$message({
            message: "添加失败!",
            type: "warning"
          });
        }
      }
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.app-container {
  margin-top: 40px;
  margin-left: 60px;
}
</style>