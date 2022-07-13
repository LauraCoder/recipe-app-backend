const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const {getAuth} = require('firebase/auth')
const config = require('../utils/config')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const JWT_SECRET = config.getAuth
const userFunctions = require('../firebase_functions/userFunctions')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  /*context: async ({req}) => {
      //const auth = req ? req.headers.authorization : null
      const auth = getAuth()
      if (auth) {
        const currentUser = auth.currentUser
        return currentUser
      }
    /*if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const auth = getAuth()
      console.log('loggaantunu?')
      return auth.currentUser
    }*/
  
  /*}
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const auth = getAuth()
      return auth.currentUser
    }
  }
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = userFunctions.findUser('Laura')
      //printthis = currentUser
      console.log('current', currentUser)
      return { currentUser }
    }
  },*/
})

const PORT = process.env.PORT || 4000
server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})