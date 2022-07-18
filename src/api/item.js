import request from '@/utils/request'
import store from '@/store'
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
