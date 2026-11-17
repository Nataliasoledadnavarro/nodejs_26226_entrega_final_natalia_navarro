import * as categoriesService from "../services/categories.service.js";
import {HttpError} from "../services/http-error.service.js";

const handleServiceError = (error, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({error: error.message});
  }
  return next(error);
};

export const getCategories = async (req, res, next) => {
  try {
    return res.json(await categoriesService.listCategories());
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};

export const getCategoryById = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({error: "ID de categoría inválido"});
  }

  try {
    return res.json(await categoriesService.getCategory(id));
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const category = await categoriesService.createCategory(req.body ?? {});
    return res.status(201).json(category);
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};

export const updateCategory = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({error: "ID de categoría inválido"});
  }

  try {
    const category = await categoriesService.updateCategory(id, req.body ?? {});
    return res.json(category);
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};

export const deleteCategory = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({error: "ID de categoría inválido"});
  }

  try {
    await categoriesService.deleteCategory(id);
    return res.status(204).send();
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};