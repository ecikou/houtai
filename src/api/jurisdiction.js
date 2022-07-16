import request from '@/utils/request'
import store from '@/store'
export const getPowerList = (list) => {
  return request({
    url: 'rights/list',
    method: 'get',
    headers: {
      Authorization: store.state.user.token
    }
  })
}
