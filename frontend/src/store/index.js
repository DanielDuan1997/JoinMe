import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import pub from './modules/public'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    pub
  }
})
