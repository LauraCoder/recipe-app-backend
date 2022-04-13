const { gql } = require('apollo-server')

const typeDefs = gql`
  type Category {
    id: ID!
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
    findRecipe(title: String!): Recipe
  }

  type Mutation {
    addRecipe(
      title: String!
      category: String!
      servings: Int!
      cookingTime: Int!
      rating: Float
      ingredients: [String!]!
      instructions: [String!]!
      image: String
    ): Recipe
    editRecipe(
      title: String!
      category: String!
      servings: Int!
      cookingTime: Int!
      rating: Float
      image: String
    ): Recipe
    deleteRecipe(id:ID): Recipe
  }
`
module.exports = typeDefs