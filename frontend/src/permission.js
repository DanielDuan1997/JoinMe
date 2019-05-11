import router from './router'
import { getToken } from '@/auth'

const whiteList = ['/login', '/signup']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})