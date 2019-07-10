<template>
  <div id="home">
    <div class="panel panel-info">
      <div class="panel-body">
        <div id="this-is-line-chart" class="chart" v-echarts="lineChartOptions"></div>
      </div>
    </div>
  </div>
</template>
<script>
import vecharts from "../assets/js/vecharts";
export default {
  data() {
    return {
      data: "",

      lineChartOptions: {
        title: {
          text: "温度-时间图表",
          x: "center",
          y: "top"
        },
        backgroundColor: "#fee",
        tooltip: {
          trigger: "axis"
        },
        xAxis: [
          {
            show: true,
            name: "时间/s",
            type: "category",
            boundaryGap: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        yAxis: [
          {
            name: "温度/℃",
            type: "value"
          }
        ],
        series: [
          {
            name: "温度",
            type: "line",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    };
  },
  mounted() {
    // 获取时间

    // console.log(this.getDate(), typeof this.getDate);
    this.lineChartOptions.title.text =
      this.getDate() + " " + this.lineChartOptions.title.text;
    // 定时器模拟数据修改
    setInterval(() => {
      this.updateLineChartData();
    }, 1000);
  },
  directives: {
    echarts: vecharts
  },

  methods: {
    updateLineChartData() {
      // 使用原始对象创建对象
      const newLineChartOptions = Object.assign({}, this.lineChartOptions);

      //修改xAxis数据
      newLineChartOptions.xAxis[0].data.push(this.getHourMS());
      newLineChartOptions.xAxis[0].data.shift();

      // 修改yAxis数据
      newLineChartOptions.series[0].data.push(Math.round(Math.random() * 100));
      newLineChartOptions.series[0].data.shift();

      //　将新对象赋值给原始对象
      this.lineChartOptions = newLineChartOptions;
    },
    getDate() {
      var currentDate = new Date();
      return currentDate.toLocaleDateString(); //获取当前日期
    },
    getHourMS() {
      var currentDate = new Date();
      var hh = currentDate.getHours();
      var mm = currentDate.getMinutes();
      var ss = currentDate.getSeconds();
      var times = hh + ":" + mm + ":" + ss;
      return times;
    }
  }
};
</script>
<style>
body {
  padding: 30px;
  margin: 0px;
}

.chart {
  width: 100%;
  height: 400px;
}
</style>

