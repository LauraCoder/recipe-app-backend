const { getFirestore, collection, getDocs, addDoc, } = require ('firebase/firestore')
const { argsToArgsConfig } = require('graphql/type/definition')
const db = getFirestore()

const getRecipes = async () => {
  const querySnapshot = await getDocs(collection(db, "recipes"))
  const recipeList = []
  querySnapshot.forEach((doc) => {
    recipeList.push(doc.data())
  })
  return recipeList
}

const findRecipe = async (args) => {
  const querySnapshot = await getDocs(collection(db, "recipes"))
  const recipeList = []
  querySnapshot.forEach((doc) => {
    recipeList.push(doc.data())
  })
  const foundRecipe = recipeList.find(recipe => recipe.title === args.title)
  return foundRecipe
}

const addNewRecipe = async (newRecipe) => {
  await addDoc(collection(db, "recipes"), {
    ...newRecipe
  })
}

module.exports = {
  getRecipes,
  findRecipe,
  addNewRecipe
}