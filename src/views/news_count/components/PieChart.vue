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
    // cnameList: {
    //   type: Array,
    //   required: true
    // },
    // ccountList: {
    //   type: Array,
    //   required: true
    // },
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
      resultData: [],
      cnameList: [],
      ccountList: []
    };
  },
  created() {
    getCategory().then(result => {
      // this.resultData = res.data.data;
      // console.log(this.resultData);
      for (let item in result.data.data) {
        let i = result.data.data[item];
        // 获取不同类型的新闻数量
        getCategoryNews(i.category_id).then(res => {
          this.cnameList.push(res.data.data[0].Category.category_name)
          this.ccountList.push({
            value: res.data.data.length,
            name: res.data.data[0].Category.category_name
          });
        });
      }
      console.log(this.cnameList)
      console.log(this.ccountList)
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
          data: this.cnameList
        },
        series: [
          {
            name: "各类型新闻数量",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: this.ccountList,
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      });
    }
  }
};
</script>
