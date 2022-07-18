<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/newhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片头区域 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="10">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="usersInfo.query"
            @clear="getuserInfo"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getuserInfo"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            class="supbtn"
            type="primary"
            @click="addUserVisible = true"
            >添加用户</el-button
          >
        </el-col>
        <el-col :span="10"></el-col>
      </el-row>

      <!-- 表格区域 -->
      <template>
        <el-table size="small" border :data="users">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="username" label="姓名"> </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <!-- 状态区域 -->
          <el-table-column label="状态">
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.mg_state"
                @change="userStarChange(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <!--操作区域  -->
          <el-table-column prop="address" label="操作" width="180px">
            <template v-slot="scope">
              <el-row>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="isShowEdit(scope.row.id)"
                ></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="delUserbyId(scope.row.id)"
                ></el-button>
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-setting"
                ></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页区域 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="usersInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="usersInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
        <!-- 添加用户对话框 -->
        <el-dialog
          title="添加用户对话框"
          :visible.sync="addUserVisible"
          width="50%"
          @close="closeDialog"
        >
          <!-- 输入框区域 -->
          <el-form
            :model="addForm"
            :rules="addRules"
            ref="addruleForm"
            label-width="80px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="emial">
              <el-input v-model="addForm.emial"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
          </el-form>
          <!-- 按钮 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addUserVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUsers">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog
          title="编辑用户"
          :visible.sync="elDialogVisible"
          width="50%"
          @close="elDialogState"
        >
          <el-form
            :model="ediForm"
            :rules="ediFormRules"
            ref="ediFormRef"
            label-width="70px"
          >
            <el-form-item label="用户名">
              <el-input v-model="ediForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ediForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="ediForm.mobile"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="elDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="eldPutaddUser">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </el-card>
  </div>
</template>

<script>
import { getInfo, putUser, addUserForm, getUsersId, putUserInfo, deleteUsers } from '@/api/user'
import { validateMobile, validateEmail } from '@/utils/validate'
export default {
  created () {
    this.getuserInfo()
    this.userStarChange()
  },
  data () {
    const validateMobileFn = (rule, value, callback) => {
      if (validateMobile(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    const validateEmailFn = (rule, value, callback) => {
      if (validateEmail(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱'))
      }
    }
    return {
      usersInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      users: [],
      total: 0,
      // 添加对话框显示隐藏
      addUserVisible: false,
      // 修改对话框显示隐藏
      elDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        emial: '',
        mobile: ''
      },
      // 修改用户信息的资料
      ediForm: {},
      ediFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmailFn, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobileFn, trigger: 'blur' }
        ]
      },
      addRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        emial: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmailFn, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobileFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取用户信息
    async getuserInfo () {
      try {
        // const res = await getInfo(this.pagenum, this.pagesize, this.query)
        const res = await getInfo(this.usersInfo)
        this.users = res.data.data.users
        this.total = res.data.data.total
        this.usersInfo.pagenum = res.data.data.pagenum
        this.usersInfo.total = res.data.data.total
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 页码改变
    handleCurrentChange (newCurrentPage) {
      this.usersInfo.pagenum = newCurrentPage
      this.getuserInfo()
    },
    // 改变pagesize
    handleSizeChange (newSize) {
      this.usersInfo.pagesize = newSize
      this.getuserInfo()
    },
    // 用户状态跟新
    async userStarChange (users) {
      try {
        const res = await putUser(users.id, users.mg_state)
        console.log(res)
        if (res.data.meta.status === 200) {
          return this.$message.success('更新用户状态成功')
        } else {
          users.mg_state = !users.mg_state
          this.$message.error('更新用户状态失败')
        }
      } catch (err) {
      }
    },
    // 重置添加用户表单
    closeDialog () {
      this.$refs.addruleForm.resetFields()
    },
    // 重置修改用户表单
    elDialogState () {
      this.$refs.ediFormRef.resetFields()
    },
    // 添加用户
    addUsers () {
      this.$refs.addruleForm.validate(async value => {
        console.log(value)
        if (!value) return false
        try {
          const res = await addUserForm(this.addForm)
          console.log(res)
          this.$message.success('添加用户成功')
          this.getuserInfo()
          // 添加成功后关闭对话框
          this.addUserVisible = false
        } catch (err) {
          console.log(err)
          this.$message.error('添加用户失败')
        }
      })
    },
    // 修改用户信息的展现
    async isShowEdit (id) {
      this.elDialogVisible = true
      console.log(id)
      try {
        const res = await getUsersId(id)
        console.log(res)
        this.ediForm = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    // 提交修改用户信息
    eldPutaddUser () {
      this.$refs.ediFormRef.validate(async value => {
        console.log(value)
        if (!value) return false
        try {
          const res = await putUserInfo(this.ediForm.id, this.ediForm)
          console.log(res)
          this.getuserInfo()
          this.elDialogVisible = false
          this.$message.success('修改用户信息成功')
        } catch (err) {
          this.$message.error('修改用户信息失败')
        }
      })
    },
    // 获取删除用户的id
    async delUserbyId (id) {
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
        const res1 = await deleteUsers(id)
        console.log(res1)
        this.$message.success('删除用户成功')
        this.getuserInfo()
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
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.el-row {
  margin-bottom: 12px;
}
.supbtn {
  margin-left: 18px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
