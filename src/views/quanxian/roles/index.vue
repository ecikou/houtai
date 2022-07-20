<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/newhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-button type="primary" @click="addUsersVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-table fit:false size="mini" :data="roleList" border>
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              v-for="item in scope.row.children"
              :key="item.id"
              style="border: 1px solid #eee"
              class="divstyle"
            >
              <!-- 左侧蓝色第一列 -->
              <el-col :span="4">
                <el-tag style="margin: 8px">{{ item.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row
                  class="divstyle"
                  v-for="item1 in item.children"
                  :key="item1.id"
                >
                  <el-col :span="5">
                    <el-tag type="success" style="margin: 8px">{{
                      item1.authName
                    }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="19">
                    <!-- 最后一列标签 -->
                    <el-tag
                      style="margin: 8px"
                      v-for="item2 in item1.children"
                      :key="item2.id"
                      type="warning"
                      closable
                      @close="deleRightId"
                      >{{ item2.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <span>{{ scope.row }}</span> -->
          </template>
        </el-table-column>

        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作" width="290px">
          <template v-slot="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delusers(scope.row.id)"
              >删除</el-button
            >
            <el-button size="mini" type="warning" icon="el-icon-setting"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色 -->
      <el-dialog title="添加角色" :visible.sync="addUsersVisible" width="50%">
        <el-form :model="addsuserForm" label-width="70px">
          <el-form-item label="角色名称">
            <el-input v-model="addsuserForm.rolename"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="addsuserForm.rolename"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUsersVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogVisible = false">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getRoles } from '@/api/user'
import { deletePowerUser, delRolesPower } from '@/api/jurisdiction'
export default {
  created () {
    this.getRoles()
  },
  data () {
    return {
      // tableData: [{
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }],
      roleList: [],
      addUsersVisible: false,
      addsuserForm: {
        rolename: '',
        roleDesc: ''
      }
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
    },
    async delusers (id) {
      console.log(id)
      try {
        const res = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        console.log(res) // confirm
      } catch (err) {
        console.log(err) // cancel
        if (err === 'cancel') {
          return this.$message.info('已取消删除')
        }
        return err
        // 删除用户
      }
      try {
        const res1 = await deletePowerUser(id)
        console.log(111)
        console.log(res1)
        this.$message.success('删除成功')
        this.getRoles()
      } catch (err) {
        console.log(err)
      }
    },
    // 添加角色
    addDialogVisible () {
    },
    // 删除最后一列的标签
    async deleRightId () {
      try {
        const res = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delRolesPower()
        console.log(res) // confirm
      } catch (err) {
        console.log(err) // cancel
        if (err === 'cancel') {
          return this.$message.info('已取消删除')
        }
        return err
        // 删除用户
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
.divstyle {
  display: flex;
  align-items: center;
}
</style>
