const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const JWT_SECRET = config.SECRET
const userFunctions = require('../firebase_functions/userFunctions')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = userFunctions.findUser(args.username)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})