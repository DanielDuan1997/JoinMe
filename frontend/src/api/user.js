const SERVER_ADDRESS = 'http://0.0.0.0:5000'
//'http://118.25.153.8:5000'

import axios from 'axios'

export default {
  login (user, password, cbSucceed, cbFail) {
    axios.post(SERVER_ADDRESS + '/login', {
      user: user,
      password: password
    })
      .then(response => cbSucceed(response.data))
      .catch(error => {
        let status = error.response.status
        let notice = error.response.data
        if (status === 401){
          if (notice === "user not exists")
            cbFail("用户不存在")
          else
            cbFail("密码错误")
        } else
          cbFail("无法连接服务器")
      })
  },
  signUp (user, password, callBack) {
    console.log(user, password)
    axios.post(SERVER_ADDRESS + '/signup', {
      user: user,
      password: password
    })
      .then(response => callBack("success"))
      .catch(error => {
        if (error.response.status === 401)
          callBack("用户已存在")
        else
          callBack("无法连接服务器")
      })
  }
}
