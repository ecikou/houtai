import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000
})
// request.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   if (store.state.user && store.state.data.token) {
//     config.headers = {
//       Authorization: 'Bearer ' + store.state.data.token
//     }
//   }
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// // 添加响应拦截器
// request.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response
// }, async function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })
export default request