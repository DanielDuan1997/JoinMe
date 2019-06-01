import router from '@/router'
import {getUser} from '@/static/sessionStorage'


//-------------------------- need to delete ------------------------
// import {setUser, setToken, clearSession} from '@/static/sessionStorage'
// import {setLocal} from '@/static/localStorage'
//-------------------------- need to delete ------------------------

const whiteList = ['/login', '/signup']

router.beforeEach((to, from, next) => {

//-------------------------- need to delete ------------------------
  // if (getUser() == null) {
  //   let md5 = require('md5')
  //   let user = 'niabbf'
  //   let password = md5('niabbfniabbf')
  //   let formData = new FormData()
  //   formData.append('user', user)
  //   formData.append('password', password)
  //   let opts = {
  //     heads: {'content-type' : 'application/x-www-form-urlencoded'},
  //     method: 'POST',
  //     body: formData
  //   }
  //   setUser(user)
  //   fetch('http://0.0.0.0:5000/login', opts)
  //     .then(response => response.text())
  //     .then(response => {
  //       response = JSON.parse(response)
  //       setToken(response.token)
  //       setLocal({'rate': response.rate, 'nickname': response.nickname})
  //     })
  //     .catch(response => {console.log('server is not running'); clearSession()})
  // }
//-------------------------- need to delete ------------------------



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
