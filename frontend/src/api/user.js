const SERVER_ADDRESS = 'http://0.0.0.0:5000'
//'http://118.25.153.8:5000'

export default {
  login (name, password, cbSucceed, cbFail) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('password', password)
    console.log(formData.get("name"))
    let opts = {
      method: 'POST',
      body: formData
    }
    console.log(SERVER_ADDRESS + '/login')
    console.log(opts)
    fetch(SERVER_ADDRESS + '/login', opts)
      .then(response => response.text())
      .then(text => {
        console.log(text)
        if (text === "password wrong") 
          cbFail("密码错误")
        else if (text === "user not exists")
          cbFail("用户不存在")
        else
          cbSucceed(text)
      })
      .catch(response => {
        cbFail("无法连接服务器")
      })
  }
}
