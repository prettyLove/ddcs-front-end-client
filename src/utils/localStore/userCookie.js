import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const key_user = 'DDCS-user'
const key_username = 'DDCS-username'
const key_password = 'DDCS-password'

const exdays = 7 // 默认保存7天
const encryption = 'ddcs' // 加密盐  后续考虑采用服务器动态生成的方式

export function getUser() {
  return Cookies.get(key_user)
}
// 获取解密后账号信息
export function getDecryptUser() {
  const bytes = CryptoJS.AES.decrypt(Cookies.get(key_user), encryption)
  return bytes.toString(CryptoJS.enc.Utf8)
}
export function setUser(user, exday) {
  // 加密账号密码
  const localStorageUser = CryptoJS.AES.encrypt(JSON.stringify(user) + '', encryption).toString()
  if (exday === undefined || exday === null) {
    Cookies.set(key_user, localStorageUser, { expires: exdays })
  } else if (exday === 0) {
    Cookies.set(key_user, localStorageUser)
  }
}

export function removeUser() {
  return Cookies.remove(key_user)
}

// 管理账号=================================================
export function getUserName() {
  return Cookies.get(key_username)
}

// 获得解密后账号
export function getDecryptUserName() {
  const bytes = CryptoJS.AES.decrypt(Cookies.get(key_username), encryption)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export function setUserName(username) {
  // 加密账号密码
  const localStorageUserName = CryptoJS.AES.encrypt(username + '', encryption).toString()
  Cookies.set(key_username, localStorageUserName, { expires: exdays })
}

export function removeUserName() {
  return Cookies.remove(key_username)
}

// 管理密码==============================================
export function getPassWord() {
  return Cookies.get(key_password)
}
// 获得解密后密码
export function getDecryptPassWord() {
  const bytes = CryptoJS.AES.decrypt(Cookies.get(key_password), encryption)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export function setPassWord(password) {
  // 加密账号密码
  const localStorageUserPassWord = CryptoJS.AES.encrypt(password + '', encryption).toString()
  Cookies.set(key_password, localStorageUserPassWord, { expires: exdays })
}

export function removePassWord() {
  return Cookies.remove(key_password)
}
