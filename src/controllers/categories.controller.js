import * as categoryModel from "../models/categories.model.js";

export const getCategories = async (req, res) => {
  res.json(await categoryModel.findAll());
};

export const getCategoryById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({error: "ID de categoría inválido"});
  }

  const category = await categoryModel.findById(id);
  if (!category) {
    return res.status(404).json({error: "Categoría no encontrada"});
  }

  res.json(category);
};

export const createCategory = async (req, res) => {
  const {name} = req.body ?? {};
  if (!name) {
    return res.status(400).json({error: "El nombre es obligatorio"});
  }

  const category = await categoryModel.createCategory({name});
  res.status(201).json(category);
};

export const updateCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({error: "ID de categoría inválido"});
  }

  const {name} = req.body ?? {};
  if (!name) {
    return res.status(400).json({error: "El nombre es obligatorio"});
  }

  const category = await categoryModel.updateCategory(id, {name});
  if (!category) {
    return res.status(404).json({error: "Categoría no encontrada"});
  }

  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({error: "ID de categoría inválido"});
  }

  const category = await categoryModel.deleteCategory(id);
  if (!category) {
    return res.status(404).json({error: "Categoría no encontrada"});
  }

  res.status(204).send();
};