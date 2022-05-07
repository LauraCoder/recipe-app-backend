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

  type Shoppingbag {
    id: ID!
    ingredient: String!
  }
  
  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allCategories: [Category!]!
    allRecipes: [Recipe!]!
    allIngredients: [Shoppingbag!]!
    findRecipe(title: String!): Recipe
    me: User
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
    addIngredient(
      ingredient: String!
    ): Shoppingbag
    deleteIngredient(id:ID): Shoppingbag
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`
module.exports = typeDefs