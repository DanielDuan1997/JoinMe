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