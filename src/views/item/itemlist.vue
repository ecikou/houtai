<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/newhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row class="rowww">
        <!-- 输入框 -->
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户按妞 -->
        <el-col :span="4">
          <el-button class="supbtn" type="primary">添加用户</el-button>
        </el-col>
        <el-col :span="10"></el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="itemsList" border stripe size="small">
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="540">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="120">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="120">
        </el-table-column>
        <!-- 操作部分 -->
        <el-table-column fixed="right" label="操作" width="180">
          <template>
            <el-button icon="el-icon-edit" type="primary" size="small"
              >编辑</el-button
            >
            <el-button icon="el-icon-delete" type="danger" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="goodsList.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="goodsList.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getItemList } from '@/api/item'
export default {
  created () {
    this.getItemList()
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }],
      goodsList: {
        query: '',
        pagenum: 1,
        pagesize: 5

      },
      itemsList: [],
      total: 0
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    handleSizeChange (newSize) {
      this.goodsList.pagesize = newSize
      this.getItemList()
    },
    handleCurrentChange (newCurrentChange) {
      this.goodsList.pagenum = newCurrentChange
      this.getItemList()
    },
    async getItemList () {
      try {
        const res = await getItemList(this.goodsList)
        console.log(res)
        this.total = res.data.data.total
        this.itemsList = res.data.data.goods
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
.supbtn {
  margin-left: 18px;
}
.rowww {
  margin-bottom: 15px;
}
</style>
