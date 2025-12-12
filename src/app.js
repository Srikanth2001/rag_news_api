const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ingestRoutes = require('./routes/ingest.routes');
const chatRoutes = require('./routes/chat.routes');
const historyRoutes = require('./routes/history.routes');
const { initDB } = require('./utils/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/ingest', ingestRoutes);
app.use('/chat', chatRoutes);
app.use('/history', historyRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
initDB().then(()=> {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("DB init failed:", err);
  process.exit(1);
});
