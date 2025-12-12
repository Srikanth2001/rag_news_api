const crypto = require('crypto');

function textToVector(text, dim=128) {
  // deterministic pseudo-embedding: hash chunks to numbers
  const hash = crypto.createHash('sha256').update(text).digest();
  const vec = new Array(dim).fill(0);
  for (let i=0;i<hash.length;i++){
    vec[i % dim] += hash[i];
  }
  // normalize
  const sumSq = vec.reduce((s,v)=> s + v*v, 0);
  return vec.map(v => v / Math.sqrt(sumSq));
}

module.exports = { textToVector };
