const { Client } = require('pg');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let dbClient = null;
let usingPostgres = false;

async function initDB() {
  const PG_HOST = process.env.PG_HOST;
  if (PG_HOST) {
    // try Postgres
    const client = new Client({
      host: process.env.PG_HOST,
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'postgres',
      database: process.env.PG_DATABASE || 'rag',
      port: process.env.PG_PORT || 5432,
    });
    await client.connect();
    // create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS interactions (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255),
        user_query TEXT,
        llm_response TEXT,
        response_time INT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    dbClient = client;
    usingPostgres = true;
    console.log("Connected to Postgres");
  } else {
    // sqlite fallback
    const dbPath = path.join(__dirname, '..', '..', 'data', 'interactions.sqlite3');
    const db = new sqlite3.Database(dbPath);
    db.serialize(() => {
      db.run(\`CREATE TABLE IF NOT EXISTS interactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT,
        user_query TEXT,
        llm_response TEXT,
        response_time INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )\`);
    });
    dbClient = db;
    usingPostgres = false;
    console.log("Using SQLite fallback at", dbPath);
  }
}

function getClient() {
  return { client: dbClient, usingPostgres };
}

module.exports = { initDB, getClient };
