import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth'
import { buildMenus } from './api/menu'
import Config from '@/config'
import { filterAsyncRouter } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.webName
  }
  NProgress.start() // start progress bar
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          let flag = res.data
          if (res.code == -1 && flag == 'refreshToken') {
            next({ path: '/redirect' + to.path })
          } else {
            // 动态路由，拉取菜单
            loadMenus(next, to)
          }
        }).catch((err) => {
          Message.error('用户信息过期，重新登录');
          store.dispatch('LogOutNoToken').then(() => {
            setTimeout(function() {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            },300)
         })
        })
        // 登录时未拉取 菜单，在此处拉取
      } else if (store.getters.loadMenus) {
        // 修改成false，防止死循环
        store.dispatch('updateLoadMenus').then(res => {
        })
        loadMenus(next, to)
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    if (res.code == 0) {
      const asyncRouter = filterAsyncRouter(res.data)
      //asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
      console.log('生成动态菜单')
      //console.log(asyncRouter)
      store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
        router.addRoutes(asyncRouter) // 动态添加可访问路由表
        console.log(asyncRouter)
        next({ ...to, replace: true })
      })
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
