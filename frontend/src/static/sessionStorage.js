const storage = window.sessionStorage

export function setSession (payload) {
  storage.setItem('token', payload.token)
  storage.setItem('user', payload.user)
}


//-------------------------- need to delete ------------------------
// export function setToken (token) {
//   storage.setItem('token', token)
// }

// export function setUser (user) {
//   storage.setItem('user', user)
// }
//-------------------------- need to delete ------------------------

export function getToken () {
  return storage.getItem('token')
}

export function getUser () {
  return storage.getItem('user')
}

export function clearSession (payload) {
  storage.clear()
}
