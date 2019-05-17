import apiUser from '../../api/user'
import {setSession, clearSession} from '@/sessionStorage'
import {setLocal, clearLocal} from '@/localStorage'

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
        setSession({'token': response.token, 'user': payload.user})
        setLocal({'rate': response.rate, 'nickname': response.nickname})
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
    clearSession()
    clearLocal()
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
