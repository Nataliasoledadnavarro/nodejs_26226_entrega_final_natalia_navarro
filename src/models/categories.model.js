import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {db} from "../config/firebase.js";

const categoriesCollection = collection(db, "categories");

export const findAll = async () => {
  const snapshot = await getDocs(categoriesCollection);

  return snapshot.docs.map((categoryDocument) => ({
    ...categoryDocument.data(),
    id: Number(categoryDocument.id),
  }));
};

export const findById = async (id) => {
  const categoryReference = doc(categoriesCollection, String(id));
  const categorySnapshot = await getDoc(categoryReference);

  if (!categorySnapshot.exists()) {
    return null;
  }

  return {...categorySnapshot.data(), id: Number(categorySnapshot.id)};
};

export const createCategory = async ({name}) => {
  const snapshot = await getDocs(categoriesCollection);
  const existingIds = snapshot.docs
    .map((categoryDocument) => Number(categoryDocument.id))
    .filter(Number.isInteger);
  const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  const category = {id: nextId, name};

  await setDoc(doc(categoriesCollection, String(nextId)), {name});
  return category;
};

export const updateCategory = async (id, {name}) => {
  const categoryReference = doc(categoriesCollection, String(id));
  const categorySnapshot = await getDoc(categoryReference);

  if (!categorySnapshot.exists()) {
    return null;
  }

  await updateDoc(categoryReference, {name});
  return {...categorySnapshot.data(), id: Number(categorySnapshot.id), name};
};

export const deleteCategory = async (id) => {
  const categoryReference = doc(categoriesCollection, String(id));
  const categorySnapshot = await getDoc(categoryReference);

  if (!categorySnapshot.exists()) {
    return null;
  }

  await deleteDoc(categoryReference);
  return {...categorySnapshot.data(), id: Number(categorySnapshot.id)};
};
