import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  actions: {
    userStoreInit: ({ commit, state }, user) => {
      console.log('userStoreInit--------------------------------')
      // 加载用户信息
      store.dispatch('userInit', user)
      // 加载权限菜单
      // store.dispatch('loadSystemConfigMap')
    }
  },
  getters
})

export default store
