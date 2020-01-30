<template />

<script>
export default {
  name: 'TableBase',
  components: {},
  data() {
    return {
      updateLoading: false, // loading
      dialogFormVisible: false, // 显示弹窗
      form: {}, // 表单对象
      // 增删改查 地址
      api: {
        get: '', // 分页数据加载地址
        update: null, // 更新数据地址
        insert: '', // 新增数据地址
        delete: '' // 删除数据地址
      },
      pageInfo: {
        current: 1, // 当前页码
        size: 10, // 默认每页条目数
        total: 0, // 总条目
        records: [] // 数据集合
      },
      tableConfig: {
        options: {
          stripe: true, // 是否为斑马纹 table
          border: true, // 是否显示纵向列
          loading: true, // 是否添加表格loading加载动画
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          multipleSelect: false, // 是否支持列表项选中功能
          reserveSelection: true, //多选记忆功能
          idKey: '' //row-key字段，多选时必填
        }, // table 的参数
        columns: [], // 需要展示的列
        operates: { // 列操作按钮
          width: 250, // 操作列宽度
          fixed: false, // 按钮列是否固定，false/right/left
          list: []
        }
      },
      multipleSelection: [] // 已经选择的id
    }
  },
  mounted() {
  },
  methods: {
    // 多选操作，包含全选，每次返回数组结合
    handleSelectionChange(val) {
      console.log('table多选' + val)
      this.multipleSelection = val
    },
    // 加载列表数据
    getPageList() {
      const vm = this
      const url = vm.api.get
      if (!url || url === '') {
        return
      }

      vm.tableConfig.options.loading = true
      // 查询时页数据, 这里使用post表单提交方式，默认axios使用json方式，HTTP对象已经转换成form提交方式 第三的参数是config对象，这里只设置params属性，此属性会将参数转换成地址传参格式
      vm.form.pageNumber= vm.pageInfo.current
      vm.form.pageSize= vm.pageInfo.size
      this.$http.get(url,{params:vm.form})
        .then((response) => {
          vm.tableConfig.options.loading = false
          const result = response.data
          if (response.status === vm.$responseSuccess) {
            if (result.code === vm.$success) {
              vm.pageInfo = result.data
              vm.tableConfig.options.loading = false
              return
            }
          }
          this.$message({
            type: 'error',
            message: result.message || '数据出错！'
          })
        })
        .catch((error) => {

          console.log('get page list error:', error)
          this.$message({
            type: 'error',
            message: '加载数据出错！'
          })
        })
    },
    // 切换分页的size
    handleSizeChange(size) {
      this.pageInfo.size = size
      this.getPageList()
    },
    // 切换分页
    handleCurrentChange(current) {
      this.pageInfo.current = current
      this.getPageList()
    },
    // 删除
    handleDel(index, row) {
      const vm = this
      this.$confirm('是否确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableConfig.options.loading = true
        // 密码验证完成 to del
        vm.$http.delete(vm.api.delete + row.id, { params: { id: row.id }})
          .then((response) => {
            if (response.status === vm.$responseSuccess) {
              const result = response.data
              // 删除成功
              if (result.code === vm.$success) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                // 重新加载数据
                vm.getPageList()
              } else {
                // 删除失败
                vm.$alert(result.message, {
                  // 确定
                  confirmButtonText: '确定'
                })
              }
              this.deleteAfter(result.code)
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
            this.tableConfig.options.loading = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    // 删除
    deleteAfter(status) {

    },
    //  编辑 和 新增
    handleEdit(index, row) {
      console.log('编辑')
      this.editBefore(row)
      // item 为空的object 则是添加
      this.form = Object.assign({}, row || {})
      this.showEditDialog()
    },
    // 验证数据
    validate() {
      return true
    },
    // 保存与编辑
    save: function() {
      const vm = this

      if (!this.validate()) {
        return
      }
      const isAdd = !!((!this.form.id || this.form.id === ''))
      vm.updateLoading = true
      // 取接口 url
      let url = isAdd ? vm.api.insert : vm.api.update
      // 好果不指定更新接口，那么更新接也使用 insert 接口
      if (vm.api.update == null) {
        url = vm.api.insert
      }

      if (isAdd) {
        this.$http.post(url, vm.form)
          .then((response) => {
            vm.updateLoading = false
            const res = response.data
            if (response.status === vm.$responseSuccess) {
              if (res.code === vm.$success) {
                vm.getPageList()
                vm.dialogFormVisible = false
                this.$message('操作成功')
              } else {
                // 多语言处理 按多语言取内容
                this.$message({
                  type: 'error',
                  message: '操作失败！'
                })
              }

              this.saveAfter(res.status)
            }
          })
          .catch(() => {
            vm.updateLoading = false
            this.$message('操作失败')
          })
      } else {
        this.$http.patch(url, vm.form)
          .then((response) => {
            vm.updateLoading = false
            const res = response.data
            if (response.status === vm.$responseSuccess) {
              if (res.code === vm.$success) {
                vm.getPageList()
                vm.dialogFormVisible = false
                this.$message('操作成功')
              } else {
                this.$message({
                  type: 'error',
                  message: res.message || '操作失败！'
                })
              }

              this.saveAfter(res.status)
            }
          })
          .catch((error) => {
            vm.updateLoading = false
            this.$message('操作失败')
          })
      }
    },
    //
    editBefore: function(item) {

    },
    //
    saveAfter: function(status) {

    },
    showEditDialog: function() {
      this.dialogFormVisible = true
    },
    // 取消编辑 和 新增
    cancelEditDialog: function() {
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
