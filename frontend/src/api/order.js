const SERVER_ADDRESS = 'http://0.0.0.0:5000'

import axios from 'axios'

export default {
  start (token, user, from, to, datetime, location, callback) {
    axios.post(SERVER_ADDRESS + '/startorder', {
      token: token,
      user: user,
      from: from,
      to: to,
      datetime: datetime,
      location: location
    })
      .then(response => callback(response.status))
      .catch(response => callback(response.status))
  },
  getSelf (token, user, cbSuccess, cbFail) {
    axios.post(SERVER_ADDRESS + '/getselforder', {
        token: token,
        user: user
    })
      .then(response => {
        if (response.status == 200)
          cbSuccess(response.data)
        else
          cbFail(response.status)
      })
      .catch(response => {console.log('error');cbFail(response)})
  }
}
