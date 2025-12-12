const vectorstore = require('../utils/vectorstore');
const { textToVector } = require('./embedding.service');
const llm = require('./llm.stub');
const cache = require('../utils/cache');
const { getClient } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

async function answerQuery(sessionId, query) {
  const start = Date.now();
  const qVec = textToVector(query);
  const results = vectorstore.search(qVec, 5);
  const context = results.map(r => `- ${r.payload.title}: ${r.payload.content}`).join('\n\n');

  const prev = await cache.get(sessionId) || '';
  const prompt = `Conversation History:\n${prev}\n\nContext:\n${context}\n\nUser Query:\n${query}`;

  const response = await llm.generateAnswer(prompt);

  // persist to SQL
  const { client, usingPostgres } = getClient();
  const responseTime = Date.now() - start;
  if (usingPostgres) {
    client.query('INSERT INTO interactions(session_id,user_query,llm_response,response_time) VALUES($1,$2,$3,$4)',
      [sessionId, query, response, responseTime]);
  } else {
    client.run('INSERT INTO interactions(session_id,user_query,llm_response,response_time) VALUES(?,?,?,?)',
      [sessionId, query, response, responseTime]);
  }

  // update cache
  const updated = `${prev}\nUser: ${query}\nAI: ${response}`;
  await cache.set(sessionId, updated);
  return { sessionId, response, retrieved: results.map(r=>({id:r.id,title:r.payload.title,score:r.score})) };
}

module.exports = { answerQuery };
