<template>
  <div class="app-container">
    <el-form
      :model="updateForm"
      status-icon
      :rules="rules"
      ref="updateForm"
      label-width="auto"
      class="updateForm"
    >
      <el-form-item label="姓名" prop="userinfo_name">
        <el-col :span="3">
          <el-input
            type="input"
            size="20px;"
            placeholder="长度为2-10个字符"
            v-model="updateForm.userinfo_name"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="账户名称" prop="account">
        <el-col :span="3">
          <el-input
            type="input"
            placeholder="长度为5-10个字符"
            v-model="updateForm.account"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="账户角色" prop="role_id">
        <el-col :span="3">
          <el-select v-model="updateForm.role_id" placeholder="请选择角色">
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
            :type="passwordType"
            placeholder="密码长度为6-10个字符"
            v-model="updateForm.user_pwd"
            auto-complete="on"
            ref="user_pwd"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-col :span="3">
          <el-input
            :type="cpasswordType"
            placeholder="请保持两次密码一致"
            v-model="updateForm.checkPass"
            auto-complete="off"
            ref="checkPass"
          ></el-input>
          <span class="show-pwd" @click="showcheckPwd">
            <svg-icon :icon-class="cpasswordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-col>
      </el-form-item>
      <el-form-item label="性别" prop="userinfo_sex">
        <el-radio v-model="updateForm.userinfo_sex" label="男"></el-radio>
        <el-radio v-model="updateForm.userinfo_sex" label="女"></el-radio>
      </el-form-item>
      <el-form-item label="联系电话" prop="userinfo_phone">
        <el-col :span="3">
          <el-input
            type="input"
            placeholder="请输入有效号码"
            v-model="updateForm.userinfo_phone"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="userinfo_email">
        <el-col :span="5">
          <el-input
            type="email"
            placeholder="请输入有效的邮箱地址"
            v-model="updateForm.userinfo_email"
            autocomplete="off"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getToken, getRole } from "@/utils/auth";
import {
  getPersonalInfo,
  getRoleAll,
  updateUserInfo,
  updateUserRole
} from "@/api/user";
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
      updateForm: {
        user_id: "",
        account: "",
        user_pwd: "",
        checkPass: "",
        role_id: "",
        userinfo_id: "",
        userinfo_name: "",
        userinfo_sex: "",
        userinfo_phone: "",
        userinfo_email: ""
      },
      updateUserInfoForm: {
        userinfo_id: "",
        userinfo_name: "",
        userinfo_sex: "",
        userinfo_phone: "",
        userinfo_email: ""
      },
      updateUserRoleForm: {
        user_id: "",
        account: "",
        user_pwd: "",
        role_id: ""
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
      },
      passwordType: "password",
      cpasswordType: "password"
    };
  },
  created: function() {
    // 个人信息数据初始化
    let token = getToken();
    getPersonalInfo(token).then(res => {
      (this.updateForm.user_id = res.data.data.user_id),
        (this.updateForm.account = res.data.data.account),
        (this.updateForm.role_id = res.data.data.role_id),
        (this.updateForm.user_pwd = res.data.data.user_pwd),
        (this.updateForm.checkPass = res.data.data.user_pwd),
        (this.updateForm.userinfo_id = res.data.data.Userinfo_id),
        (this.updateForm.userinfo_name = res.data.data.UserInfo.userinfo_name),
        (this.updateForm.userinfo_sex = res.data.data.UserInfo.userinfo_sex),
        (this.updateForm.userinfo_phone =
          res.data.data.UserInfo.userinfo_phone),
        (this.updateForm.userinfo_email =
          res.data.data.UserInfo.userinfo_email);
    });

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
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else if (this.passwordType === "") {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.user_pwd.focus();
      });
    },
    showcheckPwd() {
      if (this.cpasswordType === "password") {
        this.cpasswordType = "";
      } else if (this.cpasswordType === "") {
        this.cpasswordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.checkPass.focus();
      });
    },
    // 修改
    async submitForm() {
      if (
        this.updateForm.userinfo_name === "" ||
        this.updateForm.account === "" ||
        this.updateForm.user_pwd === "" ||
        this.updateForm.checkPass === "" ||
        this.updateForm.userinfo_phone === "" ||
        this.updateForm.userinfo_email === ""
      ) {
        if (this.updateForm.userinfo_name === "") {
          this.$message({
            message: "请输入姓名！",
            type: "warning"
          });
        } else if (this.updateForm.account === "") {
          this.$message({
            message: "请输入账号！",
            type: "warning"
          });
        } else if (this.updateForm.user_pwd === "") {
          this.$message({
            message: "请输入密码！",
            type: "warning"
          });
        } else if (this.updateForm.checkPass === "") {
          this.$message({
            message: "请输入再次密码！",
            type: "warning"
          });
        } else if (this.updateForm.userinfo_phone === "") {
          this.$message({
            message: "请输入电话号码！",
            type: "warning"
          });
        } else if (this.updateForm.userinfo_email === "") {
          this.$message({
            message: "请输入电子邮箱！",
            type: "warning"
          });
        }
      } else {
        //   用户角色信息提交数据
        this.updateUserRoleForm.user_id = this.updateForm.user_id;
        this.updateUserRoleForm.account = this.updateForm.account;
        this.updateUserRoleForm.user_pwd = this.updateForm.user_pwd;
        this.updateUserRoleForm.role_id = this.updateForm.role_id;

        // 用户基本信息提交数据
        this.updateUserInfoForm.userinfo_id = this.updateForm.userinfo_id;
        this.updateUserInfoForm.userinfo_name = this.updateForm.userinfo_name;
        this.updateUserInfoForm.userinfo_sex = this.updateForm.userinfo_sex;
        this.updateUserInfoForm.userinfo_phone = this.updateForm.userinfo_phone;
        this.updateUserInfoForm.userinfo_email = this.updateForm.userinfo_email;

        const resultUserInfo = await updateUserInfo(this.updateUserInfoForm);
        const resultUserRole = await updateUserRole(this.updateUserRoleForm);
        if (
          resultUserInfo.data.code === 200 &&
          resultUserRole.data.code === 200
        ) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          // 数据重新初始化
          getPersonalInfo(token).then(res => {
            (this.updateForm.user_id = res.data.data.user_id),
              (this.updateForm.userinfo_name =
                res.data.data.UserInfo.userinfo_name),
              (this.updateForm.account = res.data.data.account),
              (this.updateForm.role_id = res.data.data.role_id),
              (this.updateForm.user_pwd = res.data.data.user_pwd),
              (this.updateForm.checkPass = res.data.data.user_pwd),
              (this.updateForm.userinfo_sex =
                res.data.data.UserInfo.userinfo_sex),
              (this.updateForm.userinfo_phone =
                res.data.data.UserInfo.userinfo_phone),
              (this.updateForm.userinfo_email =
                res.data.data.UserInfo.userinfo_email);
          });
        } else {
          this.$message({
            message: "修改失败",
            type: "warning"
          });
          console.log(resultUserInfo);
          console.log(resultUserRole);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  margin-top: 40px;
  margin-left: 60px;
}

.show-pwd {
  position: absolute;
  left: 130px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
</style>