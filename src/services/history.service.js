const { getClient } = require('../utils/db');

async function fetchHistory(sessionId) {
  const { client, usingPostgres } = getClient();
  if (usingPostgres) {
    const res = await client.query('SELECT * FROM interactions WHERE session_id = $1 ORDER BY created_at DESC', [sessionId]);
    return res.rows;
  } else {
    return new Promise((resolve, reject) => {
      client.all('SELECT * FROM interactions WHERE session_id = ? ORDER BY created_at DESC', [sessionId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}

async function clearHistory(sessionId) {
  const { client, usingPostgres } = getClient();
  if (usingPostgres) {
    await client.query('DELETE FROM interactions WHERE session_id = $1', [sessionId]);
  } else {
    return new Promise((resolve, reject) => {
      client.run('DELETE FROM interactions WHERE session_id = ?', [sessionId], function(err){
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  }
}

module.exports = { fetchHistory, clearHistory };
