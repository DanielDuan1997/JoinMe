// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import theme from 'muse-ui/lib/theme'

import myheader from '@/components/myheader'
import mylogo from '@/components/mylogo'
import mycarpool from '@/components/mycarpool'
import myindividual from '@/components/myindividual'
import mylist from '@/components/mylist'
import mywaiting from '@/components/mywaiting'

import '@/permission'

theme.add('amber', {
  primary: '#ffc107',
  secondary: '#4db6ac',
  success: '#03a9f4',
  warning:  '#f44336'
}, 'light')

theme.use('amber')

Vue.config.productionTip = false
Vue.use(MuseUI)

Vue.component('myheader', myheader)
Vue.component('mylogo', mylogo)
Vue.component('mycarpool', mycarpool)
Vue.component('myindividual', myindividual)
Vue.component('mylist', mylist)
Vue.component('mywaiting', mywaiting)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
