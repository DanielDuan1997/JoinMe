const SERVER_ADDRESS = 'http://0.0.0.0:5000'

export default {
  start (token, user, from, to, datetime, callback) {
    let formData = new FormData()
    formData.append('token', token)
    formData.append('user', user)
    formData.append('from', from)
    formData.append('to', to)
    formData.append('datetime', datetime)
    let opts = {
      heads: {'content-type' : 'application/x-www-form-urlencoded'},
      method: 'POST',
      body: formData
    }
    fetch(SERVER_ADDRESS + '/startorder', opts)
      .then(response => callback(response.status))
      .catch(response => callback(response.status))
  }
}
