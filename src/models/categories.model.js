const categories = [
  {id: 1, name: "tecnología"},
  {id: 2, name: "hogar"},
  {id: 3, name: "alimentos"},
];
let nextCategoryId = categories.length + 1;

export const findAll = () => categories;

export const findById = (id) => categories.find((category) => category.id === id);

export const createCategory = ({name}) => {
  const newCategory = {id: nextCategoryId++, name};
  categories.push(newCategory);
  return newCategory;
};

export const updateCategory = (id, {name}) => {
  const category = findById(id);
  if (!category) {
    return null;
  }

  category.name = name;
  return category;
};

export const deleteCategory = (id) => {
  const index = categories.findIndex((category) => category.id === id);
  if (index === -1) {
    return null;
  }

  return categories.splice(index, 1)[0];
};