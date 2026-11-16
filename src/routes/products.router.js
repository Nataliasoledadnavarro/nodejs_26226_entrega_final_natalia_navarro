import {Router} from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getProducts);
router.post("/create", authMiddleware, createProduct);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
