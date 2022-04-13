const { UserInputError, } = require('apollo-server')
const { getFirestore, collection, getDocs, } = require ('firebase/firestore')
const { argsToArgsConfig } = require('graphql/type/definition')
const db = getFirestore()
const categoryFunctions = require('../firebase_functions/categoryFunctions')
const recipeFunctions = require('../firebase_functions/recipeFunctions')
const { v1: uuid } = require('uuid')

const resolvers = {
  Query: {
    allCategories: () => categoryFunctions.getCategories(),
    allRecipes: () => recipeFunctions.getRecipes(),
    findRecipe: (root, args) =>
      recipeFunctions.findRecipe(args)
  },
  Mutation: {
    addRecipe: async (root, args) => {
      const querySnapshot = await getDocs(collection(db, "recipes"))
      const recipeList = []
      querySnapshot.forEach((doc) => {
        recipeList.push(doc.data())
      })
      if (recipeList.find(recipe => recipe.title === args.title)) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title,
        })
      }
      const newRecipe = { ...args, id: uuid(), dateAdded: Date() }
      const addNewRecipe = recipeFunctions.addNewRecipe(newRecipe)
      return newRecipe
    },
    editRecipe: async (root, args) => {
      const querySnapshot = await getDocs(collection(db, "recipes"))
      const recipeList = []
      querySnapshot.forEach((doc) => {
        recipeList.push(doc.data())
      })
      const recipe = recipeList.find(recipe => recipe.title === args.title)
      if (!recipe) {
        return null
      }

      const updatedRecipe = { 
        ...recipe,
        category: args.category,
        servings: args.servings,
        cookingTime: args.cookingTime,
        rating: args.rating,
        image: args.image
      }

      const addNewRecipe = recipeFunctions.editRecipe(updatedRecipe)
      return updatedRecipe
    },
    deleteRecipe: async (root, args) => {
      const querySnapshot = await getDocs(collection(db, "recipes"))
      const recipeList = []
      querySnapshot.forEach((doc) => {
        recipeList.push(doc.data())
      })
      const recipeToDelete = recipeList.find(recipe => recipe.id === args.id)
      const detelefromFirestore = recipeFunctions.deleteRecipe(recipeToDelete)
      return recipeToDelete
    }
  }
}

module.exports = resolvers