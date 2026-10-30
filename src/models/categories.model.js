import {readFile, writeFile} from "fs/promises";

const dataURL = new URL("../../data/catalog.json", import.meta.url);
const data = await readFile(dataURL, "utf-8");
const categories = JSON.parse(data).categories;

const saveCategories = async (updatedCategories) => {
  const catalog = JSON.parse(await readFile(dataURL, "utf-8"));
  catalog.categories = updatedCategories;

  await writeFile(dataURL, `${JSON.stringify(catalog, null, 2)}\n`, "utf-8");
  categories.splice(0, categories.length, ...updatedCategories);
};

const generateCategoryId = () => {
  if (categories.length === 0) {
    return 1;
  }

  return Math.max(...categories.map((category) => category.id)) + 1;
};

export const findAll = async () => categories;

export const findById = async (id) => categories.find((category) => category.id === id);

export const createCategory = async ({name}) => {
  const newCategory = {id: generateCategoryId(), name};

  await saveCategories([...categories, newCategory]);
  return newCategory;
};

export const updateCategory = async (id, {name}) => {
  const category = await findById(id);
  if (!category) {
    return null;
  }

  const updatedCategory = {...category, name};
  const updatedCategories = categories.map((currentCategory) =>
    currentCategory.id === category.id ? updatedCategory : currentCategory
  );

  await saveCategories(updatedCategories);
  return updatedCategory;
};

export const deleteCategory = async (id) => {
  const index = categories.findIndex((category) => category.id === id);
  if (index === -1) {
    return null;
  }

  const [deletedCategory] = categories.slice(index, index + 1);
  const updatedCategories = categories.filter((category) => category.id !== deletedCategory.id);

  await saveCategories(updatedCategories);
  return deletedCategory;
};