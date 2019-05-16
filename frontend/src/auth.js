import Cookies from 'js-cookie'

const TokenKey = 'token'
const UserKey = 'user'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  Cookies.set(TokenKey, token)
}

export function removeToken () {
  Cookies.remove(TokenKey)
}

export function getUser () {
  return Cookies.get(UserKey)
}

export function setUser (user) {
  Cookies.set(UserKey, user)
}

export function removeUser () {
  Cookies.remove(UserKey)
}

export function removeAll () {
  removeToken()
  removeUser()
}