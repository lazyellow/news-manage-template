<template>
  <div class="dashboard-editor-container">
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
          <cate-pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <cate-bar-chart />
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
          <read-pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <read-bar-chart />
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
import PanelGroup from "./components/PanelGroup";
import CatePieChart from "./components/CatePieChart";
import CateBarChart from "./components/CateBarChart";
import ReadPieChart from "./components/ReadPieChart";
import ReadBarChart from "./components/ReadBarChart";
import userCount from "./components/UserCount";
import { getCategory } from "@/api/category";
import { getNews, getCategoryNews } from "@/api/newslist";

export default {
  components: {
    PanelGroup,
    CatePieChart,
    CateBarChart,
    ReadPieChart,
    ReadBarChart,
    userCount
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