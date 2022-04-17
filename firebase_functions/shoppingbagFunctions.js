const { getFirestore, collection, getDocs, addDoc, setDoc, doc, deleteDoc } = require ('firebase/firestore')
const { argsToArgsConfig } = require('graphql/type/definition')
const db = getFirestore()

const getIngredients = async () => {
  const querySnapshot = await getDocs(collection(db, "shoppingbag"))
  const shoppingbagList = []
  querySnapshot.forEach((doc) => {

    shoppingbagList.push(doc.data())
  })
  return shoppingbagList
}

const addNewIngredient = async (newIngredient) => {
  await addDoc(collection(db, "shoppingbag"), {
    ...newIngredient
  })
}

module.exports = {
  getIngredients,
  addNewIngredient,
}