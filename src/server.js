require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const config = require('../utils/config')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const JWT_SECRET = process.env.JWT_SECRET

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    /*if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      return { currentUser }
    }*/
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})