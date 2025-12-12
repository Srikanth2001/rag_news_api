const fs = require('fs');
const path = require('path');
const { textToVector } = require('./embedding.service');
const vectorstore = require('../utils/vectorstore');

async function runIngest() {
  const newsPath = path.join(__dirname, '..', '..', 'data', 'news.json');
  const news = JSON.parse(fs.readFileSync(newsPath, 'utf-8'));
  const vectors = news.map(item => ({
    id: item.id,
    vector: textToVector(item.content),
    payload: {
      title: item.title,
      url: item.url,
      content: item.content,
      published_at: item.published_at,
      source: item.source
    }
  }));
  vectorstore.saveVectors(vectors);
  return vectors.length;
}

module.exports = { runIngest };
