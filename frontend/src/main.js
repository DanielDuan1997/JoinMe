// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import theme from 'muse-ui/lib/theme'

import Logo from '@/components/Logo'
import Carpool from '@/components/Carpool'
import Individual from '@/components/Individual'
import MyList from '@/components/MyList'

import '@/permission'

theme.add('amber', {
  primary: '#ffc107',
  secondary: '#4db6ac',
  success: '#03a9f4',
  warning:  '#e91e63'
}, 'light')

theme.use('amber')

Vue.config.productionTip = false
Vue.use(MuseUI)

Vue.component('logo', Logo)
Vue.component('carpool', Carpool)
Vue.component('individual', Individual)
Vue.component('mylist', MyList)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
