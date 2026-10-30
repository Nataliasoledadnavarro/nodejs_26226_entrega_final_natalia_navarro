import {readFile, writeFile} from "fs/promises";
const dataURL = new URL("../../data/catalog.json", import.meta.url);
const data = await readFile(dataURL, "utf-8");
const products = JSON.parse(data).products;

const saveProducts = async (updatedProducts) => {
  const catalog = JSON.parse(await readFile(dataURL, "utf-8"));
  catalog.products = updatedProducts;

  await writeFile(dataURL, `${JSON.stringify(catalog, null, 2)}\n`, "utf-8");
  products.splice(0, products.length, ...updatedProducts);
};

const generateProductId = () => {
  if (products.length === 0) {
    return 1;
  }

  return Math.max(...products.map((product) => product.id)) + 1;
};

export const findAll = async (categoryId) => {
  if (!categoryId) {
    return products;
  }
  return products.filter((p) => p.categoryId === parseInt(categoryId));
};

export const findById = async (id) => {
  return products.find((p) => p.id === parseInt(id));
};

export const createProduct = async (product) => {
  const newProduct = {
    id: generateProductId(),
    ...product,
  };

  await saveProducts([...products, newProduct]);
  return newProduct;
};

export const updateProduct = async (id, productData) => {
  const product = await findById(id);
  if (!product) {
    return null;
  }

  const updatedProduct = {...product, ...productData};
  const updatedProducts = products.map((currentProduct) =>
    currentProduct.id === product.id ? updatedProduct : currentProduct
  );

  await saveProducts(updatedProducts);
  return updatedProduct;
};

export const deleteProduct = async (id) => {
  const index = products.findIndex((product) => product.id === parseInt(id));
  if (index === -1) {
    return null;
  }

  const [deletedProduct] = products.slice(index, index + 1);
  const updatedProducts = products.filter((product) => product.id !== deletedProduct.id);

  await saveProducts(updatedProducts);
  return deletedProduct;
};

