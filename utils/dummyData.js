const { addProduct } = require('../services/product.service');

function seedData() {
  for (let i = 10; i <= 17; i++) {
    addProduct({
      title: `iPhone ${i}`,
      description: `iPhone ${i} ${128 + i}GB`,
      rating: 4 + Math.random(),
      stock: Math.floor(Math.random() * 50),
      price: 40000 + i * 5000,
      mrp: 50000 + i * 5000,
      currency: 'INR'
    });
  }
}

module.exports = { seedData };
