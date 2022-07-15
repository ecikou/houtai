import request from '@/utils/request'
import store from '@/store'
export const jurisdIction = (list) => {
  return request({
    url: `rights/${list}`,
    method: 'get',
    headers: {
      Authorization: store.state.user.token
    }
  })
}
