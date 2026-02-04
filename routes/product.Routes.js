const express = require('express');
const router = express.Router();
const productService = require('../services/product.service');

router.post('/', (req, res) => {
  try {
    const product = productService.addProduct(req.body);
    res.status(201).json({ productId: product.productId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/meta-data', (req, res) => {
  try {
    const { productId, Metadata } = req.body;
    const updated = productService.updateMetadata(productId, Metadata);
    res.json(updated);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
