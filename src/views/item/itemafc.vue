<template>
<div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/newhome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card"> </el-card>
</div>
</template>

<script>
export default {
  created () {},
  data () {
    return {}
  },
  methods: {},
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
