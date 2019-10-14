const apiBasePath = ''
export const api = {
  // 主页路由
  homeRouter: {
    login: apiBasePath + '/signin', /* 登录*/
    logout: apiBasePath + '/loginOut', /* 登出*/
    getUserByToken: apiBasePath + '/getUserByToken', /* 登出*/
    getSysMenusByToken: apiBasePath + '/getSysMenusByToken' // 通过token获得当前用户的权限菜单
  }
}

export default {
  install: function(vm) {
    vm.prototype.$api = api
  }
}
