const localStorage = {
  store: {},
  getItem(key) {
    return this.store[key]
  },
  setItem(key, value) {
    this.store[key] = value
  },
  removeItem(key) {
    delete this.store[key]
  },
  clear() {
    this.store = {}
  },
}

Object.defineProperty(window, "localStorage", { value: localStorage })
