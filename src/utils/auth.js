import Cookies from 'js-cookie'

const TokenKey = 'DDCS-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setTokenExpiresByMinute(token,minute) {
  let seconds = 60;
  let expires = new Date(new Date() * 1 + seconds * 1000*minute);
  return Cookies.set(TokenKey, token, { expires: expires }); //  N分钟后失效
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
