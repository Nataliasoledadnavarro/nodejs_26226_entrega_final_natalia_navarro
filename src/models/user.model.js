import {db} from "../config/firebase.js";
import {addDoc, collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";

const usersCollection = collection(db, "users");

export const findUserById = async (id) => {
  const userReference = doc(usersCollection, String(id));
  const userSnapshot = await getDoc(userReference);
  if (!userSnapshot.exists()) {
    return null;
  }

  return {id: userSnapshot.id, ...userSnapshot.data()};
};

export const findUserByEmail = async (email) => {
  const usersQuery = query(usersCollection, where("email", "==", email));
  const userSnapshot = await getDocs(usersQuery);
  const userDocument = userSnapshot.docs[0];

  if (!userDocument) {
    return null;
  }

  return {id: userDocument.id, ...userDocument.data()};
};

export const createUser = async (userData) => {
  const userReference = await addDoc(usersCollection, userData);
  return {id: userReference.id, email: userData.email};
};