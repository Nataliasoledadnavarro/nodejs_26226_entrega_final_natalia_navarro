import * as productModel from "../models/products.model.js";
import * as categoryModel from "../models/categories.model.js";
import {HttpError} from "./http-error.service.js";

const parseCategoryId = (categoryId) => {
  const numericCategoryId = Number(categoryId);
  if (!Number.isInteger(numericCategoryId)) {
    throw new HttpError(400, "categoryId debe ser un entero");
  }
  return numericCategoryId;
};

export const listProducts = (categoryId) => productModel.findAll(categoryId);

export const getProduct = async (id) => {
  const product = await productModel.findById(id);
  if (!product) {
    throw new HttpError(404, "Producto no encontrado");
  }
  return product;
};

export const createProduct = async ({name, price, categoryId}) => {
  if (!name || price === undefined || categoryId === undefined) {
    throw new HttpError(400, "name, price y categoryId son obligatorios");
  }

  const numericPrice = Number(price);
  const numericCategoryId = parseCategoryId(categoryId);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    throw new HttpError(400, "price debe ser un número válido y no negativo");
  }

  const category = await categoryModel.findById(numericCategoryId);
  if (!category) {
    throw new HttpError(400, "La categoría indicada no existe");
  }

  return productModel.createProduct({
    name,
    price: numericPrice,
    categoryId: numericCategoryId,
  });
};

export const updateProduct = async (id, productData) => {
  await getProduct(id);

  const {name, price, categoryId} = productData;
  if (!name || price === undefined || categoryId === undefined) {
    throw new HttpError(400, "name, price y categoryId son obligatorios");
  }

  const numericPrice = Number(price);
  const numericCategoryId = parseCategoryId(categoryId);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    throw new HttpError(400, "price debe ser un número válido y no negativo");
  }

  const category = await categoryModel.findById(numericCategoryId);
  if (!category) {
    throw new HttpError(400, "La categoría indicada no existe");
  }

  const updatedProduct = await productModel.updateProduct(id, {
    name,
    price: numericPrice,
    categoryId: numericCategoryId,
  });
  if (!updatedProduct) {
    throw new HttpError(404, "Producto no encontrado");
  }
  return updatedProduct;
};

export const deleteProduct = async (id) => {
  const deletedProduct = await productModel.deleteProduct(id);
  if (!deletedProduct) {
    throw new HttpError(404, "Producto no encontrado");
  }
  return deletedProduct;
};
