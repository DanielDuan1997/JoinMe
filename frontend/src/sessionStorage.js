const storage = window.sessionStorage

export function setSession(payload) {
  storage.setItem('token', payload.token)
  storage.setItem('user', payload.user)
}

export function getToken() {
  return storage.getItem('token')
}

export function getUser () {
  return storage.getItem('user')
}

export function clearSession(payload) {
  storage.clear()
}
