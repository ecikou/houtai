<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table
        fit:false
        size="mini"
        :data="tableData"
        border
        style="width: 100%"
        stripe
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="date" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="name" label="路径" width="180">
        </el-table-column>
        <el-table-column prop="address" label="权限等级">
          <el-tag>等级一</el-tag>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { jurisdIction } from '@/api/jurisdiction'
export default {
  created () {
    this.getUserList()
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
      ],
      userList: []
    }
  },
  methods: {
    async getUserList (userList) {
      try {
        const res = await jurisdIction(userList)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-card {
  margin: 20px 0 30px 0;
}
.el-row {
  margin-bottom: 12px;
}
.supbtn {
  margin-left: 18px;
}
.el-table {
  margin-top: 10px;
}
</style>
