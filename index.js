import { ApolloServer, gql } from 'apollo-server'
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCPY7Rph_XjrXl-pO6jPV_PhK-lFoOm1us",
  authDomain: "recipe-book-985cd.firebaseapp.com",
  databaseURL: "https://recipe-book-985cd.europe-west1.firebasedatabase.app/",
  projectId: "recipe-book-985cd",
  storageBucket: "recipe-book-985cd.appspot.com",
  messagingSenderId: "451336134214",
  appId: "1:451336134214:web:dbe02586fbd3c434007447"
})

const db = getFirestore()

const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "categories"))
  const categoryList = []
  querySnapshot.forEach((doc) => {
    categoryList.push(doc.data())
  })
  return categoryList
}

const typeDefs = gql`
  type Category {
    title: String!
    image: String
  }

  type Query {
    allCategories: [Category!]!
  }
`

const resolvers = {
  Query: {
    allCategories: () => getCategories(),
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})