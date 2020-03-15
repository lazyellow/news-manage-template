<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col>
        <div class="welcome_account">
          欢迎回来
          <span>{{name}}</span>
        </div>
        <div class="welcome_subtitle">开始你的工作吧！</div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <img class="welcome_img" src="@/assets/welcome/welcome.png">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
};
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
  margin-top: 100px;
  padding: 32px;
}
.welcome_account{
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-align: center;
  color: #656478;
}
.welcome_subtitle{
  margin-top: 30px;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-align: center;
  color: #656478;
}
.welcome_img{
  margin-top: 70px;
  width: 700px;
  height: auto;
}
</style>