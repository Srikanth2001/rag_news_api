const Redis = require('ioredis');
let redisClient = null;
if (process.env.REDIS_HOST) {
  redisClient = new Redis({ host: process.env.REDIS_HOST });
  redisClient.on('connect', ()=> console.log("Connected to Redis"));
} else {
  console.log("No REDIS_HOST configured — using in-memory cache");
  const store = new Map();
  redisClient = {
    async get(k){ return store.get(k) || null; },
    async set(k, v){ store.set(k, v); return "OK"; },
    async del(k){ store.delete(k); return 1; }
  };
}
module.exports = redisClient;
