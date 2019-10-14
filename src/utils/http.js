import axios from 'axios'
import router from '@/router/index'
import { Message } from 'element-ui'
import { removeToken, getToken } from '@/utils/auth'
import { getLanguage } from './i18n'

axios.defaults.baseURL = process.env.BASE_API
// 全局设置超时时间
axios.defaults.timeout = 10 * 1000
export const HTTP = axios.create({

})

// request拦截
HTTP.interceptors.request.use(config => {
  // 在发送请求之前做某事
  config.headers = {
    'Authorization': getToken(),
    'Accept-Language': getLanguage() || 'zh_CN'
  }
  console.log(config.url)
  return config
}, error => {
  // 请求错误时做某事
  console.log(error)
  return Promise.reject(error)
})

// response拦截
HTTP.interceptors.response.use(response => {
  // 处理响应数据
  if (response.status === 200) {
    return Promise.resolve(response)
  } else if (response.status === 401 || response.status === 403 || response.status === 203) {
    removeToken()
    router.replace({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath, random: Math.random() }// 登录成功后跳入浏览的页面
    })
    // 重定向到首页
    Message({
      showClose: true,
      message: response.message || 'error',
      type: 'error',
      duration: 1000,
      onClose: () => {

      }
    })
  } else {
    return Promise.reject(response)
  }
},
error => {
  // 处理响应失败
  return Promise.reject(error)
}
)

// get请求
export function $get(url, params) {
  return new Promise((resolve, reject) => {
    HTTP.get(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err.data)
    })
  }
  )
}

// post请求
export function $post(url, params) {
  return new Promise((resolve, reject) => {
    // qs.stringify(params)
    HTTP.post(url, params)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

// delete请求
export function $delete(url, params) {
  return new Promise((resolve, reject) => {
    HTTP.delete(url, { params })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

// patch 请求
export function $patch(url, params) {
  return new Promise((resolve, reject) => {
    // qs.stringify(
    HTTP.patch(url, params)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export default HTTP
