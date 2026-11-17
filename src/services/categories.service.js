import * as categoryModel from "../models/categories.model.js";
import {HttpError} from "./http-error.service.js";

export const listCategories = () => categoryModel.findAll();

export const getCategory = async (id) => {
  const category = await categoryModel.findById(id);
  if (!category) {
    throw new HttpError(404, "Categoría no encontrada");
  }
  return category;
};

export const createCategory = async ({name}) => {
  if (typeof name !== "string" || name.trim().length === 0) {
    throw new HttpError(400, "El nombre es obligatorio");
  }
  return categoryModel.createCategory({name: name.trim()});
};

export const updateCategory = async (id, {name}) => {
  if (typeof name !== "string" || name.trim().length === 0) {
    throw new HttpError(400, "El nombre es obligatorio");
  }

  const category = await categoryModel.updateCategory(id, {name: name.trim()});
  if (!category) {
    throw new HttpError(404, "Categoría no encontrada");
  }
  return category;
};

export const deleteCategory = async (id) => {
  const category = await categoryModel.deleteCategory(id);
  if (!category) {
    throw new HttpError(404, "Categoría no encontrada");
  }
  return category;
};
