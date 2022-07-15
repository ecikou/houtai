<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
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
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                @change="userStarChange(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <!--操作区域  -->
          <el-table-column prop="address" label="操作" width="180px">
            <template slot-scope="">
              <el-row>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                ></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
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
        <!-- 对话框 -->
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
            <el-button type="primary" @click="addUserVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </template>
    </el-card>
  </div>
</template>

<script>
import { getInfo, putUser } from '@/api/user'
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
      // 对话框显示隐藏
      addUserVisible: false,
      addForm: {
        username: '',
        password: '',
        emial: '',
        mobile: ''
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
    closeDialog () {
      this.$refs.addruleForm.resetFields()
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
