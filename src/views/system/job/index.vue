<template>
  <div>
    <quarter-picker v-model="quarter"></quarter-picker>
    <el-button @click="getQuarter">提交</el-button>
  </div>
</template>
<script>
  /**
   * @file:  View 组件 季节选择控件
   * @author: v_zhuchun
   * @date: 2019-05-23
   * @description: UI组件  可选择季节
   * @api: valueArr : 季度value defalut['01-03', '04-06', '07-09', '10-12'] 默认值待设置
   */
  import QuarterPicker from '../../../components/quarter-picker'
  export default {
    components:{QuarterPicker},
    data() {
      return {
        quarter:'',
      }
    },
    created() {

    },
    methods: {
      getQuarter(){
        console.log(this.quarter)
      }
    }
  }
</script>
