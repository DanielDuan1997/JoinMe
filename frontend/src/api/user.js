const SERVER_ADDRESS = 'http://0.0.0.0:5000'
//'http://118.25.153.8:5000'

export default {
  login (name, password, cbSucceed, cbFail) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('password', password)
    let opts = {
      method: 'POST',
      body: formData
    }
    fetch(SERVER_ADDRESS + '/login', opts)
      .then(response => response.text())
      .then(text => {
        if (text === "password wrong") 
          cbFail("密码错误")
        else if (text === "user not exists")
          cbFail("用户不存在")
        else
          cbSucceed(text)
      })
      .catch(response => cbFail("无法连接服务器"))
  },
  signUp (name, password, callBack) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('password', password)
    let opts = {
      method: 'POST',
      body: formData
    }
    fetch(SERVER_ADDRESS + '/signup', opts)
      .then(response => {
        if (response.status === 200)
          callBack("success")
        else
          callBack("用户已存在")
      })
      .catch(response => {
        callBack("无法连接服务器")
      })
  },
  logOut (name, cookie) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('cookie', cookie)
    let opts = {
      method: 'POST',
      body: formData
    }
    fetch(SERVER_ADDRESS + '/logout', opts)
      .catch(response => console.log(response))
  }
}
