const SERVER_ADDRESS = 'http://0.0.0.0:5000'

export default {
  start (user, from, to, datetime, callback) {
    let formData = new FormData()
    formData.append('user', user)
    formData.append('from', from)
    formData.append('to', to)
    formData.append('datetime', datetime)
    let opts = {
      method: 'POST',
      body: formData
    }
    fetch(SERVER_ADDRESS + '/startorder', opts)
      .then(response => callback(response.status))
      .catch(response => callback(response.status))
  }
}
