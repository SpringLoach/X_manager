import {request} from '@/network/request.js'

export function getLogin(loginData) {
  return request({
    url: '/login',
    method: 'post',
    params: loginData
  })
}