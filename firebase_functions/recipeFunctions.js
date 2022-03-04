const { getFirestore, collection, getDocs } = require ('firebase/firestore')
const db = getFirestore()

const getRecipes = async () => {
  const querySnapshot = await getDocs(collection(db, "recipes"))
  const recipeList = []
  querySnapshot.forEach((doc) => {
    recipeList.push(doc.data())
  })
  return recipeList
}

module.exports = {
  getRecipes
}