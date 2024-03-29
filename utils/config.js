const {initializeApp} = require('firebase/app')
const {getAuth} = require('firebase/auth')
//import { getAuth } from "firebase/auth"
require('dotenv').config()

const firebaseApp = initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
})

const auth = getAuth(firebaseApp)

const SECRET = process.env.SECRET

module.exports = {
  firebaseApp,
  auth,
  SECRET
}