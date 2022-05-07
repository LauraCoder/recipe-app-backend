require('dotenv').config()
const { UserInputError, } = require('apollo-server')
const { getFirestore, collection, getDocs, } = require ('firebase/firestore')
const { argsToArgsConfig } = require('graphql/type/definition')
const db = getFirestore()
const jwt = require('jsonwebtoken')
const categoryFunctions = require('../firebase_functions/categoryFunctions')
const recipeFunctions = require('../firebase_functions/recipeFunctions')
const shoppingbagFunctions = require('../firebase_functions/shoppingbagFunctions')
const userFunctions = require('../firebase_functions/userFunctions')
const User = require('./../models/user')
const { v1: uuid } = require('uuid')
const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
  Query: {
    allCategories: () => categoryFunctions.getCategories(),
    allRecipes: () => recipeFunctions.getRecipes(),
    allIngredients: () => shoppingbagFunctions.getIngredients(),
    findRecipe: (root, args) =>
      recipeFunctions.findRecipe(args),
     me: (root, args, context) => {
      return context.currentUser
    },
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
    },
    addIngredient: async (root, args) => {
      const querySnapshot = await getDocs(collection(db, "shoppingbag"))
      const ingredientList = []
      querySnapshot.forEach((doc) => {
        ingredientList.push(doc.data())
      })
      const newIngredient = { ...args, id: uuid(), }
      const addNewIngredient = shoppingbagFunctions.addNewIngredient(newIngredient)
      return newIngredient
    },
    deleteIngredient: async (root, args) => {
      const querySnapshot = await getDocs(collection(db, "shoppingbag"))
      const ingredientList = []
      querySnapshot.forEach((doc) => {
        ingredientList.push(doc.data())
      })
      const ingredientToDelete = ingredientList.find(ingredient => ingredient.id === args.id)
      const detelefromFirestore = shoppingbagFunctions.deleteIngredient(ingredientToDelete)
      return ingredientToDelete
    },
    createUser: async (root, args) => {
      const querySnapshot = await getDocs(collection(db, "users"))
      const userList = []
      querySnapshot.forEach((doc) => {
        userList.push(doc.data())
      })
      if (userList.find(user => user.username === args.username)) {
        throw new UserInputError('Username must be unique', {
          invalidArgs: args.username,
        })
      }
      
      const newUser = { username: args.username, id: uuid() }
      const addNewUser = userFunctions.addNewUser(newUser)
      return newUser
      //const user = new User({ username: args.username })
  
      /*return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })*/
    },
    login: async (root, args) => {
      //const user = await User.findOne({ username: args.username })
      const user = await userFunctions.findUser(args.username)
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

module.exports = resolvers