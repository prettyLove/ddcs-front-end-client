import axios from 'axios'
import router from '@/router/index'
import { Message, MessageBox } from 'element-ui'
import { removeToken, getToken, setToken } from '@/utils/auth'
import { getLanguage } from './i18n'

axios.defaults.baseURL = process.env.BASE_API
// 全局设置超时时间
axios.defaults.timeout = 10 * 1000
export const HTTP = axios.create({})

// request拦截
HTTP.interceptors.request.use(config => {
  // 在发送请求之前做某事
  config.headers = {
    'Authorization': getToken() || '',
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
    console.log(response)
    if (response.status === 200) {

      let flag = response.headers.refreshtoken
      let token = response.headers.authorization
      if (flag == 'true') {
        setToken(token)
      }
      return Promise.resolve(response)
    } else if (response.status === 401 || response.status === 203) {
      Message({
        showClose: true,
        message: response.message || 'error',
        type: 'error',
        duration: 1000,
        onClose: () => {

        }
      })
      MessageBox.confirm('您没有此权限, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if (error.response.data.messageCode.indexOf('无权访问(UnauthenticatedException)')>-1){
          // 重定向到首页
          removeToken()
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath, random: Math.random() }// 登录成功后跳入浏览的页面
          })
        }

      }).catch((action) => {
        if (action === 'cancel') {
          // 重定向到首页
          removeToken()
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath, random: Math.random() }// 登录成功后跳入浏览的页面
          })
        }else if(action === 'close'){
          console.log('关闭确认框')
        }

      })
    } else if (response.status === 403) {
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
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          console.log(error.data)
          console.log(error.response.data.messageCode)
          MessageBox.confirm('您没有此权限, 是否继续?', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            if (error.response.data.messageCode.indexOf('无权访问(UnauthenticatedException)')>-1){
              // 重定向到首页
              removeToken()
              router.replace({
                path: '/login',
                query: { redirect: router.currentRoute.fullPath, random: Math.random() }// 登录成功后跳入浏览的页面
              })
            }

          }).catch((action) => {
            if (action === 'cancel') {
              // 重定向到首页
              removeToken()
              router.replace({
                path: '/login',
                query: { redirect: router.currentRoute.fullPath, random: Math.random() }// 登录成功后跳入浏览的页面
              })
            }else if(action === 'close'){
              console.log('关闭确认框')
            }

          })
          break

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          // 重定向到首页
          Message({
            showClose: true,
            message: error.response.data.messageCode || '登录过期，请重新登录',
            type: 'error',
            duration: 1000,
            onClose: () => {

            }
          })
          // 清除token
          removeToken()
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: { redirect: router.currentRoute.fullPath, random: Math.random() }// 登录成功后跳入浏览的页面
            })
          }, 1000)
          break

        // 404请求不存在
        case 404:
          Message({
            showClose: true,
            message: error.response.data.messageCode || '请求地址无效',
            type: 'error',
            duration: 1000,
            onClose: () => {

            }
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          Message({
            showClose: true,
            message: '网络请求不存在',
            type: 'error',
            duration: 1000,
            onClose: () => {
              // 清除token
              removeToken()
              // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
              setTimeout(() => {
                router.replace({
                  path: '/login',
                  query: { redirect: router.currentRoute.fullPath, random: Math.random() }// 登录成功后跳入浏览的页面
                })
              }, 1000)
            }
          })
      }
      return Promise.reject(error.response)
    } else {
      return Promise.reject(error)
    }
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
