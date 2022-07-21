<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/newhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row class="rowww">
        <!-- 输入框 -->
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable v-model="orderList.query" @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderLists" border style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号"> </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template v-slot="scope">
           <el-tag v-if="scope.row.pay_status==='1'" type="success" effect="dark">已支付</el-tag>
          <el-tag v-else type="danger" effect="dark">未支付</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | datefmt('YYYY-MM-DD,H.m') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
          ></el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="orderListSizeChange"
        @current-change="orderListCurrentChange"
        :current-page="orderList.pagenum"
        :page-sizes="[1, 2, 4, 10]"
        :page-size="orderList.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order'
export default {
  created () {
    this.getOrderList()
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区'
      }],
      total: 0,
      orderList: {
        query: '',
        pagenum: 1,
        pagesize: 5

      },
      orderLists: []
    }
  },
  methods: {
    orderListSizeChange (newSize) {
      this.orderList.pagesize = newSize
      this.getOrderList()
    },
    orderListCurrentChange (newCurrent) {
      this.orderList.pagenum = newCurrent
      this.getOrderList()
    },
    async getOrderList () {
      try {
        const res = await getOrderList(this.orderList)
        console.log(res)
        this.orderLists = res.data.data.goods
        this.total = res.data.data.total
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
.rowww {
  margin-bottom: 16px;
}
</style>
