const storage = window.localStorage

export function setLocal (payload) {
  storage.setItem('rate', payload.rate)
}

export function getRate () {
  return storage.getItem('rate')
}

export function clearLocal () {
  storage.clear()
}
