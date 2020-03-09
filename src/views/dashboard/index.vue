<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <!-- 各类总数量 -->
    <panel-group />

    <el-row :gutter="32">
      <el-col :span="18">
        <h2>新闻类型统计</h2>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart :cnameList="cnameList" :ccountList="ccountList" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart :cnameList="cnameList" :ccountList="ccountList" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :span="18">
        <h2>新闻阅读量统计</h2>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <readpie-chart :cnameList="cnameList" :ccountList="ccountList" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <readbar-chart :cnameList="cnameList" :ccountList="ccountList" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :span="18">
        <h2>账户数量统计</h2>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <user-count />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import readpieChart from "./components/ReadPieChart";
import readbarChart from "./components/ReadBarChart";
import userCount from "./components/UserCount";
import { getCategory } from "@/api/category";
import { getNews, getCategoryNews } from "@/api/newslist";

export default {
  components: {
    GithubCorner,
    PanelGroup,
    PieChart,
    BarChart,
    readpieChart,
    readbarChart,
    userCount
  },
  data() {
    return {
      cnameList: [],
      ccountList: [],
      rcountList: []
    };
  }
};
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>