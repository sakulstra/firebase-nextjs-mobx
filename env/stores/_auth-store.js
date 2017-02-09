import { observable, computed } from 'mobx'
import firebase from 'firebase'
import { auth } from './'

let store = null

class Store {
    @observable user = null
    @observable authIsPending = true

  constructor () {
    this.unwatchAuth = auth.onAuthStateChanged(user => {
      this.user = user
      this.authIsPending = false
    })
  }

  cleanup () {
    if (this.unwatchAuth) {
      this.unwatchAuth()
    }
  }

  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider).then(function (result) {
            // console.log(result);
    }).catch(function (error) {
      console.log(error)
    })
  }

  signOut = () => {
    auth.signOut().then(function () {
            // Sign-out successful.
    }, function (error) {
      console.log(error)
    })
  }

  @computed get isAuthenticated() {
      return !!this.user;
  }
}

export default function getStore () {
  if (store === null) {
    store = new Store()
  }
  return store
}
