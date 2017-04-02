const functions = require('firebase-functions')
const api_key = 'key-58fde6ee0d1296c20b8edcbe2a543c6a'
const domain = 'sandbox115be8af42714cf7bf281519b7f363f4.mailgun.org'
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
  const user = event.data
  const email = user.email
  const displayName = user.displayName

  const data = {
    from: 'Excited User <postmaster@sandbox115be8af42714cf7bf281519b7f363f4.mailgun.org>',
    to: email,
    subject: 'Hello',
    text: `hello ${displayName}, just Testing some Mailgun awesomness!`
  }

  mailgun.messages().send(data, (error, body) => {
    console.log(error)
    console.log('response', body)
  })
})

exports.sendByeEmail = functions.auth.user().onDelete(event => {
  const user = event.data
  const email = user.email
  const displayName = user.displayName

  const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: email,
    subject: 'Hello',
    text: `hello ${displayName}, just Testing some Mailgun awesomness!`
  }

  mailgun.messages().send(data, (error, body) => {
    console.log('error delete', error)
    console.log('success delete', body)
  })
})
