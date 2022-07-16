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
        :data="powerList"
        border
        style="width: 100%"
        stripe
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称" >
        </el-table-column>
        <el-table-column prop="path" label="路径" >
        </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level==='0'">等级一</el-tag>
            <el-tag type="success" v-else-if="scope.row.level==='1'">等级二</el-tag>
            <el-tag type="warning" v-else>等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getPowerList } from '@/api/jurisdiction'
export default {
  created () {
    this.getPowerList()
  },
  data () {
    return {
      powerList: []
    }
  },
  methods: {
    async getPowerList () {
      try {
        const res = await getPowerList(this.powerList)
        console.log(res)
        this.powerList = res.data.data
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
