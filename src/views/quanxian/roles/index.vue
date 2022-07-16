<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table
        fit:false
        size="mini"
        :data="roleList"
        border
      >
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row v-for="item in scope.row.children" :key="item.id" style="border: 1px solid #eee">
              <!-- 左侧蓝色第一列 -->
                <el-col :span="4">
                  <el-tag style="margin:8px">{{item.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                  </el-col>
              <el-col :span="20">
                <e-row v-for="item1 in item.children" :key="item1.id">
                  <el-col>
                    <el-tag type="success" style="margin:8px">{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col></el-col>
                </e-row>
              </el-col>
            </el-row>
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>

        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述">
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作" width="290px">
          <template >
           <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
           <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
           <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRoles } from '@/api/user'
export default {
  created () {
    this.getRoles()
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      roleList: []
    }
  },
  methods: {
    async getRoles () {
      try {
        const res = await getRoles()
        console.log(res)
        this.roleList = res.data.data
        console.log(this.roleList)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
  }
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
