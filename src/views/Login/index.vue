<template>
  <div class="login-container">
    <div class="form-box">
      <el-form :model="loginForm" :rules="rules" ref="loginfrom">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-s-custom"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-login">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapState } from 'vuex'
export default {
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.loginFrom.resetFields()
    },
    async login () {
      try {
        await this.$refs.loginfrom.validate()
        try {
          const res = await login(this.loginForm)
          console.log(res)
          this.$store.commit('setUser', res.data.data)

          if (this.user && this.user.token) {
            console.log(111)
            window.localStorage.setItem('token', this.user.token)
            return this.$router.push('/home')
          } else {
            this.$message.error('登录失败,用户名或者密码错误')
          }
          console.log(res)
        } catch (err) {
          console.log(err)
        }
        console.log('校验通过')
      } catch (err) {
        console.log(err)
        this.$message.error('校验失败')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  background-color: #2b4b6b;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    width: 450px;
    height: 240px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px 15px;
    box-sizing: border-box;
  }
  .btn-login {
    text-align: right;
  }
}
</style>
