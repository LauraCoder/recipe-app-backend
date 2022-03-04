const { getFirestore, collection, getDocs } = require ('firebase/firestore')
const db = getFirestore()

const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "categories"))
  const categoryList = []
  querySnapshot.forEach((doc) => {
    categoryList.push(doc.data())
  })
  return categoryList
}

module.exports = {
  getCategories
}