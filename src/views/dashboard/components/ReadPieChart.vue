<template>
  <div :class="className" :style="{height:height,width:width}" />
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
    cnameList: {
      type: Array,
      required: true
    },
    ccountList: {
      type: Array,
      required: true
    },
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
      rnameList: [],
      rcountList: [],
      count: 0
    };
  },
  created() {
    getCategory().then(result => {
      for (let item in result.data.data) {
        let i = result.data.data[item];
        // 获取不同类型的新闻数量
        getCategoryNews(i.category_id).then(res => {
          // console.log(res.data.data);
          this.rnameList.push(res.data.data[0].Category.category_name);
          for (let item in res.data.data) {
            // console.log(item);
            this.count += res.data.data[item].read_amount;
          }
          this.rcountList.push({
            value: this.count,
            name: res.data.data[0].Category.category_name
          });
          this.count = 0
        });
      }
      // console.log(this.rnameList);
      // console.log(this.rcountList);
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
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: this.rnameList
        },
        series: [
          {
            name: "各类型新闻数量",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: this.rcountList,
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      });
    }
  }
};
</script>
