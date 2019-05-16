import router from './router'
import { getUser } from '@/auth'

const whiteList = ['/login', '/signup']

router.beforeEach((to, from, next) => {
  if (getUser()) {
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