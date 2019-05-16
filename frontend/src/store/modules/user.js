import apiUser from '../../api/user'
import {setUser, getUser, removeAll} from '@/auth'
import {setLocal, clearStorage} from '@/storage'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  loginUser({commit}, payload) {
    let md5 = require('md5')
    payload.password = md5(payload.user + payload.password)
    apiUser.login(
      payload.user,
      payload.password,
      response => {
        response = JSON.parse(response)
        setLocal({"rate": response.rate})
        setUser(payload.user)
        payload.callback('success')
      },
      str => payload.callback(str)
    )
  },
  signUp({commit}, payload) {
    let md5 = require('md5')
    payload.password = md5(payload.user + payload.password)
    apiUser.signUp(
      payload.user,
      payload.password,
      payload.callback
    )
  },
  logOut({commit}, callback) {
    let user = getUser()
    removeAll()
    clearStorage()
    apiUser.logOut(user)
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