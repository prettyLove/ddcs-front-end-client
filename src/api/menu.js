import { $get, $post } from '../utils/http'
import { api } from './api'
// 获取所有的菜单树
export const getMenusTree = params => $get(api.MenuRouter.get, params)
//获得前端菜单数据结构
export const buildMenus =params => $get(api.MenuRouter.build,params)
