const SERVER_ADDRESS = 'http://118.25.153.8:5000'

export default {
  login (name, password, cbSucceed, cbFail) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('password', password)
    let opts = {
      methods: 'POST',
      body: formData
    }
    fetch(SERVER_ADDRESS + '/login', opts)
      .then(response => response.text())
      .then(text => {
        if (text === "password wrong") 
          cbFail("密码错误")
        else if (text === "user not exist")
          cbFail("用户不存在")
        else
          cbSucceed(text)
      })
      .catch(response => {
        cbFail("无法连接服务器")
      })
  }
}
