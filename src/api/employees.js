import request from '@/utils/request'

export function getemployeesapi() {
  return request({
    url: '/sys/user/simple'
  })
}
