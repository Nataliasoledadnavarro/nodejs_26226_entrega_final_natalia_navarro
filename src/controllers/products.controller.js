import * as productsService from "../services/products.service.js";
import {HttpError} from "../services/http-error.service.js";

const handleServiceError = (error, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({error: error.message});
  }
  return next(error);
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await productsService.listProducts(req.query.categoryId);
    return res.json(products);
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};

export const getProductById = async (req, res, next) => {
  if (!req.params.id?.trim()) {
    return res.status(400).json({error: "ID de producto inválido"});
  }

  try {
    const product = await productsService.getProduct(req.params.id);
    return res.json(product);
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await productsService.createProduct(req.body ?? {});
    return res.status(201).json(product);
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};

export const updateProduct = async (req, res, next) => {
  if (!req.params.id?.trim()) {
    return res.status(400).json({error: "ID de producto inválido"});
  }

  try {
    const product = await productsService.updateProduct(req.params.id, req.body ?? {});
    return res.json(product);
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};

export const deleteProduct = async (req, res, next) => {
  if (!req.params.id?.trim()) {
    return res.status(400).json({error: "ID de producto inválido"});
  }

  try {
    await productsService.deleteProduct(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};
