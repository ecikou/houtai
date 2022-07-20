<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/newhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button style="margin-bottom: 10px" type="primary">添加分类</el-button>
      <el-table :data="classificationList" border style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="cat_name" label="分类名称"></el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效"> </el-table-column>
        <el-table-column prop="cat_level" label="排序">
          <template v-slot="scope">
            <el-tag v-if="scope.row.cat_level===0">级一</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level===1">级二</el-tag>
            <el-tag type="warning" v-else>级三</el-tag>
          </template>
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column prop="address" label="操作" width="180px">
          <el-button size="mini" type="primary" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" icon="el-icon-delete"
            >删除</el-button
          >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="classificationList.pagenum"
        :page-sizes="[1, 2, 4, 10]"
        :page-size="classificationList.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getItemParams } from '@/api/item'
export default {
  created () {
    this.getItemParams()
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江'
      }],
      classificationList: [],
      total: 0,
      classList: {
        type: [],
        pagenum: 1,
        pagesize: 5

      }
    }
  },
  methods: {
    handleSizeChange () {

    },
    handleCurrentChange () {

    },
    async getItemParams () {
      try {
        const res = await getItemParams(this.classList)
        this.classificationList = res.data.data.result
        this.total = res.data.data.total
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
</style>
