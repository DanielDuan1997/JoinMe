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
      .catch(error => callback(error.response.status))
  },
  getSelf (token, user, cbSuccess, cbFail) {
    axios.post(SERVER_ADDRESS + '/getselforder', {
      token: token,
      user: user
    })
      .then(response => cbSuccess(response.data))
      .catch(error => {
        if (error.response === undefined)
          cbFail(404)
        else
          cbFail(error.response.status)
      })
  },
  getOngoing (token, user, cbSuccess, cbFail) {
    axios.post(SERVER_ADDRESS + '/getongoing', {
      token: token,
      user: user
    })
      .then(response => cbSuccess(response.data))
      .catch(error => {
        if (error.response === undefined)
          cbFail(404)
        else
          cbFail(error.response.status)
      })
  },
  quit (token, user, task_id, cbSuccess, cbFail) {
    axios.post(SERVER_ADDRESS + '/quit', {
      token: token,
      user: user,
      task_id: task_id
    })
      .then(response => cbSuccess(response.data))
      .catch(error => {
        if (error.response === undefined)
          cbFail(404)
        else
          cbFail(error.response.status)
      })
  },
  getJoinable (token, user, cbSuccess, cbFail) {
    axios.post(SERVER_ADDRESS + '/getjoinable', {
      token: token,
      user: user
    })
      .then(response => cbSuccess(response.data))
      .catch(error => {
        if (error.response === undefined)
          cbFail(404)
        else
          cbFail(error.response.status)
      })
  },
  join (token, user, task_id, cbSuccess, cbFail) {
    axios.post(SERVER_ADDRESS + '/join', {
      token: token,
      user: user,
      task_id: task_id
    })
      .then(response => cbSuccess())
      .catch(error => {
        if (error.response === undefined)
          cbFail(404)
        else
          cbFail(error.response.status)
      })
  }
}
