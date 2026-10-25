import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.router.js";
import categoriesRouter from "./src/routes/categories.router.js";

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

