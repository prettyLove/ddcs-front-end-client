<!--region 封装的分页 table-->
<template>
  <div class="table">
    <el-table
      v-loading="options.loading"
      :data="list"
      :stripe="options.stripe"
      :border="options.border === undefined ? false : options.border"
      @selection-change="handleSelectionChange"
      :row-key="getRowKeys"
      :header-cell-style="rowClass"
      style="width: 100%"
    >
      <!--region 选择框-->
      <el-table-column v-if="options.multipleSelect" type="selection"  :reserve-selection="options.multipleSelect" style="width: 55px;"/>
      <!--endregion-->
      <!--region 数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :align="column.align === undefined ? 'center':column.align"
          :width="column.width === undefined ? 'auto':column.width"
          v-if="column.show === undefined ? true:column.show"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)"/>
              </template>
              <template v-else>
                <span>{{ scope.row[column.prop] }}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom :column="column" :row="scope.row" :render="column.render"></expand-dom>
            </template>
          </template>
        </el-table-column>
      </template>
      <!--endregion-->
      <!--region 按钮操作组-->
      <el-table-column
        v-if="operates.list.length > 0"
        label="操作"
        align="center"
        :width="operates.width"
        :fixed="operates.fixed === undefined ? false : operates.fixed"
      >
        <template slot-scope="scope">
          <div class="operate-group">
            <template v-for="(btn, key) in operates.list">
              <el-button
                :key="btn.id"
                v-if="btn.show"
                :type="btn.type"
                :size="btn.size === undefined ? 'mini':btn.size"
                :icon="btn.icon"
                :disabled="btn.disabled"
                :plain="btn.plain"
                @click.native.prevent="btn.method(key,scope.row)"
              >{{ btn.label }}
              </el-button>
            </template>
          </div>
        </template>
      </el-table-column>
      <!--endregion-->
    </el-table>

  </div>
</template>
<!--endregion-->
<script>
  export default {
    name: 'ITable',
    // 组件
    components: {
      expandDom: {
        functional: true,
        props: {
          row: Object,
          render: Function,
          index: Number,
          column: {
            type: Object,
            default: null
          }
        },
        render: (h, ctx) => {
          const params = {
            row: ctx.props.row,
            index: ctx.props.index
          }
          if (ctx.props.column) params.column = ctx.props.column
          return ctx.props.render(h, params)
        }
      }
    },
    props: {
      list: {
        type: Array,
        default: () => []
      }, // 数据列表
      columns: {
        type: Array,
        default: () => []
      }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
      operates: {// 操作按钮组 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
        type: Object,
        default: () => ({ list: [] })
      },
      options: {
        type: Object,
        default: () => ({
          stripe: false, // 是否为斑马纹 table
          highlightCurrentRow: false, // 是否要高亮当前行
          multipleSelect: false, //是否允许多选
          reserveSelection: false, //多选记忆功能
          idKey: '' //row-key字段，多选时必填
        })
      } // table 表格的控制参数
    },
    // 数据
    data() {
      return {
        // pageIndex: 1
        // multipleSelection: [] // 多行选中
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      // 多行选中
      handleSelectionChange(val) {
        this.$emit('handleSelectionChange', val)
      },
      getRowKeys(row) {
        if (this.options.multipleSelect === true) {
          if (this.options.idKey == ''||this.options.idKey == undefined) {
            let bflag = false
            for (let i = 0; i < this.columns.length; i++) {
              let column = this.columns[i]
              if (column.prop == 'id') {
                bflag = true
                break
              }
            }
            if (bflag){
              return row.id
            }else {
              return null
            }
          } else {
            return null
          }

        } else {
          return null
        }

      },
      cellStyle() {
        return 'border-right: 1px solid #ebeef5'
      },
      rowClass() {
        return 'background: #fff;color: #909399;font-weight: 600;border-right: 1px solid #ebeef5'
      }
    }
  }
</script>
<style lang="scss">
  .operate-group {
    width: 100%
  }

  .operate-group item {
    width: 50%
  }
</style>
