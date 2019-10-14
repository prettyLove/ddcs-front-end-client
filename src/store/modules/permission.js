import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 通过meta.path判断是否与当前用户权限匹配
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].url === route.path) {
      return true
    }
  }
  return false
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param menus
 */
export function filterAsyncRoutes(routes, menus) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menus)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    // 传入从后台获取的权限菜单
    GenerateRoutes({ commit }, menus) {
      return new Promise(resolve => {
        console.log('处理menu' + JSON.stringify(menus))
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, menus)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

export default permission
