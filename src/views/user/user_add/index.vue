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
      <el-form-item label="姓名" prop="name">
        <el-col :span="3">
          <el-input
            type="input"
            size="20px;"
            placeholder="长度为2-10个字符"
            v-model="ruleForm.name"
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
      <el-form-item label="密码" prop="pass">
        <el-col :span="3">
          <el-input
            type="password"
            placeholder="密码长度为6-10个字符"
            v-model="ruleForm.pass"
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
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="ruleForm.sex" label="男"></el-radio>
        <el-radio v-model="ruleForm.sex" label="女"></el-radio>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-col :span="3">
          <el-input type="input" placeholder="请输入有效号码" v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-col :span="5">
          <el-input
            type="email"
            placeholder="请输入有效的邮箱地址"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        name: "",
        account: "",
        pass: "",
        checkPass: "",
        sex: "男",
        phone: "",
        email: ""
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur"
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
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
        phone: [
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
        email: [
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   在这里请求接口提交表单数据
          console.log(this.ruleForm);
          this.$message({
            message: "添加成功!",
            type: "success"
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
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