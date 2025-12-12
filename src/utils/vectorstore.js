const fs = require('fs');
const path = require('path');

const STORE_PATH = path.join(__dirname, '..', '..', 'data', 'vector_store.json');

function saveVectors(vectors) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(vectors, null, 2), 'utf-8');
}

function loadVectors() {
  if (!fs.existsSync(STORE_PATH)) return [];
  return JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
}

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i=0;i<a.length;i++){
    dot += a[i]*b[i];
    na += a[i]*a[i];
    nb += b[i]*b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-10);
}

function search(queryVector, k=5) {
  const vectors = loadVectors();
  const scored = vectors.map(v => ({ id: v.id, payload: v.payload, score: cosine(queryVector, v.vector)}));
  scored.sort((x,y)=> y.score - x.score);
  return scored.slice(0,k);
}

module.exports = { saveVectors, loadVectors, search };
