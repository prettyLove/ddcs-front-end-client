const apiBasePath = ''
export const api = {
  // 主页路由
  homeRouter: {
    login: apiBasePath + '/login', /* 登录*/
    logout: apiBasePath + '/logout', /* 登出*/
    getUserByToken: apiBasePath + '/sysUser/getUserByToken', /* 登出*/
    getSysMenusByToken: apiBasePath + '/getSysMenusByToken' // 通过token获得当前用户的权限菜单
  },
  MenuRouter:{
     get: apiBasePath+ '/menus/tree',
     build: apiBasePath+ '/menus/build'
  },
  SystemUserRouter:{
    get: apiBasePath+'/sysUser/',
    delete: apiBasePath+'/sysUser/'
  }
}

export default {
  install: function(vm) {
    vm.prototype.$api = api
  }
}
