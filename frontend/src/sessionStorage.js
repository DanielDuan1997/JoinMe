const store = window.sessionStorage

export function setSession(payload) {
  store.setItem('token', payload.token)
  store.setItem('user', payload.user)
}

export function getToken() {
  return store.getItem('token')
}

export function getUser () {
  return store.getItem('user')
}

export function clearSession(payload) {
  store.clear()
}
