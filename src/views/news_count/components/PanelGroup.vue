<template>
  <el-row :gutter="40" class="panel-group">
    <!-- 新闻总数量 -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="table" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">新闻发布总篇数</div>
          <count-to :start-val="0" :end-val="allNewsCount" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <!-- 新闻类型总数量 -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="tree-table" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">新闻类型</div>
          <count-to
            :start-val="0"
            :end-val="allCategoryCount"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <!-- 阅读总量 -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="chart" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总阅读量</div>
          <count-to
            :start-val="0"
            :end-val="this.allReadCount"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <!-- 后台账号数总量 -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">后台账号数总量</div>
          <count-to :start-val="0" :end-val="this.allUserCount" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
import { getNews } from "@/api/newslist";
import { getCategory } from "@/api/category";
import { getUserRole } from "@/api/user";
export default {
  components: {
    CountTo
  },
  data() {
    return {
      allNewsCount: 0,
      allCategoryCount: 0,
      allReadCount: 0,
      allUserCount:0
    };
  },
  created: function() {
    // 获取新闻总量
    getNews().then(res => {
      this.allNewsCount = res.data.data.length;
    });

    //获取新闻分类总量
    getCategory().then(res => {
      this.allCategoryCount = res.data.data.length;
    });

    // 阅读总量
    getNews().then(res => {
      for (let item of res.data.data) {
        this.allReadCount = this.allReadCount + item.read_amount;
      }
    });

    // 获取账号总量
    getUserRole().then(res => {
      this.allUserCount = res.data.data.rows.length;
    });
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    // &:hover {
    //   .card-panel-icon-wrapper {
    //     color: #fff;
    //   }

    //   .icon-people {
    //     background: #40c9c6;
    //   }

    //   .icon-message {
    //     background: #36a3f7;
    //   }

    //   .icon-money {
    //     background: #f4516c;
    //   }

    //   .icon-shopping {
    //     background: #34bfa3;
    //   }
    // }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
