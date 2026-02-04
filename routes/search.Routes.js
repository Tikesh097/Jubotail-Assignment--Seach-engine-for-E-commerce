const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../services/product.service');
const { calculateScore } = require('../services/ranking.service');
const { normalizeQuery } = require('../utils/queryNormalizer');

router.get('/product', (req, res) => {
  try {
    let query = req.query.query || '';
    query = normalizeQuery(query);

    const products = getAllProducts();

    const ranked = products
      .map(p => ({
        ...p,
        score: calculateScore(p, query)
      }))
      .sort((a, b) => b.score - a.score);

    res.json({ data: ranked.slice(0, 20) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
