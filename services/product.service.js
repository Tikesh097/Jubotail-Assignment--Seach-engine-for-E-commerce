const { products } = require("../data/productStore");
const { v4: uuidv4 } = require("uuid");

function addProduct(data) {
  const product = {
    productId: uuidv4(),
    ...data,
    unitsSold: data.unitsSold || Math.floor(Math.random() * 50000),
    returnRate: Math.random() * 0.1,
    complaints: Math.floor(Math.random() * 200),
    metadata: data.metadata || {},
  };

  products.push(product);
  return product;
}

function updateMetadata(productId, metadata) {
  const product = products.find((p) => p.productId === productId);
  if (!product) throw new Error("Product not found");

  product.metadata = { ...product.metadata, ...metadata };
  return product;
}

function getAllProducts() {
  return products;
}

module.exports = {
  addProduct,
  updateMetadata,
  getAllProducts,
};
