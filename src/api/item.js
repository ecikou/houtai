import request from '@/utils/request'
import store from '@/store'
// 商品列表
export const getItemList = (goodsList) => {
  return request({
    url: 'goods',
    method: 'get',
    params: goodsList,
    headers: {
      Authorization: store.state.user.token
    }
  })
}
// 商品参数
export const getItemParams = (classList) => {
  return request({
    url: 'categories',
    method: 'get',
    params: classList,
    headers: {
      Authorization: store.state.user.token
    }
  })
}
