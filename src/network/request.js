import axios from 'axios'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(config) {
  const instance = axios.create({
      baseURL: 'http://timemeetyou.com:8889/api/private/v1',
      timeout: 5000,
  })
    
  /* 拦截器 */
  instance.interceptors.response.use(res => {
    NProgress.done()
    return res.data
  }, err => {
    return err
  }) 
  instance.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token');
    NProgress.start()
    return config;
  }, err => {
    return err;
  }) 

  return instance(config)
}