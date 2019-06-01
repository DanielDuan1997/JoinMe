import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/HomePage'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import InitiateOrder from '@/components/InitiateOrder'
import History from '@/components/History'
import Ongoing from '@/components/Ongoing'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage,
      alias: '/homepage'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/initiateorder',
      name: 'initiateorder',
      component: InitiateOrder
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/ongoing',
      name: 'ongoing',
      component: Ongoing
    }
  ]
})
