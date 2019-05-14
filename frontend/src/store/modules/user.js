import apiUser from '../../api/user'
import { setToken, setUser, removeToken, removeUser, getUser, getToken } from '@/auth'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  loginUser({commit}, payload) {
    let md5 = require('md5')
    payload.password = md5(payload.name + payload.password)
    apiUser.login(
      payload.name,
      payload.password,
      cookie => {
        setToken(cookie)
        setUser(payload.name)
        payload.callback('success')
      },
      str => payload.callback(str)
    )
  },
  signUp({commit}, payload) {
    let md5 = require('md5')
    payload.password = md5(payload.name + payload.password)
    apiUser.signUp(
      payload.name,
      payload.password,
      payload.callback
    )
  },
  logOut({commit}, callback) {
    let user = getUser()
    let cookie = getToken()
    removeUser()
    removeToken()
    callback()
    apiUser.logOut(user, cookie)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}