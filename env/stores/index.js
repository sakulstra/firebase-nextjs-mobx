import firebase from 'firebase'

try {
  firebase.initializeApp({
    apiKey: 'AIzaSyCWTseJj_vykE2KCMPl_eAsOYtfIaMYAiA',
    authDomain: 'nextjs-firebase.firebaseapp.com',
    databaseURL: 'https://nextjs-firebase.firebaseio.com'
  })
} catch (err) {
    // taken from https://github.com/now-examples/next-news/blob/master/lib/db.js
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

export const auth = firebase.auth()
export const db = firebase.database()

export { default as initBaseStore } from './_base-store'
export { default as getAuthStore } from './_auth-store'
export { default as getHashStore } from './_hash-store'
