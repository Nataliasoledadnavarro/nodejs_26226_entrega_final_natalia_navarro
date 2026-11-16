import {Router} from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getCategories);
router.post("/", authMiddleware, createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
