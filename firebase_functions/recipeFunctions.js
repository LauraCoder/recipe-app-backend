const { getFirestore, collection, getDocs, addDoc, setDoc, doc, updateDoc, query } = require ('firebase/firestore')
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

const editRecipe = async (updatedRecipe) => {
  const querySnapshot = await getDocs(collection(db, "recipes"))
  let recipeCollectionID
  querySnapshot.forEach((doc) => {
    if (updatedRecipe.title === doc.data().title) {
      console.log('found the', updatedRecipe.title)
      recipeCollectionID = doc.id
    }
  })
  await setDoc(doc(db, "recipes", recipeCollectionID), {
    ...updatedRecipe
  })
}

module.exports = {
  getRecipes,
  findRecipe,
  addNewRecipe,
  editRecipe
}