import apiUser from '../../api/user'
import { setToken, setUser, removeToken } from '@/auth'

const state = {
  name: null,
  password: null
}

const getters = {}

const mutations = {
  setName (state, name) {
    state.name = name
  },
  setPassword (state, password) {
    state.password = password
  }
}

const actions = {
  loginUser({commit}, payload) {
    let md5 = require("md5")
    payload.password = md5(payload.name + payload.password)
    apiUser.login(
      payload.name,
      payload.password,
      cookie => {
        commit('setName', payload.name)
        commit('setPassword', payload.password)
        setToken(cookie)
        setUser(payload.name)
        payload.callback('success')
      },
      str => {
        console.log(str)
        payload.callback(str)
      }
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}