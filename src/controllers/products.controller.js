import * as productModel from "../models/products.model.js";
import * as categoryModel from "../models/categories.model.js";

export const getProducts = (req, res) => {
  const categoryId = req.query.categoryId;
  const filteredProducts = productModel.findAll(categoryId);
  res.json(filteredProducts);
};

export const getProductById = (req, res) => {
  const productId = parseInt(req.params.id);
  if (isNaN(productId)) {
    return res.status(400).json({error: "Invalid product ID"});
  }
  const product = productModel.findById(productId);

  if (!product) {
    return res.status(404).json({error: "Producto no encontrado"});
  }
  res.json(product);
};

export const createProduct = (req, res) => {
  const {name, price, categoryId} = req.body ?? {};
  if (!name || price === undefined || categoryId === undefined) {
    return res.status(400).json({error: "name, price y categoryId son obligatorios"});
  }

  const numericPrice = Number(price);
  const numericCategoryId = Number(categoryId);
  if (!Number.isFinite(numericPrice) || numericPrice < 0 || !Number.isInteger(numericCategoryId)) {
    return res.status(400).json({error: "price debe ser un número válido y categoryId un entero"});
  }
  if (!categoryModel.findById(numericCategoryId)) {
    return res.status(400).json({error: "La categoría indicada no existe"});
  }

  const newProduct = productModel.createProduct({
    name,
    price: numericPrice,
    categoryId: numericCategoryId,
  });
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  if (isNaN(productId)) {
    return res.status(400).json({error: "ID de producto inválido"});
  }

  if (!productModel.findById(productId)) {
    return res.status(404).json({error: "Producto no encontrado"});
  }

  const {name, price, categoryId} = req.body ?? {};
  if (!name || price === undefined || categoryId === undefined) {
    return res.status(400).json({error: "name, price y categoryId son obligatorios"});
  }

  const numericPrice = Number(price);
  const numericCategoryId = Number(categoryId);
  if (!Number.isFinite(numericPrice) || numericPrice < 0 || !Number.isInteger(numericCategoryId)) {
    return res.status(400).json({error: "price debe ser un número válido y categoryId un entero"});
  }
  if (!categoryModel.findById(numericCategoryId)) {
    return res.status(400).json({error: "La categoría indicada no existe"});
  }

  const updatedProduct = productModel.updateProduct(productId, {
    name,
    price: numericPrice,
    categoryId: numericCategoryId,
  });
  res.json(updatedProduct);
};

export const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  if (isNaN(productId)) {
    return res.status(400).json({error: "ID de producto inválido"});
  }

  const deletedProduct = productModel.deleteProduct(productId);
  if (!deletedProduct) {
    return res.status(404).json({error: "Producto no encontrado"});
  }

  res.status(204).send();
};
