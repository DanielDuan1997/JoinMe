//import apiOrder from '@/api/order'
import {getUser} from '@/auth'

const state = {}

const getters= {}

const mutations = {}

const actions = {
  startOrder ({commit}, payload) {
    setTimeout(() => {
      payload.callback(500)
    }, 2000)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}