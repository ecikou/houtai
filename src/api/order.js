import request from '@/utils/request'
import store from '@/store'
export const getOrderList = (orderList) => {
  return request({
    url: 'orders',
    method: 'get',
    params: orderList,
    headers: {
      Authorization: store.state.user.token
    }
  })
}
