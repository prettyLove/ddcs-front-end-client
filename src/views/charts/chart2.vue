<template>
  <div>
    <div style="width: 100%;height:100%">
      <!--自适应方式-->
      <!--<e-charts :options="polar" style="width: 100%;height:100%;" ref="echarts1"></e-charts>-->

      <!--针对每个echarts进行大小控制，可以直接进行style="width: 100%;height:100%;"-->
      <e-charts :options="option" ref="myecharts1" style="width: 100%;height:300px;"></e-charts>

    </div>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
  // 手动引入 ECharts 各模块来减小打包体积
  import 'echarts/lib/component/legend'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/polar'

  export default {
    name: 'chart2',
    components: { ECharts },
    data() {
      return {
        option: {
          legend: { data: ['AA', 'AB'] },
          tooltip: {},
          // dataset: {
          //   // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
          //   // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
          //   dimensions: ['product','邮件营销', '联盟广告', '视频广告'],
          //   source: [
          //     [0,43.3,85.8,93.7],
          //     [1,83.1,73.4,55.1 ],
          //     [2,34.1,65.4,12.1 ],
          //     [3,44.1,76.4,23.1],
          //   ]
          // },
          xAxis: {
             type: 'category',
             data: ['2014', '2015','2016', '2017']
          },
          yAxis: {},
          series: [
            {
              name:'AA',
              //dimensions: ['2014', '2015','2016', '2017'],
              type: 'bar',
              data: [[0, 43], [1, 83], [2, 34], [3, 44]]
            },
            {
              name:'AB',
              //dimensions: ['2014', '2015','2016', '2017'],
              type: 'bar',
              data: [[0, 43], [1, 83], [2, 34], [3, 44]]
            }
          ]
        }
      }
    }

  }
</script>

<style scoped>

</style>
