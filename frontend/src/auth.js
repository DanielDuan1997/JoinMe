import Cookies from 'js-cookie'

const UserKey = 'user'
const Session = 'session'

export function getUser () {
  return Cookies.get(UserKey)
}

export function setUser (user) {
  Cookies.set(UserKey, user)
}

export function removeAll () {
  Cookies.remove(Session)
  Cookies.remove(UserKey)
}
