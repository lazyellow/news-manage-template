<template>
  <div v-if="true" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons");
import resize from "./mixins/resize";
import { getCategory } from "@/api/category";
import { getCategoryNews } from "@/api/newslist";

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
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: []
        },
        series: {
          name: "各类型新闻数量",
          type: "pie",
          roseType: "radius",
          radius: [15, 95],
          center: ["50%", "38%"],
          data: [],
          animationEasing: "cubicInOut",
          animationDuration: 2600
        }
      }
    };
  },
  created() {
    getCategory().then(result => {
      for (let item of result.data.data) {
        // 获取不同类型的新闻数量
        getCategoryNews(item.category_id).then(res => {
          this.option.legend.data.push(res.data.data[0].Category.category_name);
          this.option.series.data.push({
            value: res.data.data.length,
            name: res.data.data[0].Category.category_name
          });
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
      this.chart.setOption(this.option);
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
