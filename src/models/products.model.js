const products = [
  {
    id: 1,
    name: "producto 1",
    price: 100,
    categoryId: 1,
  },
  {
    id: 2,
    name: "producto 2",
    price: 200,
    categoryId: 2,
  },
  {
    id: 3,
    name: "producto 3",
    price: 300,
    categoryId: 1,
  },
];
let nextProductId = products.length + 1;

export const findAll = (categoryId) => {
  if (!categoryId) {
    return products;
  }
  return products.filter((p) => p.categoryId === parseInt(categoryId));
};

export const findById = (id) => {
  return products.find((p) => p.id === parseInt(id));
};

export const createProduct = (product) => {
  const newProduct = {
    id: nextProductId++,
    ...product,
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id, productData) => {
  const product = findById(id);
  if (!product) {
    return null;
  }

  Object.assign(product, productData);
  return product;
};

export const deleteProduct = (id) => {
  const index = products.findIndex((product) => product.id === parseInt(id));
  if (index === -1) {
    return null;
  }

  return products.splice(index, 1)[0];
};

