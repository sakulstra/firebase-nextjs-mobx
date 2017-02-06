import { action, observable } from 'mobx'

let store = null

const messages = [
  'nice to have you here',
  'i like you',
  'welcome <3',
  "let's drink a beer together mate!",
  'you look awesome today'
]

class Store {
    @observable helloMessage = '';

  constructor (isServer, message) {
    if (message) {
      this.helloMessage = message
    } else {
      this.helloMessage = messages[Math.floor(Math.random() * (messages.length - 1))]
    }
  }

    @action start = () => {
      this.timer = setInterval(() => {
        this.helloMessage = messages[Math.floor(Math.random() * (messages.length - 1))]
      }, 10000)
    }

  stop = () => clearInterval(this.timer)
}

export default function initStore (isServer, message) {
  if (isServer && typeof window === 'undefined') {
    return new Store(isServer, message)
  } else {
    if (store === null) {
      store = new Store(isServer, message)
    }
    return store
  }
}
