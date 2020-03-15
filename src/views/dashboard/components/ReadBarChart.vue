<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons");
import resize from "./mixins/resize";
import { getCategory } from "@/api/category";
import { getCategoryNews } from "@/api/newslist";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  data() {
    return {
      chart: null,
      count: 0,
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            }
          }
        ],
        series: {
          name: "数量",
          type: "bar",
          stack: "vistors",
          barWidth: "80%",
          data: [],
          animationDuration
        }
      }
    };
  },
  created() {
    getCategory().then(result => {
      for (let item of result.data.data) {
        // 获取不同类型的新闻数量
        getCategoryNews(item.category_id).then(res => {
          this.option.xAxis.data.push(res.data.data[0].Category.category_name);
          for (let item of res.data.data) {
            this.count += item.read_amount;
          }
          this.option.series.data.push(this.count);
          this.count = 0;
        });
      }
      this.initChart();
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption();
    }
  },
  watch: {
    option: {
      deep: true,
      handler: function(newVal, oldVal) {
        if (newVal) {
          this.chart.setOption(newVal, true);
        } else {
          this.chart.setOption(oldVal, true);
        }
        this.chart.resize();
      }
    }
  }
};
</script>
e