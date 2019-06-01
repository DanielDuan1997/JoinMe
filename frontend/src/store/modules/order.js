import apiOrder from '@/api/order'
import {getUser, getToken} from '@/static/sessionStorage'

const state = {}

const getters= {}

const mutations = {}

const actions = {
  startOrder ({commit}, payload) {
    apiOrder.start(
      getToken(),
      getUser(),
      payload.from,
      payload.to,
      payload.datetime,
      payload.location,
      payload.callback
    )
  },
  getSelfOrder ({commit}, payload) {
    apiOrder.getSelf(
      getToken(),
      getUser(),
      payload.cbSuccess,
      payload.cbFail
    )
  },
  getOngoingOrder ({commit}, payload) {
    apiOrder.getOngoing(
      getToken(),
      getUser(),
      payload.cbSuccess,
      payload.cbFail
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
