import apiUser from '../../api/user'
import {setToken, setUser, removeToken, removeUser, getUser, getToken} from '@/auth'
import {setLocal, clearStorage} from '@/storage'

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
      response => {
        response = JSON.parse(response)
        setLocal({"rate": response.rate})
        setUser(payload.name)
        setToken(response.token)
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
    clearStorage()
    apiUser.logOut(user, cookie)
    callback()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}