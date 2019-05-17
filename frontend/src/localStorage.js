const storage = window.localStorage

export function setLocal (payload) {
  storage.setItem('rate', payload.rate)
  storage.setItem('nickname', payload.nickname)
}

export function getRate () {
  return storage.getItem('rate')
}

export function getNickname () {
  return storage.getItem('nickname')
}

export function clearLocal () {
  storage.clear()
}
