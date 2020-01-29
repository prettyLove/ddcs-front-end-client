<template>
  <div>
    <div id="parentDiv" class="parentDiv">
      <div class="chart" id="main" style="height: 300px;width: 100%"></div>
    </div>
  </div>
</template>

<script>
  /****************************************
   * 通过放大和缩小父容器来自动自适应图表
   * *****************************************
   */

  import echarts from 'echarts'
  // 手动引入 ECharts 各模块来减小打包体积
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/polar'
  export default {
    name: 'chart1',
    data() {
      return {
        size: 300,
        option: {
          title: {
            text: 'ECharts 入门'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
      }
    },
    computed: {

    },
    mounted() {
      let myChartDiv =document.getElementById('main')
      //高度计算
      this.chartssize(document.getElementById("parentDiv"),myChartDiv);

      let myChart = echarts.init(myChartDiv)
      myChart.setOption(this.option)
      window.addEventListener('resize',() => { myChart.resize(); });
    },
    methods: {
      //为图表计算高度
      chartssize(container, charts) {
        function getStyle(el, name)
        {
          if (window.getComputedStyle) {
            return window.getComputedStyle(el, null);
          } else {
            return el.currentStyle;
          }
        }
        let wi = getStyle(container, 'width').width;
        let hi = getStyle(container, 'height').height;
        charts.style.height = hi
      }
    }
  }
</script>

<style scoped>
.parentDiv{
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
