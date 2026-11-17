import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.router.js";
import categoriesRouter from "./src/routes/categories.router.js";
import authRouter from "./src/routes/auth.routes.js";
import { notFoundMiddleware, errorMiddleware } from "./src/middlewares/error.middleware.js";

const app = express();
app.use(express.json());  //bodyParser midelware
app.use(cors()); //cors midelware

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Servidor express corriendo!");
});

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth", authRouter);

// Middleware para manejar rutas no encontradas (404)
app.use(notFoundMiddleware);

// Middleware para manejar errores internos del servidor (500)
app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

