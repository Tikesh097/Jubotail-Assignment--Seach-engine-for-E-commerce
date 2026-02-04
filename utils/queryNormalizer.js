function normalizeQuery(query) {
  query = query.toLowerCase();

  const replacements = {
    ifone: 'iphone',
    sastha: 'sasta',
    cheap: 'sasta'
  };

  Object.keys(replacements).forEach(word => {
    query = query.replace(word, replacements[word]);
  });

  return query;
}

module.exports = { normalizeQuery };
