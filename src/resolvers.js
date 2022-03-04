const categoryFunctions = require('../firebase_functions/categoryFunctions')
const recipeFunctions = require('../firebase_functions/recipeFunctions')

const resolvers = {
  Query: {
    allCategories: () => categoryFunctions.getCategories(),
    allRecipes: () => recipeFunctions.getRecipes(),
  }
}

module.exports = resolvers