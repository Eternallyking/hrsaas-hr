import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function getUserDetail(id) {
  return request({
    url: '/sys/user/' + id
  })
}
