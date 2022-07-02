const { getFirestore, collection, getDocs, addDoc, setDoc, doc, deleteDoc } = require ('firebase/firestore')
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

const filterRecipes = async (args) => {
  const querySnapshot = await getDocs(collection(db, "recipes"))
  const recipeList = []
  querySnapshot.forEach((doc) => {
    recipeList.push(doc.data())
  })
  let filteredRecipeList
  if (args.rating) {
    filteredRecipeList = recipeList.filter(recipe => recipe.rating >= args.rating)
  } else if (args.cookingTime) {
    filteredRecipeList = recipeList.filter(recipe => recipe.cookingTime <= args.cookingTime)
  } else if (args.servings) {
    filteredRecipeList = recipeList.filter(recipe => recipe.servings >= args.servings)
  }
  return filteredRecipeList
}

const addNewRecipe = async (newRecipe) => {
  await addDoc(collection(db, "recipes"), {
    ...newRecipe
  })
}

const editRecipe = async (updatedRecipe) => {
  const querySnapshot = await getDocs(collection(db, "recipes"))
  let recipeCollectionID
  console.log('rrr', updatedRecipe)
  querySnapshot.forEach((doc) => {
    if (updatedRecipe.id === doc.data().id) {
      recipeCollectionID = doc.id
    }
  })
  await setDoc(doc(db, "recipes", recipeCollectionID), {
    ...updatedRecipe
  })
}

const deleteRecipe = async (recipeToDelete) => {
  const querySnapshot = await getDocs(collection(db, "recipes"))
  let recipeCollectionID
  querySnapshot.forEach((doc) => {
    if (recipeToDelete.id === doc.data().id) {
      recipeCollectionID = doc.id
    }
  })
  await deleteDoc(doc(db, "recipes", recipeCollectionID))
}

module.exports = {
  getRecipes,
  findRecipe,
  filterRecipes,
  addNewRecipe,
  editRecipe,
  deleteRecipe
}