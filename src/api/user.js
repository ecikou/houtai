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

// 添加用户
export const addUserForm = (addForm) => {
  return request({
    url: 'users',
    method: 'POST',
    data: addForm,
    headers: {
      Authorization: store.state.user.token
    }
  })
}

// 根据ID查询用户的信息
export const getUsersId = (uid) => {
  return request({
    url: `users/${uid}`,
    method: 'GET',
    headers: {
      Authorization: store.state.user.token
    }
  })
}
// 提交修改用户信息
export const putUserInfo = (uid, ediForm) => {
  return request({
    url: `users/${uid}`,
    method: 'PUT',
    data: ediForm,
    headers: {
      Authorization: store.state.user.token
    }
  })
}
// 根据ID删除用户
export const deleteUsers = (uid) => {
  return request({
    url: `users/${uid}`,
    method: 'DELETE',
    headers: {
      Authorization: store.state.user.token
    }
  })
}
