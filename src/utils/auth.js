import Cookies from 'js-cookie'

const TokenKey = 'cbw-Token'

export function getToken (tokenName) {
  return Cookies.get(TokenKey)
}

export function setToken (agencyToken) {
  return Cookies.set(TokenKey, agencyToken)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function setbussinesToken (token) {
  return Cookies.set('business-Token', token)
}