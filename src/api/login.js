import { $get, $post } from '../utils/http'
import { api } from './api'

// 用户登录
export const userLogin = params => $post(api.homeRouter.login, params)
// 用户退出
export const userLogout = params => $get(api.homeRouter.logout, params)
// 获得用户信息by token
export const getUserByToken = params => $get(api.homeRouter.getUserByToken, params)

// 获得用户信息by token
export const getSysMenusByToken = params => $get(api.homeRouter.getSysMenusByToken, params)
