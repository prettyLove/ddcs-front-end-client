<template>
  <div style="width: 100%">
    <el-button type="primary" @click="addDialogShow">新增</el-button>
    <c-table :page-info="pageInfo" :table-config="tableConfig" @handleSelectionChange="handleSelectionChange"
             @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>

    <el-dialog :visible.sync="dialogVisible" title="新增">
      <el-form :model="form" ref="form" enctype="multipart/form-data">
        <el-form-item label="课程名称：" label-width="140px" prop="name">
          <el-input v-model="form.name" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="介绍：" label-width="140px" prop="desc">
          <el-input v-model="form.desc" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="上传视频：" label-width="140px">
          <input id="file1" type="file" name="file"/>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="add">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import CTable from '../../components/Table/index'
  import tableBase from '../../components/Table/components/tableBase'

  import { removeToken, getToken } from '@/utils/auth'
  import { getLanguage } from '../../utils/i18n'
  import qs from 'qs'
  import  axios from 'axios'

  export default {
    name: 'Index',
    components: { CTable },
    extends: tableBase,
    data() {
      return {
        dialogVisible: false,
        param: '',
        list2: [],
        list: [
          {
            id: '24',
            title: '编号3',
            state: 0
          },
          {
            id: '23',
            title: '编号3',
            state: 1
          },
          {
            id: '23',
            title: '编号3',
            state: 2
          },
          {
            id: '2',
            title: '编号3',
            state: 0
          },
          {
            id: '223',
            title: '编号3',
            state: 1
          },
          {
            id: '2444',
            title: '编号3',
            state: 1
          }
        ], // table数据
        options: {
          multipleSelect: true // 是否支持列表项选中功能
        }, // table 的参数
        columns: [
          {
            prop: 'id',
            label: '编号',
            align: 'center',
            show: true
          },
          {
            prop: 'name',
            label: '账号',
            // align: 'center',
            formatter: (row, column, cellValue) => {
              return `<span style="white-space: nowrap;color: dodgerblue;">${row.name}</span>`
            }
          },
          {
            prop: 'fullName',
            label: '姓名',
            align: 'center'
          },
          {
            prop: 'gmtCreate',
            label: '创建时间',
            align: 'center'
          },
          {
            prop: 'banTime',
            label: '冻结日期',
            align: 'center'
          }

        ], // 需要展示的列
        operates: {
          width: 250,
          fixed: 'right',
          list: [
            {
              id: '1',
              label: '编辑',
              type: 'warning',
              size: 'small',
              show: true,
              icon: 'el-icon-edit',
              plain: true,
              disabled: false,
              method: (index, row) => {
                this.handleEdit(index, row)
              }
            },
            {
              id: '2',
              label: '删除',
              type: 'danger',
              icon: 'el-icon-delete',
              show: true,
              plain: false,
              disabled: false,
              method: (index, row) => {
                this.handleDel(index, row)
              }
            }
          ]
        }, // 列操作按钮
        form: {
          name: 'admin'
        }
      }
    },
    mounted() {
      const vm = this
      // 增删改查
      vm.api.listPage = '/user/list'
      vm.api.delete = '/user/'
      // 通过assign方法，可以将第一个对象的属性合并或者覆盖第一个对象，用于实现配置的重写或者新增配置
      Object.assign(vm.tableConfig.columns, this.columns)
      Object.assign(vm.tableConfig.operates, this.operates)
      Object.assign(vm.tableConfig.options, this.options)
      // 加载列表
      vm.getPageList()
    },
    methods: {
      // 编辑
      handleEdit(index, row) {
        console.log(' index:', index)
        console.log(' row:', row)
      },
      // 删除
      // handleDel(index, row) {
      //   console.log(' index:', index)
      //   console.log(' row:', row)
      // },
      hideLoading() {

      },
      addDialogShow() {
        this.dialogVisible = true
      },
      add() {
        this.param=new FormData();
        let file = document.getElementById('file1')
        this.param.append('file', file)
        this.param.append('name', this.form.name)
        //this.param = qs.stringify(this.form)
        //this.param.append('token', localStorage.getItem('Authorization'))
        // 4.2，赋予提交请求头，格式为：'multipart/form-data'（必须！！）
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime(),
            'Authorization': getToken(),
            'Accept-Language': getLanguage() || 'zh_CN'
          }
        }
        // 4.3，然后通过下面的方式把内容通过axios来传到后台
        axios.post("/addData",this.param,config).then( res => {
          console.log(res)
        }).catch( res => {
          console.log(res)
        })
      }
    }
  }
</script>
