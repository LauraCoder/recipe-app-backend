const { gql } = require('apollo-server')

const typeDefs = gql`
  type Category {
    title: String!
    image: String
  }

  type Recipe {
    id: ID!
    title: String!
    category: String!
    servings: Int
    cookingTime: Int
    rating: Float
    ingredients: [String]
    instructions: [String]
    dateAdded: String
    image: String
  }

  type Query {
    allCategories: [Category!]!
    allRecipes: [Recipe!]!
  }
`
module.exports = typeDefs