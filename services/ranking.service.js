function calculateScore(product, query) {
  let score = 0;

  // Text relevance
  if (product.title.toLowerCase().includes(query)) score += 0.3;

  // Rating
  score += (product.rating / 5) * 0.2;

  // Price relevance
  if (query.includes('sasta')) {
    score += (1 / product.price) * 10000;
  }

  // Popularity
  score += Math.log(product.unitsSold + 1) * 0.15;

  // Stock
  if (product.stock > 0) score += 0.1;

  // Penalty
  score -= product.returnRate * 0.05;
  score -= product.complaints * 0.0001;

  return score;
}

module.exports = { calculateScore };
