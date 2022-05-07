const { getFirestore, collection, getDocs, addDoc, setDoc, doc, deleteDoc } = require ('firebase/firestore')
const { argsToArgsConfig } = require('graphql/type/definition')
const db = getFirestore()

const addNewUser = async (newUser) => {
  await addDoc(collection(db, "users"), {
    ...newUser
  })
}

const findUser = async (args) => {
  const querySnapshot = await getDocs(collection(db, "users"))
  const userList = []
  querySnapshot.forEach((doc) => {
    userList.push(doc.data())
  })
  const foundUser = userList.find(user => user.username === args.username)
  return foundUser
}

module.exports = {
  addNewUser,
  findUser
}