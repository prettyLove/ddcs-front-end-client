<template>
  <div>
    <CTable :page-info="pageInfo" :table-config="tableConfig" @handleSelectionChange="handleSelectionChange"
            @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></CTable>
  </div>
</template>

<script>
  import { api } from '../../../api/api'
  import CTable from '../../../components/Table'
  import tableBase from '../../../components/Table/components/tableBase'

  export default {
    name: 'index',
    extends: tableBase,
    components: { CTable },
    data() {
      return {
        columns: [
          {
            prop: 'id',
            label: 'ID',
            align: 'center',
            show: true
          },
          {
            prop: 'fullName',
            label: '用户名',
            align: 'center'
          },
          {
            prop: 'sex',
            label: '性别',
            align: 'center',
            formatter: function(row, column) {
              if (row.sex == true) {
                return '男'
              } else {
                return '女'
              }
            }
          },
          {
            prop: 'email',
            label: '邮箱',
            align: 'center'
          },
          {
            prop: 'phone',
            label: '电话',
            align: 'center',
            formatter:function(row,column) {
              let phone = row.phone
              if(phone!=null&&phone!=''){
                let pattern = /(\d{3})(\d{4})(\d{4})/;
                phone = phone.replace(pattern, "$1****$3");
              }
              return phone
            }
          },
          {
            prop: 'birthday',
            label: '生日',
            align: 'center'
          },
          {
            prop: 'state',
            label: '状态',
            align: 'center',
            width: '160',
            render: (h, params) => {
              return h('el-tag', {
                props: { type: params.row.status === 1 ? 'success' : params.row.status === 0 ? 'info' : 'danger' } // 组件的props
              }, params.row.status === 0 ? '禁用' : params.row.status === 1 ? '有效' : '禁用')
            }
          }
        ],
        operates: {
          list: [{
            label: '编辑',
            type: 'warning',
            show: (index, row) => {
              return true
            },
            icon: 'el-icon-edit',
            plain: true,
            disabled: false,
            method: (index, row) => {
              this.handleEdit(index, row)
            }
          },
            {
              label: '删除',
              type: 'danger',
              icon: 'el-icon-delete',
              show: true,
              plain: false,
              method: (index, row) => {
                this.handleDel(index, row)
              }
            }
          ]
        }
      }
    },
    methods: {},
    created() {
      const vm = this
      vm.api.get = api.SystemUserRouter.get
      vm.api.delete = api.SystemUserRouter.delete
      Object.assign(vm.tableConfig.columns, this.columns)
      Object.assign(vm.tableConfig.operates,this.operates)
     // vm.tableConfig.options.multipleSelect = true
      vm.getPageList()
    }
  }
</script>

<style scoped>

</style>
