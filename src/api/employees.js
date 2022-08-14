import request from '@/utils/request'

export function getemployeesapi() {
  return request({
    url: '/sys/user/simple'
  })
}
export function getemployeeslistapi(params) {
  return request({
    url: '/sys/user',
    params
  })
}
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
export function importEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}
