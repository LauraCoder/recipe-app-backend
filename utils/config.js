const {initializeApp} = require('firebase/app')
require('dotenv').config()

const firebaseApp = initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
})

const SECRET = process.env.SECRET

module.exports = {
  firebaseApp,
  SECRET
}