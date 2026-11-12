import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {db} from "../config/firebase.js";

const productsCollection = collection(db, "products");

export const findAll = async (categoryId) => {
  const productsQuery = categoryId
    ? query(productsCollection, where("categoryId", "==", Number(categoryId)))
    : productsCollection;
  const snapshot = await getDocs(productsQuery);

  return snapshot.docs.map((productDocument) => ({
    id: productDocument.id,
    ...productDocument.data(),
  }));
};

export const findById = async (id) => {
  const productReference = doc(productsCollection, String(id));
  const productSnapshot = await getDoc(productReference);

  if (!productSnapshot.exists()) {
    return null;
  }

  return {id: productSnapshot.id, ...productSnapshot.data()};
};

export const createProduct = async (product) => {
  const productReference = await addDoc(productsCollection, product);
  return {id: productReference.id, ...product};
};

export const updateProduct = async (id, productData) => {
  const productReference = doc(productsCollection, String(id));
  const productSnapshot = await getDoc(productReference);
  if (!productSnapshot.exists()) {
    return null;
  }

  await updateDoc(productReference, productData);
  return {id: productSnapshot.id, ...productSnapshot.data(), ...productData};
};

export const deleteProduct = async (id) => {
  const productReference = doc(productsCollection, String(id));
  const productSnapshot = await getDoc(productReference);
  if (!productSnapshot.exists()) {
    return null;
  }

  await deleteDoc(productReference);
  return {id: productSnapshot.id, ...productSnapshot.data()};
};
