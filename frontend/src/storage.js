const storage = window.localStorage

export function setLocal (payload) {
  storage["rate"] = payload.rate
}

export function getRate () {
  return storage["rate"]
}

export function clearStorage () {
  storage.clear()
}