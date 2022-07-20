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
// 删除权限管理中的角色
export const deletePowerUser = (id) => {
  return request({
    url: `roles/${id}`,
    method: 'delete',
    headers: {
      Authorization: store.state.user.token
    }
  })
}
// 删除权限管理中的权限
export const delRolesPower = (roleId, rightId) => {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete',
    headers: {
      Authorization: store.state.user.token
    }
  })
}
