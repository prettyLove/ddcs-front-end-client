<style>
  .echarts {
    width: 100%;
    height:100%;
    min-height: calc(100vh - 84px);
  }
</style>

<template>
    <div style="width: 100%;height:100%">
      <!--自适应方式-->
      <!--<e-charts :options="polar" style="width: 100%;height:100%;" ref="echarts1"></e-charts>-->

      <!--针对每个echarts进行大小控制，可以直接进行style="width: 100%;height:100%;"-->
      <e-charts :options="polar"  ref="myecharts1" style="width: 100%;height:100%;"></e-charts>
      <e-charts :options="polar"  ref="myecharts2" style="width: 100%;height:100%;"></e-charts>
    </div>
</template>

<script>
  import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
  // 手动引入 ECharts 各模块来减小打包体积
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/polar'
  import Vue from 'vue'
  export default {
    name: 'index',
    components: { ECharts },
    data() {
      let data = []
      for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }
      return {
        polar: {
          title: {
            text: '极坐标双数值轴'
          },
          legend: {
            data: ['line']
          },
          polar: {
            center: ['50%', '54%']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          angleAxis: {
            type: 'value',
            startAngle: 0
          },
          radiusAxis: {
            min: 0
          },
          series: [
            {
              coordinateSystem: 'polar',
              name: 'line',
              type: 'line',
              showSymbol: false,
              data: data
            }
          ],
          animationDuration: 2000
        },
        autoResize: true
      }
    },
    mounted(){
    //  this.init() //让echarts窗口自适应
    },
    methods: {
      init(){
         window.addEventListener('resize',() => { this.$ref.myecharts1.resize(); });
      }
    }
  }
</script>

<style scoped>

</style>
