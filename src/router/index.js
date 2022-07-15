import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: '/userList', component: () => import('@/views/Home/components/UserList.vue') },
      { path: '/roles', component: () => import('@/views/quanxian/roles/index.vue') },
      { path: '/permissions', component: () => import('@/views/quanxian/jurisdiction/index.vue') },
      { path: '/itemlist', component: () => import('@/views/item/itemlist.vue') },
      { path: '/classif', component: () => import('@/views/item/classification.vue') },
      { path: '/itemafc', component: () => import('@/views/item/itemafc.vue') },
      { path: '/order', component: () => import('@/views/order/index.vue') },
      { path: '/datalist', component: () => import('@/views/datastatistics/index.vue') }

    ]
  }
]

const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/Login') return next()
//   const token = window.sessionStorage.getItem('token')
//   if (!token) return next('/Login')
//   next()
// })
export default router
