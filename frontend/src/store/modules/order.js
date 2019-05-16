import apiOrder from '@/api/order'
import {getUser, getToken} from '@/auth'

const state = {}

const getters= {}

const mutations = {}

const actions = {
  startOrder ({commit}, payload) {
    apiOrder.start(
      getUser(),
      getToken(),
      payload.from,
      payload.to,
      payload.datetime,
      payload.callback
    )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
