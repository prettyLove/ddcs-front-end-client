<template>
  <div>
    <!-- 查询内容 -->
    <slot name="head" />

    <!--  dialog -->
    <slot name="dialog" />

    <div class="table_index">
      <i-table
        :list="pageInfo.records"
        :options="tableConfig.options"
        :columns="tableConfig.columns"
        :operates="tableConfig.operates"
        @handleSelectionChange="handleSelectionChange"
      />
      <el-pagination
        :visible.sync="!tableConfig.options.loading"
        :current-page="pageInfo.current"
        :page-sizes="[10, 20, 30, 50 ,100]"
        :page-size="pageInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import ITable from './components/iTable'
export default {
  name: 'TableIndex',
  components: { ITable },
  props: {
    pageInfo: {
      type: Object,
      default: null
    },
    tableConfig: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style scoped>
 .table_index{
   width: 100%;
   margin: 0;
   padding: 0;
 }
</style>
