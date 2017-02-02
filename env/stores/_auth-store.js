import { observable } from 'mobx'
import firebase from 'firebase'
import { auth } from './'

let store = null

class Store {
    @observable user = null;

  constructor (isServer) {
    if (isServer) return
    this.unwatchAuth = auth.onAuthStateChanged(user => {
      this.user = user
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

}

export default function getStore () {
  if (store === null) {
    store = new Store()
  }
  return store
}
