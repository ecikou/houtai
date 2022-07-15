import request from '@/utils/request'
import store from '@/store'
export const login = ({ username, password }) => {
  return request({
    url: 'login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

export const getInfo = (usersInfo) => {
  return request({
    url: 'users',
    method: 'GET',
    params: usersInfo,
    headers: {
      Authorization: store.state.user.token
    }
  })
}

// 角色列表
export const getRoles = () => {
  return request({
    url: 'roles',
    method: 'GET',
    headers: {
      Authorization: store.state.user.token
    }
  })
}
// 修改用户状态
export const putUser = (uid, data) => {
  return request({
    url: `users/${uid}/state/${data}`,
    method: 'PUT',
    headers: {
      Authorization: store.state.user.token
    }
  })
}
