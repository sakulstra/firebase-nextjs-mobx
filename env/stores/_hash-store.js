import firebase from 'firebase'
import { action, observable, autorun } from 'mobx'
import isSameDay from 'date-fns/is_same_day'
import { db, getAuthStore } from './'

let store = null

class Store {
    @observable hash = '';
    @observable hashes = observable.map([]);
    @observable ready = false;

  constructor () {
    this.authStore = getAuthStore()
    autorun(() => {
      if (!this.ready) return // data not yet fetched
      if (this.timeout) clearTimeout(this.timeout)
      const text = this.hash
      this.timeout = setTimeout(() => {
        const hashes = this.hashes.entries()
        const last = hashes[hashes.length - 1]
        if (hashes && last && isSameDay(new Date(last[1].created), new Date())) {
          this.update(text, last[0])
        } else {
          this.addHash(text)
        }
      }, 200)
    })
  }

    @action start = () => {
      const disposer = autorun(() => {
        if (this.authStore.user) {
          disposer()
          const userId = this.authStore.user.uid
          this.ref = db.ref(`/hashes/${userId}`)
                // get initial values one - so we can distinguish between "no data" and "not loaded"
          this.ref.once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              this.hashes.set(childSnapshot.key, childSnapshot.val())
            })
            const hashes = this.hashes.entries()
            const last = hashes[hashes.length - 1]
                    // set initial value if another hash is inserted today
            if (hashes && last && isSameDay(new Date(last[1].created), new Date())) {
              this.hash = last[1].text
            }
            this.ready = true
          })
                // subscribe to add events
          this.ref.on('child_added', (data) => {
            this.hashes.set(data.key, data.val())
          })
          this.ref.on('child_changed', (data) => {
            this.hashes.set(data.key, data.val())
          })
          this.ref.on('child_removed', (data) => {
            this.hashes.delete(data.key)
          })
        }
      })
    }

  setHash (v) {
    this.hash = v
  }
  stop = () => this.ref ? this.ref.off() : null;

  update = (text, hashId) => {
    const ref = this.ref.child(`${hashId}`)
    const stamp = firebase.database.ServerValue.TIMESTAMP
    const updates = {
      text: text,
      modified: stamp
    }
    ref.update(updates)
            .then(() => {
              console.log('update success')
            }).catch(error => {
              console.log(error)
            })
  }

  addHash (text) {
    const stamp = firebase.database.ServerValue.TIMESTAMP
    const ref = this.ref.push()
    ref.set({ text: text, created: stamp, modified: stamp })
            .then(() => {
              console.log('insert success')
            }).catch(error => {
              console.log(error)
            })
  }
}

export default function getStore () {
  if (store === null) {
    store = new Store()
  }
  return store
}
