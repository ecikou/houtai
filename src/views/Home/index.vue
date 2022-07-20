<template>
  <el-container class="container">
    <el-header>
      <div>
        <img src="" alt="" style="">
        <span>UserBackstage</span>
      </div>
      <el-button @click="outLogin" type="warning" size="small">退出</el-button>
    </el-header>
    <el-container>

      <el-aside width="200px">
 
        <el-menu
          router
          background-color="#b5c8c8"
          text-color="#fff"
          unique-opened
        >
          <el-submenu index="1">

            <template #title>
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
              </template>
            <el-menu-item index="userlist">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <i class="el-icon-set-up"></i>
              <span>权限管理</span>
              </template>
            <el-menu-item index="roles">角色列表</el-menu-item>
            <el-menu-item index="permissions">权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template #title>
              <i class="el-icon-s-cooperation"></i>
              <span>商品管理</span>
              </template>
            <el-menu-item index="itemlist">商品列表</el-menu-item>
            <el-menu-item index="classif">分类参数</el-menu-item>
            <el-menu-item index="itemafc">商品分类</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template #title>
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
              </template>
            <el-menu-item index="order">订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template #title>
              <i class="el-icon-s-platform"></i>
              <span>数据统计</span>
              </template>
            <el-menu-item index="datalist">数据报表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () { },
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    // async outLogin () {
    //   try {
    //     await this.$dialog.confirm({ message: '确定退出登录吗？' })
    //     this.$store.commit('setUser', {})
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    outLogin () {
      window.sessionStorage.clear()
      // window.location.clear()
      this.$store.commit('setUser', {})
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100%;
  .el-button {
    background-color: pink;

  }
  height: 100vh;
  .el-header {
    display: flex;
    font-size: 20px;
    color: pink;
    background-color: #6b7b86;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
  }
  .el-aside {
    background-color: #b5c8c8;
  }
  .el-main {
    background-color: #eaedf1;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
